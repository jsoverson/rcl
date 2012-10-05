var grunt   = require('grunt'),
    fs      = require('fs'),
    log4js  = require('log4js');
    glogger = log4js.getLogger('rcl');
    format  = require('./string-format');
;

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

exports.startRcl = function(port) {
  var io = exports.startServer(undefined, port),
      loggers = {};

  io.set('log level',1); // warnings only
  glogger.debug('Connected on port ' + port);

  io.sockets.on('connection', function (socket) {
    socket.on('rcl', function (data) {
      var file = data.caller.file,
        logger = loggers[file] ? loggers[file] : loggers[file] = log4js.getLogger(file),
        location = ['l', data.caller.line, ':', data.caller.col].join(''),
        formats = format.parse(data.args[0]),
        dataToLog = data.args;

      if (formats.length > 0) {
        dataToLog = format(data.args.shift(), data.args);
      } else {
        for (var i = 0; i < data.args.length; i++) {
          try {
            data.args[i] = JSON.parse(data.args[i]);
          } catch(e) {}
        }
      }
      data.args = dataToLog;
      logger[data.level].apply(logger,[location].concat(dataToLog));
      if (data.loopback) socket.emit('client:rcl',data);
      socket.broadcast.emit('client:rcl', data);
    });
  });
  return io;
}
