'use strict';

var mongoose = require('mongoose');

var State = new mongoose.Schema({
  name: {
    type: String
  },
  content: {
    type: String
  } 
});

module.exports = mongoose.model('State', State);
