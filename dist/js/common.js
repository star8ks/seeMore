webpackJsonp([4,5],{

/***/ "qgje":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global, setImmediate) {/* @preserve
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2013-2015 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	/**
	 * bluebird build version 3.4.6
	 * Features enabled: core, race, call_get, generators, map, nodeify, promisify, props, reduce, settle, some, using, timers, filter, any, each
	*/
	!function(t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;"undefined"!=typeof window?e=window:"undefined"!=typeof global?e=global:"undefined"!=typeof self&&(e=self),e.Promise=t()}}(function(){var t,e,n;return function r(t,e,n){function i(s,a){if(!e[s]){if(!t[s]){var c="function"==typeof _dereq_&&_dereq_;if(!a&&c)return c(s,!0);if(o)return o(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var u=e[s]={exports:{}};t[s][0].call(u.exports,function(e){var n=t[s][1][e];return i(n?n:e)},u,u.exports,r,t,e,n)}return e[s].exports}for(var o="function"==typeof _dereq_&&_dereq_,s=0;s<n.length;s++)i(n[s]);return i}({1:[function(t,e,n){"use strict";e.exports=function(t){function e(t){var e=new n(t),r=e.promise();return e.setHowMany(1),e.setUnwrap(),e.init(),r}var n=t._SomePromiseArray;t.any=function(t){return e(t)},t.prototype.any=function(){return e(this)}}},{}],2:[function(t,e,n){"use strict";function r(){this._customScheduler=!1,this._isTickUsed=!1,this._lateQueue=new u(16),this._normalQueue=new u(16),this._haveDrainedQueues=!1,this._trampolineEnabled=!0;var t=this;this.drainQueues=function(){t._drainQueues()},this._schedule=l}function i(t,e,n){this._lateQueue.push(t,e,n),this._queueTick()}function o(t,e,n){this._normalQueue.push(t,e,n),this._queueTick()}function s(t){this._normalQueue._pushOne(t),this._queueTick()}var a;try{throw new Error}catch(c){a=c}var l=t("./schedule"),u=t("./queue"),p=t("./util");r.prototype.setScheduler=function(t){var e=this._schedule;return this._schedule=t,this._customScheduler=!0,e},r.prototype.hasCustomScheduler=function(){return this._customScheduler},r.prototype.enableTrampoline=function(){this._trampolineEnabled=!0},r.prototype.disableTrampolineIfNecessary=function(){p.hasDevTools&&(this._trampolineEnabled=!1)},r.prototype.haveItemsQueued=function(){return this._isTickUsed||this._haveDrainedQueues},r.prototype.fatalError=function(t,e){e?(process.stderr.write("Fatal "+(t instanceof Error?t.stack:t)+"\n"),process.exit(2)):this.throwLater(t)},r.prototype.throwLater=function(t,e){if(1===arguments.length&&(e=t,t=function(){throw e}),"undefined"!=typeof setTimeout)setTimeout(function(){t(e)},0);else try{this._schedule(function(){t(e)})}catch(n){throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n")}},p.hasDevTools?(r.prototype.invokeLater=function(t,e,n){this._trampolineEnabled?i.call(this,t,e,n):this._schedule(function(){setTimeout(function(){t.call(e,n)},100)})},r.prototype.invoke=function(t,e,n){this._trampolineEnabled?o.call(this,t,e,n):this._schedule(function(){t.call(e,n)})},r.prototype.settlePromises=function(t){this._trampolineEnabled?s.call(this,t):this._schedule(function(){t._settlePromises()})}):(r.prototype.invokeLater=i,r.prototype.invoke=o,r.prototype.settlePromises=s),r.prototype.invokeFirst=function(t,e,n){this._normalQueue.unshift(t,e,n),this._queueTick()},r.prototype._drainQueue=function(t){for(;t.length()>0;){var e=t.shift();if("function"==typeof e){var n=t.shift(),r=t.shift();e.call(n,r)}else e._settlePromises()}},r.prototype._drainQueues=function(){this._drainQueue(this._normalQueue),this._reset(),this._haveDrainedQueues=!0,this._drainQueue(this._lateQueue)},r.prototype._queueTick=function(){this._isTickUsed||(this._isTickUsed=!0,this._schedule(this.drainQueues))},r.prototype._reset=function(){this._isTickUsed=!1},e.exports=r,e.exports.firstLineError=a},{"./queue":26,"./schedule":29,"./util":36}],3:[function(t,e,n){"use strict";e.exports=function(t,e,n,r){var i=!1,o=function(t,e){this._reject(e)},s=function(t,e){e.promiseRejectionQueued=!0,e.bindingPromise._then(o,o,null,this,t)},a=function(t,e){0===(50397184&this._bitField)&&this._resolveCallback(e.target)},c=function(t,e){e.promiseRejectionQueued||this._reject(t)};t.prototype.bind=function(o){i||(i=!0,t.prototype._propagateFrom=r.propagateFromFunction(),t.prototype._boundValue=r.boundValueFunction());var l=n(o),u=new t(e);u._propagateFrom(this,1);var p=this._target();if(u._setBoundTo(l),l instanceof t){var h={promiseRejectionQueued:!1,promise:u,target:p,bindingPromise:l};p._then(e,s,void 0,u,h),l._then(a,c,void 0,u,h),u._setOnCancel(l)}else u._resolveCallback(p);return u},t.prototype._setBoundTo=function(t){void 0!==t?(this._bitField=2097152|this._bitField,this._boundTo=t):this._bitField=-2097153&this._bitField},t.prototype._isBound=function(){return 2097152===(2097152&this._bitField)},t.bind=function(e,n){return t.resolve(n).bind(e)}}},{}],4:[function(t,e,n){"use strict";function r(){try{Promise===o&&(Promise=i)}catch(t){}return o}var i;"undefined"!=typeof Promise&&(i=Promise);var o=t("./promise")();o.noConflict=r,e.exports=o},{"./promise":22}],5:[function(t,e,n){"use strict";var r=Object.create;if(r){var i=r(null),o=r(null);i[" size"]=o[" size"]=0}e.exports=function(e){function n(t,n){var r;if(null!=t&&(r=t[n]),"function"!=typeof r){var i="Object "+a.classString(t)+" has no method '"+a.toString(n)+"'";throw new e.TypeError(i)}return r}function r(t){var e=this.pop(),r=n(t,e);return r.apply(t,this)}function i(t){return t[this]}function o(t){var e=+this;return 0>e&&(e=Math.max(0,e+t.length)),t[e]}var s,a=t("./util"),c=a.canEvaluate;a.isIdentifier;e.prototype.call=function(t){var e=[].slice.call(arguments,1);return e.push(t),this._then(r,void 0,void 0,e,void 0)},e.prototype.get=function(t){var e,n="number"==typeof t;if(n)e=o;else if(c){var r=s(t);e=null!==r?r:i}else e=i;return this._then(e,void 0,void 0,t,void 0)}}},{"./util":36}],6:[function(t,e,n){"use strict";e.exports=function(e,n,r,i){var o=t("./util"),s=o.tryCatch,a=o.errorObj,c=e._async;e.prototype["break"]=e.prototype.cancel=function(){if(!i.cancellation())return this._warn("cancellation is disabled");for(var t=this,e=t;t._isCancellable();){if(!t._cancelBy(e)){e._isFollowing()?e._followee().cancel():e._cancelBranched();break}var n=t._cancellationParent;if(null==n||!n._isCancellable()){t._isFollowing()?t._followee().cancel():t._cancelBranched();break}t._isFollowing()&&t._followee().cancel(),t._setWillBeCancelled(),e=t,t=n}},e.prototype._branchHasCancelled=function(){this._branchesRemainingToCancel--},e.prototype._enoughBranchesHaveCancelled=function(){return void 0===this._branchesRemainingToCancel||this._branchesRemainingToCancel<=0},e.prototype._cancelBy=function(t){return t===this?(this._branchesRemainingToCancel=0,this._invokeOnCancel(),!0):(this._branchHasCancelled(),this._enoughBranchesHaveCancelled()?(this._invokeOnCancel(),!0):!1)},e.prototype._cancelBranched=function(){this._enoughBranchesHaveCancelled()&&this._cancel()},e.prototype._cancel=function(){this._isCancellable()&&(this._setCancelled(),c.invoke(this._cancelPromises,this,void 0))},e.prototype._cancelPromises=function(){this._length()>0&&this._settlePromises()},e.prototype._unsetOnCancel=function(){this._onCancelField=void 0},e.prototype._isCancellable=function(){return this.isPending()&&!this._isCancelled()},e.prototype.isCancellable=function(){return this.isPending()&&!this.isCancelled()},e.prototype._doInvokeOnCancel=function(t,e){if(o.isArray(t))for(var n=0;n<t.length;++n)this._doInvokeOnCancel(t[n],e);else if(void 0!==t)if("function"==typeof t){if(!e){var r=s(t).call(this._boundValue());r===a&&(this._attachExtraTrace(r.e),c.throwLater(r.e))}}else t._resultCancelled(this)},e.prototype._invokeOnCancel=function(){var t=this._onCancel();this._unsetOnCancel(),c.invoke(this._doInvokeOnCancel,this,t)},e.prototype._invokeInternalOnCancel=function(){this._isCancellable()&&(this._doInvokeOnCancel(this._onCancel(),!0),this._unsetOnCancel())},e.prototype._resultCancelled=function(){this.cancel()}}},{"./util":36}],7:[function(t,e,n){"use strict";e.exports=function(e){function n(t,n,a){return function(c){var l=a._boundValue();t:for(var u=0;u<t.length;++u){var p=t[u];if(p===Error||null!=p&&p.prototype instanceof Error){if(c instanceof p)return o(n).call(l,c)}else if("function"==typeof p){var h=o(p).call(l,c);if(h===s)return h;if(h)return o(n).call(l,c)}else if(r.isObject(c)){for(var f=i(p),_=0;_<f.length;++_){var d=f[_];if(p[d]!=c[d])continue t}return o(n).call(l,c)}}return e}}var r=t("./util"),i=t("./es5").keys,o=r.tryCatch,s=r.errorObj;return n}},{"./es5":13,"./util":36}],8:[function(t,e,n){"use strict";e.exports=function(t){function e(){this._trace=new e.CapturedTrace(r())}function n(){return i?new e:void 0}function r(){var t=o.length-1;return t>=0?o[t]:void 0}var i=!1,o=[];return t.prototype._promiseCreated=function(){},t.prototype._pushContext=function(){},t.prototype._popContext=function(){return null},t._peekContext=t.prototype._peekContext=function(){},e.prototype._pushContext=function(){void 0!==this._trace&&(this._trace._promiseCreated=null,o.push(this._trace))},e.prototype._popContext=function(){if(void 0!==this._trace){var t=o.pop(),e=t._promiseCreated;return t._promiseCreated=null,e}return null},e.CapturedTrace=null,e.create=n,e.deactivateLongStackTraces=function(){},e.activateLongStackTraces=function(){var n=t.prototype._pushContext,o=t.prototype._popContext,s=t._peekContext,a=t.prototype._peekContext,c=t.prototype._promiseCreated;e.deactivateLongStackTraces=function(){t.prototype._pushContext=n,t.prototype._popContext=o,t._peekContext=s,t.prototype._peekContext=a,t.prototype._promiseCreated=c,i=!1},i=!0,t.prototype._pushContext=e.prototype._pushContext,t.prototype._popContext=e.prototype._popContext,t._peekContext=t.prototype._peekContext=r,t.prototype._promiseCreated=function(){var t=this._peekContext();t&&null==t._promiseCreated&&(t._promiseCreated=this)}},e}},{}],9:[function(t,e,n){"use strict";e.exports=function(e,n){function r(t,e){return{promise:e}}function i(){return!1}function o(t,e,n){var r=this;try{t(e,n,function(t){if("function"!=typeof t)throw new TypeError("onCancel must be a function, got: "+H.toString(t));r._attachCancellationCallback(t)})}catch(i){return i}}function s(t){if(!this._isCancellable())return this;var e=this._onCancel();void 0!==e?H.isArray(e)?e.push(t):this._setOnCancel([e,t]):this._setOnCancel(t)}function a(){return this._onCancelField}function c(t){this._onCancelField=t}function l(){this._cancellationParent=void 0,this._onCancelField=void 0}function u(t,e){if(0!==(1&e)){this._cancellationParent=t;var n=t._branchesRemainingToCancel;void 0===n&&(n=0),t._branchesRemainingToCancel=n+1}0!==(2&e)&&t._isBound()&&this._setBoundTo(t._boundTo)}function p(t,e){0!==(2&e)&&t._isBound()&&this._setBoundTo(t._boundTo)}function h(){var t=this._boundTo;return void 0!==t&&t instanceof e?t.isFulfilled()?t.value():void 0:t}function f(){this._trace=new S(this._peekContext())}function _(t,e){if(N(t)){var n=this._trace;if(void 0!==n&&e&&(n=n._parent),void 0!==n)n.attachExtraTrace(t);else if(!t.__stackCleaned__){var r=j(t);H.notEnumerableProp(t,"stack",r.message+"\n"+r.stack.join("\n")),H.notEnumerableProp(t,"__stackCleaned__",!0)}}}function d(t,e,n,r,i){if(void 0===t&&null!==e&&W){if(void 0!==i&&i._returnedNonUndefined())return;if(0===(65535&r._bitField))return;n&&(n+=" ");var o="",s="";if(e._trace){for(var a=e._trace.stack.split("\n"),c=w(a),l=c.length-1;l>=0;--l){var u=c[l];if(!U.test(u)){var p=u.match(M);p&&(o="at "+p[1]+":"+p[2]+":"+p[3]+" ");break}}if(c.length>0)for(var h=c[0],l=0;l<a.length;++l)if(a[l]===h){l>0&&(s="\n"+a[l-1]);break}}var f="a promise was created in a "+n+"handler "+o+"but was not returned from it, see http://goo.gl/rRqMUw"+s;r._warn(f,!0,e)}}function v(t,e){var n=t+" is deprecated and will be removed in a future version.";return e&&(n+=" Use "+e+" instead."),y(n)}function y(t,n,r){if(ot.warnings){var i,o=new L(t);if(n)r._attachExtraTrace(o);else if(ot.longStackTraces&&(i=e._peekContext()))i.attachExtraTrace(o);else{var s=j(o);o.stack=s.message+"\n"+s.stack.join("\n")}tt("warning",o)||k(o,"",!0)}}function m(t,e){for(var n=0;n<e.length-1;++n)e[n].push("From previous event:"),e[n]=e[n].join("\n");return n<e.length&&(e[n]=e[n].join("\n")),t+"\n"+e.join("\n")}function g(t){for(var e=0;e<t.length;++e)(0===t[e].length||e+1<t.length&&t[e][0]===t[e+1][0])&&(t.splice(e,1),e--)}function b(t){for(var e=t[0],n=1;n<t.length;++n){for(var r=t[n],i=e.length-1,o=e[i],s=-1,a=r.length-1;a>=0;--a)if(r[a]===o){s=a;break}for(var a=s;a>=0;--a){var c=r[a];if(e[i]!==c)break;e.pop(),i--}e=r}}function w(t){for(var e=[],n=0;n<t.length;++n){var r=t[n],i="    (No stack trace)"===r||q.test(r),o=i&&nt(r);i&&!o&&($&&" "!==r.charAt(0)&&(r="    "+r),e.push(r))}return e}function C(t){for(var e=t.stack.replace(/\s+$/g,"").split("\n"),n=0;n<e.length;++n){var r=e[n];if("    (No stack trace)"===r||q.test(r))break}return n>0&&(e=e.slice(n)),e}function j(t){var e=t.stack,n=t.toString();return e="string"==typeof e&&e.length>0?C(t):["    (No stack trace)"],{message:n,stack:w(e)}}function k(t,e,n){if("undefined"!=typeof console){var r;if(H.isObject(t)){var i=t.stack;r=e+Q(i,t)}else r=e+String(t);"function"==typeof D?D(r,n):("function"==typeof console.log||"object"==typeof console.log)&&console.log(r)}}function E(t,e,n,r){var i=!1;try{"function"==typeof e&&(i=!0,"rejectionHandled"===t?e(r):e(n,r))}catch(o){I.throwLater(o)}"unhandledRejection"===t?tt(t,n,r)||i||k(n,"Unhandled rejection "):tt(t,r)}function F(t){var e;if("function"==typeof t)e="[function "+(t.name||"anonymous")+"]";else{e=t&&"function"==typeof t.toString?t.toString():H.toString(t);var n=/\[object [a-zA-Z0-9$_]+\]/;if(n.test(e))try{var r=JSON.stringify(t);e=r}catch(i){}0===e.length&&(e="(empty array)")}return"(<"+x(e)+">, no stack trace)"}function x(t){var e=41;return t.length<e?t:t.substr(0,e-3)+"..."}function T(){return"function"==typeof it}function P(t){var e=t.match(rt);return e?{fileName:e[1],line:parseInt(e[2],10)}:void 0}function R(t,e){if(T()){for(var n,r,i=t.stack.split("\n"),o=e.stack.split("\n"),s=-1,a=-1,c=0;c<i.length;++c){var l=P(i[c]);if(l){n=l.fileName,s=l.line;break}}for(var c=0;c<o.length;++c){var l=P(o[c]);if(l){r=l.fileName,a=l.line;break}}0>s||0>a||!n||!r||n!==r||s>=a||(nt=function(t){if(B.test(t))return!0;var e=P(t);return e&&e.fileName===n&&s<=e.line&&e.line<=a?!0:!1})}}function S(t){this._parent=t,this._promisesCreated=0;var e=this._length=1+(void 0===t?0:t._length);it(this,S),e>32&&this.uncycle()}var O,A,D,V=e._getDomain,I=e._async,L=t("./errors").Warning,H=t("./util"),N=H.canAttachTrace,B=/[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/,U=/\((?:timers\.js):\d+:\d+\)/,M=/[\/<\(](.+?):(\d+):(\d+)\)?\s*$/,q=null,Q=null,$=!1,G=!(0==H.env("BLUEBIRD_DEBUG")||!H.env("BLUEBIRD_DEBUG")&&"development"!==H.env("NODE_ENV")),z=!(0==H.env("BLUEBIRD_WARNINGS")||!G&&!H.env("BLUEBIRD_WARNINGS")),X=!(0==H.env("BLUEBIRD_LONG_STACK_TRACES")||!G&&!H.env("BLUEBIRD_LONG_STACK_TRACES")),W=0!=H.env("BLUEBIRD_W_FORGOTTEN_RETURN")&&(z||!!H.env("BLUEBIRD_W_FORGOTTEN_RETURN"));e.prototype.suppressUnhandledRejections=function(){var t=this._target();t._bitField=-1048577&t._bitField|524288},e.prototype._ensurePossibleRejectionHandled=function(){0===(524288&this._bitField)&&(this._setRejectionIsUnhandled(),I.invokeLater(this._notifyUnhandledRejection,this,void 0))},e.prototype._notifyUnhandledRejectionIsHandled=function(){E("rejectionHandled",O,void 0,this)},e.prototype._setReturnedNonUndefined=function(){this._bitField=268435456|this._bitField},e.prototype._returnedNonUndefined=function(){return 0!==(268435456&this._bitField)},e.prototype._notifyUnhandledRejection=function(){if(this._isRejectionUnhandled()){var t=this._settledValue();this._setUnhandledRejectionIsNotified(),E("unhandledRejection",A,t,this)}},e.prototype._setUnhandledRejectionIsNotified=function(){this._bitField=262144|this._bitField},e.prototype._unsetUnhandledRejectionIsNotified=function(){this._bitField=-262145&this._bitField},e.prototype._isUnhandledRejectionNotified=function(){return(262144&this._bitField)>0},e.prototype._setRejectionIsUnhandled=function(){this._bitField=1048576|this._bitField},e.prototype._unsetRejectionIsUnhandled=function(){this._bitField=-1048577&this._bitField,this._isUnhandledRejectionNotified()&&(this._unsetUnhandledRejectionIsNotified(),this._notifyUnhandledRejectionIsHandled())},e.prototype._isRejectionUnhandled=function(){return(1048576&this._bitField)>0},e.prototype._warn=function(t,e,n){return y(t,e,n||this)},e.onPossiblyUnhandledRejection=function(t){var e=V();A="function"==typeof t?null===e?t:H.domainBind(e,t):void 0},e.onUnhandledRejectionHandled=function(t){var e=V();O="function"==typeof t?null===e?t:H.domainBind(e,t):void 0};var K=function(){};e.longStackTraces=function(){if(I.haveItemsQueued()&&!ot.longStackTraces)throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");if(!ot.longStackTraces&&T()){var t=e.prototype._captureStackTrace,r=e.prototype._attachExtraTrace;ot.longStackTraces=!0,K=function(){if(I.haveItemsQueued()&&!ot.longStackTraces)throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");e.prototype._captureStackTrace=t,e.prototype._attachExtraTrace=r,n.deactivateLongStackTraces(),I.enableTrampoline(),ot.longStackTraces=!1},e.prototype._captureStackTrace=f,e.prototype._attachExtraTrace=_,n.activateLongStackTraces(),I.disableTrampolineIfNecessary()}},e.hasLongStackTraces=function(){return ot.longStackTraces&&T()};var J=function(){try{if("function"==typeof CustomEvent){var t=new CustomEvent("CustomEvent");return H.global.dispatchEvent(t),function(t,e){var n=new CustomEvent(t.toLowerCase(),{detail:e,cancelable:!0});return!H.global.dispatchEvent(n)}}if("function"==typeof Event){var t=new Event("CustomEvent");return H.global.dispatchEvent(t),function(t,e){var n=new Event(t.toLowerCase(),{cancelable:!0});return n.detail=e,!H.global.dispatchEvent(n)}}var t=document.createEvent("CustomEvent");return t.initCustomEvent("testingtheevent",!1,!0,{}),H.global.dispatchEvent(t),function(t,e){var n=document.createEvent("CustomEvent");return n.initCustomEvent(t.toLowerCase(),!1,!0,e),!H.global.dispatchEvent(n)}}catch(e){}return function(){return!1}}(),Y=function(){return H.isNode?function(){return process.emit.apply(process,arguments)}:H.global?function(t){var e="on"+t.toLowerCase(),n=H.global[e];return n?(n.apply(H.global,[].slice.call(arguments,1)),!0):!1}:function(){return!1}}(),Z={promiseCreated:r,promiseFulfilled:r,promiseRejected:r,promiseResolved:r,promiseCancelled:r,promiseChained:function(t,e,n){return{promise:e,child:n}},warning:function(t,e){return{warning:e}},unhandledRejection:function(t,e,n){return{reason:e,promise:n}},rejectionHandled:r},tt=function(t){var e=!1;try{e=Y.apply(null,arguments)}catch(n){I.throwLater(n),e=!0}var r=!1;try{r=J(t,Z[t].apply(null,arguments))}catch(n){I.throwLater(n),r=!0}return r||e};e.config=function(t){if(t=Object(t),"longStackTraces"in t&&(t.longStackTraces?e.longStackTraces():!t.longStackTraces&&e.hasLongStackTraces()&&K()),"warnings"in t){var n=t.warnings;ot.warnings=!!n,W=ot.warnings,H.isObject(n)&&"wForgottenReturn"in n&&(W=!!n.wForgottenReturn)}if("cancellation"in t&&t.cancellation&&!ot.cancellation){if(I.haveItemsQueued())throw new Error("cannot enable cancellation after promises are in use");e.prototype._clearCancellationData=l,e.prototype._propagateFrom=u,e.prototype._onCancel=a,e.prototype._setOnCancel=c,e.prototype._attachCancellationCallback=s,e.prototype._execute=o,et=u,ot.cancellation=!0}"monitoring"in t&&(t.monitoring&&!ot.monitoring?(ot.monitoring=!0,e.prototype._fireEvent=tt):!t.monitoring&&ot.monitoring&&(ot.monitoring=!1,e.prototype._fireEvent=i))},e.prototype._fireEvent=i,e.prototype._execute=function(t,e,n){try{t(e,n)}catch(r){return r}},e.prototype._onCancel=function(){},e.prototype._setOnCancel=function(t){},e.prototype._attachCancellationCallback=function(t){},e.prototype._captureStackTrace=function(){},e.prototype._attachExtraTrace=function(){},e.prototype._clearCancellationData=function(){},e.prototype._propagateFrom=function(t,e){};var et=p,nt=function(){return!1},rt=/[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;H.inherits(S,Error),n.CapturedTrace=S,S.prototype.uncycle=function(){var t=this._length;if(!(2>t)){for(var e=[],n={},r=0,i=this;void 0!==i;++r)e.push(i),i=i._parent;t=this._length=r;for(var r=t-1;r>=0;--r){var o=e[r].stack;void 0===n[o]&&(n[o]=r)}for(var r=0;t>r;++r){var s=e[r].stack,a=n[s];if(void 0!==a&&a!==r){a>0&&(e[a-1]._parent=void 0,e[a-1]._length=1),e[r]._parent=void 0,e[r]._length=1;var c=r>0?e[r-1]:this;t-1>a?(c._parent=e[a+1],c._parent.uncycle(),c._length=c._parent._length+1):(c._parent=void 0,c._length=1);for(var l=c._length+1,u=r-2;u>=0;--u)e[u]._length=l,l++;return}}}},S.prototype.attachExtraTrace=function(t){if(!t.__stackCleaned__){this.uncycle();for(var e=j(t),n=e.message,r=[e.stack],i=this;void 0!==i;)r.push(w(i.stack.split("\n"))),i=i._parent;b(r),g(r),H.notEnumerableProp(t,"stack",m(n,r)),H.notEnumerableProp(t,"__stackCleaned__",!0)}};var it=function(){var t=/^\s*at\s*/,e=function(t,e){return"string"==typeof t?t:void 0!==e.name&&void 0!==e.message?e.toString():F(e)};if("number"==typeof Error.stackTraceLimit&&"function"==typeof Error.captureStackTrace){Error.stackTraceLimit+=6,q=t,Q=e;var n=Error.captureStackTrace;return nt=function(t){return B.test(t)},function(t,e){Error.stackTraceLimit+=6,n(t,e),Error.stackTraceLimit-=6}}var r=new Error;if("string"==typeof r.stack&&r.stack.split("\n")[0].indexOf("stackDetection@")>=0)return q=/@/,Q=e,$=!0,function(t){t.stack=(new Error).stack};var i;try{throw new Error}catch(o){i="stack"in o}return"stack"in r||!i||"number"!=typeof Error.stackTraceLimit?(Q=function(t,e){return"string"==typeof t?t:"object"!=typeof e&&"function"!=typeof e||void 0===e.name||void 0===e.message?F(e):e.toString()},null):(q=t,Q=e,function(t){Error.stackTraceLimit+=6;try{throw new Error}catch(e){t.stack=e.stack}Error.stackTraceLimit-=6})}([]);"undefined"!=typeof console&&"undefined"!=typeof console.warn&&(D=function(t){console.warn(t)},H.isNode&&process.stderr.isTTY?D=function(t,e){var n=e?"[33m":"[31m";console.warn(n+t+"[0m\n")}:H.isNode||"string"!=typeof(new Error).stack||(D=function(t,e){console.warn("%c"+t,e?"color: darkorange":"color: red")}));var ot={warnings:z,longStackTraces:!1,cancellation:!1,monitoring:!1};return X&&e.longStackTraces(),{longStackTraces:function(){return ot.longStackTraces},warnings:function(){return ot.warnings},cancellation:function(){return ot.cancellation},monitoring:function(){return ot.monitoring},propagateFromFunction:function(){return et},boundValueFunction:function(){return h},checkForgottenReturns:d,setBounds:R,warn:y,deprecated:v,CapturedTrace:S,fireDomEvent:J,fireGlobalEvent:Y}}},{"./errors":12,"./util":36}],10:[function(t,e,n){"use strict";e.exports=function(t){function e(){return this.value}function n(){throw this.reason}t.prototype["return"]=t.prototype.thenReturn=function(n){return n instanceof t&&n.suppressUnhandledRejections(),this._then(e,void 0,void 0,{value:n},void 0)},t.prototype["throw"]=t.prototype.thenThrow=function(t){return this._then(n,void 0,void 0,{reason:t},void 0)},t.prototype.catchThrow=function(t){if(arguments.length<=1)return this._then(void 0,n,void 0,{reason:t},void 0);var e=arguments[1],r=function(){throw e};return this.caught(t,r)},t.prototype.catchReturn=function(n){if(arguments.length<=1)return n instanceof t&&n.suppressUnhandledRejections(),this._then(void 0,e,void 0,{value:n},void 0);var r=arguments[1];r instanceof t&&r.suppressUnhandledRejections();var i=function(){return r};return this.caught(n,i)}}},{}],11:[function(t,e,n){"use strict";e.exports=function(t,e){function n(){return o(this)}function r(t,n){return i(t,n,e,e)}var i=t.reduce,o=t.all;t.prototype.each=function(t){return i(this,t,e,0)._then(n,void 0,void 0,this,void 0)},t.prototype.mapSeries=function(t){return i(this,t,e,e)},t.each=function(t,r){return i(t,r,e,0)._then(n,void 0,void 0,t,void 0)},t.mapSeries=r}},{}],12:[function(t,e,n){"use strict";function r(t,e){function n(r){return this instanceof n?(p(this,"message","string"==typeof r?r:e),p(this,"name",t),void(Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):Error.call(this))):new n(r)}return u(n,Error),n}function i(t){return this instanceof i?(p(this,"name","OperationalError"),p(this,"message",t),this.cause=t,this.isOperational=!0,void(t instanceof Error?(p(this,"message",t.message),p(this,"stack",t.stack)):Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor))):new i(t)}var o,s,a=t("./es5"),c=a.freeze,l=t("./util"),u=l.inherits,p=l.notEnumerableProp,h=r("Warning","warning"),f=r("CancellationError","cancellation error"),_=r("TimeoutError","timeout error"),d=r("AggregateError","aggregate error");try{o=TypeError,s=RangeError}catch(v){o=r("TypeError","type error"),s=r("RangeError","range error")}for(var y="join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "),m=0;m<y.length;++m)"function"==typeof Array.prototype[y[m]]&&(d.prototype[y[m]]=Array.prototype[y[m]]);a.defineProperty(d.prototype,"length",{value:0,configurable:!1,writable:!0,enumerable:!0}),d.prototype.isOperational=!0;var g=0;d.prototype.toString=function(){var t=Array(4*g+1).join(" "),e="\n"+t+"AggregateError of:\n";g++,t=Array(4*g+1).join(" ");for(var n=0;n<this.length;++n){for(var r=this[n]===this?"[Circular AggregateError]":this[n]+"",i=r.split("\n"),o=0;o<i.length;++o)i[o]=t+i[o];r=i.join("\n"),e+=r+"\n"}return g--,e},u(i,Error);var b=Error.__BluebirdErrorTypes__;b||(b=c({CancellationError:f,TimeoutError:_,OperationalError:i,RejectionError:i,AggregateError:d}),a.defineProperty(Error,"__BluebirdErrorTypes__",{value:b,writable:!1,enumerable:!1,configurable:!1})),e.exports={Error:Error,TypeError:o,RangeError:s,CancellationError:b.CancellationError,OperationalError:b.OperationalError,TimeoutError:b.TimeoutError,AggregateError:b.AggregateError,Warning:h}},{"./es5":13,"./util":36}],13:[function(t,e,n){var r=function(){"use strict";return void 0===this}();if(r)e.exports={freeze:Object.freeze,defineProperty:Object.defineProperty,getDescriptor:Object.getOwnPropertyDescriptor,keys:Object.keys,names:Object.getOwnPropertyNames,getPrototypeOf:Object.getPrototypeOf,isArray:Array.isArray,isES5:r,propertyIsWritable:function(t,e){var n=Object.getOwnPropertyDescriptor(t,e);return!(n&&!n.writable&&!n.set)}};else{var i={}.hasOwnProperty,o={}.toString,s={}.constructor.prototype,a=function(t){var e=[];for(var n in t)i.call(t,n)&&e.push(n);return e},c=function(t,e){return{value:t[e]}},l=function(t,e,n){return t[e]=n.value,t},u=function(t){return t},p=function(t){try{return Object(t).constructor.prototype}catch(e){return s}},h=function(t){try{return"[object Array]"===o.call(t)}catch(e){return!1}};e.exports={isArray:h,keys:a,names:a,defineProperty:l,getDescriptor:c,freeze:u,getPrototypeOf:p,isES5:r,propertyIsWritable:function(){return!0}}}},{}],14:[function(t,e,n){"use strict";e.exports=function(t,e){var n=t.map;t.prototype.filter=function(t,r){return n(this,t,r,e)},t.filter=function(t,r,i){return n(t,r,i,e)}}},{}],15:[function(t,e,n){"use strict";e.exports=function(e,n){function r(t,e,n){this.promise=t,this.type=e,this.handler=n,this.called=!1,this.cancelPromise=null}function i(t){this.finallyHandler=t}function o(t,e){return null!=t.cancelPromise?(arguments.length>1?t.cancelPromise._reject(e):t.cancelPromise._cancel(),t.cancelPromise=null,!0):!1}function s(){return c.call(this,this.promise._target()._settledValue())}function a(t){return o(this,t)?void 0:(p.e=t,p)}function c(t){var r=this.promise,c=this.handler;if(!this.called){this.called=!0;var l=this.isFinallyHandler()?c.call(r._boundValue()):c.call(r._boundValue(),t);if(void 0!==l){r._setReturnedNonUndefined();var h=n(l,r);if(h instanceof e){if(null!=this.cancelPromise){if(h._isCancelled()){var f=new u("late cancellation observer");return r._attachExtraTrace(f),p.e=f,p}h.isPending()&&h._attachCancellationCallback(new i(this))}return h._then(s,a,void 0,this,void 0)}}}return r.isRejected()?(o(this),p.e=t,p):(o(this),t)}var l=t("./util"),u=e.CancellationError,p=l.errorObj;return r.prototype.isFinallyHandler=function(){return 0===this.type},i.prototype._resultCancelled=function(){o(this.finallyHandler)},e.prototype._passThrough=function(t,e,n,i){return"function"!=typeof t?this.then():this._then(n,i,void 0,new r(this,e,t),void 0)},e.prototype.lastly=e.prototype["finally"]=function(t){return this._passThrough(t,0,c,c)},e.prototype.tap=function(t){return this._passThrough(t,1,c)},r}},{"./util":36}],16:[function(t,e,n){"use strict";e.exports=function(e,n,r,i,o,s){function a(t,n,r){for(var o=0;o<n.length;++o){r._pushContext();var s=f(n[o])(t);if(r._popContext(),s===h){r._pushContext();var a=e.reject(h.e);return r._popContext(),a}var c=i(s,r);if(c instanceof e)return c}return null}function c(t,n,i,o){if(s.cancellation()){var a=new e(r),c=this._finallyPromise=new e(r);this._promise=a.lastly(function(){return c}),a._captureStackTrace(),a._setOnCancel(this)}else{var l=this._promise=new e(r);l._captureStackTrace()}this._stack=o,this._generatorFunction=t,this._receiver=n,this._generator=void 0,this._yieldHandlers="function"==typeof i?[i].concat(_):_,this._yieldedPromise=null,this._cancellationPhase=!1}var l=t("./errors"),u=l.TypeError,p=t("./util"),h=p.errorObj,f=p.tryCatch,_=[];p.inherits(c,o),c.prototype._isResolved=function(){return null===this._promise},c.prototype._cleanup=function(){this._promise=this._generator=null,s.cancellation()&&null!==this._finallyPromise&&(this._finallyPromise._fulfill(),this._finallyPromise=null)},c.prototype._promiseCancelled=function(){if(!this._isResolved()){var t,n="undefined"!=typeof this._generator["return"];if(n)this._promise._pushContext(),t=f(this._generator["return"]).call(this._generator,void 0),this._promise._popContext();else{var r=new e.CancellationError("generator .return() sentinel");e.coroutine.returnSentinel=r,this._promise._attachExtraTrace(r),this._promise._pushContext(),t=f(this._generator["throw"]).call(this._generator,r),this._promise._popContext()}this._cancellationPhase=!0,this._yieldedPromise=null,this._continue(t)}},c.prototype._promiseFulfilled=function(t){this._yieldedPromise=null,this._promise._pushContext();var e=f(this._generator.next).call(this._generator,t);this._promise._popContext(),this._continue(e)},c.prototype._promiseRejected=function(t){this._yieldedPromise=null,this._promise._attachExtraTrace(t),this._promise._pushContext();var e=f(this._generator["throw"]).call(this._generator,t);this._promise._popContext(),this._continue(e)},c.prototype._resultCancelled=function(){if(this._yieldedPromise instanceof e){var t=this._yieldedPromise;this._yieldedPromise=null,t.cancel()}},c.prototype.promise=function(){return this._promise},c.prototype._run=function(){this._generator=this._generatorFunction.call(this._receiver),this._receiver=this._generatorFunction=void 0,this._promiseFulfilled(void 0)},c.prototype._continue=function(t){var n=this._promise;if(t===h)return this._cleanup(),this._cancellationPhase?n.cancel():n._rejectCallback(t.e,!1);var r=t.value;if(t.done===!0)return this._cleanup(),this._cancellationPhase?n.cancel():n._resolveCallback(r);var o=i(r,this._promise);if(!(o instanceof e)&&(o=a(o,this._yieldHandlers,this._promise),null===o))return void this._promiseRejected(new u("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s",r)+"From coroutine:\n"+this._stack.split("\n").slice(1,-7).join("\n")));o=o._target();var s=o._bitField;0===(50397184&s)?(this._yieldedPromise=o,o._proxy(this,null)):0!==(33554432&s)?e._async.invoke(this._promiseFulfilled,this,o._value()):0!==(16777216&s)?e._async.invoke(this._promiseRejected,this,o._reason()):this._promiseCancelled()},e.coroutine=function(t,e){if("function"!=typeof t)throw new u("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");var n=Object(e).yieldHandler,r=c,i=(new Error).stack;return function(){var e=t.apply(this,arguments),o=new r(void 0,void 0,n,i),s=o.promise();return o._generator=e,
	o._promiseFulfilled(void 0),s}},e.coroutine.addYieldHandler=function(t){if("function"!=typeof t)throw new u("expecting a function but got "+p.classString(t));_.push(t)},e.spawn=function(t){if(s.deprecated("Promise.spawn()","Promise.coroutine()"),"function"!=typeof t)return n("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");var r=new c(t,this),i=r.promise();return r._run(e.spawn),i}}},{"./errors":12,"./util":36}],17:[function(t,e,n){"use strict";e.exports=function(e,n,r,i,o,s){var a=t("./util");a.canEvaluate,a.tryCatch,a.errorObj;e.join=function(){var t,e=arguments.length-1;if(e>0&&"function"==typeof arguments[e]){t=arguments[e];var r}var i=[].slice.call(arguments);t&&i.pop();var r=new n(i).promise();return void 0!==t?r.spread(t):r}}},{"./util":36}],18:[function(t,e,n){"use strict";e.exports=function(e,n,r,i,o,s){function a(t,e,n,r){this.constructor$(t),this._promise._captureStackTrace();var i=l();this._callback=null===i?e:u.domainBind(i,e),this._preservedValues=r===o?new Array(this.length()):null,this._limit=n,this._inFlight=0,this._queue=[],f.invoke(this._asyncInit,this,void 0)}function c(t,n,i,o){if("function"!=typeof n)return r("expecting a function but got "+u.classString(n));var s=0;if(void 0!==i){if("object"!=typeof i||null===i)return e.reject(new TypeError("options argument must be an object but it is "+u.classString(i)));if("number"!=typeof i.concurrency)return e.reject(new TypeError("'concurrency' must be a number but it is "+u.classString(i.concurrency)));s=i.concurrency}return s="number"==typeof s&&isFinite(s)&&s>=1?s:0,new a(t,n,s,o).promise()}var l=e._getDomain,u=t("./util"),p=u.tryCatch,h=u.errorObj,f=e._async;u.inherits(a,n),a.prototype._asyncInit=function(){this._init$(void 0,-2)},a.prototype._init=function(){},a.prototype._promiseFulfilled=function(t,n){var r=this._values,o=this.length(),a=this._preservedValues,c=this._limit;if(0>n){if(n=-1*n-1,r[n]=t,c>=1&&(this._inFlight--,this._drainQueue(),this._isResolved()))return!0}else{if(c>=1&&this._inFlight>=c)return r[n]=t,this._queue.push(n),!1;null!==a&&(a[n]=t);var l=this._promise,u=this._callback,f=l._boundValue();l._pushContext();var _=p(u).call(f,t,n,o),d=l._popContext();if(s.checkForgottenReturns(_,d,null!==a?"Promise.filter":"Promise.map",l),_===h)return this._reject(_.e),!0;var v=i(_,this._promise);if(v instanceof e){v=v._target();var y=v._bitField;if(0===(50397184&y))return c>=1&&this._inFlight++,r[n]=v,v._proxy(this,-1*(n+1)),!1;if(0===(33554432&y))return 0!==(16777216&y)?(this._reject(v._reason()),!0):(this._cancel(),!0);_=v._value()}r[n]=_}var m=++this._totalResolved;return m>=o?(null!==a?this._filter(r,a):this._resolve(r),!0):!1},a.prototype._drainQueue=function(){for(var t=this._queue,e=this._limit,n=this._values;t.length>0&&this._inFlight<e;){if(this._isResolved())return;var r=t.pop();this._promiseFulfilled(n[r],r)}},a.prototype._filter=function(t,e){for(var n=e.length,r=new Array(n),i=0,o=0;n>o;++o)t[o]&&(r[i++]=e[o]);r.length=i,this._resolve(r)},a.prototype.preservedValues=function(){return this._preservedValues},e.prototype.map=function(t,e){return c(this,t,e,null)},e.map=function(t,e,n,r){return c(t,e,n,r)}}},{"./util":36}],19:[function(t,e,n){"use strict";e.exports=function(e,n,r,i,o){var s=t("./util"),a=s.tryCatch;e.method=function(t){if("function"!=typeof t)throw new e.TypeError("expecting a function but got "+s.classString(t));return function(){var r=new e(n);r._captureStackTrace(),r._pushContext();var i=a(t).apply(this,arguments),s=r._popContext();return o.checkForgottenReturns(i,s,"Promise.method",r),r._resolveFromSyncValue(i),r}},e.attempt=e["try"]=function(t){if("function"!=typeof t)return i("expecting a function but got "+s.classString(t));var r=new e(n);r._captureStackTrace(),r._pushContext();var c;if(arguments.length>1){o.deprecated("calling Promise.try with more than 1 argument");var l=arguments[1],u=arguments[2];c=s.isArray(l)?a(t).apply(u,l):a(t).call(u,l)}else c=a(t)();var p=r._popContext();return o.checkForgottenReturns(c,p,"Promise.try",r),r._resolveFromSyncValue(c),r},e.prototype._resolveFromSyncValue=function(t){t===s.errorObj?this._rejectCallback(t.e,!1):this._resolveCallback(t,!0)}}},{"./util":36}],20:[function(t,e,n){"use strict";function r(t){return t instanceof Error&&u.getPrototypeOf(t)===Error.prototype}function i(t){var e;if(r(t)){e=new l(t),e.name=t.name,e.message=t.message,e.stack=t.stack;for(var n=u.keys(t),i=0;i<n.length;++i){var o=n[i];p.test(o)||(e[o]=t[o])}return e}return s.markAsOriginatingFromRejection(t),t}function o(t,e){return function(n,r){if(null!==t){if(n){var o=i(a(n));t._attachExtraTrace(o),t._reject(o)}else if(e){var s=[].slice.call(arguments,1);t._fulfill(s)}else t._fulfill(r);t=null}}}var s=t("./util"),a=s.maybeWrapAsError,c=t("./errors"),l=c.OperationalError,u=t("./es5"),p=/^(?:name|message|stack|cause)$/;e.exports=o},{"./errors":12,"./es5":13,"./util":36}],21:[function(t,e,n){"use strict";e.exports=function(e){function n(t,e){var n=this;if(!o.isArray(t))return r.call(n,t,e);var i=a(e).apply(n._boundValue(),[null].concat(t));i===c&&s.throwLater(i.e)}function r(t,e){var n=this,r=n._boundValue(),i=void 0===t?a(e).call(r,null):a(e).call(r,null,t);i===c&&s.throwLater(i.e)}function i(t,e){var n=this;if(!t){var r=new Error(t+"");r.cause=t,t=r}var i=a(e).call(n._boundValue(),t);i===c&&s.throwLater(i.e)}var o=t("./util"),s=e._async,a=o.tryCatch,c=o.errorObj;e.prototype.asCallback=e.prototype.nodeify=function(t,e){if("function"==typeof t){var o=r;void 0!==e&&Object(e).spread&&(o=n),this._then(o,i,void 0,this,t)}return this}}},{"./util":36}],22:[function(t,e,n){"use strict";e.exports=function(){function n(){}function r(t,e){if("function"!=typeof e)throw new m("expecting a function but got "+f.classString(e));if(t.constructor!==i)throw new m("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n")}function i(t){this._bitField=0,this._fulfillmentHandler0=void 0,this._rejectionHandler0=void 0,this._promise0=void 0,this._receiver0=void 0,t!==b&&(r(this,t),this._resolveFromExecutor(t)),this._promiseCreated(),this._fireEvent("promiseCreated",this)}function o(t){this.promise._resolveCallback(t)}function s(t){this.promise._rejectCallback(t,!1)}function a(t){var e=new i(b);e._fulfillmentHandler0=t,e._rejectionHandler0=t,e._promise0=t,e._receiver0=t}var c,l=function(){return new m("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n")},u=function(){return new i.PromiseInspection(this._target())},p=function(t){return i.reject(new m(t))},h={},f=t("./util");c=f.isNode?function(){var t=process.domain;return void 0===t&&(t=null),t}:function(){return null},f.notEnumerableProp(i,"_getDomain",c);var _=t("./es5"),d=t("./async"),v=new d;_.defineProperty(i,"_async",{value:v});var y=t("./errors"),m=i.TypeError=y.TypeError;i.RangeError=y.RangeError;var g=i.CancellationError=y.CancellationError;i.TimeoutError=y.TimeoutError,i.OperationalError=y.OperationalError,i.RejectionError=y.OperationalError,i.AggregateError=y.AggregateError;var b=function(){},w={},C={},j=t("./thenables")(i,b),k=t("./promise_array")(i,b,j,p,n),E=t("./context")(i),F=E.create,x=t("./debuggability")(i,E),T=(x.CapturedTrace,t("./finally")(i,j)),P=t("./catch_filter")(C),R=t("./nodeback"),S=f.errorObj,O=f.tryCatch;return i.prototype.toString=function(){return"[object Promise]"},i.prototype.caught=i.prototype["catch"]=function(t){var e=arguments.length;if(e>1){var n,r=new Array(e-1),i=0;for(n=0;e-1>n;++n){var o=arguments[n];if(!f.isObject(o))return p("expecting an object but got A catch statement predicate "+f.classString(o));r[i++]=o}return r.length=i,t=arguments[n],this.then(void 0,P(r,t,this))}return this.then(void 0,t)},i.prototype.reflect=function(){return this._then(u,u,void 0,this,void 0)},i.prototype.then=function(t,e){if(x.warnings()&&arguments.length>0&&"function"!=typeof t&&"function"!=typeof e){var n=".then() only accepts functions but was passed: "+f.classString(t);arguments.length>1&&(n+=", "+f.classString(e)),this._warn(n)}return this._then(t,e,void 0,void 0,void 0)},i.prototype.done=function(t,e){var n=this._then(t,e,void 0,void 0,void 0);n._setIsFinal()},i.prototype.spread=function(t){return"function"!=typeof t?p("expecting a function but got "+f.classString(t)):this.all()._then(t,void 0,void 0,w,void 0)},i.prototype.toJSON=function(){var t={isFulfilled:!1,isRejected:!1,fulfillmentValue:void 0,rejectionReason:void 0};return this.isFulfilled()?(t.fulfillmentValue=this.value(),t.isFulfilled=!0):this.isRejected()&&(t.rejectionReason=this.reason(),t.isRejected=!0),t},i.prototype.all=function(){return arguments.length>0&&this._warn(".all() was passed arguments but it does not take any"),new k(this).promise()},i.prototype.error=function(t){return this.caught(f.originatesFromRejection,t)},i.getNewLibraryCopy=e.exports,i.is=function(t){return t instanceof i},i.fromNode=i.fromCallback=function(t){var e=new i(b);e._captureStackTrace();var n=arguments.length>1?!!Object(arguments[1]).multiArgs:!1,r=O(t)(R(e,n));return r===S&&e._rejectCallback(r.e,!0),e._isFateSealed()||e._setAsyncGuaranteed(),e},i.all=function(t){return new k(t).promise()},i.cast=function(t){var e=j(t);return e instanceof i||(e=new i(b),e._captureStackTrace(),e._setFulfilled(),e._rejectionHandler0=t),e},i.resolve=i.fulfilled=i.cast,i.reject=i.rejected=function(t){var e=new i(b);return e._captureStackTrace(),e._rejectCallback(t,!0),e},i.setScheduler=function(t){if("function"!=typeof t)throw new m("expecting a function but got "+f.classString(t));return v.setScheduler(t)},i.prototype._then=function(t,e,n,r,o){var s=void 0!==o,a=s?o:new i(b),l=this._target(),u=l._bitField;s||(a._propagateFrom(this,3),a._captureStackTrace(),void 0===r&&0!==(2097152&this._bitField)&&(r=0!==(50397184&u)?this._boundValue():l===this?void 0:this._boundTo),this._fireEvent("promiseChained",this,a));var p=c();if(0!==(50397184&u)){var h,_,d=l._settlePromiseCtx;0!==(33554432&u)?(_=l._rejectionHandler0,h=t):0!==(16777216&u)?(_=l._fulfillmentHandler0,h=e,l._unsetRejectionIsUnhandled()):(d=l._settlePromiseLateCancellationObserver,_=new g("late cancellation observer"),l._attachExtraTrace(_),h=e),v.invoke(d,l,{handler:null===p?h:"function"==typeof h&&f.domainBind(p,h),promise:a,receiver:r,value:_})}else l._addCallbacks(t,e,a,r,p);return a},i.prototype._length=function(){return 65535&this._bitField},i.prototype._isFateSealed=function(){return 0!==(117506048&this._bitField)},i.prototype._isFollowing=function(){return 67108864===(67108864&this._bitField)},i.prototype._setLength=function(t){this._bitField=-65536&this._bitField|65535&t},i.prototype._setFulfilled=function(){this._bitField=33554432|this._bitField,this._fireEvent("promiseFulfilled",this)},i.prototype._setRejected=function(){this._bitField=16777216|this._bitField,this._fireEvent("promiseRejected",this)},i.prototype._setFollowing=function(){this._bitField=67108864|this._bitField,this._fireEvent("promiseResolved",this)},i.prototype._setIsFinal=function(){this._bitField=4194304|this._bitField},i.prototype._isFinal=function(){return(4194304&this._bitField)>0},i.prototype._unsetCancelled=function(){this._bitField=-65537&this._bitField},i.prototype._setCancelled=function(){this._bitField=65536|this._bitField,this._fireEvent("promiseCancelled",this)},i.prototype._setWillBeCancelled=function(){this._bitField=8388608|this._bitField},i.prototype._setAsyncGuaranteed=function(){v.hasCustomScheduler()||(this._bitField=134217728|this._bitField)},i.prototype._receiverAt=function(t){var e=0===t?this._receiver0:this[4*t-4+3];return e===h?void 0:void 0===e&&this._isBound()?this._boundValue():e},i.prototype._promiseAt=function(t){return this[4*t-4+2]},i.prototype._fulfillmentHandlerAt=function(t){return this[4*t-4+0]},i.prototype._rejectionHandlerAt=function(t){return this[4*t-4+1]},i.prototype._boundValue=function(){},i.prototype._migrateCallback0=function(t){var e=(t._bitField,t._fulfillmentHandler0),n=t._rejectionHandler0,r=t._promise0,i=t._receiverAt(0);void 0===i&&(i=h),this._addCallbacks(e,n,r,i,null)},i.prototype._migrateCallbackAt=function(t,e){var n=t._fulfillmentHandlerAt(e),r=t._rejectionHandlerAt(e),i=t._promiseAt(e),o=t._receiverAt(e);void 0===o&&(o=h),this._addCallbacks(n,r,i,o,null)},i.prototype._addCallbacks=function(t,e,n,r,i){var o=this._length();if(o>=65531&&(o=0,this._setLength(0)),0===o)this._promise0=n,this._receiver0=r,"function"==typeof t&&(this._fulfillmentHandler0=null===i?t:f.domainBind(i,t)),"function"==typeof e&&(this._rejectionHandler0=null===i?e:f.domainBind(i,e));else{var s=4*o-4;this[s+2]=n,this[s+3]=r,"function"==typeof t&&(this[s+0]=null===i?t:f.domainBind(i,t)),"function"==typeof e&&(this[s+1]=null===i?e:f.domainBind(i,e))}return this._setLength(o+1),o},i.prototype._proxy=function(t,e){this._addCallbacks(void 0,void 0,e,t,null)},i.prototype._resolveCallback=function(t,e){if(0===(117506048&this._bitField)){if(t===this)return this._rejectCallback(l(),!1);var n=j(t,this);if(!(n instanceof i))return this._fulfill(t);e&&this._propagateFrom(n,2);var r=n._target();if(r===this)return void this._reject(l());var o=r._bitField;if(0===(50397184&o)){var s=this._length();s>0&&r._migrateCallback0(this);for(var a=1;s>a;++a)r._migrateCallbackAt(this,a);this._setFollowing(),this._setLength(0),this._setFollowee(r)}else if(0!==(33554432&o))this._fulfill(r._value());else if(0!==(16777216&o))this._reject(r._reason());else{var c=new g("late cancellation observer");r._attachExtraTrace(c),this._reject(c)}}},i.prototype._rejectCallback=function(t,e,n){var r=f.ensureErrorObject(t),i=r===t;if(!i&&!n&&x.warnings()){var o="a promise was rejected with a non-error: "+f.classString(t);this._warn(o,!0)}this._attachExtraTrace(r,e?i:!1),this._reject(t)},i.prototype._resolveFromExecutor=function(t){var e=this;this._captureStackTrace(),this._pushContext();var n=!0,r=this._execute(t,function(t){e._resolveCallback(t)},function(t){e._rejectCallback(t,n)});n=!1,this._popContext(),void 0!==r&&e._rejectCallback(r,!0)},i.prototype._settlePromiseFromHandler=function(t,e,n,r){var i=r._bitField;if(0===(65536&i)){r._pushContext();var o;e===w?n&&"number"==typeof n.length?o=O(t).apply(this._boundValue(),n):(o=S,o.e=new m("cannot .spread() a non-array: "+f.classString(n))):o=O(t).call(e,n);var s=r._popContext();i=r._bitField,0===(65536&i)&&(o===C?r._reject(n):o===S?r._rejectCallback(o.e,!1):(x.checkForgottenReturns(o,s,"",r,this),r._resolveCallback(o)))}},i.prototype._target=function(){for(var t=this;t._isFollowing();)t=t._followee();return t},i.prototype._followee=function(){return this._rejectionHandler0},i.prototype._setFollowee=function(t){this._rejectionHandler0=t},i.prototype._settlePromise=function(t,e,r,o){var s=t instanceof i,a=this._bitField,c=0!==(134217728&a);0!==(65536&a)?(s&&t._invokeInternalOnCancel(),r instanceof T&&r.isFinallyHandler()?(r.cancelPromise=t,O(e).call(r,o)===S&&t._reject(S.e)):e===u?t._fulfill(u.call(r)):r instanceof n?r._promiseCancelled(t):s||t instanceof k?t._cancel():r.cancel()):"function"==typeof e?s?(c&&t._setAsyncGuaranteed(),this._settlePromiseFromHandler(e,r,o,t)):e.call(r,o,t):r instanceof n?r._isResolved()||(0!==(33554432&a)?r._promiseFulfilled(o,t):r._promiseRejected(o,t)):s&&(c&&t._setAsyncGuaranteed(),0!==(33554432&a)?t._fulfill(o):t._reject(o))},i.prototype._settlePromiseLateCancellationObserver=function(t){var e=t.handler,n=t.promise,r=t.receiver,o=t.value;"function"==typeof e?n instanceof i?this._settlePromiseFromHandler(e,r,o,n):e.call(r,o,n):n instanceof i&&n._reject(o)},i.prototype._settlePromiseCtx=function(t){this._settlePromise(t.promise,t.handler,t.receiver,t.value)},i.prototype._settlePromise0=function(t,e,n){var r=this._promise0,i=this._receiverAt(0);this._promise0=void 0,this._receiver0=void 0,this._settlePromise(r,t,i,e)},i.prototype._clearCallbackDataAtIndex=function(t){var e=4*t-4;this[e+2]=this[e+3]=this[e+0]=this[e+1]=void 0},i.prototype._fulfill=function(t){var e=this._bitField;if(!((117506048&e)>>>16)){if(t===this){var n=l();return this._attachExtraTrace(n),this._reject(n)}this._setFulfilled(),this._rejectionHandler0=t,(65535&e)>0&&(0!==(134217728&e)?this._settlePromises():v.settlePromises(this))}},i.prototype._reject=function(t){var e=this._bitField;if(!((117506048&e)>>>16))return this._setRejected(),this._fulfillmentHandler0=t,this._isFinal()?v.fatalError(t,f.isNode):void((65535&e)>0?v.settlePromises(this):this._ensurePossibleRejectionHandled())},i.prototype._fulfillPromises=function(t,e){for(var n=1;t>n;n++){var r=this._fulfillmentHandlerAt(n),i=this._promiseAt(n),o=this._receiverAt(n);this._clearCallbackDataAtIndex(n),this._settlePromise(i,r,o,e)}},i.prototype._rejectPromises=function(t,e){for(var n=1;t>n;n++){var r=this._rejectionHandlerAt(n),i=this._promiseAt(n),o=this._receiverAt(n);this._clearCallbackDataAtIndex(n),this._settlePromise(i,r,o,e)}},i.prototype._settlePromises=function(){var t=this._bitField,e=65535&t;if(e>0){if(0!==(16842752&t)){var n=this._fulfillmentHandler0;this._settlePromise0(this._rejectionHandler0,n,t),this._rejectPromises(e,n)}else{var r=this._rejectionHandler0;this._settlePromise0(this._fulfillmentHandler0,r,t),this._fulfillPromises(e,r)}this._setLength(0)}this._clearCancellationData()},i.prototype._settledValue=function(){var t=this._bitField;return 0!==(33554432&t)?this._rejectionHandler0:0!==(16777216&t)?this._fulfillmentHandler0:void 0},i.defer=i.pending=function(){x.deprecated("Promise.defer","new Promise");var t=new i(b);return{promise:t,resolve:o,reject:s}},f.notEnumerableProp(i,"_makeSelfResolutionError",l),t("./method")(i,b,j,p,x),t("./bind")(i,b,j,x),t("./cancel")(i,k,p,x),t("./direct_resolve")(i),t("./synchronous_inspection")(i),t("./join")(i,k,j,b,v,c),i.Promise=i,i.version="3.4.6",t("./map.js")(i,k,p,j,b,x),t("./call_get.js")(i),t("./using.js")(i,p,j,F,b,x),t("./timers.js")(i,b,x),t("./generators.js")(i,p,b,j,n,x),t("./nodeify.js")(i),t("./promisify.js")(i,b),t("./props.js")(i,k,j,p),t("./race.js")(i,b,j,p),t("./reduce.js")(i,k,p,j,b,x),t("./settle.js")(i,k,x),t("./some.js")(i,k,p),t("./filter.js")(i,b),t("./each.js")(i,b),t("./any.js")(i),f.toFastProperties(i),f.toFastProperties(i.prototype),a({a:1}),a({b:2}),a({c:3}),a(1),a(function(){}),a(void 0),a(!1),a(new i(b)),x.setBounds(d.firstLineError,f.lastLineError),i}},{"./any.js":1,"./async":2,"./bind":3,"./call_get.js":5,"./cancel":6,"./catch_filter":7,"./context":8,"./debuggability":9,"./direct_resolve":10,"./each.js":11,"./errors":12,"./es5":13,"./filter.js":14,"./finally":15,"./generators.js":16,"./join":17,"./map.js":18,"./method":19,"./nodeback":20,"./nodeify.js":21,"./promise_array":23,"./promisify.js":24,"./props.js":25,"./race.js":27,"./reduce.js":28,"./settle.js":30,"./some.js":31,"./synchronous_inspection":32,"./thenables":33,"./timers.js":34,"./using.js":35,"./util":36}],23:[function(t,e,n){"use strict";e.exports=function(e,n,r,i,o){function s(t){switch(t){case-2:return[];case-3:return{}}}function a(t){var r=this._promise=new e(n);t instanceof e&&r._propagateFrom(t,3),r._setOnCancel(this),this._values=t,this._length=0,this._totalResolved=0,this._init(void 0,-2)}var c=t("./util");c.isArray;return c.inherits(a,o),a.prototype.length=function(){return this._length},a.prototype.promise=function(){return this._promise},a.prototype._init=function l(t,n){var o=r(this._values,this._promise);if(o instanceof e){o=o._target();var a=o._bitField;if(this._values=o,0===(50397184&a))return this._promise._setAsyncGuaranteed(),o._then(l,this._reject,void 0,this,n);if(0===(33554432&a))return 0!==(16777216&a)?this._reject(o._reason()):this._cancel();o=o._value()}if(o=c.asArray(o),null===o){var u=i("expecting an array or an iterable object but got "+c.classString(o)).reason();return void this._promise._rejectCallback(u,!1)}return 0===o.length?void(-5===n?this._resolveEmptyArray():this._resolve(s(n))):void this._iterate(o)},a.prototype._iterate=function(t){var n=this.getActualLength(t.length);this._length=n,this._values=this.shouldCopyValues()?new Array(n):this._values;for(var i=this._promise,o=!1,s=null,a=0;n>a;++a){var c=r(t[a],i);c instanceof e?(c=c._target(),s=c._bitField):s=null,o?null!==s&&c.suppressUnhandledRejections():null!==s?0===(50397184&s)?(c._proxy(this,a),this._values[a]=c):o=0!==(33554432&s)?this._promiseFulfilled(c._value(),a):0!==(16777216&s)?this._promiseRejected(c._reason(),a):this._promiseCancelled(a):o=this._promiseFulfilled(c,a)}o||i._setAsyncGuaranteed()},a.prototype._isResolved=function(){return null===this._values},a.prototype._resolve=function(t){this._values=null,this._promise._fulfill(t)},a.prototype._cancel=function(){!this._isResolved()&&this._promise._isCancellable()&&(this._values=null,this._promise._cancel())},a.prototype._reject=function(t){this._values=null,this._promise._rejectCallback(t,!1)},a.prototype._promiseFulfilled=function(t,e){this._values[e]=t;var n=++this._totalResolved;return n>=this._length?(this._resolve(this._values),!0):!1},a.prototype._promiseCancelled=function(){return this._cancel(),!0},a.prototype._promiseRejected=function(t){return this._totalResolved++,this._reject(t),!0},a.prototype._resultCancelled=function(){if(!this._isResolved()){var t=this._values;if(this._cancel(),t instanceof e)t.cancel();else for(var n=0;n<t.length;++n)t[n]instanceof e&&t[n].cancel()}},a.prototype.shouldCopyValues=function(){return!0},a.prototype.getActualLength=function(t){return t},a}},{"./util":36}],24:[function(t,e,n){"use strict";e.exports=function(e,n){function r(t){return!C.test(t)}function i(t){try{return t.__isPromisified__===!0}catch(e){return!1}}function o(t,e,n){var r=f.getDataPropertyOrDefault(t,e+n,b);return r?i(r):!1}function s(t,e,n){for(var r=0;r<t.length;r+=2){var i=t[r];if(n.test(i))for(var o=i.replace(n,""),s=0;s<t.length;s+=2)if(t[s]===o)throw new m("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s",e))}}function a(t,e,n,r){for(var a=f.inheritedDataKeys(t),c=[],l=0;l<a.length;++l){var u=a[l],p=t[u],h=r===j?!0:j(u,p,t);"function"!=typeof p||i(p)||o(t,u,e)||!r(u,p,t,h)||c.push(u,p)}return s(c,e,n),c}function c(t,r,i,o,s,a){function c(){var i=r;r===h&&(i=this);var o=new e(n);o._captureStackTrace();var s="string"==typeof u&&this!==l?this[u]:t,c=_(o,a);try{s.apply(i,d(arguments,c))}catch(p){o._rejectCallback(v(p),!0,!0)}return o._isFateSealed()||o._setAsyncGuaranteed(),o}var l=function(){return this}(),u=t;return"string"==typeof u&&(t=o),f.notEnumerableProp(c,"__isPromisified__",!0),c}function l(t,e,n,r,i){for(var o=new RegExp(k(e)+"$"),s=a(t,e,o,n),c=0,l=s.length;l>c;c+=2){var u=s[c],p=s[c+1],_=u+e;if(r===E)t[_]=E(u,h,u,p,e,i);else{var d=r(p,function(){return E(u,h,u,p,e,i)});f.notEnumerableProp(d,"__isPromisified__",!0),t[_]=d}}return f.toFastProperties(t),t}function u(t,e,n){return E(t,e,void 0,t,null,n)}var p,h={},f=t("./util"),_=t("./nodeback"),d=f.withAppended,v=f.maybeWrapAsError,y=f.canEvaluate,m=t("./errors").TypeError,g="Async",b={__isPromisified__:!0},w=["arity","length","name","arguments","caller","callee","prototype","__isPromisified__"],C=new RegExp("^(?:"+w.join("|")+")$"),j=function(t){return f.isIdentifier(t)&&"_"!==t.charAt(0)&&"constructor"!==t},k=function(t){return t.replace(/([$])/,"\\$")},E=y?p:c;e.promisify=function(t,e){if("function"!=typeof t)throw new m("expecting a function but got "+f.classString(t));if(i(t))return t;e=Object(e);var n=void 0===e.context?h:e.context,o=!!e.multiArgs,s=u(t,n,o);return f.copyDescriptors(t,s,r),s},e.promisifyAll=function(t,e){if("function"!=typeof t&&"object"!=typeof t)throw new m("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");e=Object(e);var n=!!e.multiArgs,r=e.suffix;"string"!=typeof r&&(r=g);var i=e.filter;"function"!=typeof i&&(i=j);var o=e.promisifier;if("function"!=typeof o&&(o=E),!f.isIdentifier(r))throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");for(var s=f.inheritedDataKeys(t),a=0;a<s.length;++a){var c=t[s[a]];"constructor"!==s[a]&&f.isClass(c)&&(l(c.prototype,r,i,o,n),l(c,r,i,o,n))}return l(t,r,i,o,n)}}},{"./errors":12,"./nodeback":20,"./util":36}],25:[function(t,e,n){"use strict";e.exports=function(e,n,r,i){function o(t){var e,n=!1;if(void 0!==a&&t instanceof a)e=p(t),n=!0;else{var r=u.keys(t),i=r.length;e=new Array(2*i);for(var o=0;i>o;++o){var s=r[o];e[o]=t[s],e[o+i]=s}}this.constructor$(e),this._isMap=n,this._init$(void 0,-3)}function s(t){var n,s=r(t);return l(s)?(n=s instanceof e?s._then(e.props,void 0,void 0,void 0,void 0):new o(s).promise(),s instanceof e&&n._propagateFrom(s,2),n):i("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n")}var a,c=t("./util"),l=c.isObject,u=t("./es5");"function"==typeof Map&&(a=Map);var p=function(){function t(t,r){this[e]=t,this[e+n]=r,e++}var e=0,n=0;return function(r){n=r.size,e=0;var i=new Array(2*r.size);return r.forEach(t,i),i}}(),h=function(t){for(var e=new a,n=t.length/2|0,r=0;n>r;++r){var i=t[n+r],o=t[r];e.set(i,o)}return e};c.inherits(o,n),o.prototype._init=function(){},o.prototype._promiseFulfilled=function(t,e){this._values[e]=t;var n=++this._totalResolved;if(n>=this._length){var r;if(this._isMap)r=h(this._values);else{r={};for(var i=this.length(),o=0,s=this.length();s>o;++o)r[this._values[o+i]]=this._values[o]}return this._resolve(r),!0}return!1},o.prototype.shouldCopyValues=function(){return!1},o.prototype.getActualLength=function(t){return t>>1},e.prototype.props=function(){return s(this)},e.props=function(t){return s(t)}}},{"./es5":13,"./util":36}],26:[function(t,e,n){"use strict";function r(t,e,n,r,i){for(var o=0;i>o;++o)n[o+r]=t[o+e],t[o+e]=void 0}function i(t){this._capacity=t,this._length=0,this._front=0}i.prototype._willBeOverCapacity=function(t){return this._capacity<t},i.prototype._pushOne=function(t){var e=this.length();this._checkCapacity(e+1);var n=this._front+e&this._capacity-1;this[n]=t,this._length=e+1},i.prototype._unshiftOne=function(t){var e=this._capacity;this._checkCapacity(this.length()+1);var n=this._front,r=(n-1&e-1^e)-e;this[r]=t,this._front=r,this._length=this.length()+1},i.prototype.unshift=function(t,e,n){this._unshiftOne(n),this._unshiftOne(e),this._unshiftOne(t)},i.prototype.push=function(t,e,n){var r=this.length()+3;if(this._willBeOverCapacity(r))return this._pushOne(t),this._pushOne(e),void this._pushOne(n);var i=this._front+r-3;this._checkCapacity(r);var o=this._capacity-1;this[i+0&o]=t,this[i+1&o]=e,this[i+2&o]=n,this._length=r},i.prototype.shift=function(){var t=this._front,e=this[t];return this[t]=void 0,this._front=t+1&this._capacity-1,this._length--,e},i.prototype.length=function(){return this._length},i.prototype._checkCapacity=function(t){this._capacity<t&&this._resizeTo(this._capacity<<1)},i.prototype._resizeTo=function(t){var e=this._capacity;this._capacity=t;var n=this._front,i=this._length,o=n+i&e-1;r(this,0,this,e,o)},e.exports=i},{}],27:[function(t,e,n){"use strict";e.exports=function(e,n,r,i){function o(t,o){var c=r(t);if(c instanceof e)return a(c);if(t=s.asArray(t),null===t)return i("expecting an array or an iterable object but got "+s.classString(t));var l=new e(n);void 0!==o&&l._propagateFrom(o,3);for(var u=l._fulfill,p=l._reject,h=0,f=t.length;f>h;++h){var _=t[h];(void 0!==_||h in t)&&e.cast(_)._then(u,p,void 0,l,null)}return l}var s=t("./util"),a=function(t){return t.then(function(e){return o(e,t)})};e.race=function(t){return o(t,void 0)},e.prototype.race=function(){return o(this,void 0)}}},{"./util":36}],28:[function(t,e,n){"use strict";e.exports=function(e,n,r,i,o,s){function a(t,n,r,i){this.constructor$(t);var s=h();this._fn=null===s?n:f.domainBind(s,n),void 0!==r&&(r=e.resolve(r),r._attachCancellationCallback(this)),this._initialValue=r,this._currentCancellable=null,i===o?this._eachValues=Array(this._length):0===i?this._eachValues=null:this._eachValues=void 0,this._promise._captureStackTrace(),this._init$(void 0,-5)}function c(t,e){this.isFulfilled()?e._resolve(t):e._reject(t)}function l(t,e,n,i){if("function"!=typeof e)return r("expecting a function but got "+f.classString(e));var o=new a(t,e,n,i);return o.promise()}function u(t){this.accum=t,this.array._gotAccum(t);var n=i(this.value,this.array._promise);return n instanceof e?(this.array._currentCancellable=n,n._then(p,void 0,void 0,this,void 0)):p.call(this,n)}function p(t){var n=this.array,r=n._promise,i=_(n._fn);r._pushContext();var o;o=void 0!==n._eachValues?i.call(r._boundValue(),t,this.index,this.length):i.call(r._boundValue(),this.accum,t,this.index,this.length),o instanceof e&&(n._currentCancellable=o);var a=r._popContext();return s.checkForgottenReturns(o,a,void 0!==n._eachValues?"Promise.each":"Promise.reduce",r),o}var h=e._getDomain,f=t("./util"),_=f.tryCatch;f.inherits(a,n),a.prototype._gotAccum=function(t){void 0!==this._eachValues&&null!==this._eachValues&&t!==o&&this._eachValues.push(t)},a.prototype._eachComplete=function(t){return null!==this._eachValues&&this._eachValues.push(t),this._eachValues},a.prototype._init=function(){},a.prototype._resolveEmptyArray=function(){this._resolve(void 0!==this._eachValues?this._eachValues:this._initialValue)},a.prototype.shouldCopyValues=function(){return!1},a.prototype._resolve=function(t){this._promise._resolveCallback(t),this._values=null},a.prototype._resultCancelled=function(t){return t===this._initialValue?this._cancel():void(this._isResolved()||(this._resultCancelled$(),this._currentCancellable instanceof e&&this._currentCancellable.cancel(),this._initialValue instanceof e&&this._initialValue.cancel()))},a.prototype._iterate=function(t){this._values=t;var n,r,i=t.length;if(void 0!==this._initialValue?(n=this._initialValue,r=0):(n=e.resolve(t[0]),r=1),this._currentCancellable=n,!n.isRejected())for(;i>r;++r){var o={accum:null,value:t[r],index:r,length:i,array:this};n=n._then(u,void 0,void 0,o,void 0)}void 0!==this._eachValues&&(n=n._then(this._eachComplete,void 0,void 0,this,void 0)),n._then(c,c,void 0,n,this)},e.prototype.reduce=function(t,e){return l(this,t,e,null)},e.reduce=function(t,e,n,r){return l(t,e,n,r)}}},{"./util":36}],29:[function(t,e,n){"use strict";var r,i=t("./util"),o=function(){throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n")},s=i.getNativePromise();if(i.isNode&&"undefined"==typeof MutationObserver){var a=global.setImmediate,c=process.nextTick;r=i.isRecentNode?function(t){a.call(global,t)}:function(t){c.call(process,t)}}else if("function"==typeof s&&"function"==typeof s.resolve){var l=s.resolve();r=function(t){l.then(t)}}else r="undefined"==typeof MutationObserver||"undefined"!=typeof window&&window.navigator&&(window.navigator.standalone||window.cordova)?"undefined"!=typeof setImmediate?function(t){setImmediate(t)}:"undefined"!=typeof setTimeout?function(t){setTimeout(t,0)}:o:function(){var t=document.createElement("div"),e={attributes:!0},n=!1,r=document.createElement("div"),i=new MutationObserver(function(){t.classList.toggle("foo"),n=!1});i.observe(r,e);var o=function(){n||(n=!0,r.classList.toggle("foo"))};return function(n){var r=new MutationObserver(function(){r.disconnect(),n()});r.observe(t,e),o()}}();e.exports=r},{"./util":36}],30:[function(t,e,n){"use strict";e.exports=function(e,n,r){function i(t){this.constructor$(t)}var o=e.PromiseInspection,s=t("./util");s.inherits(i,n),i.prototype._promiseResolved=function(t,e){this._values[t]=e;var n=++this._totalResolved;return n>=this._length?(this._resolve(this._values),!0):!1},i.prototype._promiseFulfilled=function(t,e){var n=new o;return n._bitField=33554432,n._settledValueField=t,this._promiseResolved(e,n)},i.prototype._promiseRejected=function(t,e){var n=new o;return n._bitField=16777216,n._settledValueField=t,this._promiseResolved(e,n)},e.settle=function(t){return r.deprecated(".settle()",".reflect()"),new i(t).promise()},e.prototype.settle=function(){return e.settle(this)}}},{"./util":36}],31:[function(t,e,n){"use strict";e.exports=function(e,n,r){function i(t){this.constructor$(t),this._howMany=0,this._unwrap=!1,this._initialized=!1}function o(t,e){
	if((0|e)!==e||0>e)return r("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");var n=new i(t),o=n.promise();return n.setHowMany(e),n.init(),o}var s=t("./util"),a=t("./errors").RangeError,c=t("./errors").AggregateError,l=s.isArray,u={};s.inherits(i,n),i.prototype._init=function(){if(this._initialized){if(0===this._howMany)return void this._resolve([]);this._init$(void 0,-5);var t=l(this._values);!this._isResolved()&&t&&this._howMany>this._canPossiblyFulfill()&&this._reject(this._getRangeError(this.length()))}},i.prototype.init=function(){this._initialized=!0,this._init()},i.prototype.setUnwrap=function(){this._unwrap=!0},i.prototype.howMany=function(){return this._howMany},i.prototype.setHowMany=function(t){this._howMany=t},i.prototype._promiseFulfilled=function(t){return this._addFulfilled(t),this._fulfilled()===this.howMany()?(this._values.length=this.howMany(),1===this.howMany()&&this._unwrap?this._resolve(this._values[0]):this._resolve(this._values),!0):!1},i.prototype._promiseRejected=function(t){return this._addRejected(t),this._checkOutcome()},i.prototype._promiseCancelled=function(){return this._values instanceof e||null==this._values?this._cancel():(this._addRejected(u),this._checkOutcome())},i.prototype._checkOutcome=function(){if(this.howMany()>this._canPossiblyFulfill()){for(var t=new c,e=this.length();e<this._values.length;++e)this._values[e]!==u&&t.push(this._values[e]);return t.length>0?this._reject(t):this._cancel(),!0}return!1},i.prototype._fulfilled=function(){return this._totalResolved},i.prototype._rejected=function(){return this._values.length-this.length()},i.prototype._addRejected=function(t){this._values.push(t)},i.prototype._addFulfilled=function(t){this._values[this._totalResolved++]=t},i.prototype._canPossiblyFulfill=function(){return this.length()-this._rejected()},i.prototype._getRangeError=function(t){var e="Input array must contain at least "+this._howMany+" items but contains only "+t+" items";return new a(e)},i.prototype._resolveEmptyArray=function(){this._reject(this._getRangeError(0))},e.some=function(t,e){return o(t,e)},e.prototype.some=function(t){return o(this,t)},e._SomePromiseArray=i}},{"./errors":12,"./util":36}],32:[function(t,e,n){"use strict";e.exports=function(t){function e(t){void 0!==t?(t=t._target(),this._bitField=t._bitField,this._settledValueField=t._isFateSealed()?t._settledValue():void 0):(this._bitField=0,this._settledValueField=void 0)}e.prototype._settledValue=function(){return this._settledValueField};var n=e.prototype.value=function(){if(!this.isFulfilled())throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");return this._settledValue()},r=e.prototype.error=e.prototype.reason=function(){if(!this.isRejected())throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");return this._settledValue()},i=e.prototype.isFulfilled=function(){return 0!==(33554432&this._bitField)},o=e.prototype.isRejected=function(){return 0!==(16777216&this._bitField)},s=e.prototype.isPending=function(){return 0===(50397184&this._bitField)},a=e.prototype.isResolved=function(){return 0!==(50331648&this._bitField)};e.prototype.isCancelled=function(){return 0!==(8454144&this._bitField)},t.prototype.__isCancelled=function(){return 65536===(65536&this._bitField)},t.prototype._isCancelled=function(){return this._target().__isCancelled()},t.prototype.isCancelled=function(){return 0!==(8454144&this._target()._bitField)},t.prototype.isPending=function(){return s.call(this._target())},t.prototype.isRejected=function(){return o.call(this._target())},t.prototype.isFulfilled=function(){return i.call(this._target())},t.prototype.isResolved=function(){return a.call(this._target())},t.prototype.value=function(){return n.call(this._target())},t.prototype.reason=function(){var t=this._target();return t._unsetRejectionIsUnhandled(),r.call(t)},t.prototype._value=function(){return this._settledValue()},t.prototype._reason=function(){return this._unsetRejectionIsUnhandled(),this._settledValue()},t.PromiseInspection=e}},{}],33:[function(t,e,n){"use strict";e.exports=function(e,n){function r(t,r){if(u(t)){if(t instanceof e)return t;var i=o(t);if(i===l){r&&r._pushContext();var c=e.reject(i.e);return r&&r._popContext(),c}if("function"==typeof i){if(s(t)){var c=new e(n);return t._then(c._fulfill,c._reject,void 0,c,null),c}return a(t,i,r)}}return t}function i(t){return t.then}function o(t){try{return i(t)}catch(e){return l.e=e,l}}function s(t){try{return p.call(t,"_promise0")}catch(e){return!1}}function a(t,r,i){function o(t){a&&(a._resolveCallback(t),a=null)}function s(t){a&&(a._rejectCallback(t,p,!0),a=null)}var a=new e(n),u=a;i&&i._pushContext(),a._captureStackTrace(),i&&i._popContext();var p=!0,h=c.tryCatch(r).call(t,o,s);return p=!1,a&&h===l&&(a._rejectCallback(h.e,!0,!0),a=null),u}var c=t("./util"),l=c.errorObj,u=c.isObject,p={}.hasOwnProperty;return r}},{"./util":36}],34:[function(t,e,n){"use strict";e.exports=function(e,n,r){function i(t){this.handle=t}function o(t){return clearTimeout(this.handle),t}function s(t){throw clearTimeout(this.handle),t}var a=t("./util"),c=e.TimeoutError;i.prototype._resultCancelled=function(){clearTimeout(this.handle)};var l=function(t){return u(+this).thenReturn(t)},u=e.delay=function(t,o){var s,a;return void 0!==o?(s=e.resolve(o)._then(l,null,null,t,void 0),r.cancellation()&&o instanceof e&&s._setOnCancel(o)):(s=new e(n),a=setTimeout(function(){s._fulfill()},+t),r.cancellation()&&s._setOnCancel(new i(a)),s._captureStackTrace()),s._setAsyncGuaranteed(),s};e.prototype.delay=function(t){return u(t,this)};var p=function(t,e,n){var r;r="string"!=typeof e?e instanceof Error?e:new c("operation timed out"):new c(e),a.markAsOriginatingFromRejection(r),t._attachExtraTrace(r),t._reject(r),null!=n&&n.cancel()};e.prototype.timeout=function(t,e){t=+t;var n,a,c=new i(setTimeout(function(){n.isPending()&&p(n,e,a)},t));return r.cancellation()?(a=this.then(),n=a._then(o,s,void 0,c,void 0),n._setOnCancel(c)):n=this._then(o,s,void 0,c,void 0),n}}},{"./util":36}],35:[function(t,e,n){"use strict";e.exports=function(e,n,r,i,o,s){function a(t){setTimeout(function(){throw t},0)}function c(t){var e=r(t);return e!==t&&"function"==typeof t._isDisposable&&"function"==typeof t._getDisposer&&t._isDisposable()&&e._setDisposable(t._getDisposer()),e}function l(t,n){function i(){if(s>=l)return u._fulfill();var o=c(t[s++]);if(o instanceof e&&o._isDisposable()){try{o=r(o._getDisposer().tryDispose(n),t.promise)}catch(p){return a(p)}if(o instanceof e)return o._then(i,a,null,null,null)}i()}var s=0,l=t.length,u=new e(o);return i(),u}function u(t,e,n){this._data=t,this._promise=e,this._context=n}function p(t,e,n){this.constructor$(t,e,n)}function h(t){return u.isDisposer(t)?(this.resources[this.index]._setDisposable(t),t.promise()):t}function f(t){this.length=t,this.promise=null,this[t-1]=null}var _=t("./util"),d=t("./errors").TypeError,v=t("./util").inherits,y=_.errorObj,m=_.tryCatch,g={};u.prototype.data=function(){return this._data},u.prototype.promise=function(){return this._promise},u.prototype.resource=function(){return this.promise().isFulfilled()?this.promise().value():g},u.prototype.tryDispose=function(t){var e=this.resource(),n=this._context;void 0!==n&&n._pushContext();var r=e!==g?this.doDispose(e,t):null;return void 0!==n&&n._popContext(),this._promise._unsetDisposable(),this._data=null,r},u.isDisposer=function(t){return null!=t&&"function"==typeof t.resource&&"function"==typeof t.tryDispose},v(p,u),p.prototype.doDispose=function(t,e){var n=this.data();return n.call(t,t,e)},f.prototype._resultCancelled=function(){for(var t=this.length,n=0;t>n;++n){var r=this[n];r instanceof e&&r.cancel()}},e.using=function(){var t=arguments.length;if(2>t)return n("you must pass at least 2 arguments to Promise.using");var i=arguments[t-1];if("function"!=typeof i)return n("expecting a function but got "+_.classString(i));var o,a=!0;2===t&&Array.isArray(arguments[0])?(o=arguments[0],t=o.length,a=!1):(o=arguments,t--);for(var c=new f(t),p=0;t>p;++p){var d=o[p];if(u.isDisposer(d)){var v=d;d=d.promise(),d._setDisposable(v)}else{var g=r(d);g instanceof e&&(d=g._then(h,null,null,{resources:c,index:p},void 0))}c[p]=d}for(var b=new Array(c.length),p=0;p<b.length;++p)b[p]=e.resolve(c[p]).reflect();var w=e.all(b).then(function(t){for(var e=0;e<t.length;++e){var n=t[e];if(n.isRejected())return y.e=n.error(),y;if(!n.isFulfilled())return void w.cancel();t[e]=n.value()}C._pushContext(),i=m(i);var r=a?i.apply(void 0,t):i(t),o=C._popContext();return s.checkForgottenReturns(r,o,"Promise.using",C),r}),C=w.lastly(function(){var t=new e.PromiseInspection(w);return l(c,t)});return c.promise=C,C._setOnCancel(c),C},e.prototype._setDisposable=function(t){this._bitField=131072|this._bitField,this._disposer=t},e.prototype._isDisposable=function(){return(131072&this._bitField)>0},e.prototype._getDisposer=function(){return this._disposer},e.prototype._unsetDisposable=function(){this._bitField=-131073&this._bitField,this._disposer=void 0},e.prototype.disposer=function(t){if("function"==typeof t)return new p(t,this,i());throw new d}}},{"./errors":12,"./util":36}],36:[function(t,e,n){"use strict";function r(){try{var t=P;return P=null,t.apply(this,arguments)}catch(e){return T.e=e,T}}function i(t){return P=t,r}function o(t){return null==t||t===!0||t===!1||"string"==typeof t||"number"==typeof t}function s(t){return"function"==typeof t||"object"==typeof t&&null!==t}function a(t){return o(t)?new Error(v(t)):t}function c(t,e){var n,r=t.length,i=new Array(r+1);for(n=0;r>n;++n)i[n]=t[n];return i[n]=e,i}function l(t,e,n){if(!F.isES5)return{}.hasOwnProperty.call(t,e)?t[e]:void 0;var r=Object.getOwnPropertyDescriptor(t,e);return null!=r?null==r.get&&null==r.set?r.value:n:void 0}function u(t,e,n){if(o(t))return t;var r={value:n,configurable:!0,enumerable:!1,writable:!0};return F.defineProperty(t,e,r),t}function p(t){throw t}function h(t){try{if("function"==typeof t){var e=F.names(t.prototype),n=F.isES5&&e.length>1,r=e.length>0&&!(1===e.length&&"constructor"===e[0]),i=A.test(t+"")&&F.names(t).length>0;if(n||r||i)return!0}return!1}catch(o){return!1}}function f(t){function e(){}e.prototype=t;for(var n=8;n--;)new e;return t}function _(t){return D.test(t)}function d(t,e,n){for(var r=new Array(t),i=0;t>i;++i)r[i]=e+i+n;return r}function v(t){try{return t+""}catch(e){return"[no string representation]"}}function y(t){return null!==t&&"object"==typeof t&&"string"==typeof t.message&&"string"==typeof t.name}function m(t){try{u(t,"isOperational",!0)}catch(e){}}function g(t){return null==t?!1:t instanceof Error.__BluebirdErrorTypes__.OperationalError||t.isOperational===!0}function b(t){return y(t)&&F.propertyIsWritable(t,"stack")}function w(t){return{}.toString.call(t)}function C(t,e,n){for(var r=F.names(t),i=0;i<r.length;++i){var o=r[i];if(n(o))try{F.defineProperty(e,o,F.getDescriptor(t,o))}catch(s){}}}function j(t,e){return H?process.env[t]:e}function k(){if("function"==typeof Promise)try{var t=new Promise(function(){});if("[object Promise]"==={}.toString.call(t))return Promise}catch(e){}}function E(t,e){return t.bind(e)}var F=t("./es5"),x="undefined"==typeof navigator,T={e:{}},P,R="undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:void 0!==this?this:null,S=function(t,e){function n(){this.constructor=t,this.constructor$=e;for(var n in e.prototype)r.call(e.prototype,n)&&"$"!==n.charAt(n.length-1)&&(this[n+"$"]=e.prototype[n])}var r={}.hasOwnProperty;return n.prototype=e.prototype,t.prototype=new n,t.prototype},O=function(){var t=[Array.prototype,Object.prototype,Function.prototype],e=function(e){for(var n=0;n<t.length;++n)if(t[n]===e)return!0;return!1};if(F.isES5){var n=Object.getOwnPropertyNames;return function(t){for(var r=[],i=Object.create(null);null!=t&&!e(t);){var o;try{o=n(t)}catch(s){return r}for(var a=0;a<o.length;++a){var c=o[a];if(!i[c]){i[c]=!0;var l=Object.getOwnPropertyDescriptor(t,c);null!=l&&null==l.get&&null==l.set&&r.push(c)}}t=F.getPrototypeOf(t)}return r}}var r={}.hasOwnProperty;return function(n){if(e(n))return[];var i=[];t:for(var o in n)if(r.call(n,o))i.push(o);else{for(var s=0;s<t.length;++s)if(r.call(t[s],o))continue t;i.push(o)}return i}}(),A=/this\s*\.\s*\S+\s*=/,D=/^[a-z$_][a-z$_0-9]*$/i,V=function(){return"stack"in new Error?function(t){return b(t)?t:new Error(v(t))}:function(t){if(b(t))return t;try{throw new Error(v(t))}catch(e){return e}}}(),I=function(t){return F.isArray(t)?t:null};if("undefined"!=typeof Symbol&&Symbol.iterator){var L="function"==typeof Array.from?function(t){return Array.from(t)}:function(t){for(var e,n=[],r=t[Symbol.iterator]();!(e=r.next()).done;)n.push(e.value);return n};I=function(t){return F.isArray(t)?t:null!=t&&"function"==typeof t[Symbol.iterator]?L(t):null}}var H="undefined"!=typeof process&&"[object process]"===w(process).toLowerCase(),N={isClass:h,isIdentifier:_,inheritedDataKeys:O,getDataPropertyOrDefault:l,thrower:p,isArray:F.isArray,asArray:I,notEnumerableProp:u,isPrimitive:o,isObject:s,isError:y,canEvaluate:x,errorObj:T,tryCatch:i,inherits:S,withAppended:c,maybeWrapAsError:a,toFastProperties:f,filledRange:d,toString:v,canAttachTrace:b,ensureErrorObject:V,originatesFromRejection:g,markAsOriginatingFromRejection:m,classString:w,copyDescriptors:C,hasDevTools:"undefined"!=typeof chrome&&chrome&&"function"==typeof chrome.loadTimes,isNode:H,env:j,global:R,getNativePromise:k,domainBind:E};N.isRecentNode=N.isNode&&function(){var t=process.versions.node.split(".").map(Number);return 0===t[0]&&t[1]>10||t[0]>0}(),N.isNode&&N.toFastProperties(process);try{throw new Error}catch(B){N.lastLineError=B}e.exports=N},{"./es5":13}]},{},[4])(4)}),"undefined"!=typeof window&&null!==window?window.P=window.Promise:"undefined"!=typeof self&&null!==self&&(self.P=self.Promise);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("W2nU"), (function() { return this; }()), __webpack_require__("162o").setImmediate))

/***/ },

/***/ "tDBr":
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Url = function () {

	  function getHost(url) {
	    if (url.match(/^chrome/)) {
	      return 'chrome';
	    }

	    var match = url.match(/^https?:\/\/([^\/]+)\/?/);
	    if (!match) {
	      throw Error('Not a valid url: ' + url);
	    } else {
	      return match[1].toLowerCase();
	    }
	  }
	  /**
	   * A regular expression for identifying favicon URLs.
	   * @const {!RegExp}
	   */
	  var Url = function Url(urlStr) {
	    this.url = urlStr;
	    Object.defineProperties(this, {
	      /**
	       * host of url
	       * eg: host part of 'https://www.se.com/g?q=3#t' is 'www.se.com'
	       * @member {String} host
	       * @memberOf Url#
	       */
	      host: {
	        get: function get() {
	          //noinspection JSPotentiallyInvalidUsageOfThis,JSUnresolvedVariable
	          return getHost(this.url);
	        },
	        enumerable: true
	      },
	      /**
	       * origin of url
	       * eg: origin part of 'https://se.com/g?q=3#t' is 'https://se.com'
	       * */
	      origin: {
	        get: function get() {
	          var match = this.url.match(/^((http|https|chrome|chrome\-extension):\/\/[^\/]+)\/?/);
	          if (!match) {
	            throw Error('Not a valid url: ' + this.url);
	          } else {
	            return match[1].toLowerCase();
	          }
	        },
	        enumerable: true
	      },
	      /**
	       * Creates a favicon url depend on given url.
	       * @param {number=} size Optional preferred size of the favicon.
	       * @param {string=} type Optional type of favicon to request. Valid values
	       *     are 'favicon' and 'touch-icon'. Default is 'favicon'.
	       * @return {string} url for the favicon.
	       */
	      faviconUrl: {
	        get: function get(size, type) {
	          size = size || 16;
	          type = type || 'favicon';

	          return 'chrome://' + type + '/size/' + size + '@1x/' + (
	          // Note: Literal 'iconurl' must match FAVICON_URL_REGEX
	          Url.FAVICON_URL_REGEX.test(this.url) ? 'iconurl/' + this.url : this.origin);
	        },
	        enumerable: true
	      },
	      searchKey: {
	        get: function get() {
	          var match = this.url.match(/([^#?&]+)=%s/i);
	          return !match ? '' : match[1];
	        },
	        enumerable: true
	      }
	    });
	  };
	  Url.FAVICON_URL_REGEX = /\.ico$/i;
	  Url.googleFailedUrlPattern = /^https?:\/\/ipv[46]\.google\.[^/]*\/sorry/i;
	  Url.prototype = {
	    //@TODO add case sensitive option, and set insensitive default
	    includes: function includes(search) {
	      return this.url.includeString(search);
	    },

	    getQueryVal: function getQueryVal(key) {
	      var val = this.url.match(new RegExp(key + "=([^\&]*)(\&?)", 'i'));
	      return val ? val[1].replace(/\+/g, ' ') : null;
	    }
	  };
	  return Url;
	}();

	exports.default = Url;

/***/ },

/***/ "162o":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__("W2nU").nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("162o").setImmediate, __webpack_require__("162o").clearImmediate))

/***/ },

/***/ "wYMm":
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	const CONFIG = {
	  selectionMaxLength: 200,
	  translateMaxLength: 80,
	  engineTypes: {
	    1: { name: 'Search Engine', order: 1, default: true },
	    2: { name: 'Video', order: 2, default: true },
	    3: { name: 'Translate', order: 3, default: true },
	    4: { name: 'EBook', order: 4, default: true },
	    5: { name: 'Shopping', order: 5, default: true },
	    6: { name: 'Development', order: 6, default: true },
	    7: { name: 'Sub', order: 7, default: true },
	    8: { name: 'Torrents', order: 8, default: true },
	    101: { name: 'Search Engine', order: 1 },
	    102: { name: 'Video', order: 2 },
	    103: { name: 'Translate', order: 3 },
	    104: { name: 'EBook', order: 4 },
	    105: { name: 'Development', order: 5 },
	    106: { name: 'Shopping', order: 6 }
	  },
	  engines: {
	    // Search engines
	    google: {
	      order: 100,
	      typeId: 101,
	      defaultTypeId: 1,
	      displayName: 'Google',
	      open: true,
	      // view-source:https://www.google.com/supported_domains
	      hosts: ['ipv4.google.com', 'ipv6.google.com', 'ipv6.google.com.hk', 'www.google.com', 'www.google.ad', 'www.google.ae', 'www.google.com.af', 'www.google.com.ag', 'www.google.com.ai', 'www.google.al', 'www.google.am', 'www.google.co.ao', 'www.google.com.ar', 'www.google.as', 'www.google.at', 'www.google.com.au', 'www.google.az', 'www.google.ba', 'www.google.com.bd', 'www.google.be', 'www.google.bf', 'www.google.bg', 'www.google.com.bh', 'www.google.bi', 'www.google.bj', 'www.google.com.bn', 'www.google.com.bo', 'www.google.com.br', 'www.google.bs', 'www.google.bt', 'www.google.co.bw', 'www.google.by', 'www.google.com.bz', 'www.google.ca', 'www.google.cd', 'www.google.cf', 'www.google.cg', 'www.google.ch', 'www.google.ci', 'www.google.co.ck', 'www.google.cl', 'www.google.cm', 'www.google.cn', 'www.google.com.co', 'www.google.co.cr', 'www.google.com.cu', 'www.google.cv', 'www.google.com.cy', 'www.google.cz', 'www.google.de', 'www.google.dj', 'www.google.dk', 'www.google.dm', 'www.google.com.do', 'www.google.dz', 'www.google.com.ec', 'www.google.ee', 'www.google.com.eg', 'www.google.es', 'www.google.com.et', 'www.google.fi', 'www.google.com.fj', 'www.google.fm', 'www.google.fr', 'www.google.ga', 'www.google.ge', 'www.google.gg', 'www.google.com.gh', 'www.google.com.gi', 'www.google.gl', 'www.google.gm', 'www.google.gp', 'www.google.gr', 'www.google.com.gt', 'www.google.gy', 'www.google.com.hk', 'www.google.hn', 'www.google.hr', 'www.google.ht', 'www.google.hu', 'www.google.co.id', 'www.google.ie', 'www.google.co.il', 'www.google.im', 'www.google.co.in', 'www.google.iq', 'www.google.is', 'www.google.it', 'www.google.je', 'www.google.com.jm', 'www.google.jo', 'www.google.co.jp', 'www.google.co.ke', 'www.google.com.kh', 'www.google.ki', 'www.google.kg', 'www.google.co.kr', 'www.google.com.kw', 'www.google.kz', 'www.google.la', 'www.google.com.lb', 'www.google.li', 'www.google.lk', 'www.google.co.ls', 'www.google.lt', 'www.google.lu', 'www.google.lv', 'www.google.com.ly', 'www.google.co.ma', 'www.google.md', 'www.google.me', 'www.google.mg', 'www.google.mk', 'www.google.ml', 'www.google.com.mm', 'www.google.mn', 'www.google.ms', 'www.google.com.mt', 'www.google.mu', 'www.google.mv', 'www.google.mw', 'www.google.com.mx', 'www.google.com.my', 'www.google.co.mz', 'www.google.com.na', 'www.google.com.nf', 'www.google.com.ng', 'www.google.com.ni', 'www.google.ne', 'www.google.nl', 'www.google.no', 'www.google.com.np', 'www.google.nr', 'www.google.nu', 'www.google.co.nz', 'www.google.com.om', 'www.google.com.pa', 'www.google.com.pe', 'www.google.com.pg', 'www.google.com.ph', 'www.google.com.pk', 'www.google.pl', 'www.google.pn', 'www.google.com.pr', 'www.google.ps', 'www.google.pt', 'www.google.com.py', 'www.google.com.qa', 'www.google.ro', 'www.google.ru', 'www.google.rw', 'www.google.com.sa', 'www.google.com.sb', 'www.google.sc', 'www.google.se', 'www.google.com.sg', 'www.google.sh', 'www.google.si', 'www.google.sk', 'www.google.com.sl', 'www.google.sn', 'www.google.so', 'www.google.sm', 'www.google.sr', 'www.google.st', 'www.google.com.sv', 'www.google.td', 'www.google.tg', 'www.google.co.th', 'www.google.com.tj', 'www.google.tk', 'www.google.tl', 'www.google.tm', 'www.google.tn', 'www.google.to', 'www.google.com.tr', 'www.google.tt', 'www.google.com.tw', 'www.google.co.tz', 'www.google.com.ua', 'www.google.co.ug', 'www.google.co.uk', 'www.google.com.uy', 'www.google.co.uz', 'www.google.com.vc', 'www.google.co.ve', 'www.google.vg', 'www.google.co.vi', 'www.google.com.vn', 'www.google.vu', 'www.google.ws', 'www.google.rs', 'www.google.co.za', 'www.google.co.zm', 'www.google.co.zw', 'www.google.cat'],
	      url: 'https://www.google.com.hk/search?q=%s'
	    },
	    aol: {
	      order: 400,
	      typeId: 101,
	      defaultTypeId: 1,
	      displayName: 'Aol Search',
	      open: false,
	      hosts: ['www.aolsearch.com', 'search.aol.com'],
	      url: 'http://www.aolsearch.com/search?q=%s'
	    },
	    baidu: {
	      order: 200,
	      typeId: 101,
	      defaultTypeId: 1,
	      displayName: 'Baidu',
	      open: true,
	      hosts: ['www.baidu.com'],
	      url: 'https://www.baidu.com/s?wd=%s'
	    },
	    bing: {
	      order: 300,
	      typeId: 101,
	      defaultTypeId: 1,
	      displayName: 'Bing',
	      open: true,
	      hosts: ['www.bing.com', 'bing.co', 'bing.co.uk', 'bing.com', 'be.bing.com', 'br.bing.com', 'ca.bing.com', 'cn.bing.com', 'de.bing.com', 'fr.bing.com', 'hk.bing.com', 'it.bing.com', 'jp.bing.com', 'm.bing.com', 'nz.bing.com', 'ssl.bing.com', 'uk.bing.com'],
	      url: 'https://cn.bing.com/search?q=%s'
	    },
	    yahoo: {
	      order: 500,
	      typeId: 101,
	      defaultTypeId: 1,
	      displayName: 'Yahoo',
	      open: false,
	      hosts: ['at.search.yahoo.com', 'au.search.yahoo.com', 'br.search.yahoo.com', 'ca.search.yahoo.com', 'qc.search.yahoo.com', 'ch.search.yahoo.com', 'chfr.search.yahoo.com', 'chit.search.yahoo.com', 'cl.search.yahoo.com', 'cn.search.yahoo.com', 'yahoo.cn', 'co.search.yahoo.com', 'espanol.search.yahoo.com', 'search.yahoo.com', 'de.search.yahoo.com', 'dk.search.yahoo.com', 'es.search.yahoo.com', 'fi.search.yahoo.com', 'fr.search.yahoo.com', 'gr.search.yahoo.com', 'hk.search.yahoo.com', 'id.search.yahoo.com', 'in.search.yahoo.com', 'it.search.yahoo.com', 'maktoob.search.yahoo.com', 'search.yahoo.co.jp', 'kr.search.yahoo.com', 'mx.search.yahoo.com', 'malaysia.search.yahoo.com', 'nl.search.yahoo.com', 'no.search.yahoo.com', 'nz.search.yahoo.com', 'pe.search.yahoo.com', 'ph.search.yahoo.com', 'pl.search.yahoo.com', 'ru.search.yahoo.com', 'se.search.yahoo.com', 'sg.search.yahoo.com', 'th.search.yahoo.com', 'tr.search.yahoo.com', 'tw.search.yahoo.com', 'uk.search.yahoo.com', 've.search.yahoo.com', 'vn.search.yahoo.com'],
	      url: 'https://search.yahoo.com/search?p=%s'
	    },
	    sogou: {
	      order: 600,
	      typeId: 101,
	      defaultTypeId: 1,
	      displayName: 'Sogou',
	      open: false,
	      hosts: ['www.sogou.com'],
	      url: 'https://www.sogou.com/web?query=%s'
	    },
	    360: {
	      order: 700,
	      typeId: 101,
	      defaultTypeId: 1,
	      displayName: '360',
	      open: false,
	      hosts: ['www.so.com'],
	      url: 'https://www.so.com/s?q=%s'
	    },
	    duck: {
	      order: 800,
	      typeId: 101,
	      defaultTypeId: 1,
	      displayName: 'DuckDuckGo',
	      open: true,
	      hosts: ['duckduckgo.com'],
	      url: 'https://duckduckgo.com/?q=%s'
	    },
	    // Movie, Video, Sub
	    doubanMovie: {
	      order: 900,
	      typeId: 102,
	      defaultTypeId: 2,
	      displayName: '豆瓣电影',
	      open: true,
	      hosts: ['movie.douban.com'],
	      url: 'https://movie.douban.com/subject_search?search_text=%s'
	    },
	    RARBG: {
	      order: 1000,
	      typeId: 102,
	      defaultTypeId: 8,
	      displayName: 'RARBG',
	      open: true,
	      hosts: ['rarbg.to'],
	      url: 'https://rarbg.to/torrents.php?search=%s'
	    },
	    AcFun: {
	      order: 1100,
	      typeId: 102,
	      defaultTypeId: 2,
	      displayName: 'AcFun',
	      open: false,
	      hosts: ['www.acfun.tv'],
	      url: 'http://www.acfun.tv/search/#query=%s'
	    },
	    bilibili: {
	      order: 1200,
	      typeId: 102,
	      defaultTypeId: 2,
	      displayName: 'bilibili',
	      open: true,
	      hosts: ['search.bilibili.com'],
	      url: 'http://search.bilibili.com/all?keyword=%s'
	    },
	    tencentVideo: {
	      order: 1300,
	      typeId: 102,
	      defaultTypeId: 2,
	      displayName: '腾讯视频',
	      open: true,
	      hosts: ['v.qq.com'],
	      url: 'http://v.qq.com/x/search/?q=%s'
	    },
	    youtube: {
	      order: 1400,
	      typeId: 102,
	      defaultTypeId: 2,
	      displayName: 'YouTube',
	      open: true,
	      hosts: ['www.youtube.com'],
	      url: 'https://www.youtube.com/results?search_query=%s'
	    },
	    subHD: {
	      order: 1500,
	      typeId: 102,
	      defaultTypeId: 7,
	      displayName: 'Sub HD',
	      open: true,
	      hosts: ['subhd.com'],
	      url: 'http://subhd.com/search/%s'
	    },
	    zimuku: {
	      order: 1600,
	      typeId: 102,
	      defaultTypeId: 7,
	      displayName: 'zimuku',
	      open: false,
	      hosts: ['www.zimuku.net'],
	      url: 'http://www.zimuku.net/search?q=%s'
	    },
	    // Dictionary
	    iciba: {
	      order: 1700,
	      typeId: 103,
	      defaultTypeId: 3,
	      displayName: '爱词霸',
	      open: true,
	      hosts: ['www.iciba.com'],
	      url: 'http://www.iciba.com/%s'
	    },
	    youdaoTranslate: {
	      order: 1710,
	      typeId: 103,
	      defaultTypeId: 3,
	      displayName: '有道翻译',
	      open: false,
	      hosts: ['fanyi.youdao.com'],
	      url: 'http://fanyi.youdao.com/translate?i=%s'
	    },
	    youdaoDict: {
	      order: 1720,
	      typeId: 103,
	      defaultTypeId: 3,
	      displayName: '有道词典',
	      open: true,
	      hosts: ['dict.youdao.com'],
	      url: 'http://dict.youdao.com/w/%s'
	    },
	    zdic: {
	      order: 1750,
	      typeId: 103,
	      defaultTypeId: 3,
	      displayName: '汉典',
	      open: true,
	      hosts: ['www.zdic.net'],
	      url: 'http://www.zdic.net/search/?c=3&q=%s'
	    },
	    // EBook
	    readFree: {
	      order: 1800,
	      typeId: 104,
	      defaultTypeId: 4,
	      displayName: 'readFree',
	      open: true,
	      hosts: ['readfree.me'],
	      url: 'http://readfree.me/search/?q=%s'
	    },
	    ITeBooks: {
	      order: 1900,
	      typeId: 104,
	      defaultTypeId: 4,
	      displayName: 'IT eBooks',
	      open: true,
	      hosts: ['it-ebooks.info'],
	      url: 'https://cse.google.com/cse?cx=013493258683483688568:xhfa6ctm1ki&q=%s#gsc.tab=0&gsc.q=%s'
	    },
	    // Development
	    explainShell: {
	      order: 2000,
	      typeId: 105,
	      defaultTypeId: 6,
	      displayName: 'explainShell',
	      open: true,
	      hosts: ['explainShell.com'],
	      url: 'http://explainshell.com/explain?cmd=%s'
	    },
	    mdn: {
	      order: 2100,
	      typeId: 105,
	      defaultTypeId: 6,
	      displayName: 'MDN',
	      open: true,
	      hosts: ['developer.mozilla.org'],
	      url: 'https://developer.mozilla.org/search?q=%s'
	    },
	    gitHub: {
	      order: 2200,
	      typeId: 105,
	      defaultTypeId: 6,
	      displayName: 'GitHub',
	      open: true,
	      hosts: ['github.com'],
	      url: 'https://github.com/search?utf8=%E2%9C%93&q=%s'
	    },
	    htmlPreview: {
	      order: 2300,
	      typeId: 105,
	      defaultTypeId: 6,
	      displayName: 'HTMLPreview',
	      open: true,
	      hosts: ['htmlpreview.github.io'],
	      url: 'http://htmlpreview.github.io/?%s'
	    },
	    devDocs: {
	      order: 2400,
	      typeId: 105,
	      defaultTypeId: 6,
	      displayName: 'DevDocs',
	      open: true,
	      hosts: ['devdocs.io'],
	      url: 'http://devdocs.io/#q=%s'
	    },
	    stackoverflow: {
	      order: 2500,
	      typeId: 105,
	      defaultTypeId: 6,
	      displayName: 'stackoverflow',
	      open: true,
	      hosts: ['stackoverflow.com'],
	      url: 'https://stackoverflow.com/search?q=%s'
	    },
	    //Shopping
	    etao: {
	      order: 2600,
	      typeId: 106,
	      defaultTypeId: 5,
	      displayName: 'etao',
	      open: false,
	      hosts: ['s.etao.com'],
	      url: 'http://s.etao.com/search?q=%s'
	    },
	    tmall: {
	      order: 2700,
	      typeId: 106,
	      defaultTypeId: 5,
	      displayName: '天猫',
	      open: true,
	      hosts: ['list.tmall.com'],
	      url: 'https://list.tmall.com/search_product.htm?q=%s'
	    },
	    jd: {
	      order: 2800,
	      typeId: 106,
	      defaultTypeId: 5,
	      displayName: '京东',
	      open: true,
	      hosts: ['search.jd.com'],
	      url: 'http://search.jd.com/Search?keyword=%s&enc=utf-8'
	    },
	    amazon: {
	      order: 2900,
	      typeId: 106,
	      defaultTypeId: 5,
	      displayName: '亚马逊',
	      open: true,
	      hosts: ['list.tmall.com'],
	      url: 'https://www.amazon.cn/s/?field-keywords=%s'
	    },
	    taobao: {
	      order: 3000,
	      typeId: 106,
	      defaultTypeId: 6,
	      displayName: '淘宝',
	      open: true,
	      hosts: ['s.taobao.com'],
	      url: 'https://s.taobao.com/search?q=%s'
	    }
	  },
	  devMode: true
	};

	exports.default = CONFIG;

/***/ },

/***/ "5a/Z":
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.minErr = exports.clog = exports.util = undefined;

	var _config = __webpack_require__("wYMm");

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * case insensitive version of String.prototype.includes
	 * */
	String.prototype.includeString = function (search, start, caseSensitive) {
	  'use strict';

	  caseSensitive = caseSensitive === void 0 ? false : !!caseSensitive;
	  if (caseSensitive) {
	    return this.includes(search, start);
	  }
	  if (typeof start !== 'number') {
	    start = 0;
	  }
	  return start + search.length > this.length ? false : this.toLowerCase().indexOf(search.toLowerCase(), start) !== -1;
	};
	if (!Array.prototype.includes) {
	  Array.prototype.includes = function (searchElement /*, fromIndex*/) {
	    'use strict';

	    if (this == null) {
	      throw new TypeError('Array.prototype.includes called on null or undefined');
	    }

	    var O = Object(this);
	    var len = parseInt(O.length, 10) || 0;
	    if (len === 0) {
	      return false;
	    }
	    var n = parseInt(arguments[1], 10) || 0;
	    var k;
	    if (n >= 0) {
	      k = n;
	    } else {
	      k = len + n;
	      if (k < 0) {
	        k = 0;
	      }
	    }
	    var currentElement;
	    while (k < len) {
	      currentElement = O[k];
	      if (searchElement === currentElement || searchElement !== searchElement && currentElement !== currentElement) {
	        // NaN !== NaN
	        return true;
	      }
	      k++;
	    }
	    return false;
	  };
	}

	var clog = function clog() {
	  if (_config2.default.devMode) {
	    console.log.apply(this, arguments);
	  }
	};
	clog.info = function () {
	  Array.prototype.slice.call(arguments).forEach(function (text) {
	    clog('%c' + text, 'color: blue');
	  });
	};
	clog.warn = function () {
	  Array.prototype.slice.call(arguments).forEach(function (text) {
	    clog('%c' + text, 'color: yellow');
	  });
	};
	clog.err = function () {
	  Array.prototype.slice.call(arguments).forEach(function (text) {
	    clog('%c' + text, 'color: red');
	  });
	};

	var util = {
	  $: function $(selector) {
	    return document.querySelector(selector);
	  },
	  $all: function $all(selector) {
	    return document.querySelectorAll(selector);
	  },
	  onceLoaded: function onceLoaded(onLoad) {
	    return new Promise(function (resolve) {
	      window.addEventListener("DOMContentLoaded", function () {
	        resolve(onLoad());
	      });
	    });
	  },
	  getCurrentTab: function getCurrentTab() {
	    return new Promise(function (resolve) {
	      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
	        var tab = tabs[0];
	        resolve(tab);
	      });
	    });
	  },
	  /**
	   * undefined, null, void 0, [], {}, ''
	   * with .length === 0 is empty,
	   * object without a own enumerable property is empty
	   * @return Boolean
	   * @param {Object} obj
	   */
	  isEmpty: function isEmpty(obj) {
	    if (obj == null) return true;
	    if (obj.length !== undefined) return obj.length === 0;
	    return Object.keys(obj).length === 0;
	  },

	  /**
	   * Returns a function, that, as long as it continues to be invoked, will not
	   * be triggered. The function will be called after it stops being called for
	   * `delay` milliseconds. If `atBegin` is passed, trigger the function on the
	   * leading edge, instead of the trailing.
	   * */
	  debounce: function debounce(fn, delay, atBegin) {
	    var timeout;
	    return function () {
	      var that = this,
	          args = arguments;
	      clearTimeout(timeout);
	      timeout = setTimeout(function () {
	        timeout = null;
	        if (!atBegin) fn.apply(that, args);
	      }, delay);
	      if (atBegin && !timeout) {
	        fn.apply(that, args);
	      }
	    };
	  },
	  getMouseButton: function getMouseButton(evt) {
	    // Handle different event models
	    var e = evt || window.event;
	    var btnCode = {
	      0: 'left',
	      1: 'middle',
	      2: 'right'
	    };

	    if ('object' !== typeof e) {
	      throw Error('evt must be an object');
	    } else if (typeof e.button === 'undefined') {
	      throw Error("evt must hasOwnProperty 'button'");
	    }

	    return btnCode[e.button] ? btnCode[e.button] : '';
	  }
	};

	function minErr(module) {
	  return function () {
	    var code = arguments[0],
	        prefix = '[' + (module ? module + ':' : '') + code + '] ',
	        template = arguments[1],
	        templateArgs = arguments,
	        message;

	    message = prefix + template.replace(/\{\d+\}/g, function (match) {
	      var index = +match.slice(1, -1),
	          arg;

	      if (index + 2 < templateArgs.length) {
	        arg = templateArgs[index + 2];
	        if (typeof arg === 'function') {
	          return arg.toString().replace(/ ?\{[\s\S]*$/, '');
	        } else if (typeof arg === 'undefined') {
	          return 'undefined';
	        } else if (typeof arg !== 'string') {
	          return JSON.stringify(arg);
	        }
	        return arg;
	      }
	      return match;
	    });

	    return new Error(message);
	  };
	}

	exports.util = util;
	exports.clog = clog;
	exports.minErr = minErr;

/***/ },

/***/ "gLfi":
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _DB = __webpack_require__("U2e7");

	var _DB2 = _interopRequireDefault(_DB);

	var _localforageBluebird = __webpack_require__("6PVA");

	var _localforageBluebird2 = _interopRequireDefault(_localforageBluebird);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	let Engine = new _DB2.default(_localforageBluebird2.default, 'engine');
	Engine.set = function (key, engine) {
	  // ensure all hosts are lower case
	  engine.hosts = engine.hosts.map(function (host) {
	    return host.toLowerCase();
	  });
	  return _DB2.default.prototype.set.call(this, key, engine);
	};
	/**
	 * @param {Boolean} [assoc=false] if resolve a assoc object
	 * @param {Function?} filter
	 * @return {Promise}
	 * */
	Engine.getSortedAll = function (assoc, filter) {
	  assoc = assoc === void 0 ? false : !!assoc;
	  return this.getAll(true, filter).then(function (engines) {
	    engines.sort(function (engineA, engineB) {
	      return engineA.order - engineB.order;
	    });
	    return assoc ? _DB2.default.assoc(engines) : engines;
	  }).catch(function (err) {
	    throw new Error('Error in engine.getAll: ' + err);
	  });
	};
	/**
	 * @param {Boolean} [assoc=false] if resolve a assoc object
	 * @param {Function?} filter
	 * @return {Promise}
	 * */
	Engine.getOpen = function (assoc, filter) {
	  assoc = assoc === void 0 ? false : !!assoc;
	  filter = filter || function () {
	    return true;
	  };
	  return this.getAll(true, function (engine) {
	    return engine.open && filter(engine);
	  }).then(function (engines) {
	    var openEngines = engines.sort(function (engineA, engineB) {
	      return engineA.order - engineB.order;
	    });
	    return assoc ? _DB2.default.assoc(openEngines) : openEngines;
	  }).catch(function (err) {
	    throw new Error('Error in engine.getOpen: ' + err);
	  });
	};

	/**
	 * @param {String} host A valid host
	 * @return {Promise}
	 * if not found in hosts, next then() will get false,
	 * if found, next then() will get the engine keys
	 * */
	Engine.searchKeys = function (host) {
	  host = host.toLowerCase();
	  return this.getOpen().filter(function (se) {
	    return se.hosts.includes(host);
	  }).then(function (engines) {
	    return Object.keys(_DB2.default.assoc(engines));
	  }).catch(function (err) {
	    throw new Error('Error in searchEngineKeys(host = ' + host + '): ' + err);
	  });
	};

	exports.default = Engine;

/***/ },

/***/ "U2e7":
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Created by ray7551@gmail.com on 16-10-27.
	 */

	/**
	 * @param {LocalForage} localforage
	 * @param {String} storeName
	 * @param {String=} name
	 * */
	function DB(localforage, storeName, name) {
	  storeName = storeName || 'app';
	  name = name || 'sc';
	  this.lf = localforage.createInstance({
	    // driver: localforage.INDEXEDDB,
	    driver: localforage.LOCALSTORAGE,
	    name: name,
	    storeName: storeName
	  });
	}
	/**
	 * array to assoc object
	 * */
	DB.assoc = function (array, key) {
	  var res = {};
	  key = key || '$$key';
	  array.forEach(function (item) {
	    if (item[key]) {
	      res[item[key]] = item;
	    }
	  });
	  return res;
	};
	/**
	 * assoc object to array
	 * */
	DB.array = function (assocObj) {
	  var res = [];
	  Object.keys(assocObj).forEach(function (key) {
	    _defineInnerKey(assocObj[key], key);
	    res.push(assocObj[key]);
	  });
	  return res;
	};

	function _defineInnerKey(item, key, keyName) {
	  keyName = keyName || '$$key';
	  if (item === null || item === void 0) {
	    throw new Error('Can not define inner key of null or undefined');
	  }
	  switch (typeof item) {
	    case 'object':
	      Object.defineProperty(item, keyName, {
	        value: key,
	        enumerable: false
	      });
	      return item;
	      break;
	    case 'string':
	    case 'number':
	      var obj = {};
	      obj[key] = item;
	      return _defineInnerKey(obj, key);
	      break;
	  }
	  return item;
	}

	DB.prototype.get = function (key, withInnerKey) {
	  withInnerKey = withInnerKey === void 0 ? false : !!withInnerKey;
	  return this.lf.getItem(key).then(function (item) {
	    return withInnerKey ? _defineInnerKey(item, key) : item;
	  });
	};
	DB.prototype.getAll = function (withInnerKey, filter) {
	  withInnerKey = withInnerKey === void 0 ? false : !!withInnerKey;
	  return this.keys().map(function (key) {
	    return this.get(key, withInnerKey);
	  }.bind(this)).then(function (items) {
	    return filter ? items.filter(filter) : items;
	  });
	};

	DB.prototype.set = function (key, val) {
	  return this.lf.setItem(key, val);
	};
	DB.prototype.clear = function () {
	  return this.lf.clear();
	};
	DB.prototype.keys = function () {
	  return this.lf.keys();
	};

	exports.default = DB;

/***/ },

/***/ "6PVA":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	__webpack_require__("//Fk").default = __webpack_require__("qgje");
	global.Promise = __webpack_require__("qgje");

	let localforage = __webpack_require__("8kqn");

	exports.default = localforage;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "//Fk":
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__("U5ju"), __esModule: true };

/***/ },

/***/ "U5ju":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("M6a0");
	__webpack_require__("zQR9");
	__webpack_require__("+tPU");
	__webpack_require__("CXw9");
	module.exports = __webpack_require__("FeBl").Promise;

/***/ },

/***/ "M6a0":
/***/ function(module, exports) {

	

/***/ },

/***/ "zQR9":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__("h65t")(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__("vIB/")(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },

/***/ "h65t":
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__("UuGF")
	  , defined   = __webpack_require__("52gC");
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },

/***/ "UuGF":
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },

/***/ "52gC":
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },

/***/ "vIB/":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__("O4g8")
	  , $export        = __webpack_require__("kM2E")
	  , redefine       = __webpack_require__("880/")
	  , hide           = __webpack_require__("hJx8")
	  , has            = __webpack_require__("D2L2")
	  , Iterators      = __webpack_require__("/bQp")
	  , $iterCreate    = __webpack_require__("94VQ")
	  , setToStringTag = __webpack_require__("e6n0")
	  , getPrototypeOf = __webpack_require__("PzxK")
	  , ITERATOR       = __webpack_require__("dSzd")('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },

/***/ "O4g8":
/***/ function(module, exports) {

	module.exports = true;

/***/ },

/***/ "kM2E":
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__("7KvD")
	  , core      = __webpack_require__("FeBl")
	  , ctx       = __webpack_require__("+ZMJ")
	  , hide      = __webpack_require__("hJx8")
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },

/***/ "7KvD":
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },

/***/ "FeBl":
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },

/***/ "+ZMJ":
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__("lOnJ");
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },

/***/ "lOnJ":
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },

/***/ "hJx8":
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__("evD5")
	  , createDesc = __webpack_require__("X8DO");
	module.exports = __webpack_require__("+E39") ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },

/***/ "evD5":
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__("77Pl")
	  , IE8_DOM_DEFINE = __webpack_require__("SfB7")
	  , toPrimitive    = __webpack_require__("MmMw")
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__("+E39") ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },

/***/ "77Pl":
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__("EqjI");
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },

/***/ "EqjI":
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },

/***/ "SfB7":
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__("+E39") && !__webpack_require__("S82l")(function(){
	  return Object.defineProperty(__webpack_require__("ON07")('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },

/***/ "+E39":
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__("S82l")(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },

/***/ "S82l":
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },

/***/ "ON07":
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__("EqjI")
	  , document = __webpack_require__("7KvD").document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },

/***/ "MmMw":
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__("EqjI");
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },

/***/ "X8DO":
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },

/***/ "880/":
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__("hJx8");

/***/ },

/***/ "D2L2":
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },

/***/ "/bQp":
/***/ function(module, exports) {

	module.exports = {};

/***/ },

/***/ "94VQ":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__("Yobk")
	  , descriptor     = __webpack_require__("X8DO")
	  , setToStringTag = __webpack_require__("e6n0")
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__("hJx8")(IteratorPrototype, __webpack_require__("dSzd")('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },

/***/ "Yobk":
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__("77Pl")
	  , dPs         = __webpack_require__("qio6")
	  , enumBugKeys = __webpack_require__("xnc9")
	  , IE_PROTO    = __webpack_require__("ax3d")('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__("ON07")('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__("RPLV").appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },

/***/ "qio6":
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__("evD5")
	  , anObject = __webpack_require__("77Pl")
	  , getKeys  = __webpack_require__("lktj");

	module.exports = __webpack_require__("+E39") ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },

/***/ "W2nU":
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },

/***/ "Ibhu":
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__("D2L2")
	  , toIObject    = __webpack_require__("TcQ7")
	  , arrayIndexOf = __webpack_require__("vFc/")(false)
	  , IE_PROTO     = __webpack_require__("ax3d")('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },

/***/ "TcQ7":
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__("MU5D")
	  , defined = __webpack_require__("52gC");
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },

/***/ "MU5D":
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__("R9M2");
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },

/***/ "R9M2":
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },

/***/ "vFc/":
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__("TcQ7")
	  , toLength  = __webpack_require__("QRG4")
	  , toIndex   = __webpack_require__("QyNh");
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },

/***/ "QRG4":
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__("UuGF")
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },

/***/ "QyNh":
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__("UuGF")
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },

/***/ "ax3d":
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__("e8AB")('keys')
	  , uid    = __webpack_require__("3Eo+");
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },

/***/ "e8AB":
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__("7KvD")
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },

/***/ "3Eo+":
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },

/***/ "xnc9":
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },

/***/ "RPLV":
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__("7KvD").document && document.documentElement;

/***/ },

/***/ "e6n0":
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__("evD5").f
	  , has = __webpack_require__("D2L2")
	  , TAG = __webpack_require__("dSzd")('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },

/***/ "dSzd":
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__("e8AB")('wks')
	  , uid        = __webpack_require__("3Eo+")
	  , Symbol     = __webpack_require__("7KvD").Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },

/***/ "PzxK":
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__("D2L2")
	  , toObject    = __webpack_require__("sB3e")
	  , IE_PROTO    = __webpack_require__("ax3d")('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },

/***/ "sB3e":
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__("52gC");
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },

/***/ "+tPU":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("xGkn");
	var global        = __webpack_require__("7KvD")
	  , hide          = __webpack_require__("hJx8")
	  , Iterators     = __webpack_require__("/bQp")
	  , TO_STRING_TAG = __webpack_require__("dSzd")('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },

/***/ "xGkn":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__("4mcu")
	  , step             = __webpack_require__("EGZi")
	  , Iterators        = __webpack_require__("/bQp")
	  , toIObject        = __webpack_require__("TcQ7");

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__("vIB/")(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },

/***/ "4mcu":
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },

/***/ "EGZi":
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },

/***/ "CXw9":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__("O4g8")
	  , global             = __webpack_require__("7KvD")
	  , ctx                = __webpack_require__("+ZMJ")
	  , classof            = __webpack_require__("RY/4")
	  , $export            = __webpack_require__("kM2E")
	  , isObject           = __webpack_require__("EqjI")
	  , aFunction          = __webpack_require__("lOnJ")
	  , anInstance         = __webpack_require__("2KxR")
	  , forOf              = __webpack_require__("NWt+")
	  , speciesConstructor = __webpack_require__("t8x9")
	  , task               = __webpack_require__("L42u").set
	  , microtask          = __webpack_require__("82Mu")()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;

	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__("dSzd")('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__("xH/j")($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__("e6n0")($Promise, PROMISE);
	__webpack_require__("bRrM")(PROMISE);
	Wrapper = __webpack_require__("FeBl")[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__("dY0y")(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },

/***/ "RY/4":
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__("R9M2")
	  , TAG = __webpack_require__("dSzd")('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },

/***/ "2KxR":
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },

/***/ "NWt+":
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__("+ZMJ")
	  , call        = __webpack_require__("msXi")
	  , isArrayIter = __webpack_require__("Mhyx")
	  , anObject    = __webpack_require__("77Pl")
	  , toLength    = __webpack_require__("QRG4")
	  , getIterFn   = __webpack_require__("3fs2")
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },

/***/ "msXi":
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__("77Pl");
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },

/***/ "Mhyx":
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__("/bQp")
	  , ITERATOR   = __webpack_require__("dSzd")('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },

/***/ "3fs2":
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__("RY/4")
	  , ITERATOR  = __webpack_require__("dSzd")('iterator')
	  , Iterators = __webpack_require__("/bQp");
	module.exports = __webpack_require__("FeBl").getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },

/***/ "t8x9":
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__("77Pl")
	  , aFunction = __webpack_require__("lOnJ")
	  , SPECIES   = __webpack_require__("dSzd")('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },

/***/ "L42u":
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__("+ZMJ")
	  , invoke             = __webpack_require__("knuC")
	  , html               = __webpack_require__("RPLV")
	  , cel                = __webpack_require__("ON07")
	  , global             = __webpack_require__("7KvD")
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__("R9M2")(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },

/***/ "knuC":
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },

/***/ "82Mu":
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__("7KvD")
	  , macrotask = __webpack_require__("L42u").set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__("R9M2")(process) == 'process';

	module.exports = function(){
	  var head, last, notify;

	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };

	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },

/***/ "xH/j":
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__("hJx8");
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },

/***/ "bRrM":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__("7KvD")
	  , core        = __webpack_require__("FeBl")
	  , dP          = __webpack_require__("evD5")
	  , DESCRIPTORS = __webpack_require__("+E39")
	  , SPECIES     = __webpack_require__("dSzd")('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },

/***/ "dY0y":
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__("dSzd")('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },

/***/ "8kqn":
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/*!
	    localForage -- Offline Storage, Improved
	    Version 1.4.3
	    https://mozilla.github.io/localForage
	    (c) 2013-2016 Mozilla, Apache License 2.0
	*/
	!function(a){if(true)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.localforage=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return require(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function e(){try{if("undefined"!=typeof indexedDB)return indexedDB;if("undefined"!=typeof webkitIndexedDB)return webkitIndexedDB;if("undefined"!=typeof mozIndexedDB)return mozIndexedDB;if("undefined"!=typeof OIndexedDB)return OIndexedDB;if("undefined"!=typeof msIndexedDB)return msIndexedDB}catch(a){}}function f(){try{return!!fa&&(!("undefined"!=typeof openDatabase&&"undefined"!=typeof navigator&&navigator.userAgent&&/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent))&&(fa&&"function"==typeof fa.open&&"undefined"!=typeof IDBKeyRange))}catch(a){return!1}}function g(){return"function"==typeof openDatabase}function h(){try{return"undefined"!=typeof localStorage&&"setItem"in localStorage&&localStorage.setItem}catch(a){return!1}}function i(a,b){a=a||[],b=b||{};try{return new Blob(a,b)}catch(f){if("TypeError"!==f.name)throw f;for(var c="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder?MozBlobBuilder:WebKitBlobBuilder,d=new c,e=0;e<a.length;e+=1)d.append(a[e]);return d.getBlob(b.type)}}function j(a,b){b&&a.then(function(a){b(null,a)},function(a){b(a)})}function k(a,b,c){"function"==typeof b&&a.then(b),"function"==typeof c&&a.catch(c)}function l(a){for(var b=a.length,c=new ArrayBuffer(b),d=new Uint8Array(c),e=0;e<b;e++)d[e]=a.charCodeAt(e);return c}function m(a){return new ia(function(b){var c=i([""]);a.objectStore(ja).put(c,"key"),a.onabort=function(a){a.preventDefault(),a.stopPropagation(),b(!1)},a.oncomplete=function(){var a=navigator.userAgent.match(/Chrome\/(\d+)/),c=navigator.userAgent.match(/Edge\//);b(c||!a||parseInt(a[1],10)>=43)}}).catch(function(){return!1})}function n(a){return"boolean"==typeof ga?ia.resolve(ga):m(a).then(function(a){return ga=a})}function o(a){var b=ha[a.name],c={};c.promise=new ia(function(a){c.resolve=a}),b.deferredOperations.push(c),b.dbReady?b.dbReady=b.dbReady.then(function(){return c.promise}):b.dbReady=c.promise}function p(a){var b=ha[a.name],c=b.deferredOperations.pop();c&&c.resolve()}function q(a,b){return new ia(function(c,d){if(a.db){if(!b)return c(a.db);o(a),a.db.close()}var e=[a.name];b&&e.push(a.version);var f=fa.open.apply(fa,e);b&&(f.onupgradeneeded=function(b){var c=f.result;try{c.createObjectStore(a.storeName),b.oldVersion<=1&&c.createObjectStore(ja)}catch(c){if("ConstraintError"!==c.name)throw c;console.warn('The database "'+a.name+'" has been upgraded from version '+b.oldVersion+" to version "+b.newVersion+', but the storage "'+a.storeName+'" already exists.')}}),f.onerror=function(){d(f.error)},f.onsuccess=function(){c(f.result),p(a)}})}function r(a){return q(a,!1)}function s(a){return q(a,!0)}function t(a,b){if(!a.db)return!0;var c=!a.db.objectStoreNames.contains(a.storeName),d=a.version<a.db.version,e=a.version>a.db.version;if(d&&(a.version!==b&&console.warn('The database "'+a.name+"\" can't be downgraded from version "+a.db.version+" to version "+a.version+"."),a.version=a.db.version),e||c){if(c){var f=a.db.version+1;f>a.version&&(a.version=f)}return!0}return!1}function u(a){return new ia(function(b,c){var d=new FileReader;d.onerror=c,d.onloadend=function(c){var d=btoa(c.target.result||"");b({__local_forage_encoded_blob:!0,data:d,type:a.type})},d.readAsBinaryString(a)})}function v(a){var b=l(atob(a.data));return i([b],{type:a.type})}function w(a){return a&&a.__local_forage_encoded_blob}function x(a){var b=this,c=b._initReady().then(function(){var a=ha[b._dbInfo.name];if(a&&a.dbReady)return a.dbReady});return k(c,a,a),c}function y(a){function b(){return ia.resolve()}var c=this,d={db:null};if(a)for(var e in a)d[e]=a[e];ha||(ha={});var f=ha[d.name];f||(f={forages:[],db:null,dbReady:null,deferredOperations:[]},ha[d.name]=f),f.forages.push(c),c._initReady||(c._initReady=c.ready,c.ready=x);for(var g=[],h=0;h<f.forages.length;h++){var i=f.forages[h];i!==c&&g.push(i._initReady().catch(b))}var j=f.forages.slice(0);return ia.all(g).then(function(){return d.db=f.db,r(d)}).then(function(a){return d.db=a,t(d,c._defaultConfig.version)?s(d):a}).then(function(a){d.db=f.db=a,c._dbInfo=d;for(var b=0;b<j.length;b++){var e=j[b];e!==c&&(e._dbInfo.db=d.db,e._dbInfo.version=d.version)}})}function z(a,b){var c=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=new ia(function(b,d){c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readonly").objectStore(e.storeName),g=f.get(a);g.onsuccess=function(){var a=g.result;void 0===a&&(a=null),w(a)&&(a=v(a)),b(a)},g.onerror=function(){d(g.error)}}).catch(d)});return j(d,b),d}function A(a,b){var c=this,d=new ia(function(b,d){c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readonly").objectStore(e.storeName),g=f.openCursor(),h=1;g.onsuccess=function(){var c=g.result;if(c){var d=c.value;w(d)&&(d=v(d));var e=a(d,c.key,h++);void 0!==e?b(e):c.continue()}else b()},g.onerror=function(){d(g.error)}}).catch(d)});return j(d,b),d}function B(a,b,c){var d=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var e=new ia(function(c,e){var f;d.ready().then(function(){return f=d._dbInfo,"[object Blob]"===ka.call(b)?n(f.db).then(function(a){return a?b:u(b)}):b}).then(function(b){var d=f.db.transaction(f.storeName,"readwrite"),g=d.objectStore(f.storeName);null===b&&(b=void 0),d.oncomplete=function(){void 0===b&&(b=null),c(b)},d.onabort=d.onerror=function(){var a=h.error?h.error:h.transaction.error;e(a)};var h=g.put(b,a)}).catch(e)});return j(e,c),e}function C(a,b){var c=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=new ia(function(b,d){c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readwrite"),g=f.objectStore(e.storeName),h=g.delete(a);f.oncomplete=function(){b()},f.onerror=function(){d(h.error)},f.onabort=function(){var a=h.error?h.error:h.transaction.error;d(a)}}).catch(d)});return j(d,b),d}function D(a){var b=this,c=new ia(function(a,c){b.ready().then(function(){var d=b._dbInfo,e=d.db.transaction(d.storeName,"readwrite"),f=e.objectStore(d.storeName),g=f.clear();e.oncomplete=function(){a()},e.onabort=e.onerror=function(){var a=g.error?g.error:g.transaction.error;c(a)}}).catch(c)});return j(c,a),c}function E(a){var b=this,c=new ia(function(a,c){b.ready().then(function(){var d=b._dbInfo,e=d.db.transaction(d.storeName,"readonly").objectStore(d.storeName),f=e.count();f.onsuccess=function(){a(f.result)},f.onerror=function(){c(f.error)}}).catch(c)});return j(c,a),c}function F(a,b){var c=this,d=new ia(function(b,d){return a<0?void b(null):void c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readonly").objectStore(e.storeName),g=!1,h=f.openCursor();h.onsuccess=function(){var c=h.result;return c?void(0===a?b(c.key):g?b(c.key):(g=!0,c.advance(a))):void b(null)},h.onerror=function(){d(h.error)}}).catch(d)});return j(d,b),d}function G(a){var b=this,c=new ia(function(a,c){b.ready().then(function(){var d=b._dbInfo,e=d.db.transaction(d.storeName,"readonly").objectStore(d.storeName),f=e.openCursor(),g=[];f.onsuccess=function(){var b=f.result;return b?(g.push(b.key),void b.continue()):void a(g)},f.onerror=function(){c(f.error)}}).catch(c)});return j(c,a),c}function H(a){var b,c,d,e,f,g=.75*a.length,h=a.length,i=0;"="===a[a.length-1]&&(g--,"="===a[a.length-2]&&g--);var j=new ArrayBuffer(g),k=new Uint8Array(j);for(b=0;b<h;b+=4)c=ma.indexOf(a[b]),d=ma.indexOf(a[b+1]),e=ma.indexOf(a[b+2]),f=ma.indexOf(a[b+3]),k[i++]=c<<2|d>>4,k[i++]=(15&d)<<4|e>>2,k[i++]=(3&e)<<6|63&f;return j}function I(a){var b,c=new Uint8Array(a),d="";for(b=0;b<c.length;b+=3)d+=ma[c[b]>>2],d+=ma[(3&c[b])<<4|c[b+1]>>4],d+=ma[(15&c[b+1])<<2|c[b+2]>>6],d+=ma[63&c[b+2]];return c.length%3===2?d=d.substring(0,d.length-1)+"=":c.length%3===1&&(d=d.substring(0,d.length-2)+"=="),d}function J(a,b){var c="";if(a&&(c=Da.call(a)),a&&("[object ArrayBuffer]"===c||a.buffer&&"[object ArrayBuffer]"===Da.call(a.buffer))){var d,e=pa;a instanceof ArrayBuffer?(d=a,e+=ra):(d=a.buffer,"[object Int8Array]"===c?e+=ta:"[object Uint8Array]"===c?e+=ua:"[object Uint8ClampedArray]"===c?e+=va:"[object Int16Array]"===c?e+=wa:"[object Uint16Array]"===c?e+=ya:"[object Int32Array]"===c?e+=xa:"[object Uint32Array]"===c?e+=za:"[object Float32Array]"===c?e+=Aa:"[object Float64Array]"===c?e+=Ba:b(new Error("Failed to get type for BinaryArray"))),b(e+I(d))}else if("[object Blob]"===c){var f=new FileReader;f.onload=function(){var c=na+a.type+"~"+I(this.result);b(pa+sa+c)},f.readAsArrayBuffer(a)}else try{b(JSON.stringify(a))}catch(c){console.error("Couldn't convert value into a JSON string: ",a),b(null,c)}}function K(a){if(a.substring(0,qa)!==pa)return JSON.parse(a);var b,c=a.substring(Ca),d=a.substring(qa,Ca);if(d===sa&&oa.test(c)){var e=c.match(oa);b=e[1],c=c.substring(e[0].length)}var f=H(c);switch(d){case ra:return f;case sa:return i([f],{type:b});case ta:return new Int8Array(f);case ua:return new Uint8Array(f);case va:return new Uint8ClampedArray(f);case wa:return new Int16Array(f);case ya:return new Uint16Array(f);case xa:return new Int32Array(f);case za:return new Uint32Array(f);case Aa:return new Float32Array(f);case Ba:return new Float64Array(f);default:throw new Error("Unkown type: "+d)}}function L(a){var b=this,c={db:null};if(a)for(var d in a)c[d]="string"!=typeof a[d]?a[d].toString():a[d];var e=new ia(function(a,d){try{c.db=openDatabase(c.name,String(c.version),c.description,c.size)}catch(a){return d(a)}c.db.transaction(function(e){e.executeSql("CREATE TABLE IF NOT EXISTS "+c.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],function(){b._dbInfo=c,a()},function(a,b){d(b)})})});return c.serializer=Ea,e}function M(a,b){var c=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=new ia(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("SELECT * FROM "+e.storeName+" WHERE key = ? LIMIT 1",[a],function(a,c){var d=c.rows.length?c.rows.item(0).value:null;d&&(d=e.serializer.deserialize(d)),b(d)},function(a,b){d(b)})})}).catch(d)});return j(d,b),d}function N(a,b){var c=this,d=new ia(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("SELECT * FROM "+e.storeName,[],function(c,d){for(var f=d.rows,g=f.length,h=0;h<g;h++){var i=f.item(h),j=i.value;if(j&&(j=e.serializer.deserialize(j)),j=a(j,i.key,h+1),void 0!==j)return void b(j)}b()},function(a,b){d(b)})})}).catch(d)});return j(d,b),d}function O(a,b,c){var d=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var e=new ia(function(c,e){d.ready().then(function(){void 0===b&&(b=null);var f=b,g=d._dbInfo;g.serializer.serialize(b,function(b,d){d?e(d):g.db.transaction(function(d){d.executeSql("INSERT OR REPLACE INTO "+g.storeName+" (key, value) VALUES (?, ?)",[a,b],function(){c(f)},function(a,b){e(b)})},function(a){a.code===a.QUOTA_ERR&&e(a)})})}).catch(e)});return j(e,c),e}function P(a,b){var c=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=new ia(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("DELETE FROM "+e.storeName+" WHERE key = ?",[a],function(){b()},function(a,b){d(b)})})}).catch(d)});return j(d,b),d}function Q(a){var b=this,c=new ia(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){b.executeSql("DELETE FROM "+d.storeName,[],function(){a()},function(a,b){c(b)})})}).catch(c)});return j(c,a),c}function R(a){var b=this,c=new ia(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){b.executeSql("SELECT COUNT(key) as c FROM "+d.storeName,[],function(b,c){var d=c.rows.item(0).c;a(d)},function(a,b){c(b)})})}).catch(c)});return j(c,a),c}function S(a,b){var c=this,d=new ia(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("SELECT key FROM "+e.storeName+" WHERE id = ? LIMIT 1",[a+1],function(a,c){var d=c.rows.length?c.rows.item(0).key:null;b(d)},function(a,b){d(b)})})}).catch(d)});return j(d,b),d}function T(a){var b=this,c=new ia(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){b.executeSql("SELECT key FROM "+d.storeName,[],function(b,c){for(var d=[],e=0;e<c.rows.length;e++)d.push(c.rows.item(e).key);a(d)},function(a,b){c(b)})})}).catch(c)});return j(c,a),c}function U(a){var b=this,c={};if(a)for(var d in a)c[d]=a[d];return c.keyPrefix=c.name+"/",c.storeName!==b._defaultConfig.storeName&&(c.keyPrefix+=c.storeName+"/"),b._dbInfo=c,c.serializer=Ea,ia.resolve()}function V(a){var b=this,c=b.ready().then(function(){for(var a=b._dbInfo.keyPrefix,c=localStorage.length-1;c>=0;c--){var d=localStorage.key(c);0===d.indexOf(a)&&localStorage.removeItem(d)}});return j(c,a),c}function W(a,b){var c=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=c.ready().then(function(){var b=c._dbInfo,d=localStorage.getItem(b.keyPrefix+a);return d&&(d=b.serializer.deserialize(d)),d});return j(d,b),d}function X(a,b){var c=this,d=c.ready().then(function(){for(var b=c._dbInfo,d=b.keyPrefix,e=d.length,f=localStorage.length,g=1,h=0;h<f;h++){var i=localStorage.key(h);if(0===i.indexOf(d)){var j=localStorage.getItem(i);if(j&&(j=b.serializer.deserialize(j)),j=a(j,i.substring(e),g++),void 0!==j)return j}}});return j(d,b),d}function Y(a,b){var c=this,d=c.ready().then(function(){var b,d=c._dbInfo;try{b=localStorage.key(a)}catch(a){b=null}return b&&(b=b.substring(d.keyPrefix.length)),b});return j(d,b),d}function Z(a){var b=this,c=b.ready().then(function(){for(var a=b._dbInfo,c=localStorage.length,d=[],e=0;e<c;e++)0===localStorage.key(e).indexOf(a.keyPrefix)&&d.push(localStorage.key(e).substring(a.keyPrefix.length));return d});return j(c,a),c}function $(a){var b=this,c=b.keys().then(function(a){return a.length});return j(c,a),c}function _(a,b){var c=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=c.ready().then(function(){var b=c._dbInfo;localStorage.removeItem(b.keyPrefix+a)});return j(d,b),d}function aa(a,b,c){var d=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var e=d.ready().then(function(){void 0===b&&(b=null);var c=b;return new ia(function(e,f){var g=d._dbInfo;g.serializer.serialize(b,function(b,d){if(d)f(d);else try{localStorage.setItem(g.keyPrefix+a,b),e(c)}catch(a){"QuotaExceededError"!==a.name&&"NS_ERROR_DOM_QUOTA_REACHED"!==a.name||f(a),f(a)}})})});return j(e,c),e}function ba(a,b){a[b]=function(){var c=arguments;return a.ready().then(function(){return a[b].apply(a,c)})}}function ca(){for(var a=1;a<arguments.length;a++){var b=arguments[a];if(b)for(var c in b)b.hasOwnProperty(c)&&(Na(b[c])?arguments[0][c]=b[c].slice():arguments[0][c]=b[c])}return arguments[0]}function da(a){for(var b in Ia)if(Ia.hasOwnProperty(b)&&Ia[b]===a)return!0;return!1}var ea="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},fa=e();"undefined"==typeof Promise&&"undefined"!=typeof a&&a("lie/polyfill");var ga,ha,ia=Promise,ja="local-forage-detect-blob-support",ka=Object.prototype.toString,la={_driver:"asyncStorage",_initStorage:y,iterate:A,getItem:z,setItem:B,removeItem:C,clear:D,length:E,key:F,keys:G},ma="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",na="~~local_forage_type~",oa=/^~~local_forage_type~([^~]+)~/,pa="__lfsc__:",qa=pa.length,ra="arbf",sa="blob",ta="si08",ua="ui08",va="uic8",wa="si16",xa="si32",ya="ur16",za="ui32",Aa="fl32",Ba="fl64",Ca=qa+ra.length,Da=Object.prototype.toString,Ea={serialize:J,deserialize:K,stringToBuffer:H,bufferToString:I},Fa={_driver:"webSQLStorage",_initStorage:L,iterate:N,getItem:M,setItem:O,removeItem:P,clear:Q,length:R,key:S,keys:T},Ga={_driver:"localStorageWrapper",_initStorage:U,iterate:X,getItem:W,setItem:aa,removeItem:_,clear:V,length:$,key:Y,keys:Z},Ha={},Ia={INDEXEDDB:"asyncStorage",LOCALSTORAGE:"localStorageWrapper",WEBSQL:"webSQLStorage"},Ja=[Ia.INDEXEDDB,Ia.WEBSQL,Ia.LOCALSTORAGE],Ka=["clear","getItem","iterate","key","keys","length","removeItem","setItem"],La={description:"",driver:Ja.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1},Ma={};Ma[Ia.INDEXEDDB]=f(),Ma[Ia.WEBSQL]=g(),Ma[Ia.LOCALSTORAGE]=h();var Na=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},Oa=function(){function a(b){d(this,a),this.INDEXEDDB=Ia.INDEXEDDB,this.LOCALSTORAGE=Ia.LOCALSTORAGE,this.WEBSQL=Ia.WEBSQL,this._defaultConfig=ca({},La),this._config=ca({},this._defaultConfig,b),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver)}return a.prototype.config=function(a){if("object"===("undefined"==typeof a?"undefined":ea(a))){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var b in a)"storeName"===b&&(a[b]=a[b].replace(/\W/g,"_")),this._config[b]=a[b];return"driver"in a&&a.driver&&this.setDriver(this._config.driver),!0}return"string"==typeof a?this._config[a]:this._config},a.prototype.defineDriver=function(a,b,c){var d=new ia(function(b,c){try{var d=a._driver,e=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver"),f=new Error("Custom driver name already in use: "+a._driver);if(!a._driver)return void c(e);if(da(a._driver))return void c(f);for(var g=Ka.concat("_initStorage"),h=0;h<g.length;h++){var i=g[h];if(!i||!a[i]||"function"!=typeof a[i])return void c(e)}var j=ia.resolve(!0);"_support"in a&&(j=a._support&&"function"==typeof a._support?a._support():ia.resolve(!!a._support)),j.then(function(c){Ma[d]=c,Ha[d]=a,b()},c)}catch(a){c(a)}});return k(d,b,c),d},a.prototype.driver=function(){return this._driver||null},a.prototype.getDriver=function(a,b,c){var d=this,e=ia.resolve().then(function(){if(!da(a)){if(Ha[a])return Ha[a];throw new Error("Driver not found.")}switch(a){case d.INDEXEDDB:return la;case d.LOCALSTORAGE:return Ga;case d.WEBSQL:return Fa}});return k(e,b,c),e},a.prototype.getSerializer=function(a){var b=ia.resolve(Ea);return k(b,a),b},a.prototype.ready=function(a){var b=this,c=b._driverSet.then(function(){return null===b._ready&&(b._ready=b._initDriver()),b._ready});return k(c,a,a),c},a.prototype.setDriver=function(a,b,c){function d(){f._config.driver=f.driver()}function e(a){return function(){function b(){for(;c<a.length;){var e=a[c];return c++,f._dbInfo=null,f._ready=null,f.getDriver(e).then(function(a){return f._extend(a),d(),f._ready=f._initStorage(f._config),f._ready}).catch(b)}d();var g=new Error("No available storage method found.");return f._driverSet=ia.reject(g),f._driverSet}var c=0;return b()}}var f=this;Na(a)||(a=[a]);var g=this._getSupportedDrivers(a),h=null!==this._driverSet?this._driverSet.catch(function(){return ia.resolve()}):ia.resolve();return this._driverSet=h.then(function(){var a=g[0];return f._dbInfo=null,f._ready=null,f.getDriver(a).then(function(a){f._driver=a._driver,d(),f._wrapLibraryMethodsWithReady(),f._initDriver=e(g)})}).catch(function(){d();var a=new Error("No available storage method found.");return f._driverSet=ia.reject(a),f._driverSet}),k(this._driverSet,b,c),this._driverSet},a.prototype.supports=function(a){return!!Ma[a]},a.prototype._extend=function(a){ca(this,a)},a.prototype._getSupportedDrivers=function(a){for(var b=[],c=0,d=a.length;c<d;c++){var e=a[c];this.supports(e)&&b.push(e)}return b},a.prototype._wrapLibraryMethodsWithReady=function(){for(var a=0;a<Ka.length;a++)ba(this,Ka[a])},a.prototype.createInstance=function(b){return new a(b)},a}(),Pa=new Oa;b.exports=Pa},{undefined:void 0}]},{},[1])(1)});

/***/ },

/***/ "Tsvq":
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _DB = __webpack_require__("U2e7");

	var _DB2 = _interopRequireDefault(_DB);

	var _localforageBluebird = __webpack_require__("6PVA");

	var _localforageBluebird2 = _interopRequireDefault(_localforageBluebird);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	let EngineType = new _DB2.default(_localforageBluebird2.default, 'engineType');
	EngineType.getAllDefault = function () {
	  return this.getAll(true).then(function (types) {
	    return types.filter(function (type) {
	      return type.default;
	    }).sort(function (typeA, typeB) {
	      return typeA.order - typeB.order;
	    });
	  });
	};
	EngineType.getAllReal = function () {
	  return this.getAll(true).then(function (types) {
	    return types.filter(function (type) {
	      return !type.default;
	    }).sort(function (typeA, typeB) {
	      return typeA.order - typeB.order;
	    });
	  });
	};

	exports.default = EngineType;

/***/ },

/***/ "sInu":
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _DB = __webpack_require__("U2e7");

	var _DB2 = _interopRequireDefault(_DB);

	var _localforageBluebird = __webpack_require__("6PVA");

	var _localforageBluebird2 = _interopRequireDefault(_localforageBluebird);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	let Icon = new _DB2.default(_localforageBluebird2.default, 'icon');
	exports.default = Icon;

/***/ },

/***/ "lktj":
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__("Ibhu")
	  , enumBugKeys = __webpack_require__("xnc9");

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ }

});