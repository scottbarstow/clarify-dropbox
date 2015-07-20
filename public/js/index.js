$(function(){
  $('a.delete').click(function(e){
    e.preventDefault();
    var id = $(this).data('id');
    if (window.confirm("Are you sure you want to delete this record?")) {
      $.ajax({
        method: 'DELETE',
        url: '/' + id
      }).done(function () {
        window.location.href = '/';
      });
    }
  });

  var socket = io('/');
  socket.on('user.authorize', function () {
    var userId = $('#userId').val();
    socket.emit('user.authorize.response', { user: {_id: userId} });
  });

  socket.on('record.indexed', function(record){
    console.log(record);
    var openBtnSelector = 'a.open' + '[data-id=' + record._id + ']';
    $(openBtnSelector).show();
  });
});