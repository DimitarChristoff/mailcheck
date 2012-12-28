mailcheck.js
=====================

A rewrite of the jQuery plugin that suggests a right domain when your users misspell it in an email address.

[![endorse](http://api.coderwall.com/dimitarchristoff/endorsecount.png)](http://coderwall.com/dimitarchristoff)

What does it do?
----------------

When a user types in "user@hotnail.con", Mailcheck will suggest "user@hotmail.com".

![diagram](http://github.com/Kicksend/mailcheck/raw/master/doc/example.png?raw=true)

This works based upon a pre-populated array of popular domain names. See it live in action on this jsfiddle [here](http://jsfiddle.net/dimitar/jSn3e/).


How to use
----------

This plugin has been created to work at a lower level, it works with an element but it does not attach events or handle suggestions.
You should extend the class to get that behavior or work with the instance.

Get Mootools. Have a text field.

```html
<input id="email" name="email" type="text" value="dimitar@gogolemail.com" />
```

Now, attach Mailcheck to the text field. Remember to declare an array of domains you want to check against.

```javascript
// it can create an instance on the fly for you based upon a special Element getter
var suggested = document.id("email").get("mailcheck").suggest();
if (suggested) {
    // do something with the object
}
else {
    // we have nothing!
}
```

...or use a proper class instantiation as part of scripting:

```javascript
// it can create an instance on the fly for you
var mailcheck = new Mailcheck(document.id('email', {
    domains: ['hotmail.com', 'gmail.com', 'aol.com'],
    threshold: 2,
    method: 'sift3' // sift3 or 'levenstein' (default)
});

// add a change event to the field
document.id("email").addEvent("change", function() {
    var suggested = mailcheck.suggest();
    if (suggested) {
        // do something with the object
    }
    else {
        // we have nothing!
    }
});
```

A combination of both for quick scripting:

```javascript
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
```

`suggested` is an object with the following properties:

    {
      user: 'dimitar',               // the address; part before the @ sign
      domain: 'googlemail.com',      // the suggested domain
      full: 'dimitar@googlemail.com' // the full suggested email
    }

`false` is returned when we don't know what to suggest.

Methodology
-----------
Mailcheck currently supports the [sift3](http://siderite.blogspot.com/2007/04/super-fast-and-accurate-string-distance.html) string similarity / distance algorithm by [Siderite](http://siderite.blogspot.com/) and
`String.levenstein`, though the results may vary slightly. Levenstein is now the default as a more reliable result.

Creating a domain list
----------------------
Dependent on where you are, the list of domains will differ. If the default list of corrected domains does not work for you,
you can use this sample mysql query to extract your most common domain names from your user database:

```mysql
SELECT
	substring_index(email, '@', -1), COUNT(*) as c
FROM users
 	where email != ''
GROUP BY
 	substring_index(email, '@', -1)
ORDER BY
	c DESC limit 50;
```

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

More details on testing in `the tests/README.md`, including examples.

Credits
-------

- Original plugin / idea by Derrick Ko ([@derrickko](http://twitter.com/derrickko))

License
-------

Licensed under the MIT License. You are not allowed to [use mailcheck for evil](http://www.youtube.com/watch?v=-hCimLnIsDA)