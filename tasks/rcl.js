/*
 * grunt-client-logger
 * https://github.com/joverson/grunt-client-logger
 *
 * Copyright (c) 2012 Jarrod Overson
 * Licensed under the MIT license.
 */

var helpers = require('./helpers');

module.exports = function(grunt) {
  'use strict';

  grunt.registerTask('rcl', 'Logging bridge for websocket clients', function(){
    var port = grunt.config('rcl.port') || 8888;

    // if rcl.wait = true, don't come back.
    if (grunt.config('rcl.wait')) this.async();

    helpers.startRcl(port);
  });

};
