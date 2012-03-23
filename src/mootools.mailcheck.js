/*
 ---

 name: mootools.mailcheck

 description: checks emails for typos based upon a control array of common domains

 authors: Dimitar Christoff

 port: https://github.com/Kicksend/mailcheck

 license: MIT-style license.

 version: 1.02

 requires:
 - Core/String
 - String.distance
 - Core/Element
 - Core/Class

 provides: Mailcheck

 ...
 */

!function() {

    var Mailcheck = this.Mailcheck = new Class({

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
            // check String.distance.js - supported: 'distance' (sift3, issues in IE6/7), 'levenstein' (slower but consistent)
            method: 'levenstein'
        },

        cache: {},

        initialize: function(element, options){
            this.element = document.id(element)
            this.setOptions(options)
        },

        suggest: function(){
            var value = this.element.get('value').clean(),
                parts = value.split('@'),
                closestDomain,
                userBit,
                domainBit

            if (parts.length < 2)
                return false

            domainBit = parts.pop().toLowerCase()
            userBit = parts.join('@')

            closestDomain = typeof this.cache[domainBit] !== 'undefined' ? this.cache[domainBit] : this.findClosestDomain(domainBit)

            return (closestDomain) ? {
                user: userBit,
                domain: closestDomain,
                full: [userBit, closestDomain].join('@')
            } : false
        },

        findClosestDomain: function(domain){
            var dist,
                minDist = 99,
                closestDomain,
                domains = this.options.domains,
                i = 0,
                len = domains.length

            this.cache[domain] = false

            for (;i < len; ++i) {
                if (domain === domains[i]) return false
                dist = String[this.options.method](domain, domains[i])
                dist < minDist && (minDist = dist) && (closestDomain = domains[i])
            }

            if (minDist <= this.options.threshold && closestDomain)
                this.cache[domain] = closestDomain

            return this.cache[domain]
        }

    })

    Element.Properties.mailcheck = {

        set: function(options){
            this.get('mailcheck').setOptions(options);
            return this
        },

        get: function(){
            var mailcheck = this.retrieve('mailcheck')
            if (!mailcheck) {
                mailcheck = new Mailcheck(this)
                this.store('mailcheck', mailcheck)
            }
            return mailcheck
        }

    }


}()