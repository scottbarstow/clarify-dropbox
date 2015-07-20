'use strict';

module.exports.authorize = function(socket) {
  socket.emit('user.authorize');

  socket.on('user.authorize.response', function(user){
    socket.user_id = user._id;
    socket.join(user._id);
  });
};