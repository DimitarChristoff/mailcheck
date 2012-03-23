if (typeof require == "function" && typeof module == "object") {
    buster = require("buster");
}


buster.testCase("String.distance tests", {
    setUp: function() {
        this.string = "gmail";
        this.distance1 = "gnail";
        this.distance2 = "gnails";
        this.toofar = "queen";
    },

    "Expect distance between two equal strings to be 0": function() {
        buster.assert.equals(String.distance(this.string, this.string), 0);
    },

    "Expect distance between two strings with 1 typo to be 1": function() {
        buster.assert.equals(String.distance(this.string, this.distance1), 1);
    },

    "Expect distance between two strings with 1 typo and 1 char difference to be 1.5": function() {
        buster.assert.equals(String.distance(this.string, this.distance2), 1.5);
    },

    "Expect distance between two unrelated strings to be length of base string": function() {
        buster.assert.equals(String.distance(this.string, this.toofar), this.string.length);
    }
});

buster.testCase("String.levenstein tests", {
    setUp: function() {
        this.string = "gmail";
        this.distance1 = "gnail";
        this.distance2 = "gnails";
        this.toofar = "queen";
    },

    "Expect distance between two equal strings to be 0": function() {
        buster.assert.equals(String.levenstein(this.string, this.string), 0);
    },

    "Expect distance between two strings with 1 typo to be 1": function() {
        buster.assert.equals(String.levenstein(this.string, this.distance1), 1);
    },

    "Expect distance between two strings with 1 typo and 1 char difference to be 2": function() {
        buster.assert.equals(String.levenstein(this.string, this.distance2), 2);
    },

    "Expect distance between two unrelated strings to be length of base string": function() {
        buster.assert.equals(String.levenstein(this.string, this.toofar), this.string.length);
    }
});


buster.testCase("mailcheck.mootools distance tests", {
    setUp: function () {
        this.mailcheck = new Mailcheck(new Element("input#email"));
    },

    "Initial object >": {
        "Expect instance to be created": function() {
            buster.assert.isTrue(instanceOf(this.mailcheck, Mailcheck));
        },

        "Expect element to be valid": function() {
            buster.assert.equals(this.mailcheck.element.get("id"), "email");
        }
    },

    "Working with emails >": {
        setUp: function() {
            this.mailcheck.setOptions({
                threshold: 2
            });
        },

        "Expect an empty string not to produce results": function() {
            this.mailcheck.element.set("value", "");
            buster.assert.isFalse(this.mailcheck.suggest());
        },

        "Expect an incomplete email address w/o a domain part not to produce a result": function() {
            this.mailcheck.element.set("value", "gmail.com");
            buster.assert.isFalse(this.mailcheck.suggest());
        },

        "Expect a recognised domain not to produce a suggestion (gmail.com)": function() {
            this.mailcheck.element.set("value", "test@gmail.com");
            buster.assert.isFalse(this.mailcheck.suggest());
        },

        "Expect a typo in domain to produce a suggestion (gnail.com -> gmail.com)": function() {
            this.mailcheck.element.set("value", "test@gnail.com");
            buster.assert.equals(this.mailcheck.suggest()['domain'], 'gmail.com');
        },

        "Expect a typo in domain NOT to produce a suggestion with default threshold of 2 (gnails.com -> gmail.com)": function() {
            this.mailcheck.element.set("value", "test@gnails.com");
            buster.refute.equals(this.mailcheck.suggest()['domain'], 'gmail.com');
        },

        "Expect a typo in domain to produce a suggestion with custom threshold of 3 (gmail.org -> gmail.com)": function() {
            this.mailcheck.setOptions({
                threshold: 3
            });
            this.mailcheck.element.set("value", "test@gmail.org");
            buster.assert.equals(this.mailcheck.suggest()['domain'], 'gmail.com');
        },

        "Expect uppercase user input not to matter to suggestions": function() {
            this.mailcheck.element.set("value", "TEST@HOTNAIL.COM");
            buster.assert.equals(this.mailcheck.suggest()['domain'], 'hotmail.com');
        },

        "Expect obscure RFC compatible emails like \"foo@bar\"@gnail.com to produce a valid suggestion": function() {
            this.mailcheck.element.set("value", "\"foo@bar\"@gnail.com");
            buster.assert.equals(this.mailcheck.suggest()['domain'], 'gmail.com');
        },

        "Expect cache to store look-up for faster future reference": function() {
            this.mailcheck.element.set("value", "\"foo@bar\"@gnail.com");
            this.mailcheck.suggest();
            buster.assert.equals(this.mailcheck.cache['gnail.com'], 'gmail.com');
        },

        "Expect cache to store look-up failures for faster future reference": function() {
            this.mailcheck.element.set("value", "\"foo@bar\"@blabla.com");
            this.mailcheck.suggest();
            buster.assert.isFalse(this.mailcheck.cache['blabla.com']);
        }

    }
});

buster.testCase("mailcheck.mootools levenstein tests", {
    setUp: function () {
        this.mailcheck = new Mailcheck(new Element("input#email"), {
            method: "levenstein"
        });
    },

    "Initial object >": {
        "Expect instance to be created": function() {
            buster.assert.isTrue(instanceOf(this.mailcheck, Mailcheck));
        },

        "Expect element to be valid": function() {
            buster.assert.equals(this.mailcheck.element.get("id"), "email");
        }
    },

    "Working with emails >": {
        setUp: function() {
            this.mailcheck.setOptions({
                threshold: 2
            });
        },

        "Expect an empty string not to produce results": function() {
            this.mailcheck.element.set("value", "");
            buster.assert.isFalse(this.mailcheck.suggest());
        },

        "Expect an incomplete email address w/o a domain part not to produce a result": function() {
            this.mailcheck.element.set("value", "gmail.com");
            buster.assert.isFalse(this.mailcheck.suggest());
        },

        "Expect a recognised domain not to produce a suggestion (gmail.com)": function() {
            this.mailcheck.element.set("value", "test@gmail.com");
            buster.assert.isFalse(this.mailcheck.suggest());
        },

        "Expect a typo in domain to produce a suggestion (gnail.com -> gmail.com)": function() {
            this.mailcheck.element.set("value", "test@gnail.com");
            buster.assert.equals(this.mailcheck.suggest()['domain'], 'gmail.com');
        },

        "Expect a typo in domain NOT to produce a suggestion with default threshold of 2 (gnails.con -> gmail.com)": function() {
            this.mailcheck.element.set("value", "test@gnails.con");
            buster.refute.equals(this.mailcheck.suggest()['domain'], 'gmail.com');
        },

        "Expect a typo in domain to produce a suggestion with custom threshold of 3 (gmail.org -> gmail.com)": function() {
            this.mailcheck.setOptions({
                threshold: 3
            });
            this.mailcheck.element.set("value", "test@gmail.org");
            buster.assert.equals(this.mailcheck.suggest()['domain'], 'gmail.com');
        },

        "Expect uppercase user input not to matter to suggestions": function() {
            this.mailcheck.element.set("value", "TEST@HOTNAIL.COM");
            buster.assert.equals(this.mailcheck.suggest()['domain'], 'hotmail.com');
        },

        "Expect obscure RFC compatible emails like \"foo@bar\"@gnail.com to produce a valid suggestion": function() {
            this.mailcheck.element.set("value", "\"foo@bar\"@gnail.com");
            buster.assert.equals(this.mailcheck.suggest()['domain'], 'gmail.com');
        },

        "Expect cache to store look-up for faster future reference": function() {
            this.mailcheck.element.set("value", "\"foo@bar\"@gnail.com");
            this.mailcheck.suggest();
            buster.assert.equals(this.mailcheck.cache['gnail.com'], 'gmail.com');
        },

        "Expect cache to store look-up failures for faster future reference": function() {
            this.mailcheck.element.set("value", "\"foo@bar\"@blabla.com");
            this.mailcheck.suggest();
            buster.assert.isFalse(this.mailcheck.cache['blabla.com']);
        }

    }
});