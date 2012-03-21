/*
 ---

 name: mootools.mailcheck

 description: checks emails for typos based upon a control array of common domains

 authors: Dimitar Christoff

 port: https://github.com/Kicksend/mailcheck

 license: MIT-style license.

 version: 1

 requires:
 - Core/String
 - String.distance
 - Core/Event
 - Core/Element
 - Core/Array
 - Core/Class

 provides: Mailcheck

 ...
 */

!function() {

    'use strict'

    var Mailcheck = this.Mailcheck = new Class({

        Implements: [Options,Events],

        options: {
            domains: [
                'hotmail.com',
                'hotmail.co.uk',
                'gmail.com',
                'googlemail.com',
                'yahoo.com',
                'yahoo.co.uk',
                'securemail.com',
                'gmx.net',
                'facebook.com'
            ],
            threshold: 2
        },


        initialize: function(element, options){
            this.element = document.id(element)
            this.setOptions(options)
        },

        suggest: function(){
            var value = this.element.get('value').clean(),
                parts = value.split('@'),
                closestDomain

            if (parts.length != 2)
                return false

            closestDomain = this.findClosestDomain(parts[1])

            return (closestDomain) ? {
                address: parts[0],
                domain: closestDomain,
                full: [parts[0], '@', closestDomain].join('')
            } : false
        },

        findClosestDomain: function(domain){
            var dist,
                minDist = 99,
                closestDomain,
                domains = this.options.domains,
                i = 0,
                len = domains.length

            for (;i < len; ++i) {
                dist = String.distance(domain, domains[i])
                dist < minDist && (minDist = dist) && (closestDomain = domains[i])
            }

            return minDist <= this.options.threshold && closestDomain && closestDomain !== domain ? closestDomain : false

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

    };


}()