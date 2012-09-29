# RCL - Remote Client Logging

A websocket bridge allowing persistent debug logging from client to server/local node instance

## Official doc at [jsoverson.github.com/rcl](http://jsoverson.github.com/rcl)

# Getting started

## Include the logging client in your application

```html

<script src="path/to/rcl.js"></script>

```

For AMD/RequireJS, It is still recommended that you add it as a script
source for easy removal with `grunt-preprocess`

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

Include the client source file in your client application and
you can use the following commands immediately

```js

rcl.info()
rcl.debug()
rcl.trace()
rcl.error()
rcl.warn()

```

#### Getting the client source file

You can download it at [raw.github.com/jsoverson/rcl/master/src/rcl.js](https://raw.github.com/jsoverson/rcl/master/src/rcl.js)
or you can output the version that matches your npm install via

```bash

$ rcl rcl.js > path/for/rcl.js

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

Two grunt tasks have been extracted from this project and packaged independently,
[grunt-strip](https://github.com/jsoverson/grunt-strip) and
[grunt-preprocess](https://github.com/onehealth/grunt-preprocess). Both have more
documentation at their project sites, but basic usage is below.

Both are designed to be run as part of a build chain, usually after concatenation
and before minification.

### Installing grunt tasks

Add `grunt-strip` and `grunt-preprocess` to your package.json's dependencies hash, or run

```bash

$ npm install --save grunt-strip grunt-preprocess

```

Remember to load these tasks as part of your gruntfile

```js

grunt.npmTasks('grunt-strip');
grunt.npmTasks('grunt-preprocess');

```

### Removing the script source using `grunt-preprocess`

#### Syntax

```html

<!-- exclude -->
<script src="path/to/rcl.js"></script>
<!-- endexclude -->

```

#### Configuration in your Gruntfile

```js

preprocess : {
  main : {
    src : 'src/index.html',
    dest : 'build/index.html'
  }
}

```

See [grunt-preprocess](https://github.com/onehealth/grunt-preprocess) for advanced configurations

### Removing the log statements using `grunt-strip`

#### Example grunt configuration

```js

strip : {
  main : {
    src : 'src/main.js',
    dest : 'build/main.built.js',
    nodes : ['rcl','console']
  }
}

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

### `rcl` as a grunt plugin

RCL was written with grunt so, by convenience, can be used as a grunt plugin.
No special functionality exists, but you can specify a custom port via an `rcl` config

```js

rcl : {
  port : 3000
}

```

### log4js configuration

Please visit the project page for documentation [log4js-node](https://github.com/nomiddlename/log4js-node)

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History

- v0.2.2 Fixed new use cases
- v0.2.0 Initial release

## License
Copyright (c) 2012 Jarrod Overson  
Licensed under the MIT license.
