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




  app.get('/loadTodaysTopItems/:userId', function(req, res, next) {

		var startOfToday = moment().startOf('day');
		var endOfToday = moment().endOf('day');

		//loads all sales belonging to a user that were made today
		Sale
		.find({ owner: req.params.userId, created_at: { $gte: startOfToday, $lt: endOfToday}})
		.exec(function(err, todaysSales) {


			if (err) { return next(err); } //check for error

			var todaysItems = [];

			//iterates over today's sales
			todaysSales.map(sale => {
			//each sale has a key called "items" which is an array of items (the items are objects)
			//map over that array and add each item to today's items array
				sale.items.map(item => {
					todaysItems.push(item);
				});
			});

			var occurrences = {};

			//populate occurrences with a key equal to a product's id in the database
			//Then track how many times that item was sold this week based on the item's cartQuantity key

			todaysItems.forEach((item) => {
				if (!occurrences[item.itemId]) {
					occurrences[item.itemId] = { item, occurrences: item.cartQuantity };
				} else {
					occurrences[item.itemId].occurrences += item.cartQuantity;
				}
			});

			//return a new sorted array of items sold this month
			//objects in the array will have an item property which holds the item's data
			//and an occurrences property which is how many times the item was sold this month

			var todaysTopItemsBySaleFrequency = Object.keys(occurrences).map(itemId => ({
				item: occurrences[itemId].item,
				occurrences: occurrences[itemId].occurrences
			})).sort((a, b) => b.occurrences - a.occurrences);

			res.status(200).json(todaysTopItemsBySaleFrequency);


		});

	});



  app.get('/loadWeeksTopItems/:userId', function(req, res, next) {

		var endOfToday = moment().endOf('day');
		var sevenDaysAgo = moment(endOfToday).subtract(7, 'days');

		//loads all sales belonging to a single user
		Sale
		.find({ owner: req.params.userId, created_at: {$gte: sevenDaysAgo, $lt: endOfToday} })
		.exec(function(err, weeksSales) {


			if (err) { return next(err); } //check for error

			var weeksItems = [];

			//iterates over weeksSales sales in order to pull the items from each sale
			weeksSales.map(sale => {
				//each sale has a key called "items" which is an array of items(products) (the items are objects)
				//map over that array and add each item to weeksItems array
				sale.items.map(item => {
					weeksItems.push(item);
				});
			});

			var occurrences = {};

			//populate occurrences with a key equal to a product's id in the database
			//Then track how many times that item was sold this week based on the item's cartQuantity key

			weeksItems.forEach((item) => {
				if (!occurrences[item.itemId]) {
					occurrences[item.itemId] = { item, occurrences: item.cartQuantity };
				} else {
					occurrences[item.itemId].occurrences += item.cartQuantity;
				}
			});



			//return a new sorted array of items sold this month
			//objects in the array will have an item property which holds the item's data
			//and an occurrences property which is how many times the item was sold this month

			var weeksTopItemsBySaleFrequency = Object.keys(occurrences).map(itemId => ({
				item: occurrences[itemId].item,
				occurrences: occurrences[itemId].occurrences
			})).sort((a, b) => b.occurrences - a.occurrences);

			res.status(200).json(weeksTopItemsBySaleFrequency);

		});

	});



  app.get('/loadMonthsTopItems/:userId', function(req, res, next) {

		var startOfMonth = moment().startOf('month');
		var endOfMonth = moment().endOf('month');

		//loads all sales belonging to a single user
		Sale
		.find({ owner: req.params.userId, created_at: {$gte: startOfMonth, $lt: endOfMonth}})
		.exec(function(err, monthsSales) {


			if (err) { return next(err); } //check for error

			var monthsItems = [];

			//iterates over monthsSales sales in order to pull the items from each sale
			monthsSales.map(sale => {
				//each sale has a key called "items" which is an array of items(products) (the items are objects)
				//map over that array and add each item to monthsItems array
				sale.items.map(item => {
					monthsItems.push(item);
				});
			});

			var occurrences = {};

			//populate occurrences with a key equal to a product's id in the database
			//Then track how many times that item was sold this week based on the item's cartQuantity key

			monthsItems.forEach((item) => {
				if (!occurrences[item.itemId]) {
					occurrences[item.itemId] = { item, occurrences: item.cartQuantity };
				} else {
					occurrences[item.itemId].occurrences += item.cartQuantity;
				}
			});

			//return a new sorted array of items sold this month
			//objects in the array will have an item property which holds the item's data
			//and an occurrences property which is how many times the item was sold this month

			var monthsTopItemsBySaleFrequency = Object.keys(occurrences).map(itemId => ({
				item: occurrences[itemId].item,
				occurrences: occurrences[itemId].occurrences
			})).sort((a, b) => b.occurrences - a.occurrences);

			res.status(200).json(monthsTopItemsBySaleFrequency);

		});

	});



  //returns today's revenue and an array of all items sold today
	app.get('/loadTodaysRevenue/:userId', function(req, res, next) {

		//set today's date data for filtering
		var currentDate = new Date();
		var currentDay = currentDate.getDate();
		var currentMonth = currentDate.getMonth();
		var currentYear = currentDate.getFullYear();

		var todaysSalesInfo = {
			todaysTotalRevenue: 0,
			todaysSales: []
		};

		//fetch all salles for user

		Sale
		.find({ owner: req.params.userId })
		.exec(function(err, allSales) {

			if (err) { return next(err); } //check for error

			allSales.map(sale => {
				//checks the date key of each sale to see if it matches today's date
				if (sale.date.day === currentDay && sale.date.month === currentMonth && sale.date.year === currentYear) {

					todaysSalesInfo.todaysTotalRevenue += sale.total; //Adds each sale's total revenue per interation
					todaysSalesInfo.todaysSales.push(sale);

				} else {return;}

			});

			res.status(200).json(todaysSalesInfo);

		});

	});

	app.get('/loadEveryMonthsRevenue/:userId', function(req, res, next) {

		//set today's date data for filtering
		var currentDate = new Date();
		var currentMinutes = currentDate.getMinutes();
		var currentHour = currentDate.getHours();
		var currentDay = currentDate.getDate();
		var currentMonth = currentDate.getMonth();
		var currentYear = currentDate.getFullYear();

		Sale
		.find({ owner: req.params.userId })
		.exec(function(err, allSales) {

			if (err) { return next(err); } //check for error

			var janRevenue = 0;
			var febRevenue = 0;
			var marchRevenue = 0;
			var aprilRevenue = 0;
			var mayRevenue = 0;
			var juneRevenue = 0;
			var julyRevenue = 0;
			var augRevenue = 0;
			var septRevenue = 0;
			var octRevenue = 0;
			var novRevenue = 0;
			var decRevenue = 0;

			allSales.map(sale => {

				if (sale.date.year === currentYear) {
					//checks each sale's date property to see which month sale was made during and adds to variables above
					if (sale.date.month === 0) { janRevenue += sale.total; }
					else if (sale.date.month === 1) { febRevenue += sale.total; }
					else if (sale.date.month === 2) { marchRevenue += sale.total; }
					else if (sale.date.month === 3) { aprilRevenue += sale.total; }
					else if (sale.date.month === 4) { mayRevenue += sale.total; }
					else if (sale.date.month === 5) { juneRevenue += sale.total; }
					else if (sale.date.month === 6) { julyRevenue += sale.total; }
					else if (sale.date.month === 7) { augRevenue += sale.total; }
					else if (sale.date.month === 8) { septRevenue += sale.total; }
					else if (sale.date.month === 9) { octRevenue += sale.total; }
					else if (sale.date.month === 10) { novRevenue += sale.total; }
					else if (sale.date.month === 11) { decRevenue += sale.total; }

				} else { return; }

			});

			//format data for google charts in AllMonthsRevenueChart
			//since it will be sent as JSON, it will need to be tweaked again in AllMonthsRevenueChart.jsx

			var dataRowsForMonthRevenue = [
				[new Date(currentYear, 0, 1, 23, 59), janRevenue],
				[new Date(currentYear, 1, 1, 23, 59), febRevenue],
				[new Date(currentYear, 2, 1, 23, 59), marchRevenue],
				[new Date(currentYear, 3, 1, 23, 59), aprilRevenue],
				[new Date(currentYear, 4, 1, 23, 59), mayRevenue],
				[new Date(currentYear, 5, 1, 23, 59), juneRevenue],
				[new Date(currentYear, 6, 1, 23, 59), julyRevenue],
				[new Date(currentYear, 7, 1, 23, 59), augRevenue],
				[new Date(currentYear, 8, 1, 23, 59), septRevenue],
				[new Date(currentYear, 9, 1, 23, 59), octRevenue],
				[new Date(currentYear, 10, 1, 23, 59), novRevenue],
				[new Date(currentYear, 11, 1, 23, 59), decRevenue]
			];

			//To display the total revenue for the user's current month as it is still in progress,
			//the data must be more specific to day and time at which revenue for the month is calculated
			//hence currentDay, currentHour, and currentMinutes are added.

			//gives accurate hour and minutes for today, but messes chart appearance
			// dataRowsForMonthRevenue[currentMonth][0] = new Date(currentYear, currentMonth, currentDay, currentHour, currentMinutes);

			res.status(200).json(dataRowsForMonthRevenue);

		});

	});

	app.get('/loadThisWeeksRevenue/:userId', function(req, res, next) {

		var startOfToday = moment().startOf('day');
		var endOfToday = moment().endOf('day');
		var oneDayAgo = moment(startOfToday).subtract(1, 'days');
		var twoDaysAgo = moment(startOfToday).subtract(2, 'days');
		var threeDaysAgo = moment(startOfToday).subtract(3, 'days');
		var fourDaysAgo = moment(startOfToday).subtract(4, 'days');
		var fiveDaysAgo = moment(startOfToday).subtract(5, 'days');
		var sixDaysAgo = moment(startOfToday).subtract(6, 'days');
		var sevenDaysAgo = moment(startOfToday).subtract(7, 'days');

		//set variables for the past 7 days revenue
		var sevenDaysAgoRevenue = 0;
		var sixDaysAgoRevenue = 0;
		var fiveDaysAgoRevenue = 0;
		var fourDaysAgoRevenue = 0;
		var threeDaysAgoRevenue = 0;
		var twoDaysAgoRevenue = 0;
		var oneDayAgoRevenue = 0;
		var todaysRevenue = 0;

		parallel([
			function(callback) {
				//Calculate 7 days ago revenue
				Sale
				.find({ owner: req.params.userId, created_at: {$gte: sevenDaysAgo, $lt: sixDaysAgo} })
				.exec(function(err, sales) {

					if (err) { return callback(err); } //check for error

					sales.map(sale => {
						sevenDaysAgoRevenue += sale.total;
					});
					callback();
				});
			},
			function(callback) {
				//Calculate 6 days ago revenue
				Sale
				.find({ owner: req.params.userId, created_at: {$gte: sixDaysAgo, $lt: fiveDaysAgo} })
				.exec(function(err, sales) {

					if (err) { return callback(err); } //check for error

					sales.map(sale => {
						sixDaysAgoRevenue += sale.total;
					});
					callback();
				});
			},
			function(callback) {
				//Calculate 5 days ago revenue
				Sale
				.find({ owner: req.params.userId, created_at: {$gte: fiveDaysAgo, $lt: fourDaysAgo} })
				.exec(function(err, sales) {

					if (err) { return callback(err); } //check for error

					sales.map(sale => {
						fiveDaysAgoRevenue += sale.total;
					});
					callback();
				});
			},
			function(callback) {
				//Calculate 4 days ago revenue
				Sale
				.find({ owner: req.params.userId, created_at: {$gte: fourDaysAgo, $lt: threeDaysAgo} })
				.exec(function(err, sales) {

					if (err) { return callback(err); } //check for error

					sales.map(sale => {
						fourDaysAgoRevenue += sale.total;
					});
					callback();
				});
			},
			function(callback) {
				//Calculate 3 days ago revenue
				Sale
				.find({ owner: req.params.userId, created_at: {$gte: threeDaysAgo, $lt: twoDaysAgo} })
				.exec(function(err, sales) {

					if (err) { return callback(err); } //check for error

					sales.map(sale => {
						threeDaysAgoRevenue += sale.total;
					});

					callback();

				});
			},
			function(callback) {
				//Calculate 2 days ago revenue
				Sale
				.find({ owner: req.params.userId, created_at: {$gte: twoDaysAgo, $lt: oneDayAgo} })
				.exec(function(err, sales) {

					if (err) { return callback(err); } //check for error

					sales.map(sale => {
						twoDaysAgoRevenue += sale.total;
					});

					callback();

				});
			},
			function(callback) {
				//Calculate 1 day ago revenue
				Sale
				.find({ owner: req.params.userId, created_at: {$gte: oneDayAgo, $lt: startOfToday} })
				.exec(function(err, sales) {

					if (err) { return callback(err); } //check for error

					sales.map(sale => {
						oneDayAgoRevenue += sale.total;
					});

					callback();

				});
			},
			function(callback) {
				//Calculate today's revenue
				Sale
				.find({ owner: req.params.userId, created_at: { $gte: startOfToday, $lt: endOfToday}})
				.exec(function(err, sales) {

					if (err) { return callback(err); } //check for error

					sales.map(sale => {
						todaysRevenue += sale.total;
					});

					callback();

				});
			}
		], function(err, results) {

			if (err) { res.status(400).send(err); }

			var dataRowsForWeeksRevenue = [
				[new Date(sevenDaysAgo), sevenDaysAgoRevenue],
				[new Date(sixDaysAgo), sixDaysAgoRevenue],
				[new Date(fiveDaysAgo), fiveDaysAgoRevenue],
				[new Date(fourDaysAgo), fourDaysAgoRevenue],
				[new Date(threeDaysAgo), threeDaysAgoRevenue],
				[new Date(twoDaysAgo), twoDaysAgoRevenue],
				[new Date(oneDayAgo), oneDayAgoRevenue],
				[new Date(startOfToday), todaysRevenue]
			];

			res.status(200).json(dataRowsForWeeksRevenue);
		});

	});



}
