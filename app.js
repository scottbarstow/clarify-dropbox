'use strict';

var express = require('express');
var path = require('path');
var http = require('http');
var https = require('https');
var fs = require('fs');
var routes = require('./routes/index');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config');
var passport = require('passport');
var session = require('express-session');
var logger = require('morgan');

mongoose.connect(config.mongodb.URI);

require('./middleware/passport')();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(session({ secret: config.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


var sslOptions = {
  key: fs.readFileSync('config/ssl/key.pem'),
  cert: fs.readFileSync('config/ssl/cert.pem')
};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(sslOptions, app);

var io = require('socket.io')(httpsServer);
var broker = require('./brokers/records_broker');

app.set('io', io);
io.on('connection', function(socket){
  broker.authorize(socket);
  socket.io = io;
});


httpServer.listen(3000);
httpsServer.listen(3443);
module.exports = app;
