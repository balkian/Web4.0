var io = require('socket.io').listen(3000);
io.sockets.on('connection', function (socket) {
  console.log("New connection!");
  socket.on('test', function (data,ack) {
    console.log(data);
    var testObject = {"testKey" : "testValue", "testArray": ["value1", "value2", "value3"], "testDic": {"key1":"value1","key2":"value2"}, "testMix":["one",{"twoDic":["one","two"]}]};
    ack(testObject);
    console.log("I acked");
  });
});


