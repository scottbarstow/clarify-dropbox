'use strict';

var express = require('express'),
  router = express.Router(),
  records = require('../controllers/records_controller');


router.get('/', function(req, res){
  records.index(req, res);
});

router.get('/new', function(req, res){
  records.new(req, res);
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



module.exports = router;