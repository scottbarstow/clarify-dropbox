require('../../../models/user');

var config = require('../../../config');
var User = require('mongoose').model('User');
var DropboxStrategy = require('passport-dropbox-oauth2').Strategy;

exports.strategy = function() {
  return new DropboxStrategy({
      clientID: config.dropbox.APP_KEY,
      clientSecret: config.dropbox.APP_SECRET,
      callbackURL: config.BASE_URL + '/auth/dropbox/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({'dropbox.id': profile.id}, function(err, user){
        if (user == null) {
          User.create({
            dropbox: {
              id: profile.id,
              access_token: accessToken
            }
          }, function(err, user){
            return done(err, user);
          });
        } else {
          user.dropbox.access_token = accessToken;
          user.save(function(){
            return done(err, user);
          });
        }
      });
    });
};
