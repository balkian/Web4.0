#!/usr/bin/nodejs

var Hook = require('hook.io').Hook,
    express = require('express'),
    app = express.createServer(),
    io = require('socket.io').listen(app);

app.listen(8008);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

var monkey = new Hook({ 
  name: "monkey-hook",
  debug: true
});


monkey.on('hook::ready', function () {
  console.log('I am online :D');
});

monkey.start(1337);

