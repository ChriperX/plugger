//i decided to use extend for merging things
const extend = require('extend');
const concat = require('lodash.concat');

module.exports = function(plugin = [], reference, override = false) {
	try {
		//plugin = plugin.split(' '); //split plugins so you don't require multiple calls
		//plugin: array of the plugins to import

		for (var i = 0; i <= plugin.length - 1; i++) {
			var plug = plugin[i];

			//loop through the object that require() returns
			for (key in plug) {
				//if there is another isnstance of the value it merges it to avoid overriding
				if (reference[key] && !override) {
					//check if the variable is an object, so it can be merged
					if (typeof reference[key] === 'object' && !Array.isArray(reference[key])) {
						extend(reference[key], plug[key]);
					} else if (Array.isArray(reference[key])) {
						reference[key] = concat(reference[key], plug[key]);
					} else {
						//if it isn't an object don't so anything
						continue;
					}
				} else {
					//if override isn't set, just override the variable
					reference[key] = plug[key];
				}
			}
		}
	} catch (e) {
		return 1;
	}
};
