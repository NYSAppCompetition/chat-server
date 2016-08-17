(function(){
  var app = require('express')(),
      http = require('http').Server(app),
      io = require('socket.io')(http);

  app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

  io.on('connection', function(socket){
    //TODO - Save messages to db
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
      });
    //Find out how to send message to specific members
      socket.on('chat message', function(msg){
        io.emit('chat message', msg);
      });
  });

  http.listen(3000, function(){
      console.log('listening on port 3000');
  });
})();
