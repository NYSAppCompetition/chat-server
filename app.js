(() => {
  'use strict';

  const express = require('express'),
        socketIO = require('socket.io'),
        path = require('path'),
        PORT = process.env.PORT || 3000,
        INDEX = path.join(__dirname, 'index.html');

  const server = express()
                .use((req, res) => res.sendFile(INDEX) )
                .listen(PORT, () => console.log(`Listening on ${ PORT }`)),
        io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
    socket.on('chat message', (msg) => io.emit('chat message', msg));
  });

  setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
  
})();
