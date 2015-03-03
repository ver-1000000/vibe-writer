var fs = require('fs');
var app = require('http').createServer(function(req, res) {
    if (req.url == '/'){
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.createReadStream('index.html').pipe(res);
    } else if (req.url == '/jquery.min.js'){
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      fs.createReadStream('jquery.min.js').pipe(res);
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
  socket.on('chara', function(data) {
    io.sockets.emit('chara', data);
  });
  socket.on('vibes', function(data) {
    io.sockets.emit('vibes', data);
  });
  socket.on('negotiation', function() {
    io.sockets.emit('negotiation',socket.id);
  });
  socket.on('now', function(data,socket_id) {
     io.sockets.to(socket_id).emit('now',data);
  });
});
