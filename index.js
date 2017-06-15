class ChangeTitleOnLeave {
	constructor(options) {
		this.resolveAttrs(options);
		this.listenVisibility();
	}

	resolveAttrs(options = {}) {
		this.title = document.title;

		this.options = options;
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
		const title = this.options.title || document.title;

		if (state === 'hidden') {
			document.title = title;
		}

		if (state === 'visible') {
			document.title = this.title;
		}
	}
}

module.exports = ChangeTitleOnLeave;

