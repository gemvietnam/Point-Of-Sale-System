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




  // deletes 1 product by ID
	app.delete(`/deleteProduct/:productId`, function(req, res, next) {

		Product
		.findByIdAndRemove(req.params.productId, (err, deletedProduct) => {
			if (err) { return next(err); }
			res.status(200).json(deletedProduct);
		});

	});




  //Returns all products based on their category  also checks for query parameter for pulling products by name
	app.get('/products/:category', function(req, res, next) {

		var queryParams = req.query;
		var filteredProducts;

			Product
			.find({ category: req.params.category })
			.exec(function(err, products) {

				filteredProducts = products;

				if (err) { return next(err); }

				if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {

					filteredProducts = _.filter(products, function(product) {
						return product.name.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
					}); //The filteredProducts array will only contain product objects where the name contains the queryParameter.q
						//If the conditional attached to the return statement returns true, then the single product item it's checking gets added to filteredProducts array
				}

				const productsAscendingOrder = filteredProducts.sort((a, b) => {
					return b.numTimesSold - a.numTimesSold;
				});

				res.status(200).json(productsAscendingOrder);

			});
	});




	app.get('/fetchAllProducts', function(req, res, next) {

		var queryParams = req.query;
		var filteredProducts;


			Product
			.find()
			.exec(function(err, products) {

				filteredProducts = products;

				if (err) { return next(err); }

				if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {

					filteredProducts = _.filter(products, function(product) {
						return product.name.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
					}); // The filteredProducts array will only contain product objects where the name contains the queryParameter.q
						 // If the conditional attached to the return statement returns true,
						// then the single product item it's checking gets added to filteredProducts array
				}

				const productsAscendingOrder = filteredProducts.sort((a, b) => {
					return b.numTimesSold - a.numTimesSold;
				});

				res.status(200).json(productsAscendingOrder);

			});

	});




	// Returns a single product from the database based on id
	app.get('/fetchSingleProduct/:id', function(req, res, next) {

		Product.findById(req.params.id)
		.then((product)=> {
			res.json(product);
		}, (error) => {
			return next(error);
		});

	});




  //This route updates an existing product's data
	app.put('/editProduct', function(req, res, next) {

		Product.findById(req.body.productId).then((product) => {

			product.name = req.body.name;
			product.category = req.body.category;
			product.subCategory = req.body.subCategory;
			product.brand = req.body.brand;
			product.locationOfProduct = req.body.locationOfProduct;
			product.manufacturer = req.body.manufacturer;
			product.manufacturerCountry = req.body.manufacturerCountry;
			product.ingredients = req.body.ingredients;
			product.price = req.body.price;
			product.dosageForm = req.body.dosageForm;
			product.typeOfProduct = req.body.typeOfProduct;
			product.quantity = req.body.quantity;
			product.description = req.body.description;

			return product.save(function(err) {
				if (err) { return next(err); }
				return res.status(200).json(product); //Returns the sale so that it can be used in the sale_reducer.js
			});
		});

	});




	//creates a new product
	app.post('/createProduct', function(req, res, next) {

		var product = new Product();


		//This is the exact order in which the product model is defined in
		//models/product.js and also the exact order a new product's info is entered
		//in NewProductForm.js

		product.owner = req.body.owner;
		product.name = req.body.name;
		product.category = req.body.category;
		product.subCategory = req.body.subCategory;
		product.tax = req.body.tax;
		product.interactions = req.body.interactions;
		product.healthConditions = req.body.healthConditions;
		product.brand = req.body.brand;
		product.locationOfProduct = req.body.locationOfProduct;
		product.manufacturer = req.body.manufacturer;
		product.manufacturerCountry = req.body.manufacturerCountry;
		product.ingredients = req.body.ingredients;
		product.price = req.body.price;
		product.dosageForm = req.body.dosageForm;
		product.typeOfProduct = req.body.typeOfProduct;
		product.quantity = req.body.quantity;
		product.description = req.body.description;


		product.save();

		return res.json("A new custom product was created");

	});








}
