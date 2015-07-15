require('../../../models/user');

var config = require('../../../config');
var User = require('mongoose').model('User');
var DropboxStrategy = require('passport-dropbox').Strategy;

exports.strategy = function() {
  return new DropboxStrategy({
      consumerKey: config.dropbox.APP_KEY,
      consumerSecret: config.dropbox.APP_SECRET,
      callbackURL: config.BASE_URL + '/auth/dropbox/callback'
    },
    function(token, tokenSecret, profile, done) {
      console.log(profile);
      User.findOne({dropboxId: profile.id}, function(err, user){
        if (user == null) {
          User.create({
            dropboxId: profile.id,
          }, function(err, user){
            return done(err, user);
          });
        } else {
          return done(err, user);
        }
      });
    });
};
