// (function(){
//   var app = require('express')(),
//       server = require('http').Server(app),
//       io = require('socket.io').listen(server);
//
//   app.get('/', function(req, res){
//     res.sendFile(__dirname + '/index.html');
//   });
//
//   // io.configure(function () {
//   //     io.set("transports", ["xhr-polling"]);
//   //     io.set("polling duration", 10);
//   // });
//
//   io.sockets.on('connection', function(socket){
//     //TODO - Save messages to db
//     socket.on('chat message', function(msg){
//         console.log('message: ' + msg);
//       });
//     //Find out how to send message to specific members
//       socket.on('chat message', function(msg){
//         io.sockets.emit('chat message', msg);
//       });
//   });
//
//   module.exports = server;
//
// })();

'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
  socket.on('chat message', (msg) => io.emit('chat message', msg));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
