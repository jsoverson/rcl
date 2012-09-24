# RCL - Remote Client Logging

A websocket bridge allowing persistent debug logging from client to server/local node instance

## Getting started

### Client

Include `src/rcl.js` in your client side code and call rcl.connect(server,port) to connect to your running instance of `rcl`

### Server / Local 

Run `rcl` or ./bin/rcl from where ever you installed rcl.

### Enjoy!

Now you have loads more logging power at your fingertips.

## Stripping these logs out

RCL delegates to grunt-strip (originally part of this project) to strip
out the logging from your deployable project. This ensures your final product
does not retain any bloat from development and doesn't unnecessarily expose any
extra intent behind your logic.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
v0.2.0 Initial release

## License
Copyright (c) 2012 Jarrod Overson  
Licensed under the MIT license.
