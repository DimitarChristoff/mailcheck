mootools.mailcheck.js
=====================

A port of a jQuery plugin that suggests a right domain when your users misspell it in an email address.

What does it do?
----------------

When your user types in "user@hotnail.con", Mailcheck will suggest "user@hotmail.com".

![diagram](http://github.com/Kicksend/mailcheck/raw/master/doc/example.png?raw=true)

See it live in action on this jsfiddle [here](http://jsfiddle.net/dimitar/jSn3e/).


Usage
-----

This is low level, it works with an element but it does not attach events or handle suggestions.
You should extend the class to get that behavior or work with the instance.

Get Mootools. Have a text field.

```html
<input id="email" name="email" type="text" value="dimitar@gogolemail.com" />
```

Now, attach Mailcheck to the text field. Remember to declare an array of domains you want to check against.

```javascript
// it can create an instance on the fly for you
var suggested = document.id("email").get("mailcheck").suggest();
if (suggested) {
    // do something with the object
}
else {
    // we have nothing!
}
```

or use a proper class instantiation as part of scripting:

```javascript
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
```

a combination of both for quick scripting:

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


`suggested` is an object with the following members:

    {
      address: 'dimitar',            // the address; part before the @ sign
      domain: 'googlemail.com',      // the suggested domain
      full: 'dimitar@googlemail.com' // the full suggested email
    }

`false` is returned when we don't know what to suggest.

Customization
-------------
Mailcheck currently uses the [sift3](http://siderite.blogspot.com/2007/04/super-fast-and-accurate-string-distance.html) string similarity algorithm by [Siderite](http://siderite.blogspot.com/).


Tests
-----

Via Buster.js, go to `test/index.html` to run. Also supported via node:

    npm install buster

In project folder, type:

    buster test

Original Author
---------------

Derrick Ko ([@derrickko](http://twitter.com/derrickko))

License
-------

Licensed under the MIT License.
