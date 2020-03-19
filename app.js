var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiBase = require('./routes/apiBase');
var books =require('./routes/books');
var personRouter =require('./routes/persons');
var organisationRouter =require('./routes/organisations');

var config_data = require('./config/config.development.json')
const APP_BASE_ROUTE = config_data.APP_BASE_ROUTE

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config_data.db_server, { useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

app.use(cors());

app.use(APP_BASE_ROUTE + '/books', books);
app.use(APP_BASE_ROUTE + '/users', usersRouter);
app.use(APP_BASE_ROUTE + '/persons', personRouter);
app.use(APP_BASE_ROUTE + '/organisations', organisationRouter);
app.use(APP_BASE_ROUTE , apiBase);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
