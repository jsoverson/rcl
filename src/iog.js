
(function(root, console, io){
  "use strict";

  var storedLevel = root.localStorage ? parseInt(root.localStorage.getItem('iog.level') || 0,10) : 0;

  function getCaller() {
    try { throw Error('') } catch(err) {
      var depth = 5,
          stack = err.stack.split("\n"),
          caller = stack[depth],
          callerParts = caller.match(/\s\(?([^\s\)]*)\)?$/),
          clean = callerParts[1],
          parts = clean.match(/^.*\/([^\/]*):(\d*):(\d*)$/);

      return {
        original : clean,
        file : parts[1],
        line : parts[2],
        col : parts[3]
      };
    }
  }

  root.iog = (function(){
    var socket,
        api = {
          _logLevel : storedLevel,
          client    : true,
          server    : true
        };

    var levels = [
      'trace',
      'debug',
      'info',
      'warn',
      'error'
    ];

    function emit(level,args) {
      if (levels[level] < api._logLevel) return;
      if (socket && api.server) {
        var caller = getCaller();

        socket.emit('iog', {
          level   : level,
          args    : args,
          caller  : caller
        });
      }
      if (!socket || api.client)  {
        if (console) {
          if (console[level]) console[level].apply(console,args);
          else                console.log.apply([level].concat(args));
        }
      }
    }

    function logLevel(level) {
      return function() {
        emit(level,[].slice.call(arguments));
      };
    }

    for (var i = 0; i < levels.length; i++) {
      var level = levels[i];
      api[level] = logLevel(level); // e.g. iog.info (log method)
      api[level.toUpperCase()] = i; // e.g. iog.INFO (level enum)
    }

    api.connect = function(host, port) {
      host = host || '127.0.0.1';
      port = port || 8888;
      if (io) socket = io.connect('http://' + host + ':' + port);
    };

    api.logLevel = function(level) {
      api._logLevel = level;
      root.localStorage && root.localStorage.setItem('iog.level',level);
    };

    return api;
  })();

})(this, console, io);
