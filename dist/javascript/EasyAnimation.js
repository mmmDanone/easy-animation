"use strict";function o(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var e;e=function(){function i(e){if(void 0!==e&&(this.prefix=e),!(this._rAF&&this._cAF&&this._supportTransition)){var t=i.prototype;t._rAF=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||window.mozRequestAnimationFrame||!1,t._cAF=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelRequestAnimationFrame||!1,this._rAF&&this._cAF&&(t._rAF=this._rAF.bind(window),t._cAF=this._cAF.bind(window));var n=document.createElement("div").style.transition;t._supportTransition=!(void 0===n||!this._rAF||!this._cAF)}}var e=i.prototype;return e.transition=function(e,t){void 0===t&&(t=null),e.style.display||(e.style.display=window.getComputedStyle(e).display),this._supportTransition?"block"===e.style.display?this._hideTransition(e,t):this._showTransition(e,t):"block"===e.style.display?("function"==typeof t&&t({element:e,type:"hide",when:"before",related:!1}),e.style.display="none","function"==typeof t&&t({element:e,type:"hide",when:"after",related:!1})):("function"==typeof t&&t({element:e,type:"show",when:"before",related:!1}),e.style.display="block","function"==typeof t&&t({element:e,type:"show",when:"after",related:!1}))},e.transitionInsert=function(e,t,n,i){if(void 0===n&&(n=null),void 0===i&&(i=null),e.style.display||(e.style.display=window.getComputedStyle(e).display),!this._supportTransition||"none"===e.style.display)return"function"==typeof i&&i({element:t,type:"insert",when:"before",related:!1}),e.insertBefore(t,n),void("function"==typeof i&&i({element:t,type:"insert",when:"after",related:!1}));this._showTransitionInsert(e,t,n,i)},e.transitionRemove=function(e,t){if(void 0===t&&(t=null),"hide"!==e.animationProcessing){var n=e.parentElement;if(n.style.display||(n.style.display=window.getComputedStyle(n).display),!this._supportTransition||"none"===n.style.display)return"function"==typeof t&&t({element:e,type:"remove",when:"before",related:!1}),e.parentElement.removeChild(e),void("function"==typeof t&&t({element:e,type:"remove",when:"after",related:!1}));this._hideTransitionRemove(e,t)}},e._showTransition=function(e,t){var n=this;"hide"===e.animationProcessing?("function"==typeof t&&t({element:e,type:"show",when:"before",related:!0}),e.removeEventListener("transitionend",e.bindEnd),this._classesControl(e,"remove",[this.leave,this.leaveActive,this.leaveTo]),this._classesControl(e,"add",[this.enterActive,this.enterTo])):("function"==typeof t&&t({element:e,type:"show",when:"before",related:!1}),this._classesControl(e,"add",[this.enter]),e.style.display="block",this._forNextFrame(function(){n._classesControl(e,"add",[n.enterActive,n.enterTo]),n._classesControl(e,"remove",[n.enter])})),e.animationProcessing="show",e.bindEnd=this._afterAnimation.bind(this,this.enterActive,this.enterTo,"show",t),e.addEventListener("transitionend",e.bindEnd)},e._hideTransition=function(e,t){var n=this;if("show"===e.animationProcessing)"function"==typeof t&&t({element:e,type:"hide",when:"before",related:!0}),e.removeEventListener("transitionend",e.bindEnd),this._classesControl(e,"remove",[this.enter,this.enterActive,this.enterTo]),this._classesControl(e,"add",[this.leaveActive,this.leaveTo]);else{if("hide"===e.animationProcessing)return void this._showTransition(e,t);"function"==typeof t&&t({element:e,type:"hide",when:"before",related:!1}),this._classesControl(e,"add",[this.leave]),this._forNextFrame(function(){n._classesControl(e,"add",[n.leaveActive,n.leaveTo]),n._classesControl(e,"remove",[n.leave])})}e.animationProcessing="hide",e.bindEnd=this._afterAnimation.bind(this,this.leaveActive,this.leaveTo,"hide",t),e.addEventListener("transitionend",e.bindEnd)},e._showTransitionInsert=function(e,t,n,i){var o=this;t.animationProcessing="show","function"==typeof i&&i({element:t,type:"insert",when:"before",related:!1}),this._classesControl(t,"add",[this.enter]),e.insertBefore(t,n),this._forNextFrame(function(){o._classesControl(t,"add",[o.enterActive,o.enterTo]),o._classesControl(t,"remove",[o.enter])}),t.bindEnd=this._afterAnimation.bind(this,this.enterActive,this.enterTo,"insert",i),t.addEventListener("transitionend",t.bindEnd)},e._hideTransitionRemove=function(e,t){var n=this;"show"===e.animationProcessing?("function"==typeof t&&t({element:e,type:"remove",when:"before",related:!0}),e.removeEventListener("transitionend",e.bindEnd),this._classesControl(e,"remove",[this.enter,this.enterActive,this.enterTo]),this._classesControl(e,"add",[this.leaveActive,this.leaveTo])):("function"==typeof t&&t({element:e,type:"remove",when:"before",related:!1}),this._classesControl(e,"add",[this.leave]),this._forNextFrame(function(){n._classesControl(e,"add",[n.leaveActive,n.leaveTo]),n._classesControl(e,"remove",[n.leave])})),e.animationProcessing="hide",e.bindEnd=this._afterAnimation.bind(this,this.leaveActive,this.leaveTo,"remove",t),e.addEventListener("transitionend",e.bindEnd)},e._afterAnimation=function(e,t,n,i,o){var s=o.currentTarget;delete s.animationProcessing,"show"===n&&"function"==typeof i&&i({element:s,type:"show",when:"after",related:!1}),"hide"===n&&(s.style.display="none","function"==typeof i&&i({element:s,type:"hide",when:"after",related:!1})),"insert"===n&&"function"==typeof i&&i({element:s,type:"insert",when:"after",related:!1}),this._classesControl(s,"remove",[e,t]),"remove"===n&&(s.parentElement.removeChild(s),"function"==typeof i&&i({element:s,type:"remove",when:"after",related:!1})),s.removeEventListener("transitionend",s.bindEnd),delete s.bindEnd},e._classesControl=function(e,t,n){for(var i=0,o=n.length;i<o;i++)e.classList[t](n[i])},e._forNextFrame=function(e){var t=this;this._rAF(function(){t._rAF(function(){e()})})},function(e,t,n){t&&o(e.prototype,t),n&&o(e,n)}(i,[{key:"prefix",set:function(e){this.enter=e+"-enter",this.enterActive=e+"-enter-active",this.enterTo=e+"-enter-to",this.leave=e+"-leave",this.leaveActive=e+"-leave-active",this.leaveTo=e+"-leave-to"}}]),i}(),window.EasyAnimation=new e;