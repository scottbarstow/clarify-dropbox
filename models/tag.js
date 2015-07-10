'use strict';

var mongoose = require('mongoose');

var Tag = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  record: {
    type: mongoose.Schema.ObjectId,
    ref: 'Record'
  }
});

module.exports = mongoose.model('Tag', Tag);
