var superagent = require('superagent');
require('../models/user');
require('../models/record');
require('../models/state');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var State = mongoose.model('State');
var Record = mongoose.model('Record');
var config = require('../config');
var async = require('async');
var clarify = require('clarifyio');
var clarifyClient = new clarify.Client("api.clarify.io", config.clarify.API_KEY);

function getUrl(entry, callback){
  superagent.post("https://api.dropbox.com/1/media/auto" + entry.path)
    .set("Authorization", "Bearer " + config.dropbox.ACCESS_TOKEN)
    .set('Accept', 'application/json')
    .end(function(err, res){
      entry.url = res.body.url;
      callback(entry);
    });
}

function requestCursor(callback) {
  superagent
    .post('https://api.dropbox.com/1/delta/latest_cursor')
    .set('Authorization', 'Bearer ' + config.dropbox.ACCESS_TOKEN)
    .set('Accept', 'application/json')
    .end(function(err, res){
      callback(res.body.cursor);
    });
}

function getCursor(callback) {
  State.findOne({name: 'dropbox'}, function(err, state){
    if (state == null) {
      requestCursor(function(cursor){
        State.create({
          name: 'dropbox',
          content: cursor
        });
        callback(cursor);
      });
    } else {
      console.log(state.content);
      callback(state.content);
    }
  });
}

function saveCursor(cursor, callback) {
  State.findOne({name: 'dropbox'}, function(err, state){
    state.content = cursor;
    state.save(callback);
  });
}

function processFiles(userIds, cursor) {
  superagent
    .post('https://api.dropbox.com/1/delta')
    .send({
      cursor: cursor
    })
    .set('Authorization', 'Bearer ' + config.dropbox.ACCESS_TOKEN)
    .set('Accept', 'application/json')
    .end(function(err, res){
      var entries = res.body.entries;
      entries.forEach(function(e, index){
        var entry = {
          path: e[0],
          metadata: e[1]
        };
        console.log(entry);
        getUrl(entry, function(entry){
          User.findOne({dropboxId: userIds[0]}, function(err, user){     
            Record.create({
              name: entry.path,
              url: entry.url,
              addedAt: Date.now(),
              user: user
            }, function(err, record){
              var metadata = {
                recordId: record._id
              };
              clarifyClient.createBundle({
                name: record.name,
                media_url: record.url,
                notify_url: config.BASE_URL + '/notify',
                external_id: record._id,
                metadata: JSON.stringify(metadata)
              });
           });
         });
       });
     });
     saveCursor(res.body.cursor);
     if (res.body.has_more) {
       processFiles(userIds, res.body.cursor);
     }
  });
}

exports.handle = function(req, res){
  var userIds = req.body.delta.users;
  getCursor(function(cursor){
    processFiles(userIds, cursor);
  });
  res.sendStatus(200);
};

exports.verify = function(req, res){
  res.send(req.query.challenge);
};
