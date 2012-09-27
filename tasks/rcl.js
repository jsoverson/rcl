/*
 * grunt-client-logger
 * https://github.com/joverson/grunt-client-logger
 *
 * Copyright (c) 2012 Jarrod Overson
 * Licensed under the MIT license.
 */

var helpers = require('./helpers');
var log4js = require('log4js');
var glogger = log4js.getLogger('rcl');
var format = require('./helpers/string-format');

module.exports = function(grunt) {
  'use strict';

  grunt.registerTask('rcl', 'Logging bridge for websocket clients', function() {
    var options = this.options({
          port : 8888
        }),
        io = helpers.startServer(undefined, options.port),
        loggers = {};

    var done = this.async();

    io.set('log level',1); // warnings only
    glogger.debug('Connected on port ' + options.port);

    io.sockets.on('connection', function (socket) {
      socket.on('rcl', function (data) {
        var file = data.caller.file;
        var logger = loggers[file] ? loggers[file] : loggers[file] = log4js.getLogger(file);
        var location = ['l', data.caller.line, ':', data.caller.col].join('');
        var formats = format.parse(data.args[0]);
        var dataToLog = data.args;
        if (formats.length > 0) {
          dataToLog = format(data.args.shift(), data.args);
        } else {
          for (var i = 0; i < data.args.length; i++) {
            try {
              data.args[i] = JSON.parse(data.args[i]);
            } catch(e) {

            }
          }
        }
        logger[data.level].apply(logger,[location].concat(dataToLog));
        if (data.loopback) socket.emit('client:rcl',data);
        socket.broadcast.emit('client:rcl', data);
      });
    });
  });


};
