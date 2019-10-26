$(function () {
  var socket = io();
  $('form').submit(function(e){
    e.preventDefault(); // prevents page reloading
    socket.emit('login', $('#u').val());
    $('#m').val('');
    return false;
  });
  
  socket.on('redirect', function(destination) {
    console.log("Redirecting...");
    window.location.href = destination;
  });
});