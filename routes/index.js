'use strict';

var express = require('express');
var router = express.Router();
var records = require('../controllers/records_controller');
var users = require('../controllers/users_controller');

router.get('/', function(req, res){
  records.index(req, res);
});

router.post('/search', function(req, res){
  records.search(req, res);
});

router.get('/search', function(req, res){
  res.render('records/search')
});


router.get('/new', function(req, res){
  res.render('records/new');
});

router.post('/new', function(req, res){
  records.add(req, res);
});

router.post('/notify', function(req, res){
  records.notify(req, res);
});

router.get('/show/:id', function(req, res){
  records.show(req, res);
});

router.post('/sign_in', users.sign_in);



module.exports = router;