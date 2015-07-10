$(function(){
  var path = '/record/' + $('#record').val() + '/tags';
  $('#tags').on('itemAdded', function(event) {
    $.post(path, {name: event.item});
  });
  $('#tags').on('itemRemoved', function(event) {
    $.ajax({
      url: path + '/' + event.item,
      type: 'DELETE'
    });
  });
});