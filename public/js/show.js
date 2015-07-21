$(function(){
  var $nameInput = $(this).find('input[type="text"]');
  $('#view a').click(function(){
    $('#view').hide();
    $('#edit').show();
  });

  $('#edit form').submit(function(e) {
    var name = $nameInput.val();
    var recordId = $('#record').val();

    $.ajax({
      url: '/' + recordId,
      method: 'PUT',
      data: {
        name: name
      }
    }).done(function(){
      $('#view').show();
      $('#edit').hide();
      $('#view h2 p').text(name);
    });
    e.preventDefault();
  });
});
