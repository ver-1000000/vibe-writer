var fs = require('fs');
var app = require('http').createServer(function(req, res) {
    if (req.url == '/'){
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.createReadStream('index.html').pipe(res);
    } else if (req.url == '/common.css'){
      res.writeHead(200, {'Content-Type': 'text/css'});
      fs.createReadStream('common.css').pipe(res);
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.createReadStream('view.html').pipe(res);
    }
}).listen(3000);
var io = require('socket.io').listen(app);
io.sockets.on('connection', function(socket) {
  socket.on('msg', function(data) {
    io.sockets.emit('msg', data);
  });
});
