/*\
title: $:/core/modules/filters/all/tags.js
type: application/javascript
module-type: allfilteroperator

Filter function for [all[tags]]

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Export our filter function
*/
exports.tags = function(source,prefix,options) {
	return Object.keys(options.wiki.getTagMap());
};

})();
