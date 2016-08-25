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




  //reset employee's password in database
  app.post('/resetEmployeePassword/:token', function(req, res) {

    async.waterfall([
      function(done) {

        Employee.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, employee) {
          if (!employee) {
            res.status(401).json("Reset token may have expired");
          }

          employee.password = req.body.password;
          employee.resetPasswordToken = undefined;
          employee.resetPasswordExpires = undefined;

          employee.save(function(err) {
            if (err) { next(err); }
            done(err, employee);
          });
        });

      },
      function(employee, done) {
        var smtpTransport = nodemailer.createTransport('SMTP', {
          service: 'SendGrid',
          auth: {
            user: 'marcushurney@gmail.com',
            pass: 'jisuanqiRen90'
          }
        });
        var mailOptions = {
          to: employee.email,
          from: 'marcushurney@gmail.com',
          subject: 'Your password has been changed',
          text: 'Hello, ' +
            'This is a confirmation that the password for your account ' + employee.email + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          done(err);
        });
      }
    ], function(err) {
      res.status(200).json("Your password has been successfully reset!");
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


}
