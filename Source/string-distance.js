/*
---

name: string-distance

description: provides ways of measuring the relative distance between a string and another string

authors: Dimitar Christoff

license: MIT-style license.

version: 0.0.2

requires:
- Core/String

provides: String.sift3, String.levenstein

...
*/

/*jshint mootools:true */
(function(){
	'use strict';

	var wrap = function(){
		String.implement({
			sift3: function(s2){
				// sift3 - http://siderite.blogspot.com/2007/04/super-fast-and-accurate-string-distance.html
				var s1 = String(this),
					c = 0,
					offset1 = 0,
					offset2 = 0,
					lcs = 0,
					maxOffset = 5,
					i = 0;

				if (s1 == null || s1.length === 0){
					if (s2 == null || s2.length === 0){
						return 0;
					} else {
						return s2.length;
					}
				}

				if (s2 == null || s2.length === 0){
					return s1.length;
				}


				while ((c + offset1 < s1.length) && (c + offset2 < s2.length)){
					if (s1.charAt(c + offset1) == s2.charAt(c + offset2)){
						lcs++;
					} else {
						offset1 = 0;
						offset2 = 0;
						for (; i < maxOffset; i++){
							if ((c + i < s1.length) && (s1.charAt(c + i) == s2.charAt(c))){
								offset1 = i;
								break;
							}
							if ((c + i < s2.length) && (s1.charAt(c) == s2.charAt(c + i))){
								offset2 = i;
								break;
							}
						}
					}
					c++;
				}
				return (s1.length + s2.length) / 2 - lcs;
			},

			levenstein: function(str2){
				// distance by levenstein, seems more reliable
				str2 = str2.split("");
				var str1 = String(this).split(""),
					distance = [],
					l = str1.length,
					m = str2.length,
					i,
					j;

				for (i = 0; i <= l; i++)
					distance[i] = [i];

				for (j = 0; j <= m; j++)
					distance[0][j] = j;

				for (i = 1; i <= l; i++)
					for (j = 1; j <= m; j++)
						distance[i][j] = Math.min(distance[i - 1][j] + 1, distance[i][j - 1] + 1, distance[i - 1][j - 1] + ((str1[i - 1] == str2[j - 1]) ? 0 : 1));

				return distance[l][m];
			}
		});
	}; // end wrap

	if (typeof define === 'function' && define.amd){
		// define as module for later use
		define(wrap);
	}
	else {
		// assume no requirejs and that string methods, just prototype String type
		wrap();
	}

}());