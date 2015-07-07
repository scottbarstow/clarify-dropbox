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
  data: {
   type: String
  },
  duration: {
    type: Number,
    default: 0
  },
  addedAt: {
    type: Date
  },
  indexedAt: {
    type: Date
  },
  data: {
    type: String,
  }
});

module.exports = mongoose.model('Record', Record);
