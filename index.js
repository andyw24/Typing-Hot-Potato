const express = require("express");
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const port = process.env.PORT || "5000";

var users = [];

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/pages/index.html');
});


io.on('connection', function(socket){
  console.log('a user connected');
  users.push("test");

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
    console.log("userlist: " + users);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
    users.pop();
  });
});

http.listen(port, function(){
  console.log('listening on port 5000');
});