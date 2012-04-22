var io = require('socket.io').listen(3000);
io.sockets.on('connection', function (socket) {
  console.log("New connection!");
  socket.on('test', function (data,ack) {
    console.log(data);
    var testObject = {"testKey" : "testValue", "testArray": ["value1", "value2", "value3"], "testDic": {"key1":"value1","key2":"value2"}, "testMix":["one",{"twoDic":[1,2,"2",2.0,2.1]}],"specialKey":"Ñoña-2_3"};
    ack(testObject);
    console.log("I acked");
  });
});


