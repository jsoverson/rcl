/*
 * grunt-client-logger
 * https://github.com/joverson/grunt-client-logger
 *
 * Copyright (c) 2012 Jarrod Overson
 * Licensed under the MIT license.
 */

'use strict';

var helpers = require('./helpers');
var log4js = require('log4js');
var logger = log4js.getLogger('iog');

module.exports = function(grunt) {

  grunt.registerTask('iog', 'Logging bridge for websocket clients', function() {
    var options = this.options({
          port : 8888
        }),
        io = helpers.startServer(undefined, options.port),
        loggers = {};

    var done = this.async();

    io.set('log level',1); // warnings only
    logger.debug('Connected on port ' + options.port);

    io.sockets.on('connection', function (socket) {
      socket.on('iog', function (data) {
        var file = data.caller.file;
        var logger = loggers[file] ? loggers[file] : loggers[file] = log4js.getLogger(file);
        var location = ['l', data.caller.line, ':', data.caller.col].join('');
        logger[data.level].apply(logger,[location].concat(data.args));
        socket.broadcast.emit('client:iog', data);
      });
    });
  });

  grunt.registerMultiTask('striplogging', 'Strip console and iog logging messages', function() {
    var file = this.file.src;
    var dest = this.file.dest;

    var output = helpers.stripLogging('iog', file);

    if (this.data.stripConsole) output = helpers.stripLogging('console', output);

    grunt.file.write(dest,output);
  });
};
