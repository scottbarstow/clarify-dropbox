'use strict';

require('../models/record.js');
require('../models/tag.js');
var Record = require('mongoose').model('Record');
var Tag = require('mongoose').model('Tag');
var clarify = require('clarifyio');
var config = require('../config');
var clarifyClient = new clarify.Client("api.clarify.io", config.clarify.API_KEY);
var  _ = require('lodash');

exports.index = function(req, res) {
  Record.find({}, function(err, records){
    res.render('records/index', {records: records, user: req.user});
  });
};

exports.add =function(req, res) {
  Record.create({
    name: req.body.name,
    url: req.body.url,
    addedAt: Date.now()
  }, function(err, record){
    var metadata = {
      recordId: record._id
    };
    clarifyClient.createBundle({
      name: record.name,
      media_url: req.body.url,
      notify_url: config.BASE_URL + '/notify',
      external_id: record._id,
      metadata: JSON.stringify(metadata)
    });
    res.redirect('/');
  });
};

exports.notify = function(req, res) {
  if (req.body.track_id) { // Handle tracks
    var trackData = req.body._embedded['clarify:track'];
    Record.findById(req.body.external_id, function(err, record){
      record.indexedAt = Date.now();
      record.data = JSON.stringify(req.body);
      record.duration = trackData.duration;
      record.save();
    });
  }
  res.sendStatus(200);
};

exports.show = function(req, res) {
  Record.findById(req.params.id, function(err, record){
    Tag.find({record: record, user: req.user}, function(err, tags){
      var tagsString = _.map(tags, 'name').join(',');
      res.render('records/show', {record: record, user: req.user, tags: tagsString});
    });
  });
};

exports.search = function(req, res) {
  var query = req.body.query;
  var searchResult = {
    results: []
  };

  clarifyClient.search({query: query, embed: 'metadata'}, function(err, result){
    var terms = (result.search_terms || []).map(function(t){ return t.term; });
    var count = Math.min(result.total, result.limit);
    if (count > 0) {
      var ids = result._embedded.items.map(function(item){
        return item._embedded["clarify:metadata"].data.recordId;
      });

      Record.find({"_id": {"$in": ids}}, function(err, data){
        var records = _.transform(data, function(trecords, item){
          trecords[item.id] = item;
        });

        for(var i = 0; i < count; i++) {
          var metadata = result._embedded.items[i]._embedded["clarify:metadata"].data;
          var itemResult = result.item_results[i];
          var media = records[metadata.recordId];
          if (media){
            var item = {
              id: media._id,
              mediaUrl: media.url,
              name: media.name,
              score: itemResult.score,
              hits: gatherHits(itemResult, terms),
              duration: media.duration,
              searchTermResults: itemResult.term_results
            };
            searchResult.results.push(item);
          }
        }
        res.status(200).json(searchResult);
      });
    }
  });

};

var gatherHits = function(itemResult, terms) {
  var hits = [];
  (itemResult.term_results || []).forEach(function (tr, i) {
    var term = terms[i] || "";
    var matches = tr.matches || [];
    matches.forEach(function (m) {
      if (m.type === "audio") {
        m.hits.forEach(function (h) {
          h.term = term;
          hits.push(h);
        });
      }
    });
  });
  return hits;
};
