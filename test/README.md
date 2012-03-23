Testing via Buster.js
---------------------

[buster.js](http://busterjs.org) is a new up-and-coming javascript testing framework in development.

It features standalone static testing or CI testing via node with browser capture.
To see the basic example static test runner, load  `index.html`

To install buster:

    # npm install -g buster

To start the static tester:

    # buster static

To start in capture mode for multiple browsers:

    # buster server &

Once you have captured your target browsers, just run:

    # buster test

Standalone testing via `buster test` w/o browser capture is not supported yet, though you could probably try jsdom - edit buster.js config and give it a go. Also, you'd need the server only version of mootools.

**nb** please note that when in capture mode via `buster server`, IE7 and IE8 will fire an exception - which is to do with lack of `Object.create`, referenced in one of buster's dependencies `bundle.js`. Having said that, the tests will run just fine and produce a result like this in your console:

```sh
dchristoff@Dimitars-iMac:~/projects/mailcheck (master):
> buster server &
buster-server running on http://localhost:1111
dchristoff@Dimitars-iMac:~/projects/mailcheck (master):
> buster test
Uncaught exception: Object expected
Chrome 17.0.963.83 OS X:       ................
Internet Explorer 8.0 Windows:
Firefox 13.0a2 OS X:           ................
4 test cases, 32 tests, 32 assertions, 0 failures, 0 errors, 0 timeouts
```

As you can see, despite of the uncaught exception, the tests run fine in IE8.