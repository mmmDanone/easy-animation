(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.index = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  var EasyAnimation =
  /*#__PURE__*/
  function () {
    function EasyAnimation(prefix, callback) {
      if (typeof prefix === 'string') {
        this.prefix = prefix;
      }

      if (typeof callback === 'function') {
        this.callback = callback;
      }

      if (this._rAF && this._cAF && this._supportTransition) {
        return;
      }

      var self = EasyAnimation.prototype;

      self._rAF = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || false;
      }();

      self._cAF = function () {
        return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || false;
      }();

      if (this._rAF && this._cAF) {
        self._rAF = this._rAF.bind(window);
        self._cAF = this._cAF.bind(window);
      }

      var checkTransition = document.createElement('div').style.transition;
      self._supportTransition = typeof checkTransition !== 'undefined' && this._rAF && this._cAF ? true : false;
    }

    var _proto = EasyAnimation.prototype;

    _proto.transition = function transition(element, callback) {
      if (callback === void 0) {
        callback = null;
      }

      if (!element.style.display) {
        element.style.display = window.getComputedStyle(element).display;
      }

      if (!this._supportTransition) {
        if (element.style.display === 'block') {
          this._callBack(callback, element, 'hide', 'before', false);

          element.style.display = 'none';

          this._callBack(callback, element, 'hide', 'after', false);
        } else {
          this._callBack(callback, element, 'show', 'before', false);

          element.style.display = 'block';

          this._callBack(callback, element, 'show', 'after', false);
        }

        return;
      }

      element.style.display === 'block' ? this._hideTransition(element, callback) : this._showTransition(element, callback);
    };

    _proto.transitionInsert = function transitionInsert(targetInsert, newElement, before, callback) {
      if (before === void 0) {
        before = null;
      }

      if (callback === void 0) {
        callback = null;
      }

      if (!targetInsert.style.display) {
        targetInsert.style.display = window.getComputedStyle(targetInsert).display;
      }

      if (!this._supportTransition || targetInsert.style.display === 'none') {
        this._callBack(callback, newElement, 'insert', 'before', false);

        targetInsert.insertBefore(newElement, before);

        this._callBack(callback, newElement, 'insert', 'after', false);

        return;
      }

      this._showTransitionInsert(targetInsert, newElement, before, callback);
    };

    _proto.transitionRemove = function transitionRemove(element, callback) {
      if (callback === void 0) {
        callback = null;
      }

      if (element.animationProcessing === 'hide') {
        return;
      }

      var parentElement = element.parentElement;

      if (!parentElement.style.display) {
        parentElement.style.display = window.getComputedStyle(parentElement).display;
      }

      if (!this._supportTransition || parentElement.style.display === 'none') {
        this._callBack(callback, element, 'remove', 'before', false);

        element.parentElement.removeChild(element);

        this._callBack(callback, element, 'remove', 'after', false);

        return;
      }

      this._hideTransitionRemove(element, callback);
    };

    _proto._showTransition = function _showTransition(element, callback) {
      var _this = this;

      if (element.animationProcessing === 'hide') {
        this._callBack(callback, element, 'show', 'before', true);

        element.removeEventListener('transitionend', element.bindEnd);

        this._classesControl(element, 'remove', [this.leave, this.leaveActive, this.leaveTo]);

        this._classesControl(element, 'add', [this.enterActive, this.enterTo]);
      } else {
        this._callBack(callback, element, 'show', 'before', false);

        this._classesControl(element, 'add', [this.enter]);

        element.style.display = 'block';

        this._forNextFrame(function () {
          _this._classesControl(element, 'add', [_this.enterActive, _this.enterTo]);

          _this._classesControl(element, 'remove', [_this.enter]);
        });
      }

      element.animationProcessing = 'show';
      element.bindEnd = this._afterAnimation.bind(this, this.enterActive, this.enterTo, 'show', callback);
      element.addEventListener('transitionend', element.bindEnd);
    };

    _proto._hideTransition = function _hideTransition(element, callback) {
      var _this2 = this;

      if (element.animationProcessing === 'show') {
        this._callBack(callback, element, 'hide', 'before', true);

        element.removeEventListener('transitionend', element.bindEnd);

        this._classesControl(element, 'remove', [this.enter, this.enterActive, this.enterTo]);

        this._classesControl(element, 'add', [this.leaveActive, this.leaveTo]);
      } else if (element.animationProcessing === 'hide') {
        this._showTransition(element, callback);

        return;
      } else {
        this._callBack(callback, element, 'hide', 'before', false);

        this._classesControl(element, 'add', [this.leave]);

        this._forNextFrame(function () {
          _this2._classesControl(element, 'add', [_this2.leaveActive, _this2.leaveTo]);

          _this2._classesControl(element, 'remove', [_this2.leave]);
        });
      }

      element.animationProcessing = 'hide';
      element.bindEnd = this._afterAnimation.bind(this, this.leaveActive, this.leaveTo, 'hide', callback);
      element.addEventListener('transitionend', element.bindEnd);
    };

    _proto._showTransitionInsert = function _showTransitionInsert(targetInsert, newElement, before, callback) {
      var _this3 = this;

      newElement.animationProcessing = 'show';

      this._callBack(callback, newElement, 'insert', 'before', false);

      this._classesControl(newElement, 'add', [this.enter]);

      targetInsert.insertBefore(newElement, before);

      this._forNextFrame(function () {
        _this3._classesControl(newElement, 'add', [_this3.enterActive, _this3.enterTo]);

        _this3._classesControl(newElement, 'remove', [_this3.enter]);
      });

      newElement.bindEnd = this._afterAnimation.bind(this, this.enterActive, this.enterTo, 'insert', callback);
      newElement.addEventListener('transitionend', newElement.bindEnd);
    };

    _proto._hideTransitionRemove = function _hideTransitionRemove(element, callback) {
      var _this4 = this;

      if (element.animationProcessing === 'show') {
        this._callBack(callback, element, 'remove', 'before', true);

        element.removeEventListener('transitionend', element.bindEnd);

        this._classesControl(element, 'remove', [this.enter, this.enterActive, this.enterTo]);

        this._classesControl(element, 'add', [this.leaveActive, this.leaveTo]);
      } else {
        this._callBack(callback, element, 'remove', 'before', false);

        this._classesControl(element, 'add', [this.leave]);

        this._forNextFrame(function () {
          _this4._classesControl(element, 'add', [_this4.leaveActive, _this4.leaveTo]);

          _this4._classesControl(element, 'remove', [_this4.leave]);
        });
      }

      element.animationProcessing = 'hide';
      element.bindEnd = this._afterAnimation.bind(this, this.leaveActive, this.leaveTo, 'remove', callback);
      element.addEventListener('transitionend', element.bindEnd);
    };

    _proto._afterAnimation = function _afterAnimation(classActive, classTo, type, callback, e) {
      var element = e.currentTarget;
      delete element.animationProcessing;

      if (type === 'hide') {
        element.style.display = 'none';
      }

      this._classesControl(element, 'remove', [classActive, classTo]);

      if (type === 'remove') {
        element.parentElement.removeChild(element);
      }

      this._callBack(callback, element, type, 'after', false);

      element.removeEventListener('transitionend', element.bindEnd);
      delete element.bindEnd;
    };

    _proto._classesControl = function _classesControl(element, type, classes) {
      for (var i = 0, len = classes.length; i < len; i++) {
        element.classList[type](classes[i]);
      }
    };

    _proto._forNextFrame = function _forNextFrame(callback) {
      var _this5 = this;

      this._rAF(function () {
        _this5._rAF(function () {
          callback();
        });
      });
    };

    _proto._callBack = function _callBack(callback, element, type, when, related) {
      if (typeof this.callback === 'function') {
        this.callback({
          element: element,
          type: type,
          when: when,
          related: related
        });
      } else if (typeof callback === 'function') {
        callback({
          element: element,
          type: type,
          when: when,
          related: related
        });
      }
    };

    _createClass(EasyAnimation, [{
      key: "prefix",
      set: function set(prefix) {
        this.enter = prefix + '-enter';
        this.enterActive = prefix + '-enter-active';
        this.enterTo = prefix + '-enter-to';
        this.leave = prefix + '-leave';
        this.leaveActive = prefix + '-leave-active';
        this.leaveTo = prefix + '-leave-to';
      }
    }]);

    return EasyAnimation;
  }();

  _exports.default = EasyAnimation;
});