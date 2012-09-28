# RCL - Remote Client Logging

A websocket bridge allowing persistent debug logging from client to server/local node instance

## Official doc at [jsoverson.github.com/rcl](http://jsoverson.github.com/rcl)

# Getting started

## Include the logging client in your application

```html

<script src="path/to/rcl.js"></script>

```

For AMD/RequireJS, It is recommended that you add it to your global `deps` config.

```js

require.config({
  deps : [
    "path/to/rcl.js"
  ]
})

```

## Install the `rcl` npm package

```bash

$ sudo npm install -g rcl

```

## Run `rcl`

```bash

$ rcl
Running "rcl" task
   info  - socket.io started
[2012-09-25 09:14:48.863] [DEBUG] rcl - Connected on port 8888

```

## Log to your heart's content

```js

rcl.info("Hi, I am your app.");
rcl.debug("Foo is now : %s", 42);

```

Logs will show up in your console, rcl (if running), and any client connected
to your rcl instance.

---------------------------------

# Usage

Include the source file in your client application and
you can use the following commands immediately

```js

rcl.info()
rcl.debug()
rcl.trace()
rcl.error()
rcl.warn()

```

#### Specify a different host to connect to

```js

rcl.connect('127.0.0.1','8888');

```

#### Configure log levels

```js

rcl.logLevel(rcl.INFO);

```

#### Turn off logging

```js

rcl.server = false; // || true
rcl.client = false; // || true

```



## Sprintf like formatting

For console logging, the support is the native console's capabilities.
Terminal and web client support use [string-format](https://github.com/jsoverson/string-format)
syntax (mostly the same).

-----------------------------------

# How to strip logging

The grunt task to strip logging has been extracted and distributed as its own
package, [grunt-strip](https://github.com/jsoverson/grunt-strip). You will find
more documentation there.

Grunt-strip is designed to be run as part of a build chain, probably after
concatenation and before minification.

## Example grunt configuration

```js

grunt.initConfig({
  /*
   * Configure a 'strip' block like this
   */

  strip : {
    main : {
      src : 'src/main.js',
      dest : 'build/main.built.js',
      nodes : ['rcl','console']
    }
  }
});

// Load grunt-strip tasks.
grunt.loadTasks('grunt-strip');

```

See [grunt-strip](https://github.com/jsoverson/grunt-strip) for advanced configurations

-----------------------------------

# FAQ

### Why use RCL?

You are programming in a language stretched beyond its design
across environments spanning years of standards and are delivering
your source code directly to the client to be run outside of your
control.

It's hard but so, so awesome and you are a brilliant genius to have
gotten this far.

At the base, RCL is just a websocket bridge to log from your browser
to another client. It could be anything, but right now is something
like a server, another browser tab, or a mobile device.

RCL aggregates and classifies your log messages so that they are
configurable in verbosity, using log4js on the server side for more
flexibility.

### Does my application break if rcl is not running?

No, you will still get console messages in your browser.

### Why is this not recommended for production logging?

Because logging will bloat your code, expose intent behind your logic,
and be an extra burden on the client. But, that said, if production
logging is important enough to you, then try it out and we'd love to
hear how it works.

Our primary frustration for large JavaScript projects is the lack of
extensive logging during development and testing. This is a solution to
that works very well and allows for fewer issues to occur in production.

One avenue being considered is to have [grunt-strip](https://github.com/jsoverson/grunt-strip)
support removing properties of nodes so that only certain log levels can
be removed.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
v0.2.0 Initial release

## License
Copyright (c) 2012 Jarrod Overson  
Licensed under the MIT license.
