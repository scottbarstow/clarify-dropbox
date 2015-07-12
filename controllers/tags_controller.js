'use strict';

require('../models/record.js');
var Record = require('mongoose').model('Record');

exports.add = function(req, res) {
  var recordId = req.params.recordId;
  Record.findById(recordId, function(err, record){
    if (err) {
      res.status(404).json({message: 'Record not found.'})
    } else {
      record.tags.push({name: req.body.name});
      record.save(function(){
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
      record.tags.pull({name: req.params.name});
    }
  });
};