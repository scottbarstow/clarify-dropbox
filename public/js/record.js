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
});