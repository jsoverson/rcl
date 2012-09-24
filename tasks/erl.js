/*
 * grunt-client-logger
 * https://github.com/joverson/grunt-client-logger
 *
 * Copyright (c) 2012 Jarrod Overson
 * Licensed under the MIT license.
 */

var helpers = require('./helpers');
var log4js = require('log4js');
var glogger = log4js.getLogger('erl');

module.exports = function(grunt) {
  'use strict';

  grunt.registerTask('erl', 'Logging bridge for websocket clients', function() {
    var options = this.options({
          port : 8888
        }),
        io = helpers.startServer(undefined, options.port),
        loggers = {};

    var done = this.async();

    io.set('log level',1); // warnings only
    glogger.debug('Connected on port ' + options.port);

    io.sockets.on('connection', function (socket) {
      socket.on('erl', function (data) {
        var file = data.caller.file;
        var logger = loggers[file] ? loggers[file] : loggers[file] = log4js.getLogger(file);
        var location = ['l', data.caller.line, ':', data.caller.col].join('');
        logger[data.level].apply(logger,[location].concat(data.args));
        socket.broadcast.emit('client:erl', data);
      });
    });
  });


};
