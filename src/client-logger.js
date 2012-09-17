
var Log = (function(){
  "use strict";

  var socket = io.connect('http://localhost:8888');

  function emit(level,message) {
    socket.emit('log', {level : level, message : message});
  }

  var levels = [
    'trace',
    'debug',
    'info',
    'warn',
    'error',
    'fatal'
  ];

  function logLevel(level) {
    return function(message) {
      emit(level,message);
    };
  }

  var api = {};

  for (var i = 0; i < levels.length; i++) {
    var level = levels[i];
    api[level] = logLevel(level);
  }

  return api;
})();
