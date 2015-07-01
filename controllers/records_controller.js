'use strict';

require('../models/record.js');
var Record = require('mongoose').model('Record');
var CLARIFY_API_KEY = 'ahugtdSjrSVGoomh1dnJXrg+eU6cjJ7T7ScwN+AcaWy4A';

exports.index = function(req, res) {
  Record.find({}, function(err, records){
    res.render('index', {records: records});
  });
};

exports.new = function(req, res) {
  res.render('new');
};

exports.add =function(req, res) {

};

exports.notify = function(req, res) {
  console.log(req);
  res.sendStatus(200);
};