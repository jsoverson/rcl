/**
 * License : MIT or new BSD license.
 * Copyright Jarrod Overson.
 * https://github.com/jsoverson/string-format
 */

  // Code deliberately terse for size reasons. I apologize (a little).

module.exports = (function(global,undefined) {
  "use strict";

  var cache = {};

  function parseFormat(string) {
    if (cache[string]) return cache[string];
    var parts = [],
      regex = /(%%)|(^%|(?=.)%)(?:(\d+)?([.,])?(\d+)?)?([a-zA-Z])/,
      position = 0,
      part, match;

    if (!string) return parts;

    while (match = regex.exec(string)) {
      part = {
        m : match[0],
        mi : match.index
      };
      if (match[0] === "%%") {
        part.t = '%';
      } else {
        part.i = position++;
        part.s = match[4];
        part.t = match[6];
        part.h = [
          (!match[3] && match[3] !== 0) ? undefined : parseInt(match[3],10),
          (!match[5] && match[5] !== 0) ? undefined : parseInt(match[5],10)
        ];
      }

      parts.push(part);

      string = string.substr(match.index + match[0].length);
    }

    return cache[string] = parts;
  }

  // Nice regex from  http://stackoverflow.com/questions/2901102/how-to-print-number-with-commas-as-thousands-separators-in-javascript
  function addSep(numberString) {
    var parts = numberString.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join('.');
  }

  function format(/* args... */) {
    var args = Array.prototype.slice.call(arguments),
      string = typeof this === 'string' ? this : args.shift(),
      parts = parseFormat(string),
      lastIndex = 0;
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i],
        head = string.substring(0,lastIndex + part.mi),
        tail = string.substring(lastIndex + part.mi + part.m.length),
        replacement = '',
        val = args[part.i];
      switch (part.t) {
        case '%':
          replacement = '%';
          break;
        case 's':
          val = val || '';
          replacement = part.h[0] ?
                        part.h[1] ?
                        val.substr(part.h[0],part.h[1]) :
                        val.substring(0,part.h[0]) :
                        val;
          break;
        case 'f':
          val = val || 0;
          replacement = (part.h[1] >= 0) ? val.toFixed(part.h[1]) : val.toString();

          // Remove the 0 prefix if we didn't ask for it
          if (part.h[0] !== 0 && val < 1 && val > -1) replacement = replacement.replace(/0\./,'.');
          if (part.s === ',') replacement = addSep(replacement);
          break;
        case 'd':
        case 'i':
          replacement = val ? val.toFixed(0) : '0';
          if (part.s === ',') replacement = addSep(replacement);
      }
      lastIndex += part.mi + replacement.length;
      string = head + replacement + tail;
    }
    return string;
  };

  format.parse = parseFormat;

  return format;

})(this);
