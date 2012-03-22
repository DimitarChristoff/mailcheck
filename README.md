mootools.mailcheck.js
=====================

A port of a jQuery plugin that suggests a right domain when your users misspell it in an email address.

What does it do?
----------------

When your user types in "user@hotnail.con", Mailcheck will suggest "user@hotmail.com".

![diagram](http://github.com/Kicksend/mailcheck/raw/master/doc/example.png?raw=true)

See it live in action on this jsfiddle [here](http://jsfiddle.net/dimitar/jSn3e/).


How to use
----------

This is low level, it works with an element but it does not attach events or handle suggestions.
You should extend the class to get that behavior or work with the instance.

Get Mootools. Have a text field.

    <input id="email" name="email" type="text" value="dimitar@gogolemail.com" />

Now, attach Mailcheck to the text field. Remember to declare an array of domains you want to check against.

    // it can create an instance on the fly for you
    var suggested = document.id("email").get("mailcheck").suggest();
    if (suggested) {
        // do something with the object
    }
    else {
        // we have nothing!
    }

or use a proper class instantiation as part of scripting:

    // it can create an instance on the fly for you
    var mailcheck = new Mailcheck(, {
        domains: ["hotmail.com", "gmail.com", "aol.com"],
        threshold: 2
    });

    document.id("email").addEvent("change", function() {
        var suggested = mailcheck.suggest();
        if (suggested) {
            // do something with the object
        }
        else {
            // we have nothing!
        }
    });

a combination of both for quick scripting:

    document.id("email").addEvent("change", function() {
        // create a class instance if it does not exist...
        var suggested = this.get("mailcheck").suggest();
        if (suggested) {
            // do something with the object
        }
        else {
            // we have nothing!
        }
    });

`suggested` is an object with the following properties:

    {
      user: 'dimitar',               // the address; part before the @ sign
      domain: 'googlemail.com',      // the suggested domain
      full: 'dimitar@googlemail.com' // the full suggested email
    }

`false` is returned when we don't know what to suggest.

Methodology
-----------
Mailcheck currently uses the [sift3](http://siderite.blogspot.com/2007/04/super-fast-and-accurate-string-distance.html) string similarity / distance algorithm by [Siderite](http://siderite.blogspot.com/).

As an alternative to the `String.distance` exported by `String.distance.js`, you can use [String.levenstein](http://mootools.net/forge/p/string_levenshtein), though the results may vary slightly.

Tests
-----

Via Buster.js, go to `test/index.html` to run.

You can also test via node. To install buster:

    # npm install -g buster
    
To start the static tester:    
    
    # buster static
    
To start in capture mode for multiple browsers:

    # buster server &

Once you have captured your target browsers, just run:

    # buster test

Standalone testing w/o browser capture is not supported yet, though you could probably try jsdom - edit buster.js config and give it a go. Also, you'd need the server only version of mootools.

Original Author
---------------

Derrick Ko ([@derrickko](http://twitter.com/derrickko))

License
-------

Licensed under the MIT License.