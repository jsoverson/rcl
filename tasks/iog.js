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
    });

    var done = this.async();
    var io = helpers.startServer(undefined, options.port);

    io.set('log level',1); // warnings only
    logger.debug('Connected on port ' + options.port);

    io.sockets.on('connection', function (socket) {
      socket.on('iog', function (data) {
        logger[data.level].apply(logger,data.args);
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
