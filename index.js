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
	const documentTitle = document.title;

	function handleVisibility(options) {
		const state = document.visibilityState;
		const {timeout, onHidden, title} = options || 0;

		if (state === 'hidden') {
			setTimeout(() => {
				document.title = 'opa';
			}, timeout);
		}

		if (state === 'visible') {
			setTimeout(() => {
				document.title = documentTitle;
			}, timeout);
		}
	}

	return options => {
		window.addEventListener('visibilitychange', () => {
			handleVisibility(options);
		});
	};
});