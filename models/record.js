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
    type: Number
  },
  processing_cost: {
    type: Number,
    get: function(value) {
      return value === undefined ? 'N/A' : '$' + value;
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

Record.virtual('durationFormatted')
  .get(function(){
    return this.duration ? this.duration.toHHMMSS() : 'N/A';
  });
Record.set('toJSON', { virtuals: true, getters: true });
module.exports = mongoose.model('Record', Record);
