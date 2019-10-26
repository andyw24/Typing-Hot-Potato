$(function () {
  var socket = io();

  $('form').submit(function(e){
    e.preventDefault(); // prevents page reloading
    socket.emit('joinRoom', $('#j').val());
    $('#m').val('');
    return false;
  });

  $('#c').click(function() {
    socket.emit('createRoom', "");
  });
  
  socket.on('redirect', function(destination) {
    console.log("Redirecting...");
    window.location.href = destination;
  });
});