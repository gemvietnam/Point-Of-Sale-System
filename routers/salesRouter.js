// require mongoose models
const User = require('../models/user');
const Employee = require('../models/employee');
const Product = require('../models/product');
const Sale = require('../models/sale');

// require javascript helper libraries
const _ = require('underscore');
const faker = require('faker');
const moment = require('moment');
const async = require('async');
const parallel = require('async/parallel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const __ = require('lodash');

module.exports = function(app) {

  "use strict";

	app.post('/makeSale', function(req, res, next) {

	    var sale = new Sale();
	    sale.owner = req.body.user_id;
			sale.soldByEmployee = req.body.activeEmployeeId;
	    sale.total = req.body.total;

	    return Promise.all(req.body.items.map((item) => {

	        // pushs an item from the request object into the items array contained in the sale document
					// I've commented out the code below as an attempt to figure out how to persist items' info through sales
	        sale.items.push({
            itemId: item.product_id,
            itemName: item.name,
						itemCategory: item.category,
            cartQuantity: parseInt(item.cartQuantity, 10), // adds cartQuantity to sale
            price: parseFloat(item.priceValue)
	        });

	        return Product.findById(item.product_id).then((product) => {

	            //finds the item to be sold in the database and updates its quantity and numTimesSold field based on the quantity being sold

	            product.quantity -= item.cartQuantity;
							product.numTimesSold += item.cartQuantity;

	            //resets the product's cartQuantity to 1
	            product.cartQuantity = 1;
	            return product.save();
	        });
	    }))
	    .then(() => {

	        const saleDate = new Date(); //pulls the current date the sale is made on (right now)

	        const saleMinutes = saleDate.getMinutes(); //num 0-59
	        const saleHour = saleDate.getHours(); //num 0-23
	        const saleDay = saleDate.getDate(); //num 1-31
	        const saleMonth = saleDate.getMonth(); //num 0-11
	        const saleYear = saleDate.getFullYear(); //four digit num yyyy

	        sale.date.minutes = saleMinutes;
	        sale.date.hour = saleHour;
	        sale.date.day = saleDay;
	        sale.date.month = saleMonth;
	        sale.date.year = saleYear;

	        //saves and returns the sale
	        return sale.save();
	    })
	    .then(() => {
	        return res.status(200).json(sale);
	    })
	    .catch(next);
	});



  //Fetches all sales based on their owner
	app.get('/fetchSales/:userId', function(req, res, next) {

		Sale
		.find({ owner: req.params.userId })
		.exec(function(err, sales) {

			//check for error
			if (err) { return next(err); }

			// Before sending sales to client, sort by created_at date
			// return newest to oldest
			const sortedSalesByDate = sales.sort((a,b) => {
				const keyA = new Date(a.created_at),
        keyB = new Date(b.created_at);
		    // Compare the 2 created_at dates
		    if (keyA < keyB) return -1;
		    if (keyA > keyB) return 1;
    		return 0;
			});

			res.status(200).json(sortedSalesByDate);

		});

	});



  //Enter params to search created at date
	app.get('/fetchSalesByDate/:userId/:startDate/:endDate', function(req, res, next) {

		var userId = req.params.userId;
		//These dates are objects
		var startDate = req.params.startDate;
		var endDate = req.params.endDate;

		Sale
		.find({ owner: userId, created_at: { $gte: startDate, $lt: endDate}})
		.exec(function(err, sales) {

			// check for error
			if (err) { return next(err); }

			// Before sending sales to client, sort by created_at date
			// return newest to oldest
			const sortedSalesByDate = sales.sort((a,b) => {
				const keyA = new Date(a.created_at),
        keyB = new Date(b.created_at);
		    // Compare the 2 dates
		    if (keyA < keyB) return 1;
		    if (keyA > keyB) return -1;
    		return 0;
			});

			res.status(200).json(sortedSalesByDate);

		});

	});



	//Fetches a single sale based on its Id
	app.get('/fetchSale/:saleId', function(req, res, next) {

		Sale
		.findById(req.params.saleId)
		.exec(function(err, sale) {

			// check for error
			if (err) { return next(err); }

			res.status(200).json(sale);

		});

	});



  // deletes 1 Sale by ID
	app.delete(`/undoSale/:saleId`, function(req, res, next) {

		Sale
		.findByIdAndRemove(req.params.saleId, (err, deletedSale) => {
			if (err) { return next(err); }
			res.status(200).json(deletedSale);
		});

	});









}
