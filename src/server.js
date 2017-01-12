// +++
// Dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// +++
// Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// +++
// Standard Middlewares
app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico'))); //set up for production + dev
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// +++
// Webpack Dev Middlewares
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackDevConfig = require('./config/webpack.dev.config');
var compiler = webpack(webpackDevConfig);
app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    stats: {colors: true}
}));

// +++
// Routes
var routes = require('./routes/index');
app.use('/', routes);

// +++
// Handle Errors
// 404 -> Error Handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// development error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
