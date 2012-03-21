/*
 ---

 name: String.distance

 description: provides the distance between a string and another string, based uponhttp://siderite.blogspot.com/2007/04/super-fast-and-accurate-string-distance.html

 authors: Dimitar Christoff

 license: MIT-style license.

 version: 1.0

 requires:
 - Core/String

 provides: String.distance

 ...
 */

!function() {
    'use strict'

    String.implement({
        distance: function(s2) {

            var s1 = String(this),
                c = 0,
                offset1 = 0,
                offset2 = 0,
                lcs = 0,
                maxOffset = 5,
                i = 0

            if (s1 == null || s1.length === 0) {
                if (s2 == null || s2.length === 0) {
                    return 0;
                } else {
                    return s2.length
                }
            }

            if (s2 == null || s2.length === 0) {
                return s1.length
            }


            while ((c + offset1 < s1.length) && (c + offset2 < s2.length)) {
                if (s1[c + offset1] == s2[c + offset2]) {
                    lcs++
                } else {
                    offset1 = 0
                    offset2 = 0
                    for (; i < maxOffset; i++) {
                        if ((c + i < s1.length) && (s1[c + i] == s2[c])) {
                            offset1 = i
                            break
                        }
                        if ((c + i < s2.length) && (s1[c] == s2[c + i])) {
                            offset2 = i
                            break
                        }
                    }
                }
                c++;
            }
            return (s1.length + s2.length) / 2 - lcs
        }
    })

}()