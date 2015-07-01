'use strict';

var mongoose = require('mongoose');

var Record = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    trim: true
  },
  addedAt: {
    type: Date
  },
  indexedAt: {
    type: Date
  }
});

module.exports = mongoose.model('Record', Record);