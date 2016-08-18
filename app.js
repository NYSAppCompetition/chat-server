(function(){
  var app = require('express')(),
      server = require('http').Server(app),
      io = require('socket.io').listen(server);

  app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

  io.configure(function () {
      io.set("transports", ["xhr-polling"]);
      io.set("polling duration", 10);
  });

  io.sockets.on('connection', function(socket){
    //TODO - Save messages to db
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
      });
    //Find out how to send message to specific members
      socket.on('chat message', function(msg){
        io.sockets.emit('chat message', msg);
      });
  });

  module.exports = server;

})();
