'use strict';

require('../models/record.js');
var Record = require('mongoose').model('Record');
var clarify = require('clarifyio');
var CLARIFY_API_KEY = 'ahugtdSjrSVGoomh1dnJXrg+eU6cjJ7T7ScwN+AcaWy4A';
var clarifyClient = new clarify.Client("api.clarify.io", CLARIFY_API_KEY);
var BASE_URL = 'http://exmaple.com';

exports.index = function(req, res) {
  Record.find({}, function(err, records){
    res.render('index', {records: records});
  });
};

exports.new = function(req, res) {
  res.render('new');
};

exports.add =function(req, res) {
  Record.create({
    name: req.body.name,
    url: req.body.url,
    addedAt: Date.now()
  }, function(err, record){
    clarifyClient.createBundle({
      name: record.name,
      media_url: url,
      notify_url: BASE_URL + '/notify',
      external_id: record._id
    });
    res.redirect('/');
  });
};

exports.notify = function(req, res) {
  if (req.body.track_id) { // Handle tracks
    Record.findById(req.body.external_id, function(err, record){
      record.indexedAt = Date.now();
      record.data = JSON.stringify(req.body);
      record.save();
    });
  }
  res.sendStatus(200);
};

exports.show = function(req, res) {
  Record.findById(req.params.id, function(err, record){
    res.render('show', {data: record.data})
  });
};