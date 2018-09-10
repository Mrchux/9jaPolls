var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser'); //Use to session ID in browser
var path = require('path');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');


var app = express();
var configDB = require('./config/database.js');

//Experience my first localhost not resolving to 127.0.0.1 on windows, so i changed mongodb://localhost:27017/test to mongodb://127.0.0.1:27017/test
mongoose.connect(configDB.url, configDB.options);

//DB connections
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

db.on('error', function(err) {
		console.error(err);
    console.log('Could not connect to the database. Exiting now...');
    //process.exit();
	});

db.once('open', function() {
  // we're connected!
	console.log("Successfully connected to the database");

});

//urlencoded used to extract data from html form
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser('secret'));
//app.use(session({cookie: { maxAge: 60000 }}));
app.use(require('express-session')({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

//Instruct Express to use passport to create and put data into session
app.use(passport.initialize());
app.use(passport.session());

//Tell Express where our static files are (css, js)
app.use(express.static(path.join(__dirname, 'public')));

//View Engine Setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

require('./app/routes')(app, passport);


//Listening Port
var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log('Server started on port ' + port);
});
