
// require javascript helper libraries
const _ = require('underscore');
const faker = require('faker');
const moment = require('moment');
const async = require('async');
const parallel = require('async/parallel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const __ = require('lodash');

// require mongoose models
const User = require('./models/user');
const Employee = require('./models/employee');
const Product = require('./models/product');
const Sale = require('./models/sale');

// require passport.js services
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// import passport jwt strategies
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app) {

	app.post('/login', requireLogin, Authentication.login);
	// Before the user can actually log in (Authentication.login)
  // the passwords are compared in the local stratgey requireSignin

  //This middleware is using the authentication controller in authentication.js, not passport
	app.post('/signup', Authentication.signup);

	// forgot password route, assigns user a reset token and sends email
	// email will contain a link to the '/reset/:token' route below
	app.post('/forgotPassword', function(req, res, next) {

		async.waterfall([
			function(done) {
				crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
		},
		function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          res.status(404).json("No user with that email exists");
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
		function(token, user, done) {
		    var smtpTransport = nodemailer.createTransport('SMTP', {
		      service: 'SendGrid',
		      auth: {
		        user: 'marcushurney',
		        pass: 'jisuanqiRen90'
		      }
		    });
		    var mailOptions = {
		      to: user.email,
		      from: 'marcushurney@gmail.com',
		      subject: 'Node.js Password Reset',
		      text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
		        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
		        'http://' + req.headers.host + '/forgot/' + token + '\n\n' +
		        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
		    };
		  	smtpTransport.sendMail(mailOptions, function(err) {
		    	done(err, 'done');
		  	});
    	}
		], function(err) {
			if (err) return next(err);
			res.status(200).json("Email sent");
		})

	});

	// POST resetPassword route actually changes the user's password in the database
	app.post('/resetPassword/:token', function(req, res) {

	  async.waterfall([
	    function(done) {
	      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
	        if (!user) {
	          res.status(401).json("Reset token may have expired");
	        }

	        user.password = req.body.password;
	        user.resetPasswordToken = undefined;
	        user.resetPasswordExpires = undefined;

	        user.save(function(err) {
	          if (err) { next(err); }
						done(err, user);
	        });
	      });
	    },
	    function(user, done) {
	      var smtpTransport = nodemailer.createTransport('SMTP', {
	        service: 'SendGrid',
	        auth: {
	          user: 'marcushurney@gmail.com',
	          pass: 'jisuanqiRen90'
	        }
	      });
	      var mailOptions = {
	        to: user.email,
	        from: 'marcushurney@gmail.com',
	        subject: 'Your password has been changed',
	        text: 'Hello, ' +
	          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
	      };
	      smtpTransport.sendMail(mailOptions, function(err) {
	        done(err);
	      });
	    }
	  ], function(err) {
	    res.status(200).json("Your password has been successfully reset!");
	  });
});


	// fetchUser will return the user based on the jwt that is currently stored in localStorage
	// that user is found in the middleware requireAuth and returned ont he req object
	app.get('/fetchUser', requireAuth, function(req, res, next) {
		res.json(req.user);
	});

	// if the employees email and password match email and encrypted password in DB
	// returns employee
	app.post('/loginEmployee', function(req, res, next) {
		var employeeEmail = req.body.employeeLoginData.employeeEmail;
		var employeePassword = req.body.employeeLoginData.employeePassword;
		// find employee by email
		Employee.findOne({ email: employeeEmail }, function(err, employee) {

			if (err) { return next(err); } //Error in system

			// Could not find a employee based on the given email and password
			if (!employee) { return res.status(401).json("Incorrect email or password"); }

			// compare password - is password in DB equal to password supplied at login?
			// compares encrypted password in database by first encrypting
			// the password supplied with login (plus salting it).
			employee.comparePassword(employeePassword, function(err, isMatch) {

				if (err) { return next(err); } //error in system

				//isMatch is false
				if (!isMatch) { return res.status(401).json("Incorrect email or password"); }

				return res.status(200).json(employee);
				// found employee because isMatch is true ***IMPORTANT: "done" returns the existing employee
				// in the req object - req.employee which will be used in the signIn strategy

			});

		});
	});

	// fetches all employees that belong to the active user (administrator)
	app.get('/fetchAllEmployees/:userId', function(req, res, next) {

		Employee
		.find({ administrator: req.params.userId })
		.exec(function(err, employees) {

			//check for error
			if (err) { return next(err); }

			res.status(200).json(employees);

		});
	});

	// add a new employee route
	app.post('/addNewEmployee', function(req, res, next) {

		const employee = new Employee();

		employee.administrator = req.body.adminId; // this will be the activeUser's ID in REDUX state
		employee.name = req.body.employeeName;
		employee.email = req.body.employeeEmail;
		employee.password = req.body.employeePassword;
		employee.position = req.body.employeePosition;
		employee.save();

		// find the logged in user who is adding a new employee
		User.findById(req.body.adminId).then((user) => {
			// push the new employee onto the user's employee's array
			user.employees.push(employee._id);
			// save the user's updated data
			user.save();
			// return the newly created employee
			return res.status(200).json(employee);
		}, (err) => {
			return next(err);
		});

	});

	app.put('/editExistingEmployee', function(req, res, next) {

		Employee.findById(req.body._id).then(employee => {

			employee.name = req.body.name;
			employee.email = req.body.email;
			employee.position = req.body.position;

			employee.save(function(err) {
				// check for save err
				if (err) { return next(err); }
				// return the employee with updated info
				res.status(200).json(employee);
			});

		})
		.catch(err => {
			// check for err finding employee
			res.status(404).json(err);
		});
	});

	app.get('/employeeTodayRevenue/:employeeId', function(req, res, next) {

		const startOfToday = moment().startOf('day');
	 	const endOfToday = moment().endOf('day');

		//loads all sales belonging to an employee that were made today
		Sale
		.find({ soldByEmployee: req.params.employeeId, created_at: { $gte: startOfToday, $lt: endOfToday}})
		.exec(function(err, todaysSales) {

			if (err) { return next(err); } //check for error

			var todaysSalesData = {
				todaysRevenue: 0,
				numSales: 0
			};

			todaysSales.map(sale => {
				todaysSalesData.todaysRevenue += sale.total;
				todaysSalesData.numSales++;
			});

			res.status(200).json(todaysSalesData);

		});

	});

	// returns a single employee from database based on employee's id
	app.get('/fetchSingleEmployee/:employeeId', function(req, res, next) {
		Employee.findById(req.params.employeeId).then(employee => {
			// return employee object
			res.status(200).json(employee);
		}, (err) => {
			// return 404 and error object
			res.status(404).json(err);
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

	//Creates 30 new products under a specific category entered in as a url parameter for testing purposes
	app.post('/addProducts/:category', function(req, res, next) {


			for (var i = 0; i < 30; i++) {

				var product = new Product();
				product.name = faker.commerce.productName();
				product.category = req.params.category;
				product.price = faker.commerce.price();
				product.quantity = 200;
				product.description = "Default product description";

				product.save();
			}

			return res.json("products created");

	});

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



	app.delete(`/deleteProduct/:productId`, function(req, res, next) {

		Product
		.findByIdAndRemove(req.params.productId, (err, deletedProduct) => {
			if (err) { return next(err); }
			res.status(200).json(deletedProduct);
		});

	});

	// deletes 1 employee by ID
	app.delete(`/deleteEmployee/:employeeId`, function(req, res, next) {
		Employee
		.findByIdAndRemove(req.params.employeeId, (err, deletedEmployee) => {
			if (err) { return next(err); }
			res.status(200).json(deletedEmployee);
		});
	});

	app.delete(`/undoSale/:saleId`, function(req, res, next) {

		Sale
		.findByIdAndRemove(req.params.saleId, (err, deletedSale) => {
			if (err) { return next(err); }
			res.status(200).json(deletedSale);
		});

	});

	app.post('/createThousand', function (req, res, next) {

		__.times(1000, (index) => {

			var product = new Product();

			if (index % 2 === 0) {
				product.category = 'herbal';
			} else if (index % 3 === 0) {
				product.category = 'pharmaceutical';
			} else {
				product.category = "consumer";
			}

			product.owner = '573a02d8fd05850b05adf26d';
			product.name = faker.commerce.productAdjective();
			product.subCategory = faker.commerce.productAdjective();
			product.brand = faker.commerce.productAdjective();
			product.tax = 10;
			product.interactions = "Do not take with alcohol";
			product.healthConditions = "Check with your physician";
			product.locationOfProduct = faker.commerce.productAdjective();
			product.manufacturer = faker.commerce.productAdjective();
			product.manufacturerCountry = faker.commerce.productAdjective();
			product.ingredients = faker.commerce.productAdjective();
			product.price = 115;
			product.dosageForm = faker.commerce.productAdjective();
			product.typeOfProduct = faker.commerce.productAdjective();
			product.quantity = 500;
			product.description = "Enter product description here";
			product.save();

		});

	});

	app.post('/createThreeHundred', function (req, res, next) {

		__.times(300, (index) => {

			var product = new Product();


			product.category = "OTC";
			product.owner = '573a02d8fd05850b05adf26d';
			product.name = faker.commerce.productAdjective();
			product.subCategory = faker.commerce.productAdjective();
			product.brand = faker.commerce.productAdjective();
			product.tax = 10;
			product.interactions = "Do not take with alcohol";
			product.healthConditions = "Check with your physician";
			product.locationOfProduct = faker.commerce.productAdjective();
			product.manufacturer = faker.commerce.productAdjective();
			product.manufacturerCountry = faker.commerce.productAdjective();
			product.ingredients = faker.commerce.productAdjective();
			product.price = 115;
			product.dosageForm = faker.commerce.productAdjective();
			product.typeOfProduct = faker.commerce.productAdjective();
			product.quantity = 500;
			product.description = "Enter product description here";
			product.save();

		});

	});













































}
