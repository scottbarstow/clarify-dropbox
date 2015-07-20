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
    var openBtnSelector = 'a.open' + '[data-id=' + record._id + ']';
    $(openBtnSelector).show();
  });

  socket.on('record.added', function(record){
    var $recordTemplate = $("#recordTemplate").html();
    $recordTemplate.find('.name').append(record.name);
    $recordTemplate.find('.audio audio').attr('src', record.url);
    $recordTemplate.find('.cost').append(record.cost);
    $recordTemplate.find('.date-added').append(record.addedAt);
    $recordTemplate.find('.open').data('id', record._id);
    $recordTemplate.find('.delete').data('id', record._id);
    $('#records tbody').append($recordTemplate);
  });
});