const express = require("express");
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const port = process.env.PORT || "5000";

var users = [];

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/pages/login.html');
});


io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('login', function(usr){
    socket['username'] = usr;
    users.push(socket.id);
    console.log("A NEW USER HAS LOGGED IN: " + socket['username']);
    console.log("userlist: " + users);
    
    //redirect them to roomJoining.html
    var destination = '/public/pages/roomJoining.html';
    socket.emit('redirect', destination);
  })

  socket.on('disconnect', function(){
    console.log('a user disconnected');
    for( var i = 0; i < users.length; i++){ 
      if ( users[i] === socket.id) {
        users.splice(i, 1); 
      }
    }
    console.log("disconnected userlist: " + users);
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
    console.log("userlist: " + users);
  });
});

http.listen(port, function(){
  console.log('listening on port 5000');
});