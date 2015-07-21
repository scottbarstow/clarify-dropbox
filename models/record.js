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
    get: function(value){
      return value ? value.toHHMMSS() : 'N/A';
    }
  },
  processing_cost: {
    type: Number,
    get: function(value) {
      return value ? '$' + value : 'N/A';
    }
  },
  bundle_id: {
    type: String
  },
  addedAt: {
    type: Date
  },
  indexedAt: {
    type: Date
  },
  tags: [{
    name:{
      type: String,
      trim: true
    }
  }],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

Record.set('toJSON', { getters: true });
module.exports = mongoose.model('Record', Record);
