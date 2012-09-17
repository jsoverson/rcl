var grunt = require('grunt'),
    falafel = require('falafel');

exports.startServer = function(port) {
  "use strict";
  port = port || 8888;

  var app = require('http').createServer(),
      io = require('socket.io').listen(app),
      fs = require('fs');

  app.listen(port);

  return io;

};

exports.stripLogging = function(nodeName, file, dest) {
  "use strict";

  var src = grunt.file.read(file) || '';

  var output = falafel(src, function(node){
    if (
        node.type === 'CallExpression' &&
        node.callee.object && node.callee.object.name === nodeName
      ) {
      node.update('');
    }
  });

  if (dest) {
    return grunt.file.write(dest, output);
  } else {
    return output;
  }
};

