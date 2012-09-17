var grunt = require('grunt'),
    falafel = require('falafel'),
    fs = require('fs');

exports.startServer = function(address, port) {
  "use strict";
  address = address || '0.0.0.0';
  port = port || 8888;

  var app = require('http').createServer(),
      io = require('socket.io').listen(app),
      fs = require('fs');

  app.listen(port);

  return io;

};

exports.stripLogging = function(nodeName, file, dest) {
  "use strict";

  var src = fs.existsSync(file) ? grunt.file.read(file) : file;

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
    return output.toString();
  }
};

