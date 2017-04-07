const express = require('express');
const app = express();
// var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

// app.get('/', function(req, res){
// res.sendFile(__dirname + '/index.html');
// });

io.on('connection', function(socket){

  console.log('a user connected');
  console.log(socket.id);
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

// setInterval(function(){
//   io.emit('chat message', 'ping');
// }, 3000);

http.listen(3000, function(){
  console.log('listening on *:3000');
});
