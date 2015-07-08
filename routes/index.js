'use strict';

var express = require('express');
var router = express.Router();
var records = require('../controllers/records_controller');
var users = require('../controllers/users_controller');
var passport = require('passport');

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
};

router.get('/', function(req, res){
  records.index(req, res);
});

router.post('/search', function(req, res){
  records.search(req, res);
});

router.get('/search', ensureAuthenticated, function(req, res){
  res.render('records/search')
});


router.get('/new', ensureAuthenticated, function(req, res){
  res.render('records/new');
});

router.post('/new', ensureAuthenticated, function(req, res){
  records.add(req, res);
});

router.post('/notify', function(req, res){
  records.notify(req, res);
});

router.get('/show/:id', function(req, res){
  records.show(req, res);
});

router.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login'}), function(req, res){
  res.redirect('/');
});





module.exports = router;