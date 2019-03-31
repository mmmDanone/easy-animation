class EasyAnimation {
	constructor(prefix) {
		if(typeof prefix !== 'undefined') {
			this.prefix = prefix;
		}
		if(this._rAF && this._cAF && this._supportTransition) {
			return;
		}

		let self = EasyAnimation.prototype;

		self._rAF = (function() {
			return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			false;
		})();

		self._cAF = (function() {
			return window.cancelAnimationFrame ||
			window.webkitCancelAnimationFrame ||
			window.msCancelAnimationFrame ||
			window.mozCancelAnimationFrame ||
			window.webkitCancelRequestAnimationFrame ||
			false;
		})();

		if(this._rAF && this._cAF) {
			self._rAF = this._rAF.bind(window);
			self._cAF = this._cAF.bind(window);
		}

		let checkTransition = document.createElement('div').style.transition;
		self._supportTransition = (typeof checkTransition !== 'undefined' && this._rAF && this._cAF) ? true :false;
	}

	set prefix(prefix) {
		this.enter = prefix + '-enter';
		this.enterActive = prefix + '-enter-active';
		this.enterTo = prefix + '-enter-to';

		this.leave = prefix + '-leave';
		this.leaveActive = prefix + '-leave-active';
		this.leaveTo = prefix + '-leave-to';
	}

	transition(element, callback = null) {
		if(!element.style.display){
			element.style.display = window.getComputedStyle(element).display;
		}

		if(!this._supportTransition) {
			if(element.style.display === 'block') {
				if(typeof callback === 'function') {
					callback({element: element, type: 'hide', when: 'before', related: false});
				}
				element.style.display = 'none'
				if(typeof callback === 'function') {
					callback({element: element, type: 'hide', when: 'after', related: false});
				}
			} else {
				if(typeof callback === 'function') {
					callback({element: element, type: 'show', when: 'before', related: false});
				}
				element.style.display = 'block';
				if(typeof callback === 'function') {
					callback({element: element, type: 'show', when: 'after', related: false});
				}
			}
			return;
		}

		(element.style.display === 'block') ? this._hideTransition(element, callback) : this._showTransition(element, callback);
	}

	transitionInsert(targetInsert, newElement, before = null, callback = null) {
		if(!targetInsert.style.display){
			targetInsert.style.display = window.getComputedStyle(targetInsert).display;
		}

		if(!this._supportTransition || targetInsert.style.display === 'none') {
			if(typeof callback === 'function') {
				callback({element: newElement, type: 'insert', when: 'before', related: false});
			}
			targetInsert.insertBefore(newElement, before);
			if(typeof callback === 'function') {
				callback({element: newElement, type: 'insert', when: 'after', related: false});
			}
			return;
		}

		this._showTransitionInsert(targetInsert, newElement, before, callback);
	}

	transitionRemove(element, callback = null) {
		if(element.animationProcessing === 'hide') {
			return;
		}

		let parentElement = element.parentElement;

		if(!parentElement.style.display){
			parentElement.style.display = window.getComputedStyle(parentElement).display;
		}

		if(!this._supportTransition || parentElement.style.display === 'none') {
			if(typeof callback === 'function') {
				callback({element: element, type: 'remove', when: 'before', related: false});
			}
			element.parentElement.removeChild(element);
			if(typeof callback === 'function') {
				callback({element: element, type: 'remove', when: 'after', related: false});
			}
			return;
		}

		this._hideTransitionRemove(element, callback);
	}

	_showTransition(element, callback) {
		if(element.animationProcessing === 'hide') {
			if(typeof callback === 'function') {
				callback({element: element, type: 'show', when: 'before', related: true});
			}
			element.removeEventListener('transitionend', element.bindEnd);

			this._classesControl(element, 'remove', [this.leave, this.leaveActive, this.leaveTo]);
			this._classesControl(element, 'add', [this.enterActive, this.enterTo]);
		} else {
			if(typeof callback === 'function') {
				callback({element: element, type: 'show', when: 'before', related: false});
			}
			this._classesControl(element, 'add', [this.enter]);
			element.style.display = 'block';

			this._forNextFrame(() => {
				this._classesControl(element, 'add', [this.enterActive, this.enterTo]);
				this._classesControl(element, 'remove', [this.enter]);
			});
		}

		element.animationProcessing = 'show';

		element.bindEnd = this._afterAnimation.bind(this, this.enterActive, this.enterTo, 'show', callback);
		element.addEventListener('transitionend', element.bindEnd);
	}

	_hideTransition(element, callback) {
		if(element.animationProcessing === 'show') {
			if(typeof callback === 'function') {
				callback({element: element, type: 'hide', when: 'before', related: true});
			}
			element.removeEventListener('transitionend', element.bindEnd);

			this._classesControl(element, 'remove', [this.enter, this.enterActive, this.enterTo]);
			this._classesControl(element, 'add', [this.leaveActive, this.leaveTo]);
		} else if(element.animationProcessing === 'hide') {
			this._showTransition(element, callback);
			return;
		} else {
			if(typeof callback === 'function') {
				callback({element: element, type: 'hide', when: 'before', related: false});
			}
			this._classesControl(element, 'add', [this.leave]);

			this._forNextFrame(() => {
				this._classesControl(element, 'add', [this.leaveActive, this.leaveTo]);
				this._classesControl(element, 'remove', [this.leave]);
			});
		}

		element.animationProcessing = 'hide';

		element.bindEnd = this._afterAnimation.bind(this, this.leaveActive, this.leaveTo, 'hide', callback);
		element.addEventListener('transitionend', element.bindEnd);
	}

	_showTransitionInsert(targetInsert, newElement, before, callback) {
		newElement.animationProcessing = 'show';
		if(typeof callback === 'function') {
			callback({element: newElement, type: 'insert', when: 'before', related: false});
		}

		this._classesControl(newElement, 'add', [this.enter]);
		targetInsert.insertBefore(newElement, before);

		this._forNextFrame(() => {
			this._classesControl(newElement, 'add', [this.enterActive, this.enterTo]);
			this._classesControl(newElement, 'remove', [this.enter]);
		});

		newElement.bindEnd = this._afterAnimation.bind(this, this.enterActive, this.enterTo, 'insert', callback);
		newElement.addEventListener('transitionend', newElement.bindEnd);
	}

	_hideTransitionRemove(element, callback) {
		if(element.animationProcessing === 'show') {
			if(typeof callback === 'function') {
				callback({element: element, type: 'remove', when: 'before', related: true});
			}
			element.removeEventListener('transitionend', element.bindEnd);

			this._classesControl(element, 'remove', [this.enter, this.enterActive, this.enterTo]);
			this._classesControl(element, 'add', [this.leaveActive, this.leaveTo]);
		} else {
			if(typeof callback === 'function') {
				callback({element: element, type: 'remove', when: 'before', related: false});
			}
			this._classesControl(element, 'add', [this.leave]);

			this._forNextFrame(() => {
				this._classesControl(element, 'add', [this.leaveActive, this.leaveTo]);
				this._classesControl(element, 'remove', [this.leave]);
			});
		}

		element.animationProcessing = 'hide';

		element.bindEnd = this._afterAnimation.bind(this, this.leaveActive, this.leaveTo, 'remove', callback);
		element.addEventListener('transitionend', element.bindEnd);
	}

	_afterAnimation(classActive, classTo, type, callback, e) {
		let element = e.currentTarget;
		delete element.animationProcessing;

		if(type === 'show') {
			if(typeof callback === 'function') {
				callback({element: element, type: 'show', when: 'after', related: false});
			}
		}

		if(type === 'hide') {
			element.style.display = 'none';
			if(typeof callback === 'function') {
				callback({element: element, type: 'hide', when: 'after', related: false});
			}
		}

		if(type === 'insert') {
			if(typeof callback === 'function') {
				callback({element: element, type: 'insert', when: 'after', related: false});
			}
		}

		this._classesControl(element, 'remove', [classActive, classTo]);

		if(type === 'remove') {
			element.parentElement.removeChild(element);
			if(typeof callback === 'function') {
				callback({element: element, type: 'remove', when: 'after', related: false});
			}
		}

		element.removeEventListener('transitionend', element.bindEnd);
		delete element.bindEnd;
	}

	_classesControl(element, type, classes) {
		for (let i = 0, len = classes.length; i < len; i++) {
			element.classList[type](classes[i]);
		}
	}

	_forNextFrame(callback) {
		this._rAF(() => {
			this._rAF(() => {
				callback();
			});
		});
	}
}