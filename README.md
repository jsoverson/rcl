# iog

A websocket bridge allowing persistent debug logging from client to server/local node instance

## Getting started

### Client

Include `src/iog.js` in your client side code and call iog.connect(server,port) to connect to your running instance of `iog`

### Server / Local 

Run `iog` or ./bin/iog from whereever you installed iog.

### Enjoy!

Now you have loads more logging power at your fingertips.


## Stripping these logs out

Iog comes pre-built with a grunt task that can strip all of your
iog logging out of your built JavaScript. As an added bonus you
can configure it to remove all `console.*` calls you may still have
lying around. (Technically, Iog as a grunt task is still very useful
*just* for that if that's all you want)

## Grunt

Install this grunt plugin next to your project's [Gruntfile][getting_started] with: `npm install iog`

Then add this line to your project's Gruntfile:

```javascript
grunt.loadNpmTasks('iog');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
v0.2.0 Initial release

## License
Copyright (c) 2012 Jarrod Overson  
Licensed under the MIT license.
