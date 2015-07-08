var passport = require('passport');
var local = require('./strategies/local');
var dropbox = require('./strategies/dropbox');

module.exports = function() {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id
    }, '-salt -password', function(err, user) {
      done(err, user);
    });
  });

  passport.use(local.strategy());
  passport.use(dropbox.strategy());
};