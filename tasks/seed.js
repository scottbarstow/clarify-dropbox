var User = require('mongoose').model('User');

exports = function(){
  User.findOne({name: 'admin'}, function(err, user){
    if (user == null) {
      User.create({
        username: 'admin',
        password: 'admin',
        roles: ['admin']
      });
    }
  });
};