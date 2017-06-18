class ChangeTitleOnLeave {
	constructor(options) {
		this.resolveAttrs(options);
		this.listenVisibility();
	}

	resolveAttrs(options = {}) {
		this.title = document.title;
		this.options = {};

		if (! options.title || options.title === '') {
			throw Error('The `title` is required and must be a non-empty string.');
		}

		this.options.title = options.title;
		this.options.timeout = typeof options.timeout === 'number' ? options.timeout : 0;
		this.options.onHidden = typeof options.onHidden === 'function' ? options.onHidden : null;
		this.options.onVisible = typeof options.onVisible === 'function' ? options.onVisible : null;
	}

	listenVisibility() {
		window.addEventListener('visibilitychange', () => this.handleVisibility());
	}

	handleVisibility() {
		const {timeout} = this.options;

		setTimeout(() => this.updateTitle(), timeout * 1000);
	}

	updateTitle() {
		const state = document.visibilityState;
		const {title, onHidden, onVisible} = this.options;

		if (state === 'hidden') {
			document.title = title;
			this.useCallback(onHidden);
		}

		if (state === 'visible') {
			document.title = this.title;
			this.useCallback(onVisible);
		}
	}

	useCallback(callable) {
		if (typeof callable !== 'function') return;

		callable();
	}
}

module.exports = ChangeTitleOnLeave;

