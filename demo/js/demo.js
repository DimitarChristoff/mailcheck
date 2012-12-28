require.config({
	baseUrl: '../src'
});

require(['mailcheck'], function(Mailcheck){
	document.id("email").addEvent("change", function() {
		// create a class instance if it does not exist, get suggestions...
		var suggested = this.get("mailcheck").suggest(), self = this;

		// have a hint div underneath
		var hint = this.retrieve("hint") || new Element("div.hint", {
			events: {
				"click:relay(a.confirm)": function(e) {
					e & e.stop();
					self.set('value', this.get('text'));
					hint.empty();
				}
			}
		}).inject(this, 'after');
		this.store("hint", hint);

		// now see what is being suggested
		if (suggested) {
			hint.set('html', 'Did you mean <a href="#" class="confirm">{full}</a>?'.substitute(suggested));
		}
		else {
			// we have nothing!
			hint.empty();
		}
	});

	document.getElement("pre").set("html", Mailcheck.prototype.options.domains.join("\n"));
});