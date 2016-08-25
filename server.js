//to run: 'npm run dev' -- serves with nodemon
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

// require routers (API endpoints)
const authRouter = require('./routers/authRouter');
const employeeRouter = require('./routers/employeeRouter'); //testing
const productsRouter = require('./routers/productsRouter');
const salesRouter = require('./routers/salesRouter');
const reportingRouter = require('./routers/reportingRouter');


const mongoose = require('mongoose');
const config = require('./config.js');
const webpack = require('webpack');
const path = require('path');

// DB Setup for mlab

mongoose.connect(config.database, function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log("Connected to the database");
	}
});

// Connects to local database

// mongoose.connect('mongodb://localhost:auth/auth');

// App Setup

app.use(morgan('combined')); //logs incoming requests

app.use(bodyParser.json({ type: '*/*' })); //parses incoming requests into JSON, '*/*' accepts any type of request

app.use(express.static(__dirname + '/public')); //serves public folder containing front-end

authRouter(app); //loads in API endpoints from router.js
employeeRouter(app); //testing
productsRouter(app); //testing
salesRouter(app);
reportingRouter(app);


app.get('/', function (req, res) {

    res.send(__dirname + '/public/index.html'); //serves index.html when home route is hit

});

app.get('*', function (req, res) {
	res.sendFile(path.resolve(__dirname + '/public/index.html'));
});



//Server Setup

const PORT = process.env.PORT || 3000;

//Define http server below and set up

const SERVER = http.createServer(app); //creates an http server that can receive requests and forward them to app (express())

SERVER.listen(PORT, function() {
	console.log('Server listening on port:', PORT);
});
