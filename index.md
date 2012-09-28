---
layout: page
title: Remote Client Logging
tagline:
---
{% include JB/setup %}

# What is RCL?

> RCL is a browser library and server client that allows you to log extensively from a JavaScript
> application to a remote consumer. It also supports the build-time stripping of all logging code
> from an application

It is loads of beautiful, configurable logging viewable from multiple clients all the while not bloating your production code.

---------------------------------

# How do I use RCL?

## Include the logging client in your application

{% highlight html %}

<script src="path/to/rcl.js"></script>

{% endhighlight %}

For AMD/RequireJS, we recommend adding to your global deps.

{% highlight html %}

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

View your logging in your client console, and on your terminal,
and any browser that connects to your rcl instance

<br><br>

<img src="{{BASE_PATH}}/assets/images/terminal-output.jpg">

---------------------------------

<img src="{{BASE_PATH}}/assets/images/chrome-output.jpg">

---------------------------------


<img src="{{BASE_PATH}}/assets/images/iphone-output.png">

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

If you need to specify a different host to connect to

{% highlight js %}

rcl.connect('127.0.0.1','8888');

{% endhighlight %}

## Sprintf like formatting

For console logging, the support is the native console's capabilities.
For the terminal and web client, we use [string-format](https://github.com/jsoverson/string-format)

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

# Why use RCL?

### You are working in a hazardous environment.

You are programming in a language stretched beyond its design across environments spanning
years of standards and are delivering your source code directly to the client
to be run outside of your control.

It's hard, but so, so awesome.

You are a brilliant monstrosity of a developer to have gotten this far. Now let's make it better.

At the base, RCL is a websocket bridge to log from your browser to another client. It could be anything,
but right now is something like a server, another browser tab, or a mobile device.

RCL aggregates and classifies your log messages so that they are configurable in verbosity, using
log4js on the server side for even more flexibility.

### But the client...

One of the critical and unique aspects of JavaScript development
is client side load time, performance, and support. Deploying with loads
of logging bloats your distributable application and exposes
potentially sensitive intent behind your code.

This is one of our priorities and we developed `grunt-strip` to
strip out all logging from your built files.

`grunt-strip` allows you to strip out rcl commands, traditional console.log statements, **and** you
can also configure it to strip out any other node, including your own debug libraries.

