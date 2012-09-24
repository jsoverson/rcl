'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    test: {
      files: ['test/**/*_test.js']
    },
    lint: {
      files: ['Gruntfile.js', 'tasks/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    strip : {
      main : {
        //files : 'test/fixtures/src/all_api_methods.built.js',
        //inline : true,
        src : 'test/fixtures/src/all_api_methods.js',
        dest : 'test/fixtures/src/all_api_methods.built.js',
        nodes : ['rcl','console']
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      },
      globals: {}
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', 'rcl');

};
