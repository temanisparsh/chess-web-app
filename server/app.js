var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(4000, function () {
  console.log("Listening to requests on Port 4000");
});

var io = socket(server);

io.on('connection', function (socket) {

  socket.removeAllListeners();

  console.log('Connected to socket!');

  var srvSockets = io.sockets.sockets;
  var len = Object.keys(srvSockets).length;

  if (len === 2) {
    io.sockets.emit("start", '');
  }

  socket.on('selectColor', function (data) {
    socket.broadcast.emit('selectedColor', data);
  });

  socket.on('sendOpponentName', function (data) {
    socket.broadcast.emit('sendOpponentName', data);
  });

  socket.on('makeMove', function (data) {
    console.log(data);
    socket.broadcast.emit('makeMove', data);
  });

});