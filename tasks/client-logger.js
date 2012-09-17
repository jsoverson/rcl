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
var logger = log4js.getLogger();

module.exports = function(grunt) {

  grunt.registerTask('logging', 'TODO', function() {
    var done = this.async();
    if (this.flags.server) {
      var io = helpers.startServer();

      io.sockets.on('connection', function (socket) {
        socket.on('log', function (data) {
          logger[data.level](data.message);
        });
      });

    }

  });



};
