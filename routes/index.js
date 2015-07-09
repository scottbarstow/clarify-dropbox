'use strict';

var express = require('express');
var router = express.Router();
var records = require('../controllers/records_controller');
var passport = require('passport');

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/sign_in');
};

router.get('/', ensureAuthenticated, function(req, res){
  records.index(req, res);
});

router.post('/search', ensureAuthenticated, function(req, res){
  records.search(req, res);
});

router.get('/search', ensureAuthenticated, function(req, res){
  res.render('records/search', {user: req.user})
});


router.get('/new', ensureAuthenticated, function(req, res){
  res.render('records/new', {user: req.user});
});

router.post('/new', ensureAuthenticated, function(req, res){
  records.add(req, res);
});

router.post('/notify', function(req, res){
  records.notify(req, res);
});

router.get('/show/:id', ensureAuthenticated, function(req, res){
  records.show(req, res);
});

router.get('/sign_in', function(req, res){
  res.render('sign_in', { user: req.user });
});

router.post('/sign_in', passport.authenticate('local', { failureRedirect: '/sign_in'}), function(req, res){
  res.redirect('/');
});

router.get('/auth/dropbox',
  passport.authenticate('dropbox'),
  function(req, res){
  });

router.get('/auth/dropbox/callback',
  passport.authenticate('dropbox', { failureRedirect: '/sign_in' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/sign_out', function(req, res){
  req.logout();
  res.redirect('/');
});


module.exports = router;