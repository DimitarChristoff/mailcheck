/*
---

name: mailcheck

description: checks emails for typos based upon a control array of common domains

authors: Dimitar Christoff

port: https://github.com/Kicksend/mailcheck

license: MIT-style license.

version: 0.0.2

requires:
- Core/String
- String.distance
- Core/Element
- Core/Class

provides: Mailcheck

...
*/

/*jshint mootools:true */
(function(exports){
	'use strict';

	// global cache for all instances
	var cache = {},
		wrap;

	// universal wrap for AMD or global object export
	wrap = function(){
		var Mailcheck = new Class({

			Implements: [Options],

			options: {
				domains: [
					'aol.co.uk',
					'aol.com',
					'blueyonder.co.uk',
					'bt.com',
					'btconnect.com',
					'btinternet.com',
					'btopenworld.com',
					'dsl.pipex.com',
					'fsmail.net',
					'gmail.com',
					'gmx.co.uk',
					'gmx.com',
					'googlemail.com',
					'homecall.co.uk',
					'hotmail.com',
					'hotmail.co.uk',
					'lineone.net',
					'live.co.uk',
					'live.com',
					'mac.com',
					'madasafish.com',
					'mail.com',
					'me.com',
					'msn.com',
					'mypostoffice.co.uk',
					'nhs.net',
					'ntlworld.com',
					'o2.co.uk',
					'o2.pl',
					'onetel.com',
					'orange.net',
					'rocketmail.com',
					'sky.com',
					'supanet.com',
					'talk21.com',
					'talktalk.net',
					'tesco.net',
					'tinyworld.co.uk',
					'tiscali.co.uk',
					'toucansurf.com',
					'uwclub.net',
					'virgin.net',
					'virginmedia.com',
					'waitrose.com',
					'wp.pl',
					'yahoo.co.in',
					'yahoo.co.uk',
					'yahoo.com',
					'ymail.com'
				],
				threshold: 2,
				// check string-distance.js - supported: 'sift3', 'levenstein'
				method: 'levenstein'
			},

			initialize: function(element, options){
				this.element = document.id(element);
				this.setOptions(options);
				// expose cache locally to instance
				this.cache = cache;
			},

			suggest: function(){
				var value = this.element.get('value').clean(),
					parts = value.split('@'),
					closestDomain,
					userBit,
					domainBit;

				if (parts.length < 2)
					return false;

				domainBit = parts.pop().toLowerCase();
				userBit = parts.join('@');

				closestDomain = typeof cache[domainBit] !== 'undefined' ? cache[domainBit] : this.findClosestDomain(domainBit);

				return (closestDomain) ? {
					user: userBit,
					domain: closestDomain,
					full: [userBit, closestDomain].join('@')
				} : false;
			},

			findClosestDomain: function(domain){
				var dist,
					minDist = 99,
					closestDomain,
					domains = this.options.domains,
					i = 0,
					len = domains.length;

				cache[domain] = false;

				for (; i < len; ++i){
					if (domain === domains[i]) return false;
					dist = String[this.options.method](domain, domains[i]);
					dist < minDist && (minDist = dist) && (closestDomain = domains[i]);
				}

				if (minDist <= this.options.threshold && closestDomain)
					cache[domain] = closestDomain;

				return cache[domain];
			}

		});

		Element.Properties.mailcheck = {

			set: function(options){
				this.get('mailcheck').setOptions(options);
				return this;
			},

			get: function(){
				var mailcheck = this.retrieve('mailcheck');
				if (!mailcheck){
					mailcheck = new Mailcheck(this);
					this.store('mailcheck', mailcheck);
				}
				return mailcheck;
			}

		};

		return Mailcheck;
	}; // end wrap

	if (typeof define === 'function' && define.amd){
		// require string-distance methods to have loaded on the prototype
		define(['string-distance'], wrap);
	}
	else {
		// assume no requirejs and that string methods are loaded already
		exports.Mailcheck = wrap();
	}

}(this));