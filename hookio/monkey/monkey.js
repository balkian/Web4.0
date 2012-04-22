var Hook = require('hook.io').Hook,
    express = require('express'),
    stylus = require('stylus'),
    nib = require('nib'),
    app = express.createServer(),
    io = require('socket.io').listen(app);

app.configure(function () {
      app.use(stylus.middleware({ src: __dirname + '/public', compile: compile }));
      app.use(express.static(__dirname + '/public'));
      app.set('views', __dirname);
      app.set('view engine', 'jade');

      function compile (str, path) {
        return stylus(str)
          .set('filename', path)
          .use(nib());
      };
    })

    app.get('/', function (req, res) {
      res.render('index', { layout: false });
    });

/*
 * Hook
 */
var monkey = new Hook({ 
  name: "monkey-hook",
  debug: true
});

monkey.on('hook::ready', function () {
  console.log('I am online :D');
});
    /**
     * App listen.
     */

app.listen(3000, function () {
    var addr = app.address();
    console.log('app listening on http://' + addr.address + ':' + addr.port);
});

monkey.listen(1337);

var nicknames = {};

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('user message', function (data) {
        console.log(data);
    });
    socket.on('execute', function (data,fn) {
        var name = data['name'];
        var payload = data['payload'];
        console.log('Executing '+name+' with '+payload);
        try{
            monkey.emit(name,payload,fn);
        }catch(err){
            console.log("Error:"+err);
        }
    });
    socket.on('client', function(data,fn){
        var id = data['id'];
        var name = data['name'];
        var payload = data['payload'];
        console.log('Clienting '+name+'@'+id+' with '+payload);
        try{
            nicknames[id].emit(name,payload,fn);
        }catch(err){
            console.log("Error:"+err);
        }
    });
    socket.on('nickname', function (nick, fn) {
        if (nicknames[nick]) {
          fn(true);
        } else {
            fn(false);
            socket.nickname = nick;
            nicknames[nick] = socket;
        }
    });
    socket.on('disconnect', function () {
        if (!socket.nickname) return;
            delete nicknames[socket.nickname];
        });
});

