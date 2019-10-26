const express = require("express");
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const port = process.env.PORT || "5001";

//----------------session----------------
var session = require("express-session")({
    secret: "session.hidden",
    username: "default0",
    resave: true,
    saveUninitialized: true
});
var sharedsession = require("express-socket.io-session");
// Use express-session middleware for express
app.use(session);
// Use shared session middleware for socket.io
// setting autoSave:true
io.use(sharedsession(session, {
    autoSave:true
})); 
//----------------session----------------

var users = [];
var allRooms = [];

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/pages/login.html');
});


io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('login', function(usr){
    //socket['username'] = usr;
    socket.handshake.session.username = usr;
    users.push(socket.id);
    console.log("A NEW USER HAS LOGGED IN: " + socket.handshake.session.username);
    console.log("userlist: " + users);
    
    //redirect them to roomJoining.html
    var destination = '/public/pages/roomJoining.html';
    socket.emit('redirect', destination);
  })

  socket.on('createRoom', function(room) {
    console.log(socket.handshake.session.username + " IS ATTEMPTING TO CREATE A NEW ROOM")
    var successfulCreateRoom = false;
    var roomCode;
    var index = 0;
    while (!successfulCreateRoom) {
      successfulCreateRoom = true;
      roomCode = Math.floor(100000 + Math.random() * 900000);
      for (index = 0; index < allRooms.length; index++) {
        console.log(allRooms[index]);
        if (allRooms[index] == roomCode) {
          successfulCreateRoom = false;
        }
      }
    }

    socket.join(roomCode);
    allRooms.push(roomCode);
    console.log("ADDED: " + allRooms[index]);

    console.log(io.sockets.adapter.rooms[allRooms[index]]);
  })

  socket.on('joinRoom', function(code) {
    console.log(socket.handshake.session.username + " IS ATTEMPTING TO JOIN ROOM: " + code);
    var successfulJoinRoom = false;
    for (index = 0; index < allRooms.length; index++) {
      console.log(allRooms[index]);
      if (allRooms[index] == code) {
        socket.join(allRooms[index]);
        console.log(socket.handshake.session.username + " JOINED ROOM: " + code);
        console.log(io.sockets.adapter.rooms[allRooms[index]]);
        successfulJoinRoom = true;
      }
    }
    if (!successfulJoinRoom) {
      console.log(socket.handshake.session.username + " FAILED TO JOIN ROOM: " + code);
    } 
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
  console.log('listening on port ' + port);
});