
(function(root, console){
  "use strict";

  var name = 'erl',
      storedLevel = root.localStorage ? parseInt(root.localStorage.getItem(name + '.level') || 0,10) : 0;

  function getCaller() {
    try { throw new Error(''); } catch(err) {
      var depth = 5,
          stack = err.stack.split("\n"),
          caller = stack[depth],
          callerParts = caller.match(/\s*\(?([^\s\)]*)\)?$/),
          original = callerParts[1],
          parts = original.match(/^.*([\/<][^\/>]*>?):(\d*):(\d*)$/);

      return {
        original : original,
        file : parts[1],
        line : parts[2],
        col : parts[3]
      };
    }
  }

  root[name] = (function(){
    var socket,
        cache = [],
        api = {
          _logLevel : storedLevel,
          client    : true,
          server    : true,
          loaded    : false
        },
        isLoading = false,
        levels = [
          'trace',
          'debug',
          'info',
          'warn',
          'error'
        ];

    function includeSocketIo() {
      if (isLoading) return;
      isLoading = true;
      var script = document.createElement('script');
      script.src = 'http://' + api.host + ':' + api.port + '/socket.io/socket.io.js';
      script.onload = onLoadIo;
      document.head.appendChild(script);
    }


    function emit(level,args) {
      console.log(arguments);
      if (levels[level] < api._logLevel) return;
      if (api.server) logIo.apply(null, arguments);
      if (api.client) logConsole.apply(null, arguments);
      if (!socket) return api.connect();
    }

    function logConsole(level,args) {
      if (console) {
        if (console[level]) console[level].apply(console,args);
        else                console.log.apply([level].concat(args));
      }
    }

    function logIo(level,args) {
      var data;

      if (typeof args === 'object' && !args.length) data = args
      else {
        data = {
          level   : level,
          args    : args,
          caller  : getCaller()
        };
      }

      if (socket) {
        socket.emit(name, data);
      } else {
        cache.push([level, data]);
      }
    }

    function logLevel(level) {
      return function() {
        emit(level,[].slice.call(arguments));
      };
    }

    function onConnect() {
      var cached = null;
      while (cached = cache.shift()) {
        logIo.apply(null,cached);
      }
    }

    function onLoadIo() {
      api.connect();
    }

    for (var i = 0; i < levels.length; i++) {
      var level = levels[i];
      api[level] = logLevel(level); // e.g. .info (log method)
      api[level.toUpperCase()] = i; // e.g. .INFO (level enum)
    }

    api.connect = function(host, port, redux) {
      host = host || '127.0.0.1';
      port = port || 8888;
      api.host = host;
      api.port = port;
      if (root.io) {
        socket = root.io.connect('http://' + host + ':' + port);
        socket.on('connect',onConnect);
      }
      else if (!redux) {
        includeSocketIo();
        api.connect(host, port, true);
      }
    };

    api.logLevel = function(level) {
      api._logLevel = level;
      root.localStorage && root.localStorage.setItem(name + '.level',level);
    };

    return api;
  })();

})(this, console);
