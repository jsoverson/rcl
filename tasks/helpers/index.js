var grunt = require('grunt'),
    falafel = require('falafel'),
    fs = require('fs');

exports.startServer = function(address, port) {
  "use strict";
  address = address || '0.0.0.0';
  port = port || 8888;

  var app = require('http').createServer(handler),
      io = require('socket.io').listen(app),
      fs = require('fs');

  app.listen(port);

  function handler (req, res) {
    var file = '/webclient.html';
    fs.readFile(__dirname + file,
      function (err, data) {
        if (err) {
          res.writeHead(500);
          return res.end('Error loading ' + file);
        }

        res.writeHead(200);
        res.end(data);
      });
  }

  return io;

};
