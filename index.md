---
layout: page
title: Remote Client Logging
tagline:
---
{% include JB/setup %}

<section class="row bulletpoints">
  <div class="bullet span4">
    <h2>What is RCL?</h2>
    <p>
RCL is a browser library and server client that allows you to log extensively from a JavaScript
application to a remote consumer.
    </p>
  </div>
  <div class="bullet span4">
    <h2>What do I get?</h2>
    <p>
      Loads of beautiful logs viewable from multiple clients all the while not bloating your production code.
    </p>
  </div>
  <div class="bullet span4">
  <h2>Development priority</h2>
    <p>
      <a href="https://github.com/jsoverson/grunt-strip"><code>grunt-strip</code></a>
      was developed in parallel to remove all your logging before production deployment.
    </p>
  </div>
</section>


<section class='code-example row'>
  <h2>Use <code>rcl</code></h2>
  <img src="{{BASE_PATH}}/assets/images/code-example.png" alt="Code example">
</section>


<section class="output-examples row">
  <h2 class="span12">And get this</h2>
  <div class="span12">
    <img src="{{BASE_PATH}}/assets/images/terminal-output.png" alt="Terminal output" id="terminalOutputExample">
  </div>

  <h2 class="span12">And this</h2>

  <div class="span6">
    <a href="#chromeOutputModal" data-toggle="modal">
      <img src="{{BASE_PATH}}/assets/images/chrome-output.png" alt="Chrome output" id="chromeOutputExample">
    </a>
  </div>
  <div class="span6">
    <a href="#iphoneOutputModal" data-toggle="modal">
      <img src="{{BASE_PATH}}/assets/images/iphone-output.png" alt="iPhone output" id="iphoneOutputExample">
    </a>
  </div>
</section>

<!-- Modals -->
<div class="modal hide fade" id="chromeOutputModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <img src="{{BASE_PATH}}/assets/images/chrome-output.jpg" alt="">
</div>
<div class="modal hide fade" id="terminalOutputModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <img src="{{BASE_PATH}}/assets/images/terminal-output.jpg" alt="">
</div>
<div class="modal hide fade" id="iphoneOutputModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <img src="{{BASE_PATH}}/assets/images/iphone-output.png" alt="">
</div>
<!-- /Modals -->

---------------------------------

# Getting started

## Include the logging client in your application

{% highlight html %}

<script src="path/to/rcl.js"></script>

{% endhighlight %}

For AMD/RequireJS, It is recommended that you add it to your global `deps` config.

{% highlight js %}

require.config({
  deps : [
    "path/to/rcl.js"
  ]
})

{% endhighlight %}

## Install the `rcl` npm package

{% highlight bash %}

$ sudo npm install -g rcl

{% endhighlight %}

## Run `rcl`

{% highlight bash %}

$ rcl
Running "rcl" task
   info  - socket.io started
[2012-09-25 09:14:48.863] [DEBUG] rcl - Connected on port 8888

{% endhighlight %}

## Log to your heart's content

{% highlight js %}

rcl.info("Hi, I am your app.");
rcl.debug("Foo is now : %s", 42);

{% endhighlight %}

Logs will show up in your console, rcl (if running), and any client connected
to your rcl instance.

---------------------------------

# Usage

Include the source file in your client application and
you can use the following commands immediately

{% highlight js %}

rcl.info()
rcl.debug()
rcl.trace()
rcl.error()
rcl.warn()

{% endhighlight %}

#### Specify a different host to connect to

{% highlight js %}

rcl.connect('127.0.0.1','8888');

{% endhighlight %}

#### Configure log levels

{% highlight js %}

rcl.logLevel(rcl.INFO);

{% endhighlight %}

#### Turn off logging

{% highlight js %}

rcl.server = false; // || true
rcl.client = false; // || true

{% endhighlight %}



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

{% highlight js %}

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

{% endhighlight %}

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

{% highlight js %}

rcl : {
  port : 3000
}

{% endhighlight %}

### log4js configuration

Please visit the project page for documentation [log4js-node](https://github.com/nomiddlename/log4js-node)

