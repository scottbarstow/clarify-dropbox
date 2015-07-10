'use strict';

require('../models/record.js');
require('../models/tag.js');
var Record = require('mongoose').model('Record');
var Tag = require('mongoose').model('Tag');

exports.add = function(req, res) {
  var recordId = req.params.recordId;
  Record.findById(recordId, function(err, record){
    if (err) {
      res.status(404).json({message: 'Record not found.'})
    } else {
      Tag.create({
        name: req.body.name,
        record: record,
        user: req.user
      }, function(){
        res.status(201).json('Tag has been added.');
      });
    }
  });
};

exports.remove = function(req, res) {
  var recordId = req.params.recordId;
  Record.findById(recordId, function(err, record){
    if (err) {
      res.status(404).json({message: 'Record not found.'})
    } else {
      Tag.remove({record: record, user: req.user, name: req.params.name}, function(){
        res.status(200).json('Tag has been deleted.');
      });
    }
  });
};