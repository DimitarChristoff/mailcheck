buster.testCase("String.distance tests", {
    setUp: function() {
        this.string = "gmail";
        this.distance1 = "gnail";
        this.distance2 = "gnails";
        this.toofar = "queen";
    },

    "Expect distance between two equal strings to be 0": function() {
        buster.assert.isTrue(String.distance(this.string, this.string) === 0);
    },

    "Expect distance between two strings with 1 typo to be 1": function() {
        buster.assert.isTrue(String.distance(this.string, this.distance1) === 1);
    },

    "Expect distance between two strings with 1 typo and 1 char difference to be 1.5": function() {
        console.log(String.distance(this.string, this.distance2));
        buster.assert.isTrue(String.distance(this.string, this.distance2) === 1.5);
    },

    "Expect distance between two unrelated strings to be length of base string": function() {
        buster.assert.isTrue(String.distance(this.string, this.foofar) === this.string.length);
    }



});


    buster.testCase("mailcheck.mootools tests", {
    setUp: function () {
        this.mailcheck = new Mailcheck(document.id('email'));
    },

    "Initial object >": {
        "Expect instance to be created": function() {
            buster.assert.isTrue(instanceOf(this.mailcheck, Mailcheck));
        },

        "Expect element to be valid": function() {
            buster.assert.isTrue(this.mailcheck.element == document.id('email'));
        }
    },

});