;(function (root, factory) {
	'use strict';

	if (typeof module === 'object' && typeof module.exports === 'object') {
		exports = module.exports = factory(root, document);
	} else if (typeof define === 'function' && define.amd) {
		define('changeTitleOnleave', factory);
	} else {
		root.changeTitleOnleave = factory(root, document);
	}
})(typeof window === 'undefined' ? this : window, function (window, document) {
	function handleVisibility(options) {
		const {timeout} = options;

		setTimeout(() => updateTitle(options), timeout * 1000);
	}

	function updateTitle(options) {
		const state = document.visibilityState;
		const title = options.title || document.title;

		if (state === 'hidden') {
			document.title = title;
		}

		if (state === 'visible') {
			document.title = document.title;
		}
	}

	return options => {
		window.addEventListener('visibilitychange', () => handleVisibility(options));
	};
});