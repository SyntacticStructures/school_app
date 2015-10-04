// require express so that we can build an express app
var express = require('express');
var io = require('socket.io');
var path = require('path');
var formidable = require('formidable');
var util = require('util');
var fs = require('fs-extra');
var qt = require('quickthumb');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');
var app = express();
app.use(bodyParser.json());
app.use(session({secret:'taylor'}));
app.use(qt.static(__dirname + '/'));
app.use(express.static(path.join(__dirname, '../client')));
// This goes in our server.js file so that we actually use the mongoose config file!
// set up a static file server that points to the "client" directory
require('./config/mongoose.js');
require('./config/routes.js')(app);


app.listen(8000, function() {
	console.log('School App on: 8000');
});