$(function () {
  var socket = io();

  socket.on('getRoomNumber', function(roomNum) {
  	$("#roomNum").text("Room Number: ");
  })

  socket.on('redirect', function(destination) {
    console.log("Redirecting...");
    window.location.href = destination;
  });
});
