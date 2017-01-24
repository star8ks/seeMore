webpackJsonp([1,5],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	/* eslint-env node*/
	global.Promise = __webpack_require__("qgje");

	__webpack_require__("zj96");
	__webpack_require__("uIYl");
	__webpack_require__("28sW");
	__webpack_require__("V4gC");
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "tEcJ":
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PriorityMap = exports.StringMap = undefined;

	var _const = __webpack_require__("+9hk");

	/**
	 * Just like normal Map, but use case insensitive string as key
	 * */
	class StringMap {
	  constructor() {
	    this.map = {};
	  }
	  get size() {
	    return Object.keys(this.map).length;
	  }
	  has(key) {
	    if (typeof key !== 'string') throw new Error('key must be a string, but given:' + key);
	    return Object.keys(this.map).includes(key.toLowerCase());
	  }
	  set(key, val) {
	    if (typeof key !== 'string') throw new Error('key must be a string, but given:' + key);
	    if (val === undefined) throw new Error('value cannot be undefined');
	    this.map[key.toLowerCase()] = Object.defineProperties({}, {
	      'val': { value: val, enumerable: true },
	      '$originKey': { value: key }
	    });
	  }
	  get(key) {
	    if (typeof key !== 'string') throw new Error('key must be a string, but given:' + key);
	    let valObj = this.map[key.toLowerCase()];
	    return valObj === undefined ? undefined : valObj.val;
	  }
	  clear() {
	    this.map = {};
	  }
	  *[Symbol.iterator]() {
	    let keys = Object.keys(this.map);
	    for (let key of keys) {
	      yield [this.map[key].$originKey, this.map[key].val];
	    }
	  }
	}

	/**
	 * @author ray7551@gmail.com
	 */
	class PriorityMap {
	  /**
	   * @param {Url} url
	   * @param {Object} [confidence]
	   * @param {String[]} [siteKeywords=[]]
	   * */
	  constructor(url, confidence, siteKeywords) {
	    siteKeywords = siteKeywords || [];
	    this.confidence = confidence || _const.CONFIDENCE_PARAM.map;
	    this.map = new StringMap();
	    this.siteKeywords = new StringMap();
	    this.vipWords = new StringMap();

	    let siteWords = siteKeywords.concat(url.host.split('.').slice(0, -1)).reverse();
	    for (let word of siteWords) {
	      this._setSiteKeywords(word);
	    }
	  }

	  /**
	   * @param {String} word
	   * @return {Boolean}
	   * */
	  static _inBlackList(word) {
	    word = word.toLowerCase();
	    return _const.KEYWORD_BLACKLIST.includes(word) || /^\d+$/.test(word) || word.length <= 0 || word.length <= 2 && /^[a-z]+$/i.test(word) || word.length === 1 && new RegExp(`[${ _const.PRINTABLE_EXTEND }]`).test(word);
	  }

	  /**
	   * @param {String} word
	   * @return {String}
	   * */
	  static _preProcess(word) {
	    // @TODO remove head and tail punctuations(common ending punct) here? consider: ect... .Net <header>
	    return word.trim();
	  }

	  /**
	   * @param {String} str
	   * */
	  _setSiteKeywords(str) {
	    let word = PriorityMap._preProcess(str);
	    if (PriorityMap._inBlackList(word) || /(www)/i.test(word)) {
	      return;
	    }
	    this.siteKeywords.set(word, this.confidence.site);
	  }

	  addVipWords(word, confidence) {
	    confidence = confidence === undefined ? this.confidence.vip : confidence;
	    word = PriorityMap._preProcess(word);
	    if (PriorityMap._inBlackList(word) || this.siteKeywords.has(word)) return;

	    this.vipWords.set(word, this.vipWords.has(word) ? this.vipWords.get(word) + confidence : confidence);
	  }

	  static toOrderedArray(map) {
	    return [...map].sort((a, b) => b[1] - a[1]).map(item => ({
	      word: item[0],
	      confidence: item[1]
	    }));
	  }

	  get vipArray() {
	    return PriorityMap.toOrderedArray(this.vipWords);
	  }

	  get orderedArray() {
	    return PriorityMap.toOrderedArray(this.map);
	  }

	  clear() {
	    this.map.clear();
	  }

	  increaseConfidence(key, increment) {
	    increment = increment === undefined ? this.confidence.base : increment;
	    key = PriorityMap._preProcess(key);
	    if (PriorityMap._inBlackList(key)) return;

	    if (this.siteKeywords.has(key)) increment = this.siteKeywords.get(key);
	    this.map.has(key) ? this.map.set(key, this.map.get(key) + increment) : this.map.set(key, this.vipWords.has(key) ? this.vipWords.get(key) + increment : increment);
	  }
	}

	exports.default = PriorityMap;
	exports.StringMap = StringMap;
	exports.PriorityMap = PriorityMap;

/***/ },

/***/ "V4gC":
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @param {String} str
	 * */
	let translate = (() => {
	  var _ref2 = _asyncToGenerator(function* (str) {
	    str = str.trim().replace(/\n/, '') || '';
	    // @TODO only translate some language, from user config
	    // @TODO not translate some language, from user config
	    // if(chrome.i18n.detect)
	    if (str.length > _config2.default.translateMaxLength) {
	      return Promise.reject(new popupErr('Translation: String too long: ' + str));
	    }

	    let lang = navigator.language.split('-', 1)[0];
	    let resultObj = yield _translation2.default.translate({
	      api: _config2.default.devMode ? 'GoogleCN' : navigator.language === 'zh-CN' ? 'BaiDu' : 'Google',
	      text: str,
	      to: _config2.default.devMode ? 'zh-CN' : lang === 'zh' ? navigator.language : lang
	    });
	    if (resultObj.error) return null;

	    let translated = resultObj.detailed || resultObj.result;
	    if ((0, _lodash.isEmpty)((0, _base.filterEmptyStr)(translated))) return '';

	    return translated.filter(function (line) {
	      return line.toLowerCase() !== str.toLowerCase();
	    }).reduce(function (html, line) {
	      html += line + '\n';
	      return html;
	    }, '');
	  });

	  return function translate(_x2) {
	    return _ref2.apply(this, arguments);
	  };
	})();

	var _lodash = __webpack_require__("y7q8");

	var _translation = __webpack_require__("RkCM");

	var _translation2 = _interopRequireDefault(_translation);

	var _config = __webpack_require__("wYMm");

	var _config2 = _interopRequireDefault(_config);

	var _base = __webpack_require__("5a/Z");

	var _Url = __webpack_require__("tDBr");

	var _Url2 = _interopRequireDefault(_Url);

	var _Render = __webpack_require__("qpDX");

	var _Render2 = _interopRequireDefault(_Render);

	var _Mason = __webpack_require__("74xW");

	var _Mason2 = _interopRequireDefault(_Mason);

	var _keyword = __webpack_require__("MjTT");

	var _keyword2 = _interopRequireDefault(_keyword);

	var _Engine = __webpack_require__("gLfi");

	var _Engine2 = _interopRequireDefault(_Engine);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

	_translation2.default.add(new _translation2.default.BaiDu());
	_translation2.default.add(new _translation2.default.Google());
	if (_config2.default.devMode) _translation2.default.add(new _translation2.default.GoogleCN());

	let popupErr = (0, _base.minErr)('Popup');

	/**
	 * @param {Error} e
	 * */
	function errorHandler(e) {
	  _base.clog.err(e.toString());
	  //noinspection JSUnresolvedVariable
	  _base.clog.err('Error stack: ', e.stack);
	}

	class Links {
	  constructor($linksWrapper, tabId) {
	    this.$linksWrapper = $linksWrapper;
	    this.$links = this.$linksWrapper.querySelectorAll('.icon-link');
	    this.$defaultLink = null;
	    this.setDefaultLink();
	    this._init(tabId);
	  }

	  _init(tabId) {
	    this.$links.forEach($link => {
	      $link.style.backgroundImage = 'url(\'' + $link.getAttribute('data-favicon') + '\')';

	      $link.addEventListener('click', evt => {
	        let button = (0, _base.getMouseButton)(evt);
	        switch (button) {
	          case 'left':
	            chrome.tabs.update(tabId, { url: $link.href });
	            break;
	          case 'middle':
	            chrome.tabs.create({ url: $link.href });
	            break;
	          default:
	            break;
	        }
	        evt.preventDefault();
	      });
	    });
	  }

	  updateHref(searchWord) {
	    if (!searchWord) return new popupErr('invalid param: updateLinkHref with empty string');
	    this.$links.forEach($link => {
	      $link.href = $link.getAttribute('data-url').replace(/%s/g, encodeURIComponent(searchWord));
	    });
	  }

	  _setDefaultLink($link) {
	    if (this.$defaultLink) {
	      this.$defaultLink.classList.remove(Links.defaultLinkClass);
	    }
	    this.$defaultLink = $link;
	    this.$defaultLink.classList.add(Links.defaultLinkClass);
	  }

	  setDefaultLink(seName) {
	    if ((0, _lodash.isEmpty)(seName)) {
	      if (this.$defaultLink === null) {
	        this._setDefaultLink(this.$links[0]);
	      }
	      return;
	    }
	    seName = seName.toLowerCase();
	    for (let $link of this.$links) {
	      if ($link.getAttribute('data-se').toLowerCase() === seName) {
	        this._setDefaultLink($link);
	        break;
	      }
	    }
	  }
	}

	Links.defaultLinkClass = 'icon-link-default';
	class SearchBox {
	  constructor($keyword, engines, selectEngineFn) {
	    this.suggestions = [];

	    this.$el = $keyword;
	    this.engines = engines;
	    this.suggestions.concat((0, _base.deepValue)(engines));
	    this.$el.focus();
	    this.$el.addEventListener('keydown', e => {
	      if (e.key === 'Tab') {
	        // TODO serarch in this.sugesstion, and autocomplete by press Tab
	        e.preventDefault();
	      }
	    });
	    this.$el.addEventListener('input', (0, _lodash.debounce)(() => this._onInput(selectEngineFn), 500));
	  }

	  _onInput(selectEngineFn) {
	    if (this.engineSelector !== '') {
	      let engineSelectorLower = this.engineSelector.toLowerCase();
	      let engine = this.engines.find(engine => {
	        return engine.displayName.toLowerCase().startsWith(engineSelectorLower) || engine.$$key.toLowerCase().startsWith(engineSelectorLower);
	      });
	      selectEngineFn(engine ? engine.$$key : '');
	    }
	    this.$el.dispatchEvent(new CustomEvent('keywordUpdated', { detail: this.value || this.$el.placeholder }));
	  }

	  onUpdated(fn) {
	    this.$el.addEventListener('keywordUpdated', fn);
	  }

	  onKeyup(fn) {
	    this.$el.addEventListener('keyup', fn);
	  }

	  get value() {
	    return this.$el.value;
	  }
	  set placeholder(val) {
	    this.$el.placeholder = val;
	    this._onInput();
	  }
	  get engineSelector() {
	    let match = this.$el.value.match(SearchBox.engineSelectorRegex);
	    return match ? match[1] : '';
	  }
	}

	SearchBox.engineSelectorRegex = /(?:^|\s)([^\s]+)$/;
	(0, _base.onceLoaded)(_base.getCurrentTab).then((() => {
	  var _ref = _asyncToGenerator(function* (tab) {
	    let tabUrl = new _Url2.default(tab.url);
	    let $translation = _base.$`.translation`;
	    let engineListTpl = _base.$`#tpl-engines`.innerHTML.trim();
	    let $enginesSection = _base.$`.engines`;

	    (0, _keyword2.default)(tabUrl).then(function (keywords) {
	      (0, _base.clog)('get keywords: ', JSON.stringify(keywords));
	      // @TODO if input is not empty, cancel getKeyWord and don't change input and link
	      // @TODO add all keywords to auto-complete suggestion list
	      if (!searchBox) return;
	      keywords.forEach(function (kw) {
	        return searchBox.suggestions.push(kw.word.trim());
	      });
	      searchBox.placeholder = keywords[0].word.trim();
	      return null;
	    }).catch(errorHandler);

	    $enginesSection.innerHTML = yield _Render2.default.openEngines(engineListTpl);

	    let links = new Links(_base.$`.engines`, tab.id);
	    let engines = yield _Engine2.default.getOpen(_Engine2.default.returnType.normal, null, ['displayName', '$$key']);
	    let searchBox = new SearchBox(_base.$`#keyword`, engines, function (engineKey) {
	      return links.setDefaultLink(engineKey);
	    });

	    searchBox.onKeyup(function (e) {
	      if (e.key === 'Enter') {
	        links.$defaultLink.dispatchEvent(new MouseEvent('click', { button: _base.btnCode.left }));
	      }
	    });
	    searchBox.onUpdated(function (e) {
	      let searchString = e.detail.trim();
	      (0, _base.clog)('translate ', searchString);

	      if (searchString) {
	        links.updateHref(searchString);
	        if (searchString.length <= _config2.default.translateMaxLength) {
	          translate(searchString).then(function (html) {
	            $translation.innerText = html;
	          }).catch(errorHandler);
	        }
	      }
	    });
	    new _Mason2.default(_base.$`.engines`, {
	      itemSelector: '.pin',
	      columnNum: 2
	    });
	  });

	  return function (_x) {
	    return _ref.apply(this, arguments);
	  };
	})()).catch(errorHandler);

/***/ },

/***/ "y7q8":
/***/ function(module, exports) {

	/**
	 * @license
	 * Lodash lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
	 */
	;(function(){function n(n,t){return n.set(t[0],t[1]),n}function t(n,t){return n.add(t),n}function r(n,t,r){switch(r.length){case 0:return n.call(t);case 1:return n.call(t,r[0]);case 2:return n.call(t,r[0],r[1]);case 3:return n.call(t,r[0],r[1],r[2])}return n.apply(t,r)}function e(n,t,r,e){for(var u=-1,i=null==n?0:n.length;++u<i;){var o=n[u];t(e,o,r(o),n)}return e}function u(n,t){for(var r=-1,e=null==n?0:n.length;++r<e&&false!==t(n[r],r,n););return n}function i(n,t){for(var r=null==n?0:n.length;r--&&false!==t(n[r],r,n););
	return n}function o(n,t){for(var r=-1,e=null==n?0:n.length;++r<e;)if(!t(n[r],r,n))return false;return true}function f(n,t){for(var r=-1,e=null==n?0:n.length,u=0,i=[];++r<e;){var o=n[r];t(o,r,n)&&(i[u++]=o)}return i}function c(n,t){return!(null==n||!n.length)&&-1<d(n,t,0)}function a(n,t,r){for(var e=-1,u=null==n?0:n.length;++e<u;)if(r(t,n[e]))return true;return false}function l(n,t){for(var r=-1,e=null==n?0:n.length,u=Array(e);++r<e;)u[r]=t(n[r],r,n);return u}function s(n,t){for(var r=-1,e=t.length,u=n.length;++r<e;)n[u+r]=t[r];
	return n}function h(n,t,r,e){var u=-1,i=null==n?0:n.length;for(e&&i&&(r=n[++u]);++u<i;)r=t(r,n[u],u,n);return r}function p(n,t,r,e){var u=null==n?0:n.length;for(e&&u&&(r=n[--u]);u--;)r=t(r,n[u],u,n);return r}function _(n,t){for(var r=-1,e=null==n?0:n.length;++r<e;)if(t(n[r],r,n))return true;return false}function v(n,t,r){var e;return r(n,function(n,r,u){if(t(n,r,u))return e=r,false}),e}function g(n,t,r,e){var u=n.length;for(r+=e?1:-1;e?r--:++r<u;)if(t(n[r],r,n))return r;return-1}function d(n,t,r){if(t===t)n:{
	--r;for(var e=n.length;++r<e;)if(n[r]===t){n=r;break n}n=-1}else n=g(n,b,r);return n}function y(n,t,r,e){--r;for(var u=n.length;++r<u;)if(e(n[r],t))return r;return-1}function b(n){return n!==n}function x(n,t){var r=null==n?0:n.length;return r?k(n,t)/r:P}function j(n){return function(t){return null==t?F:t[n]}}function w(n){return function(t){return null==n?F:n[t]}}function m(n,t,r,e,u){return u(n,function(n,u,i){r=e?(e=false,n):t(r,n,u,i)}),r}function A(n,t){var r=n.length;for(n.sort(t);r--;)n[r]=n[r].c;
	return n}function k(n,t){for(var r,e=-1,u=n.length;++e<u;){var i=t(n[e]);i!==F&&(r=r===F?i:r+i)}return r}function E(n,t){for(var r=-1,e=Array(n);++r<n;)e[r]=t(r);return e}function O(n,t){return l(t,function(t){return[t,n[t]]})}function S(n){return function(t){return n(t)}}function I(n,t){return l(t,function(t){return n[t]})}function R(n,t){return n.has(t)}function z(n,t){for(var r=-1,e=n.length;++r<e&&-1<d(t,n[r],0););return r}function W(n,t){for(var r=n.length;r--&&-1<d(t,n[r],0););return r}function B(n){
	return"\\"+Tn[n]}function L(n){var t=-1,r=Array(n.size);return n.forEach(function(n,e){r[++t]=[e,n]}),r}function U(n,t){return function(r){return n(t(r))}}function C(n,t){for(var r=-1,e=n.length,u=0,i=[];++r<e;){var o=n[r];o!==t&&"__lodash_placeholder__"!==o||(n[r]="__lodash_placeholder__",i[u++]=r)}return i}function D(n){var t=-1,r=Array(n.size);return n.forEach(function(n){r[++t]=n}),r}function M(n){var t=-1,r=Array(n.size);return n.forEach(function(n){r[++t]=[n,n]}),r}function T(n){if(Bn.test(n)){
	for(var t=zn.lastIndex=0;zn.test(n);)++t;n=t}else n=tt(n);return n}function $(n){return Bn.test(n)?n.match(zn)||[]:n.split("")}var F,N=1/0,P=NaN,Z=[["ary",128],["bind",1],["bindKey",2],["curry",8],["curryRight",16],["flip",512],["partial",32],["partialRight",64],["rearg",256]],q=/\b__p\+='';/g,V=/\b(__p\+=)''\+/g,K=/(__e\(.*?\)|\b__t\))\+'';/g,G=/&(?:amp|lt|gt|quot|#39);/g,H=/[&<>"']/g,J=RegExp(G.source),Y=RegExp(H.source),Q=/<%-([\s\S]+?)%>/g,X=/<%([\s\S]+?)%>/g,nn=/<%=([\s\S]+?)%>/g,tn=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,rn=/^\w*$/,en=/^\./,un=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,on=/[\\^$.*+?()[\]{}|]/g,fn=RegExp(on.source),cn=/^\s+|\s+$/g,an=/^\s+/,ln=/\s+$/,sn=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,hn=/\{\n\/\* \[wrapped with (.+)\] \*/,pn=/,? & /,_n=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,vn=/\\(\\)?/g,gn=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,dn=/\w*$/,yn=/^[-+]0x[0-9a-f]+$/i,bn=/^0b[01]+$/i,xn=/^\[object .+?Constructor\]$/,jn=/^0o[0-7]+$/i,wn=/^(?:0|[1-9]\d*)$/,mn=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,An=/($^)/,kn=/['\n\r\u2028\u2029\\]/g,En="[\\ufe0e\\ufe0f]?(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?(?:\\u200d(?:[^\\ud800-\\udfff]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff])[\\ufe0e\\ufe0f]?(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?)*",On="(?:[\\u2700-\\u27bf]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff])"+En,Sn="(?:[^\\ud800-\\udfff][\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]?|[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\ud800-\\udfff])",In=RegExp("['\u2019]","g"),Rn=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]","g"),zn=RegExp("\\ud83c[\\udffb-\\udfff](?=\\ud83c[\\udffb-\\udfff])|"+Sn+En,"g"),Wn=RegExp(["[A-Z\\xc0-\\xd6\\xd8-\\xde]?[a-z\\xdf-\\xf6\\xf8-\\xff]+(?:['\u2019](?:d|ll|m|re|s|t|ve))?(?=[\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000]|[A-Z\\xc0-\\xd6\\xd8-\\xde]|$)|(?:[A-Z\\xc0-\\xd6\\xd8-\\xde]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?(?=[\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000]|[A-Z\\xc0-\\xd6\\xd8-\\xde](?:[a-z\\xdf-\\xf6\\xf8-\\xff]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])|$)|[A-Z\\xc0-\\xd6\\xd8-\\xde]?(?:[a-z\\xdf-\\xf6\\xf8-\\xff]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])+(?:['\u2019](?:d|ll|m|re|s|t|ve))?|[A-Z\\xc0-\\xd6\\xd8-\\xde]+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?|\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)|\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)|\\d+",On].join("|"),"g"),Bn=RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]"),Ln=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,Un="Array Buffer DataView Date Error Float32Array Float64Array Function Int8Array Int16Array Int32Array Map Math Object Promise RegExp Set String Symbol TypeError Uint8Array Uint8ClampedArray Uint16Array Uint32Array WeakMap _ clearTimeout isFinite parseInt setTimeout".split(" "),Cn={};
	Cn["[object Float32Array]"]=Cn["[object Float64Array]"]=Cn["[object Int8Array]"]=Cn["[object Int16Array]"]=Cn["[object Int32Array]"]=Cn["[object Uint8Array]"]=Cn["[object Uint8ClampedArray]"]=Cn["[object Uint16Array]"]=Cn["[object Uint32Array]"]=true,Cn["[object Arguments]"]=Cn["[object Array]"]=Cn["[object ArrayBuffer]"]=Cn["[object Boolean]"]=Cn["[object DataView]"]=Cn["[object Date]"]=Cn["[object Error]"]=Cn["[object Function]"]=Cn["[object Map]"]=Cn["[object Number]"]=Cn["[object Object]"]=Cn["[object RegExp]"]=Cn["[object Set]"]=Cn["[object String]"]=Cn["[object WeakMap]"]=false;
	var Dn={};Dn["[object Arguments]"]=Dn["[object Array]"]=Dn["[object ArrayBuffer]"]=Dn["[object DataView]"]=Dn["[object Boolean]"]=Dn["[object Date]"]=Dn["[object Float32Array]"]=Dn["[object Float64Array]"]=Dn["[object Int8Array]"]=Dn["[object Int16Array]"]=Dn["[object Int32Array]"]=Dn["[object Map]"]=Dn["[object Number]"]=Dn["[object Object]"]=Dn["[object RegExp]"]=Dn["[object Set]"]=Dn["[object String]"]=Dn["[object Symbol]"]=Dn["[object Uint8Array]"]=Dn["[object Uint8ClampedArray]"]=Dn["[object Uint16Array]"]=Dn["[object Uint32Array]"]=true,
	Dn["[object Error]"]=Dn["[object Function]"]=Dn["[object WeakMap]"]=false;var Mn,Tn={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},$n=parseFloat,Fn=parseInt,Nn=typeof global=="object"&&global&&global.Object===Object&&global,Pn=typeof self=="object"&&self&&self.Object===Object&&self,Zn=Nn||Pn||Function("return this")(),qn=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Vn=qn&&typeof module=="object"&&module&&!module.nodeType&&module,Kn=Vn&&Vn.exports===qn,Gn=Kn&&Nn.process;
	n:{try{Mn=Gn&&Gn.binding&&Gn.binding("util");break n}catch(n){}Mn=void 0}var Hn=Mn&&Mn.isArrayBuffer,Jn=Mn&&Mn.isDate,Yn=Mn&&Mn.isMap,Qn=Mn&&Mn.isRegExp,Xn=Mn&&Mn.isSet,nt=Mn&&Mn.isTypedArray,tt=j("length"),rt=w({"\xc0":"A","\xc1":"A","\xc2":"A","\xc3":"A","\xc4":"A","\xc5":"A","\xe0":"a","\xe1":"a","\xe2":"a","\xe3":"a","\xe4":"a","\xe5":"a","\xc7":"C","\xe7":"c","\xd0":"D","\xf0":"d","\xc8":"E","\xc9":"E","\xca":"E","\xcb":"E","\xe8":"e","\xe9":"e","\xea":"e","\xeb":"e","\xcc":"I","\xcd":"I","\xce":"I",
	"\xcf":"I","\xec":"i","\xed":"i","\xee":"i","\xef":"i","\xd1":"N","\xf1":"n","\xd2":"O","\xd3":"O","\xd4":"O","\xd5":"O","\xd6":"O","\xd8":"O","\xf2":"o","\xf3":"o","\xf4":"o","\xf5":"o","\xf6":"o","\xf8":"o","\xd9":"U","\xda":"U","\xdb":"U","\xdc":"U","\xf9":"u","\xfa":"u","\xfb":"u","\xfc":"u","\xdd":"Y","\xfd":"y","\xff":"y","\xc6":"Ae","\xe6":"ae","\xde":"Th","\xfe":"th","\xdf":"ss","\u0100":"A","\u0102":"A","\u0104":"A","\u0101":"a","\u0103":"a","\u0105":"a","\u0106":"C","\u0108":"C","\u010a":"C",
	"\u010c":"C","\u0107":"c","\u0109":"c","\u010b":"c","\u010d":"c","\u010e":"D","\u0110":"D","\u010f":"d","\u0111":"d","\u0112":"E","\u0114":"E","\u0116":"E","\u0118":"E","\u011a":"E","\u0113":"e","\u0115":"e","\u0117":"e","\u0119":"e","\u011b":"e","\u011c":"G","\u011e":"G","\u0120":"G","\u0122":"G","\u011d":"g","\u011f":"g","\u0121":"g","\u0123":"g","\u0124":"H","\u0126":"H","\u0125":"h","\u0127":"h","\u0128":"I","\u012a":"I","\u012c":"I","\u012e":"I","\u0130":"I","\u0129":"i","\u012b":"i","\u012d":"i",
	"\u012f":"i","\u0131":"i","\u0134":"J","\u0135":"j","\u0136":"K","\u0137":"k","\u0138":"k","\u0139":"L","\u013b":"L","\u013d":"L","\u013f":"L","\u0141":"L","\u013a":"l","\u013c":"l","\u013e":"l","\u0140":"l","\u0142":"l","\u0143":"N","\u0145":"N","\u0147":"N","\u014a":"N","\u0144":"n","\u0146":"n","\u0148":"n","\u014b":"n","\u014c":"O","\u014e":"O","\u0150":"O","\u014d":"o","\u014f":"o","\u0151":"o","\u0154":"R","\u0156":"R","\u0158":"R","\u0155":"r","\u0157":"r","\u0159":"r","\u015a":"S","\u015c":"S",
	"\u015e":"S","\u0160":"S","\u015b":"s","\u015d":"s","\u015f":"s","\u0161":"s","\u0162":"T","\u0164":"T","\u0166":"T","\u0163":"t","\u0165":"t","\u0167":"t","\u0168":"U","\u016a":"U","\u016c":"U","\u016e":"U","\u0170":"U","\u0172":"U","\u0169":"u","\u016b":"u","\u016d":"u","\u016f":"u","\u0171":"u","\u0173":"u","\u0174":"W","\u0175":"w","\u0176":"Y","\u0177":"y","\u0178":"Y","\u0179":"Z","\u017b":"Z","\u017d":"Z","\u017a":"z","\u017c":"z","\u017e":"z","\u0132":"IJ","\u0133":"ij","\u0152":"Oe","\u0153":"oe",
	"\u0149":"'n","\u017f":"s"}),et=w({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}),ut=w({"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"}),it=function w(En){function On(n){if(bu(n)&&!cf(n)&&!(n instanceof Mn)){if(n instanceof zn)return n;if(fi.call(n,"__wrapped__"))return Ne(n)}return new zn(n)}function Sn(){}function zn(n,t){this.__wrapped__=n,this.__actions__=[],this.__chain__=!!t,this.__index__=0,this.__values__=F}function Mn(n){this.__wrapped__=n,this.__actions__=[],this.__dir__=1,
	this.__filtered__=false,this.__iteratees__=[],this.__takeCount__=4294967295,this.__views__=[]}function Tn(n){var t=-1,r=null==n?0:n.length;for(this.clear();++t<r;){var e=n[t];this.set(e[0],e[1])}}function Nn(n){var t=-1,r=null==n?0:n.length;for(this.clear();++t<r;){var e=n[t];this.set(e[0],e[1])}}function Pn(n){var t=-1,r=null==n?0:n.length;for(this.clear();++t<r;){var e=n[t];this.set(e[0],e[1])}}function qn(n){var t=-1,r=null==n?0:n.length;for(this.__data__=new Pn;++t<r;)this.add(n[t])}function Vn(n){
	this.size=(this.__data__=new Nn(n)).size}function Gn(n,t){var r,e=cf(n),u=!e&&ff(n),i=!e&&!u&&lf(n),o=!e&&!u&&!i&&vf(n),u=(e=e||u||i||o)?E(n.length,ti):[],f=u.length;for(r in n)!t&&!fi.call(n,r)||e&&("length"==r||i&&("offset"==r||"parent"==r)||o&&("buffer"==r||"byteLength"==r||"byteOffset"==r)||Se(r,f))||u.push(r);return u}function tt(n){var t=n.length;return t?n[ar(0,t-1)]:F}function ot(n,t){return Me(Tr(n),dt(t,0,n.length))}function ft(n){return Me(Tr(n))}function ct(n,t,r,e){return n===F||su(n,ui[r])&&!fi.call(e,r)?t:n;
	}function at(n,t,r){(r===F||su(n[t],r))&&(r!==F||t in n)||vt(n,t,r)}function lt(n,t,r){var e=n[t];fi.call(n,t)&&su(e,r)&&(r!==F||t in n)||vt(n,t,r)}function st(n,t){for(var r=n.length;r--;)if(su(n[r][0],t))return r;return-1}function ht(n,t,r,e){return io(n,function(n,u,i){t(e,n,r(n),i)}),e}function pt(n,t){return n&&$r(t,Bu(t),n)}function _t(n,t){return n&&$r(t,Lu(t),n)}function vt(n,t,r){"__proto__"==t&&ki?ki(n,t,{configurable:true,enumerable:true,value:r,writable:true}):n[t]=r}function gt(n,t){for(var r=-1,e=t.length,u=Gu(e),i=null==n;++r<e;)u[r]=i?F:zu(n,t[r]);
	return u}function dt(n,t,r){return n===n&&(r!==F&&(n=n<=r?n:r),t!==F&&(n=n>=t?n:t)),n}function yt(n,t,r,e,i,o){var f,c=1&t,a=2&t,l=4&t;if(r&&(f=i?r(n,e,i,o):r(n)),f!==F)return f;if(!yu(n))return n;if(e=cf(n)){if(f=Ae(n),!c)return Tr(n,f)}else{var s=go(n),h="[object Function]"==s||"[object GeneratorFunction]"==s;if(lf(n))return Br(n,c);if("[object Object]"==s||"[object Arguments]"==s||h&&!i){if(f=a||h?{}:ke(n),!c)return a?Nr(n,_t(f,n)):Fr(n,pt(f,n))}else{if(!Dn[s])return i?n:{};f=Ee(n,s,yt,c)}}if(o||(o=new Vn),
	i=o.get(n))return i;o.set(n,f);var a=l?a?ge:ve:a?Lu:Bu,p=e?F:a(n);return u(p||n,function(e,u){p&&(u=e,e=n[u]),lt(f,u,yt(e,t,r,u,n,o))}),f}function bt(n){var t=Bu(n);return function(r){return xt(r,n,t)}}function xt(n,t,r){var e=r.length;if(null==n)return!e;for(n=Xu(n);e--;){var u=r[e],i=t[u],o=n[u];if(o===F&&!(u in n)||!i(o))return false}return true}function jt(n,t,r){if(typeof n!="function")throw new ri("Expected a function");return xo(function(){n.apply(F,r)},t)}function wt(n,t,r,e){var u=-1,i=c,o=true,f=n.length,s=[],h=t.length;
	if(!f)return s;r&&(t=l(t,S(r))),e?(i=a,o=false):200<=t.length&&(i=R,o=false,t=new qn(t));n:for(;++u<f;){var p=n[u],_=null==r?p:r(p),p=e||0!==p?p:0;if(o&&_===_){for(var v=h;v--;)if(t[v]===_)continue n;s.push(p)}else i(t,_,e)||s.push(p)}return s}function mt(n,t){var r=true;return io(n,function(n,e,u){return r=!!t(n,e,u)}),r}function At(n,t,r){for(var e=-1,u=n.length;++e<u;){var i=n[e],o=t(i);if(null!=o&&(f===F?o===o&&!mu(o):r(o,f)))var f=o,c=i}return c}function kt(n,t){var r=[];return io(n,function(n,e,u){
	t(n,e,u)&&r.push(n)}),r}function Et(n,t,r,e,u){var i=-1,o=n.length;for(r||(r=Oe),u||(u=[]);++i<o;){var f=n[i];0<t&&r(f)?1<t?Et(f,t-1,r,e,u):s(u,f):e||(u[u.length]=f)}return u}function Ot(n,t){return n&&fo(n,t,Bu)}function St(n,t){return n&&co(n,t,Bu)}function It(n,t){return f(t,function(t){return vu(n[t])})}function Rt(n,t){t=zr(t,n);for(var r=0,e=t.length;null!=n&&r<e;)n=n[Te(t[r++])];return r&&r==e?n:F}function zt(n,t,r){return t=t(n),cf(n)?t:s(t,r(n))}function Wt(n){if(null==n)return n===F?"[object Undefined]":"[object Null]";
	n=Xu(n);var t;if(Ai&&Ai in n){var r=fi.call(n,Ai),e=n[Ai];try{n[Ai]=F,t=true}catch(n){}var u=li.call(n);t&&(r?n[Ai]=e:delete n[Ai]),t=u}else t=li.call(n);return t}function Bt(n,t){return n>t}function Lt(n,t){return null!=n&&fi.call(n,t)}function Ut(n,t){return null!=n&&t in Xu(n)}function Ct(n,t,r){for(var e=r?a:c,u=n[0].length,i=n.length,o=i,f=Gu(i),s=1/0,h=[];o--;){var p=n[o];o&&t&&(p=l(p,S(t))),s=Di(p.length,s),f[o]=!r&&(t||120<=u&&120<=p.length)?new qn(o&&p):F}var p=n[0],_=-1,v=f[0];n:for(;++_<u&&h.length<s;){
	var g=p[_],d=t?t(g):g,g=r||0!==g?g:0;if(v?!R(v,d):!e(h,d,r)){for(o=i;--o;){var y=f[o];if(y?!R(y,d):!e(n[o],d,r))continue n}v&&v.push(d),h.push(g)}}return h}function Dt(n,t,r){var e={};return Ot(n,function(n,u,i){t(e,r(n),u,i)}),e}function Mt(n,t,e){return t=zr(t,n),n=2>t.length?n:Rt(n,gr(t,0,-1)),t=null==n?n:n[Te(Ke(t))],null==t?F:r(t,n,e)}function Tt(n){return bu(n)&&"[object Arguments]"==Wt(n)}function $t(n){return bu(n)&&"[object ArrayBuffer]"==Wt(n)}function Ft(n){return bu(n)&&"[object Date]"==Wt(n);
	}function Nt(n,t,r,e,u){if(n===t)t=true;else if(null==n||null==t||!yu(n)&&!bu(t))t=n!==n&&t!==t;else n:{var i=cf(n),o=cf(t),f="[object Array]",c="[object Array]";i||(f=go(n),f="[object Arguments]"==f?"[object Object]":f),o||(c=go(t),c="[object Arguments]"==c?"[object Object]":c);var a="[object Object]"==f,o="[object Object]"==c;if((c=f==c)&&lf(n)){if(!lf(t)){t=false;break n}i=true,a=false}if(c&&!a)u||(u=new Vn),t=i||vf(n)?he(n,t,r,e,Nt,u):pe(n,t,f,r,e,Nt,u);else{if(!(1&r)&&(i=a&&fi.call(n,"__wrapped__"),f=o&&fi.call(t,"__wrapped__"),
	i||f)){n=i?n.value():n,t=f?t.value():t,u||(u=new Vn),t=Nt(n,t,r,e,u);break n}if(c)t:if(u||(u=new Vn),i=1&r,f=Bu(n),o=f.length,c=Bu(t).length,o==c||i){for(a=o;a--;){var l=f[a];if(!(i?l in t:fi.call(t,l))){t=false;break t}}if((c=u.get(n))&&u.get(t))t=c==t;else{c=true,u.set(n,t),u.set(t,n);for(var s=i;++a<o;){var l=f[a],h=n[l],p=t[l];if(e)var _=i?e(p,h,l,t,n,u):e(h,p,l,n,t,u);if(_===F?h!==p&&!Nt(h,p,r,e,u):!_){c=false;break}s||(s="constructor"==l)}c&&!s&&(r=n.constructor,e=t.constructor,r!=e&&"constructor"in n&&"constructor"in t&&!(typeof r=="function"&&r instanceof r&&typeof e=="function"&&e instanceof e)&&(c=false)),
	u.delete(n),u.delete(t),t=c}}else t=false;else t=false}}return t}function Pt(n){return bu(n)&&"[object Map]"==go(n)}function Zt(n,t,r,e){var u=r.length,i=u,o=!e;if(null==n)return!i;for(n=Xu(n);u--;){var f=r[u];if(o&&f[2]?f[1]!==n[f[0]]:!(f[0]in n))return false}for(;++u<i;){var f=r[u],c=f[0],a=n[c],l=f[1];if(o&&f[2]){if(a===F&&!(c in n))return false}else{if(f=new Vn,e)var s=e(a,l,c,n,t,f);if(s===F?!Nt(l,a,3,e,f):!s)return false}}return true}function qt(n){return!(!yu(n)||ai&&ai in n)&&(vu(n)?pi:xn).test($e(n))}function Vt(n){
	return bu(n)&&"[object RegExp]"==Wt(n)}function Kt(n){return bu(n)&&"[object Set]"==go(n)}function Gt(n){return bu(n)&&du(n.length)&&!!Cn[Wt(n)]}function Ht(n){return typeof n=="function"?n:null==n?Fu:typeof n=="object"?cf(n)?nr(n[0],n[1]):Xt(n):qu(n)}function Jt(n){if(!We(n))return Ui(n);var t,r=[];for(t in Xu(n))fi.call(n,t)&&"constructor"!=t&&r.push(t);return r}function Yt(n,t){return n<t}function Qt(n,t){var r=-1,e=hu(n)?Gu(n.length):[];return io(n,function(n,u,i){e[++r]=t(n,u,i)}),e}function Xt(n){
	var t=je(n);return 1==t.length&&t[0][2]?Be(t[0][0],t[0][1]):function(r){return r===n||Zt(r,n,t)}}function nr(n,t){return Re(n)&&t===t&&!yu(t)?Be(Te(n),t):function(r){var e=zu(r,n);return e===F&&e===t?Wu(r,n):Nt(t,e,3)}}function tr(n,t,r,e,u){n!==t&&fo(t,function(i,o){if(yu(i)){u||(u=new Vn);var f=u,c=n[o],a=t[o],l=f.get(a);if(l)at(n,o,l);else{var l=e?e(c,a,o+"",n,t,f):F,s=l===F;if(s){var h=cf(a),p=!h&&lf(a),_=!h&&!p&&vf(a),l=a;h||p||_?cf(c)?l=c:pu(c)?l=Tr(c):p?(s=false,l=Br(a,true)):_?(s=false,l=Ur(a,true)):l=[]:ju(a)||ff(a)?(l=c,
	ff(c)?l=Iu(c):(!yu(c)||r&&vu(c))&&(l=ke(a))):s=false}s&&(f.set(a,l),tr(l,a,r,e,f),f.delete(a)),at(n,o,l)}}else f=e?e(n[o],i,o+"",n,t,u):F,f===F&&(f=i),at(n,o,f)},Lu)}function rr(n,t){var r=n.length;if(r)return t+=0>t?r:0,Se(t,r)?n[t]:F}function er(n,t,r){var e=-1;return t=l(t.length?t:[Fu],S(be())),n=Qt(n,function(n){return{a:l(t,function(t){return t(n)}),b:++e,c:n}}),A(n,function(n,t){var e;n:{e=-1;for(var u=n.a,i=t.a,o=u.length,f=r.length;++e<o;){var c=Cr(u[e],i[e]);if(c){e=e>=f?c:c*("desc"==r[e]?-1:1);
	break n}}e=n.b-t.b}return e})}function ur(n,t){return n=Xu(n),ir(n,t,function(t,r){return Wu(n,r)})}function ir(n,t,r){for(var e=-1,u=t.length,i={};++e<u;){var o=t[e],f=Rt(n,o);r(f,o)&&_r(i,zr(o,n),f)}return i}function or(n){return function(t){return Rt(t,n)}}function fr(n,t,r,e){var u=e?y:d,i=-1,o=t.length,f=n;for(n===t&&(t=Tr(t)),r&&(f=l(n,S(r)));++i<o;)for(var c=0,a=t[i],a=r?r(a):a;-1<(c=u(f,a,c,e));)f!==n&&ji.call(f,c,1),ji.call(n,c,1);return n}function cr(n,t){for(var r=n?t.length:0,e=r-1;r--;){
	var u=t[r];if(r==e||u!==i){var i=u;Se(u)?ji.call(n,u,1):Ar(n,u)}}}function ar(n,t){return n+Ri($i()*(t-n+1))}function lr(n,t){var r="";if(!n||1>t||9007199254740991<t)return r;do t%2&&(r+=n),(t=Ri(t/2))&&(n+=n);while(t);return r}function sr(n,t){return jo(Ue(n,t,Fu),n+"")}function hr(n){return tt(Cu(n))}function pr(n,t){var r=Cu(n);return Me(r,dt(t,0,r.length))}function _r(n,t,r,e){if(!yu(n))return n;t=zr(t,n);for(var u=-1,i=t.length,o=i-1,f=n;null!=f&&++u<i;){var c=Te(t[u]),a=r;if(u!=o){var l=f[c],a=e?e(l,c,f):F;
	a===F&&(a=yu(l)?l:Se(t[u+1])?[]:{})}lt(f,c,a),f=f[c]}return n}function vr(n){return Me(Cu(n))}function gr(n,t,r){var e=-1,u=n.length;for(0>t&&(t=-t>u?0:u+t),r=r>u?u:r,0>r&&(r+=u),u=t>r?0:r-t>>>0,t>>>=0,r=Gu(u);++e<u;)r[e]=n[e+t];return r}function dr(n,t){var r;return io(n,function(n,e,u){return r=t(n,e,u),!r}),!!r}function yr(n,t,r){var e=0,u=null==n?e:n.length;if(typeof t=="number"&&t===t&&2147483647>=u){for(;e<u;){var i=e+u>>>1,o=n[i];null!==o&&!mu(o)&&(r?o<=t:o<t)?e=i+1:u=i}return u}return br(n,t,Fu,r);
	}function br(n,t,r,e){t=r(t);for(var u=0,i=null==n?0:n.length,o=t!==t,f=null===t,c=mu(t),a=t===F;u<i;){var l=Ri((u+i)/2),s=r(n[l]),h=s!==F,p=null===s,_=s===s,v=mu(s);(o?e||_:a?_&&(e||h):f?_&&h&&(e||!p):c?_&&h&&!p&&(e||!v):p||v?0:e?s<=t:s<t)?u=l+1:i=l}return Di(i,4294967294)}function xr(n,t){for(var r=-1,e=n.length,u=0,i=[];++r<e;){var o=n[r],f=t?t(o):o;if(!r||!su(f,c)){var c=f;i[u++]=0===o?0:o}}return i}function jr(n){return typeof n=="number"?n:mu(n)?P:+n}function wr(n){if(typeof n=="string")return n;
	if(cf(n))return l(n,wr)+"";if(mu(n))return eo?eo.call(n):"";var t=n+"";return"0"==t&&1/n==-N?"-0":t}function mr(n,t,r){var e=-1,u=c,i=n.length,o=true,f=[],l=f;if(r)o=false,u=a;else if(200<=i){if(u=t?null:ho(n))return D(u);o=false,u=R,l=new qn}else l=t?[]:f;n:for(;++e<i;){var s=n[e],h=t?t(s):s,s=r||0!==s?s:0;if(o&&h===h){for(var p=l.length;p--;)if(l[p]===h)continue n;t&&l.push(h),f.push(s)}else u(l,h,r)||(l!==f&&l.push(h),f.push(s))}return f}function Ar(n,t){return t=zr(t,n),n=2>t.length?n:Rt(n,gr(t,0,-1)),
	null==n||delete n[Te(Ke(t))]}function kr(n,t,r,e){for(var u=n.length,i=e?u:-1;(e?i--:++i<u)&&t(n[i],i,n););return r?gr(n,e?0:i,e?i+1:u):gr(n,e?i+1:0,e?u:i)}function Er(n,t){var r=n;return r instanceof Mn&&(r=r.value()),h(t,function(n,t){return t.func.apply(t.thisArg,s([n],t.args))},r)}function Or(n,t,r){var e=n.length;if(2>e)return e?mr(n[0]):[];for(var u=-1,i=Gu(e);++u<e;)for(var o=n[u],f=-1;++f<e;)f!=u&&(i[u]=wt(i[u]||o,n[f],t,r));return mr(Et(i,1),t,r)}function Sr(n,t,r){for(var e=-1,u=n.length,i=t.length,o={};++e<u;)r(o,n[e],e<i?t[e]:F);
	return o}function Ir(n){return pu(n)?n:[]}function Rr(n){return typeof n=="function"?n:Fu}function zr(n,t){return cf(n)?n:Re(n,t)?[n]:wo(Ru(n))}function Wr(n,t,r){var e=n.length;return r=r===F?e:r,!t&&r>=e?n:gr(n,t,r)}function Br(n,t){if(t)return n.slice();var r=n.length,r=di?di(r):new n.constructor(r);return n.copy(r),r}function Lr(n){var t=new n.constructor(n.byteLength);return new gi(t).set(new gi(n)),t}function Ur(n,t){return new n.constructor(t?Lr(n.buffer):n.buffer,n.byteOffset,n.length)}function Cr(n,t){
	if(n!==t){var r=n!==F,e=null===n,u=n===n,i=mu(n),o=t!==F,f=null===t,c=t===t,a=mu(t);if(!f&&!a&&!i&&n>t||i&&o&&c&&!f&&!a||e&&o&&c||!r&&c||!u)return 1;if(!e&&!i&&!a&&n<t||a&&r&&u&&!e&&!i||f&&r&&u||!o&&u||!c)return-1}return 0}function Dr(n,t,r,e){var u=-1,i=n.length,o=r.length,f=-1,c=t.length,a=Ci(i-o,0),l=Gu(c+a);for(e=!e;++f<c;)l[f]=t[f];for(;++u<o;)(e||u<i)&&(l[r[u]]=n[u]);for(;a--;)l[f++]=n[u++];return l}function Mr(n,t,r,e){var u=-1,i=n.length,o=-1,f=r.length,c=-1,a=t.length,l=Ci(i-f,0),s=Gu(l+a);
	for(e=!e;++u<l;)s[u]=n[u];for(l=u;++c<a;)s[l+c]=t[c];for(;++o<f;)(e||u<i)&&(s[l+r[o]]=n[u++]);return s}function Tr(n,t){var r=-1,e=n.length;for(t||(t=Gu(e));++r<e;)t[r]=n[r];return t}function $r(n,t,r,e){var u=!r;r||(r={});for(var i=-1,o=t.length;++i<o;){var f=t[i],c=e?e(r[f],n[f],f,r,n):F;c===F&&(c=n[f]),u?vt(r,f,c):lt(r,f,c)}return r}function Fr(n,t){return $r(n,_o(n),t)}function Nr(n,t){return $r(n,vo(n),t)}function Pr(n,t){return function(r,u){var i=cf(r)?e:ht,o=t?t():{};return i(r,n,be(u,2),o);
	}}function Zr(n){return sr(function(t,r){var e=-1,u=r.length,i=1<u?r[u-1]:F,o=2<u?r[2]:F,i=3<n.length&&typeof i=="function"?(u--,i):F;for(o&&Ie(r[0],r[1],o)&&(i=3>u?F:i,u=1),t=Xu(t);++e<u;)(o=r[e])&&n(t,o,e,i);return t})}function qr(n,t){return function(r,e){if(null==r)return r;if(!hu(r))return n(r,e);for(var u=r.length,i=t?u:-1,o=Xu(r);(t?i--:++i<u)&&false!==e(o[i],i,o););return r}}function Vr(n){return function(t,r,e){var u=-1,i=Xu(t);e=e(t);for(var o=e.length;o--;){var f=e[n?o:++u];if(false===r(i[f],f,i))break;
	}return t}}function Kr(n,t,r){function e(){return(this&&this!==Zn&&this instanceof e?i:n).apply(u?r:this,arguments)}var u=1&t,i=Jr(n);return e}function Gr(n){return function(t){t=Ru(t);var r=Bn.test(t)?$(t):F,e=r?r[0]:t.charAt(0);return t=r?Wr(r,1).join(""):t.slice(1),e[n]()+t}}function Hr(n){return function(t){return h(Tu(Mu(t).replace(In,"")),n,"")}}function Jr(n){return function(){var t=arguments;switch(t.length){case 0:return new n;case 1:return new n(t[0]);case 2:return new n(t[0],t[1]);case 3:
	return new n(t[0],t[1],t[2]);case 4:return new n(t[0],t[1],t[2],t[3]);case 5:return new n(t[0],t[1],t[2],t[3],t[4]);case 6:return new n(t[0],t[1],t[2],t[3],t[4],t[5]);case 7:return new n(t[0],t[1],t[2],t[3],t[4],t[5],t[6])}var r=uo(n.prototype),t=n.apply(r,t);return yu(t)?t:r}}function Yr(n,t,e){function u(){for(var o=arguments.length,f=Gu(o),c=o,a=ye(u);c--;)f[c]=arguments[c];return c=3>o&&f[0]!==a&&f[o-1]!==a?[]:C(f,a),o-=c.length,o<e?ce(n,t,ne,u.placeholder,F,f,c,F,F,e-o):r(this&&this!==Zn&&this instanceof u?i:n,this,f);
	}var i=Jr(n);return u}function Qr(n){return function(t,r,e){var u=Xu(t);if(!hu(t)){var i=be(r,3);t=Bu(t),r=function(n){return i(u[n],n,u)}}return r=n(t,r,e),-1<r?u[i?t[r]:r]:F}}function Xr(n){return _e(function(t){var r=t.length,e=r,u=zn.prototype.thru;for(n&&t.reverse();e--;){var i=t[e];if(typeof i!="function")throw new ri("Expected a function");if(u&&!o&&"wrapper"==de(i))var o=new zn([],true)}for(e=o?e:r;++e<r;)var i=t[e],u=de(i),f="wrapper"==u?po(i):F,o=f&&ze(f[0])&&424==f[1]&&!f[4].length&&1==f[9]?o[de(f[0])].apply(o,f[3]):1==i.length&&ze(i)?o[u]():o.thru(i);
	return function(){var n=arguments,e=n[0];if(o&&1==n.length&&cf(e)&&200<=e.length)return o.plant(e).value();for(var u=0,n=r?t[u].apply(this,n):e;++u<r;)n=t[u].call(this,n);return n}})}function ne(n,t,r,e,u,i,o,f,c,a){function l(){for(var d=arguments.length,y=Gu(d),b=d;b--;)y[b]=arguments[b];if(_){var x,j=ye(l),b=y.length;for(x=0;b--;)y[b]===j&&++x}if(e&&(y=Dr(y,e,u,_)),i&&(y=Mr(y,i,o,_)),d-=x,_&&d<a)return j=C(y,j),ce(n,t,ne,l.placeholder,r,y,j,f,c,a-d);if(j=h?r:this,b=p?j[n]:n,d=y.length,f){x=y.length;
	for(var w=Di(f.length,x),m=Tr(y);w--;){var A=f[w];y[w]=Se(A,x)?m[A]:F}}else v&&1<d&&y.reverse();return s&&c<d&&(y.length=c),this&&this!==Zn&&this instanceof l&&(b=g||Jr(b)),b.apply(j,y)}var s=128&t,h=1&t,p=2&t,_=24&t,v=512&t,g=p?F:Jr(n);return l}function te(n,t){return function(r,e){return Dt(r,n,t(e))}}function re(n,t){return function(r,e){var u;if(r===F&&e===F)return t;if(r!==F&&(u=r),e!==F){if(u===F)return e;typeof r=="string"||typeof e=="string"?(r=wr(r),e=wr(e)):(r=jr(r),e=jr(e)),u=n(r,e)}return u;
	}}function ee(n){return _e(function(t){return t=l(t,S(be())),sr(function(e){var u=this;return n(t,function(n){return r(n,u,e)})})})}function ue(n,t){t=t===F?" ":wr(t);var r=t.length;return 2>r?r?lr(t,n):t:(r=lr(t,Ii(n/T(t))),Bn.test(t)?Wr($(r),0,n).join(""):r.slice(0,n))}function ie(n,t,e,u){function i(){for(var t=-1,c=arguments.length,a=-1,l=u.length,s=Gu(l+c),h=this&&this!==Zn&&this instanceof i?f:n;++a<l;)s[a]=u[a];for(;c--;)s[a++]=arguments[++t];return r(h,o?e:this,s)}var o=1&t,f=Jr(n);return i;
	}function oe(n){return function(t,r,e){e&&typeof e!="number"&&Ie(t,r,e)&&(r=e=F),t=ku(t),r===F?(r=t,t=0):r=ku(r),e=e===F?t<r?1:-1:ku(e);var u=-1;r=Ci(Ii((r-t)/(e||1)),0);for(var i=Gu(r);r--;)i[n?r:++u]=t,t+=e;return i}}function fe(n){return function(t,r){return typeof t=="string"&&typeof r=="string"||(t=Su(t),r=Su(r)),n(t,r)}}function ce(n,t,r,e,u,i,o,f,c,a){var l=8&t,s=l?o:F;o=l?F:o;var h=l?i:F;return i=l?F:i,t=(t|(l?32:64))&~(l?64:32),4&t||(t&=-4),u=[n,t,u,h,s,i,o,f,c,a],r=r.apply(F,u),ze(n)&&bo(r,u),
	r.placeholder=e,Ce(r,n,t)}function ae(n){var t=Qu[n];return function(n,r){if(n=Su(n),r=Di(Eu(r),292)){var e=(Ru(n)+"e").split("e"),e=t(e[0]+"e"+(+e[1]+r)),e=(Ru(e)+"e").split("e");return+(e[0]+"e"+(+e[1]-r))}return t(n)}}function le(n){return function(t){var r=go(t);return"[object Map]"==r?L(t):"[object Set]"==r?M(t):O(t,n(t))}}function se(n,t,r,e,u,i,o,f){var c=2&t;if(!c&&typeof n!="function")throw new ri("Expected a function");var a=e?e.length:0;if(a||(t&=-97,e=u=F),o=o===F?o:Ci(Eu(o),0),f=f===F?f:Eu(f),
	a-=u?u.length:0,64&t){var l=e,s=u;e=u=F}var h=c?F:po(n);return i=[n,t,r,e,u,l,s,i,o,f],h&&(r=i[1],n=h[1],t=r|n,e=128==n&&8==r||128==n&&256==r&&i[7].length<=h[8]||384==n&&h[7].length<=h[8]&&8==r,131>t||e)&&(1&n&&(i[2]=h[2],t|=1&r?0:4),(r=h[3])&&(e=i[3],i[3]=e?Dr(e,r,h[4]):r,i[4]=e?C(i[3],"__lodash_placeholder__"):h[4]),(r=h[5])&&(e=i[5],i[5]=e?Mr(e,r,h[6]):r,i[6]=e?C(i[5],"__lodash_placeholder__"):h[6]),(r=h[7])&&(i[7]=r),128&n&&(i[8]=null==i[8]?h[8]:Di(i[8],h[8])),null==i[9]&&(i[9]=h[9]),i[0]=h[0],
	i[1]=t),n=i[0],t=i[1],r=i[2],e=i[3],u=i[4],f=i[9]=null==i[9]?c?0:n.length:Ci(i[9]-a,0),!f&&24&t&&(t&=-25),Ce((h?ao:bo)(t&&1!=t?8==t||16==t?Yr(n,t,f):32!=t&&33!=t||u.length?ne.apply(F,i):ie(n,t,r,e):Kr(n,t,r),i),n,t)}function he(n,t,r,e,u,i){var o=1&r,f=n.length,c=t.length;if(f!=c&&!(o&&c>f))return false;if((c=i.get(n))&&i.get(t))return c==t;var c=-1,a=true,l=2&r?new qn:F;for(i.set(n,t),i.set(t,n);++c<f;){var s=n[c],h=t[c];if(e)var p=o?e(h,s,c,t,n,i):e(s,h,c,n,t,i);if(p!==F){if(p)continue;a=false;break}if(l){
	if(!_(t,function(n,t){if(!R(l,t)&&(s===n||u(s,n,r,e,i)))return l.push(t)})){a=false;break}}else if(s!==h&&!u(s,h,r,e,i)){a=false;break}}return i.delete(n),i.delete(t),a}function pe(n,t,r,e,u,i,o){switch(r){case"[object DataView]":if(n.byteLength!=t.byteLength||n.byteOffset!=t.byteOffset)break;n=n.buffer,t=t.buffer;case"[object ArrayBuffer]":if(n.byteLength!=t.byteLength||!i(new gi(n),new gi(t)))break;return true;case"[object Boolean]":case"[object Date]":case"[object Number]":return su(+n,+t);case"[object Error]":
	return n.name==t.name&&n.message==t.message;case"[object RegExp]":case"[object String]":return n==t+"";case"[object Map]":var f=L;case"[object Set]":if(f||(f=D),n.size!=t.size&&!(1&e))break;return(r=o.get(n))?r==t:(e|=2,o.set(n,t),t=he(f(n),f(t),e,u,i,o),o.delete(n),t);case"[object Symbol]":if(ro)return ro.call(n)==ro.call(t)}return false}function _e(n){return jo(Ue(n,F,qe),n+"")}function ve(n){return zt(n,Bu,_o)}function ge(n){return zt(n,Lu,vo)}function de(n){for(var t=n.name+"",r=Hi[t],e=fi.call(Hi,t)?r.length:0;e--;){
	var u=r[e],i=u.func;if(null==i||i==n)return u.name}return t}function ye(n){return(fi.call(On,"placeholder")?On:n).placeholder}function be(){var n=On.iteratee||Nu,n=n===Nu?Ht:n;return arguments.length?n(arguments[0],arguments[1]):n}function xe(n,t){var r=n.__data__,e=typeof t;return("string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t)?r[typeof t=="string"?"string":"hash"]:r.map}function je(n){for(var t=Bu(n),r=t.length;r--;){var e=t[r],u=n[e];t[r]=[e,u,u===u&&!yu(u)]}return t;
	}function we(n,t){var r=null==n?F:n[t];return qt(r)?r:F}function me(n,t,r){t=zr(t,n);for(var e=-1,u=t.length,i=false;++e<u;){var o=Te(t[e]);if(!(i=null!=n&&r(n,o)))break;n=n[o]}return i||++e!=u?i:(u=null==n?0:n.length,!!u&&du(u)&&Se(o,u)&&(cf(n)||ff(n)))}function Ae(n){var t=n.length,r=n.constructor(t);return t&&"string"==typeof n[0]&&fi.call(n,"index")&&(r.index=n.index,r.input=n.input),r}function ke(n){return typeof n.constructor!="function"||We(n)?{}:uo(yi(n))}function Ee(r,e,u,i){var o=r.constructor;
	switch(e){case"[object ArrayBuffer]":return Lr(r);case"[object Boolean]":case"[object Date]":return new o(+r);case"[object DataView]":return e=i?Lr(r.buffer):r.buffer,new r.constructor(e,r.byteOffset,r.byteLength);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return Ur(r,i);case"[object Map]":return e=i?u(L(r),1):L(r),
	h(e,n,new r.constructor);case"[object Number]":case"[object String]":return new o(r);case"[object RegExp]":return e=new r.constructor(r.source,dn.exec(r)),e.lastIndex=r.lastIndex,e;case"[object Set]":return e=i?u(D(r),1):D(r),h(e,t,new r.constructor);case"[object Symbol]":return ro?Xu(ro.call(r)):{}}}function Oe(n){return cf(n)||ff(n)||!!(wi&&n&&n[wi])}function Se(n,t){return t=null==t?9007199254740991:t,!!t&&(typeof n=="number"||wn.test(n))&&-1<n&&0==n%1&&n<t}function Ie(n,t,r){if(!yu(r))return false;
	var e=typeof t;return!!("number"==e?hu(r)&&Se(t,r.length):"string"==e&&t in r)&&su(r[t],n)}function Re(n,t){if(cf(n))return false;var r=typeof n;return!("number"!=r&&"symbol"!=r&&"boolean"!=r&&null!=n&&!mu(n))||(rn.test(n)||!tn.test(n)||null!=t&&n in Xu(t))}function ze(n){var t=de(n),r=On[t];return typeof r=="function"&&t in Mn.prototype&&(n===r||(t=po(r),!!t&&n===t[0]))}function We(n){var t=n&&n.constructor;return n===(typeof t=="function"&&t.prototype||ui)}function Be(n,t){return function(r){return null!=r&&(r[n]===t&&(t!==F||n in Xu(r)));
	}}function Le(n,t,r,e,u,i){return yu(n)&&yu(t)&&(i.set(t,n),tr(n,t,F,Le,i),i.delete(t)),n}function Ue(n,t,e){return t=Ci(t===F?n.length-1:t,0),function(){for(var u=arguments,i=-1,o=Ci(u.length-t,0),f=Gu(o);++i<o;)f[i]=u[t+i];for(i=-1,o=Gu(t+1);++i<t;)o[i]=u[i];return o[t]=e(f),r(n,this,o)}}function Ce(n,t,r){var e=t+"";t=jo;var u,i=Fe;return u=(u=e.match(hn))?u[1].split(pn):[],r=i(u,r),(i=r.length)&&(u=i-1,r[u]=(1<i?"& ":"")+r[u],r=r.join(2<i?", ":" "),e=e.replace(sn,"{\n/* [wrapped with "+r+"] */\n")),
	t(n,e)}function De(n){var t=0,r=0;return function(){var e=Mi(),u=16-(e-r);if(r=e,0<u){if(800<=++t)return arguments[0]}else t=0;return n.apply(F,arguments)}}function Me(n,t){var r=-1,e=n.length,u=e-1;for(t=t===F?e:t;++r<t;){var e=ar(r,u),i=n[e];n[e]=n[r],n[r]=i}return n.length=t,n}function Te(n){if(typeof n=="string"||mu(n))return n;var t=n+"";return"0"==t&&1/n==-N?"-0":t}function $e(n){if(null!=n){try{return oi.call(n)}catch(n){}return n+""}return""}function Fe(n,t){return u(Z,function(r){var e="_."+r[0];
	t&r[1]&&!c(n,e)&&n.push(e)}),n.sort()}function Ne(n){if(n instanceof Mn)return n.clone();var t=new zn(n.__wrapped__,n.__chain__);return t.__actions__=Tr(n.__actions__),t.__index__=n.__index__,t.__values__=n.__values__,t}function Pe(n,t,r){var e=null==n?0:n.length;return e?(r=null==r?0:Eu(r),0>r&&(r=Ci(e+r,0)),g(n,be(t,3),r)):-1}function Ze(n,t,r){var e=null==n?0:n.length;if(!e)return-1;var u=e-1;return r!==F&&(u=Eu(r),u=0>r?Ci(e+u,0):Di(u,e-1)),g(n,be(t,3),u,true)}function qe(n){return(null==n?0:n.length)?Et(n,1):[];
	}function Ve(n){return n&&n.length?n[0]:F}function Ke(n){var t=null==n?0:n.length;return t?n[t-1]:F}function Ge(n,t){return n&&n.length&&t&&t.length?fr(n,t):n}function He(n){return null==n?n:Fi.call(n)}function Je(n){if(!n||!n.length)return[];var t=0;return n=f(n,function(n){if(pu(n))return t=Ci(n.length,t),true}),E(t,function(t){return l(n,j(t))})}function Ye(n,t){if(!n||!n.length)return[];var e=Je(n);return null==t?e:l(e,function(n){return r(t,F,n)})}function Qe(n){return n=On(n),n.__chain__=true,n;
	}function Xe(n,t){return t(n)}function nu(){return this}function tu(n,t){return(cf(n)?u:io)(n,be(t,3))}function ru(n,t){return(cf(n)?i:oo)(n,be(t,3))}function eu(n,t){return(cf(n)?l:Qt)(n,be(t,3))}function uu(n,t,r){return t=r?F:t,t=n&&null==t?n.length:t,se(n,128,F,F,F,F,t)}function iu(n,t){var r;if(typeof t!="function")throw new ri("Expected a function");return n=Eu(n),function(){return 0<--n&&(r=t.apply(this,arguments)),1>=n&&(t=F),r}}function ou(n,t,r){return t=r?F:t,n=se(n,8,F,F,F,F,F,t),n.placeholder=ou.placeholder,
	n}function fu(n,t,r){return t=r?F:t,n=se(n,16,F,F,F,F,F,t),n.placeholder=fu.placeholder,n}function cu(n,t,r){function e(t){var r=c,e=a;return c=a=F,_=t,s=n.apply(e,r)}function u(n){var r=n-p;return n-=_,p===F||r>=t||0>r||g&&n>=l}function i(){var n=Ho();if(u(n))return o(n);var r,e=xo;r=n-_,n=t-(n-p),r=g?Di(n,l-r):n,h=e(i,r)}function o(n){return h=F,d&&c?e(n):(c=a=F,s)}function f(){var n=Ho(),r=u(n);if(c=arguments,a=this,p=n,r){if(h===F)return _=n=p,h=xo(i,t),v?e(n):s;if(g)return h=xo(i,t),e(p)}return h===F&&(h=xo(i,t)),
	s}var c,a,l,s,h,p,_=0,v=false,g=false,d=true;if(typeof n!="function")throw new ri("Expected a function");return t=Su(t)||0,yu(r)&&(v=!!r.leading,l=(g="maxWait"in r)?Ci(Su(r.maxWait)||0,t):l,d="trailing"in r?!!r.trailing:d),f.cancel=function(){h!==F&&so(h),_=0,c=p=a=h=F},f.flush=function(){return h===F?s:o(Ho())},f}function au(n,t){function r(){var e=arguments,u=t?t.apply(this,e):e[0],i=r.cache;return i.has(u)?i.get(u):(e=n.apply(this,e),r.cache=i.set(u,e)||i,e)}if(typeof n!="function"||null!=t&&typeof t!="function")throw new ri("Expected a function");
	return r.cache=new(au.Cache||Pn),r}function lu(n){if(typeof n!="function")throw new ri("Expected a function");return function(){var t=arguments;switch(t.length){case 0:return!n.call(this);case 1:return!n.call(this,t[0]);case 2:return!n.call(this,t[0],t[1]);case 3:return!n.call(this,t[0],t[1],t[2])}return!n.apply(this,t)}}function su(n,t){return n===t||n!==n&&t!==t}function hu(n){return null!=n&&du(n.length)&&!vu(n)}function pu(n){return bu(n)&&hu(n)}function _u(n){if(!bu(n))return false;var t=Wt(n);return"[object Error]"==t||"[object DOMException]"==t||typeof n.message=="string"&&typeof n.name=="string"&&!ju(n);
	}function vu(n){return!!yu(n)&&(n=Wt(n),"[object Function]"==n||"[object GeneratorFunction]"==n||"[object AsyncFunction]"==n||"[object Proxy]"==n)}function gu(n){return typeof n=="number"&&n==Eu(n)}function du(n){return typeof n=="number"&&-1<n&&0==n%1&&9007199254740991>=n}function yu(n){var t=typeof n;return null!=n&&("object"==t||"function"==t)}function bu(n){return null!=n&&typeof n=="object"}function xu(n){return typeof n=="number"||bu(n)&&"[object Number]"==Wt(n)}function ju(n){return!(!bu(n)||"[object Object]"!=Wt(n))&&(n=yi(n),
	null===n||(n=fi.call(n,"constructor")&&n.constructor,typeof n=="function"&&n instanceof n&&oi.call(n)==si))}function wu(n){return typeof n=="string"||!cf(n)&&bu(n)&&"[object String]"==Wt(n)}function mu(n){return typeof n=="symbol"||bu(n)&&"[object Symbol]"==Wt(n)}function Au(n){if(!n)return[];if(hu(n))return wu(n)?$(n):Tr(n);if(mi&&n[mi]){n=n[mi]();for(var t,r=[];!(t=n.next()).done;)r.push(t.value);return r}return t=go(n),("[object Map]"==t?L:"[object Set]"==t?D:Cu)(n)}function ku(n){return n?(n=Su(n),
	n===N||n===-N?1.7976931348623157e308*(0>n?-1:1):n===n?n:0):0===n?n:0}function Eu(n){n=ku(n);var t=n%1;return n===n?t?n-t:n:0}function Ou(n){return n?dt(Eu(n),0,4294967295):0}function Su(n){if(typeof n=="number")return n;if(mu(n))return P;if(yu(n)&&(n=typeof n.valueOf=="function"?n.valueOf():n,n=yu(n)?n+"":n),typeof n!="string")return 0===n?n:+n;n=n.replace(cn,"");var t=bn.test(n);return t||jn.test(n)?Fn(n.slice(2),t?2:8):yn.test(n)?P:+n}function Iu(n){return $r(n,Lu(n))}function Ru(n){return null==n?"":wr(n);
	}function zu(n,t,r){return n=null==n?F:Rt(n,t),n===F?r:n}function Wu(n,t){return null!=n&&me(n,t,Ut)}function Bu(n){return hu(n)?Gn(n):Jt(n)}function Lu(n){if(hu(n))n=Gn(n,true);else if(yu(n)){var t,r=We(n),e=[];for(t in n)("constructor"!=t||!r&&fi.call(n,t))&&e.push(t);n=e}else{if(t=[],null!=n)for(r in Xu(n))t.push(r);n=t}return n}function Uu(n,t){if(null==n)return{};var r=l(ge(n),function(n){return[n]});return t=be(t),ir(n,r,function(n,r){return t(n,r[0])})}function Cu(n){return null==n?[]:I(n,Bu(n));
	}function Du(n){return Ff(Ru(n).toLowerCase())}function Mu(n){return(n=Ru(n))&&n.replace(mn,rt).replace(Rn,"")}function Tu(n,t,r){return n=Ru(n),t=r?F:t,t===F?Ln.test(n)?n.match(Wn)||[]:n.match(_n)||[]:n.match(t)||[]}function $u(n){return function(){return n}}function Fu(n){return n}function Nu(n){return Ht(typeof n=="function"?n:yt(n,1))}function Pu(n,t,r){var e=Bu(t),i=It(t,e);null!=r||yu(t)&&(i.length||!e.length)||(r=t,t=n,n=this,i=It(t,Bu(t)));var o=!(yu(r)&&"chain"in r&&!r.chain),f=vu(n);return u(i,function(r){
	var e=t[r];n[r]=e,f&&(n.prototype[r]=function(){var t=this.__chain__;if(o||t){var r=n(this.__wrapped__);return(r.__actions__=Tr(this.__actions__)).push({func:e,args:arguments,thisArg:n}),r.__chain__=t,r}return e.apply(n,s([this.value()],arguments))})}),n}function Zu(){}function qu(n){return Re(n)?j(Te(n)):or(n)}function Vu(){return[]}function Ku(){return false}En=null==En?Zn:it.defaults(Zn.Object(),En,it.pick(Zn,Un));var Gu=En.Array,Hu=En.Date,Ju=En.Error,Yu=En.Function,Qu=En.Math,Xu=En.Object,ni=En.RegExp,ti=En.String,ri=En.TypeError,ei=Gu.prototype,ui=Xu.prototype,ii=En["__core-js_shared__"],oi=Yu.prototype.toString,fi=ui.hasOwnProperty,ci=0,ai=function(){
	var n=/[^.]+$/.exec(ii&&ii.keys&&ii.keys.IE_PROTO||"");return n?"Symbol(src)_1."+n:""}(),li=ui.toString,si=oi.call(Xu),hi=Zn._,pi=ni("^"+oi.call(fi).replace(on,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),_i=Kn?En.Buffer:F,vi=En.Symbol,gi=En.Uint8Array,di=_i?_i.f:F,yi=U(Xu.getPrototypeOf,Xu),bi=Xu.create,xi=ui.propertyIsEnumerable,ji=ei.splice,wi=vi?vi.isConcatSpreadable:F,mi=vi?vi.iterator:F,Ai=vi?vi.toStringTag:F,ki=function(){try{var n=we(Xu,"defineProperty");
	return n({},"",{}),n}catch(n){}}(),Ei=En.clearTimeout!==Zn.clearTimeout&&En.clearTimeout,Oi=Hu&&Hu.now!==Zn.Date.now&&Hu.now,Si=En.setTimeout!==Zn.setTimeout&&En.setTimeout,Ii=Qu.ceil,Ri=Qu.floor,zi=Xu.getOwnPropertySymbols,Wi=_i?_i.isBuffer:F,Bi=En.isFinite,Li=ei.join,Ui=U(Xu.keys,Xu),Ci=Qu.max,Di=Qu.min,Mi=Hu.now,Ti=En.parseInt,$i=Qu.random,Fi=ei.reverse,Ni=we(En,"DataView"),Pi=we(En,"Map"),Zi=we(En,"Promise"),qi=we(En,"Set"),Vi=we(En,"WeakMap"),Ki=we(Xu,"create"),Gi=Vi&&new Vi,Hi={},Ji=$e(Ni),Yi=$e(Pi),Qi=$e(Zi),Xi=$e(qi),no=$e(Vi),to=vi?vi.prototype:F,ro=to?to.valueOf:F,eo=to?to.toString:F,uo=function(){
	function n(){}return function(t){return yu(t)?bi?bi(t):(n.prototype=t,t=new n,n.prototype=F,t):{}}}();On.templateSettings={escape:Q,evaluate:X,interpolate:nn,variable:"",imports:{_:On}},On.prototype=Sn.prototype,On.prototype.constructor=On,zn.prototype=uo(Sn.prototype),zn.prototype.constructor=zn,Mn.prototype=uo(Sn.prototype),Mn.prototype.constructor=Mn,Tn.prototype.clear=function(){this.__data__=Ki?Ki(null):{},this.size=0},Tn.prototype.delete=function(n){return n=this.has(n)&&delete this.__data__[n],
	this.size-=n?1:0,n},Tn.prototype.get=function(n){var t=this.__data__;return Ki?(n=t[n],"__lodash_hash_undefined__"===n?F:n):fi.call(t,n)?t[n]:F},Tn.prototype.has=function(n){var t=this.__data__;return Ki?t[n]!==F:fi.call(t,n)},Tn.prototype.set=function(n,t){var r=this.__data__;return this.size+=this.has(n)?0:1,r[n]=Ki&&t===F?"__lodash_hash_undefined__":t,this},Nn.prototype.clear=function(){this.__data__=[],this.size=0},Nn.prototype.delete=function(n){var t=this.__data__;return n=st(t,n),!(0>n)&&(n==t.length-1?t.pop():ji.call(t,n,1),
	--this.size,true)},Nn.prototype.get=function(n){var t=this.__data__;return n=st(t,n),0>n?F:t[n][1]},Nn.prototype.has=function(n){return-1<st(this.__data__,n)},Nn.prototype.set=function(n,t){var r=this.__data__,e=st(r,n);return 0>e?(++this.size,r.push([n,t])):r[e][1]=t,this},Pn.prototype.clear=function(){this.size=0,this.__data__={hash:new Tn,map:new(Pi||Nn),string:new Tn}},Pn.prototype.delete=function(n){return n=xe(this,n).delete(n),this.size-=n?1:0,n},Pn.prototype.get=function(n){return xe(this,n).get(n);
	},Pn.prototype.has=function(n){return xe(this,n).has(n)},Pn.prototype.set=function(n,t){var r=xe(this,n),e=r.size;return r.set(n,t),this.size+=r.size==e?0:1,this},qn.prototype.add=qn.prototype.push=function(n){return this.__data__.set(n,"__lodash_hash_undefined__"),this},qn.prototype.has=function(n){return this.__data__.has(n)},Vn.prototype.clear=function(){this.__data__=new Nn,this.size=0},Vn.prototype.delete=function(n){var t=this.__data__;return n=t.delete(n),this.size=t.size,n},Vn.prototype.get=function(n){
	return this.__data__.get(n)},Vn.prototype.has=function(n){return this.__data__.has(n)},Vn.prototype.set=function(n,t){var r=this.__data__;if(r instanceof Nn){var e=r.__data__;if(!Pi||199>e.length)return e.push([n,t]),this.size=++r.size,this;r=this.__data__=new Pn(e)}return r.set(n,t),this.size=r.size,this};var io=qr(Ot),oo=qr(St,true),fo=Vr(),co=Vr(true),ao=Gi?function(n,t){return Gi.set(n,t),n}:Fu,lo=ki?function(n,t){return ki(n,"toString",{configurable:true,enumerable:false,value:$u(t),writable:true})}:Fu,so=Ei||function(n){
	return Zn.clearTimeout(n)},ho=qi&&1/D(new qi([,-0]))[1]==N?function(n){return new qi(n)}:Zu,po=Gi?function(n){return Gi.get(n)}:Zu,_o=zi?U(zi,Xu):Vu,vo=zi?function(n){for(var t=[];n;)s(t,_o(n)),n=yi(n);return t}:Vu,go=Wt;(Ni&&"[object DataView]"!=go(new Ni(new ArrayBuffer(1)))||Pi&&"[object Map]"!=go(new Pi)||Zi&&"[object Promise]"!=go(Zi.resolve())||qi&&"[object Set]"!=go(new qi)||Vi&&"[object WeakMap]"!=go(new Vi))&&(go=function(n){var t=Wt(n);if(n=(n="[object Object]"==t?n.constructor:F)?$e(n):"")switch(n){
	case Ji:return"[object DataView]";case Yi:return"[object Map]";case Qi:return"[object Promise]";case Xi:return"[object Set]";case no:return"[object WeakMap]"}return t});var yo=ii?vu:Ku,bo=De(ao),xo=Si||function(n,t){return Zn.setTimeout(n,t)},jo=De(lo),wo=function(n){n=au(n,function(n){return 500===t.size&&t.clear(),n});var t=n.cache;return n}(function(n){var t=[];return en.test(n)&&t.push(""),n.replace(un,function(n,r,e,u){t.push(e?u.replace(vn,"$1"):r||n)}),t}),mo=sr(function(n,t){return pu(n)?wt(n,Et(t,1,pu,true)):[];
	}),Ao=sr(function(n,t){var r=Ke(t);return pu(r)&&(r=F),pu(n)?wt(n,Et(t,1,pu,true),be(r,2)):[]}),ko=sr(function(n,t){var r=Ke(t);return pu(r)&&(r=F),pu(n)?wt(n,Et(t,1,pu,true),F,r):[]}),Eo=sr(function(n){var t=l(n,Ir);return t.length&&t[0]===n[0]?Ct(t):[]}),Oo=sr(function(n){var t=Ke(n),r=l(n,Ir);return t===Ke(r)?t=F:r.pop(),r.length&&r[0]===n[0]?Ct(r,be(t,2)):[]}),So=sr(function(n){var t=Ke(n),r=l(n,Ir);return(t=typeof t=="function"?t:F)&&r.pop(),r.length&&r[0]===n[0]?Ct(r,F,t):[]}),Io=sr(Ge),Ro=_e(function(n,t){
	var r=null==n?0:n.length,e=gt(n,t);return cr(n,l(t,function(n){return Se(n,r)?+n:n}).sort(Cr)),e}),zo=sr(function(n){return mr(Et(n,1,pu,true))}),Wo=sr(function(n){var t=Ke(n);return pu(t)&&(t=F),mr(Et(n,1,pu,true),be(t,2))}),Bo=sr(function(n){var t=Ke(n),t=typeof t=="function"?t:F;return mr(Et(n,1,pu,true),F,t)}),Lo=sr(function(n,t){return pu(n)?wt(n,t):[]}),Uo=sr(function(n){return Or(f(n,pu))}),Co=sr(function(n){var t=Ke(n);return pu(t)&&(t=F),Or(f(n,pu),be(t,2))}),Do=sr(function(n){var t=Ke(n),t=typeof t=="function"?t:F;
	return Or(f(n,pu),F,t)}),Mo=sr(Je),To=sr(function(n){var t=n.length,t=1<t?n[t-1]:F,t=typeof t=="function"?(n.pop(),t):F;return Ye(n,t)}),$o=_e(function(n){function t(t){return gt(t,n)}var r=n.length,e=r?n[0]:0,u=this.__wrapped__;return!(1<r||this.__actions__.length)&&u instanceof Mn&&Se(e)?(u=u.slice(e,+e+(r?1:0)),u.__actions__.push({func:Xe,args:[t],thisArg:F}),new zn(u,this.__chain__).thru(function(n){return r&&!n.length&&n.push(F),n})):this.thru(t)}),Fo=Pr(function(n,t,r){fi.call(n,r)?++n[r]:vt(n,r,1);
	}),No=Qr(Pe),Po=Qr(Ze),Zo=Pr(function(n,t,r){fi.call(n,r)?n[r].push(t):vt(n,r,[t])}),qo=sr(function(n,t,e){var u=-1,i=typeof t=="function",o=hu(n)?Gu(n.length):[];return io(n,function(n){o[++u]=i?r(t,n,e):Mt(n,t,e)}),o}),Vo=Pr(function(n,t,r){vt(n,r,t)}),Ko=Pr(function(n,t,r){n[r?0:1].push(t)},function(){return[[],[]]}),Go=sr(function(n,t){if(null==n)return[];var r=t.length;return 1<r&&Ie(n,t[0],t[1])?t=[]:2<r&&Ie(t[0],t[1],t[2])&&(t=[t[0]]),er(n,Et(t,1),[])}),Ho=Oi||function(){return Zn.Date.now();
	},Jo=sr(function(n,t,r){var e=1;if(r.length)var u=C(r,ye(Jo)),e=32|e;return se(n,e,t,r,u)}),Yo=sr(function(n,t,r){var e=3;if(r.length)var u=C(r,ye(Yo)),e=32|e;return se(t,e,n,r,u)}),Qo=sr(function(n,t){return jt(n,1,t)}),Xo=sr(function(n,t,r){return jt(n,Su(t)||0,r)});au.Cache=Pn;var nf=sr(function(n,t){t=1==t.length&&cf(t[0])?l(t[0],S(be())):l(Et(t,1),S(be()));var e=t.length;return sr(function(u){for(var i=-1,o=Di(u.length,e);++i<o;)u[i]=t[i].call(this,u[i]);return r(n,this,u)})}),tf=sr(function(n,t){
	return se(n,32,F,t,C(t,ye(tf)))}),rf=sr(function(n,t){return se(n,64,F,t,C(t,ye(rf)))}),ef=_e(function(n,t){return se(n,256,F,F,F,t)}),uf=fe(Bt),of=fe(function(n,t){return n>=t}),ff=Tt(function(){return arguments}())?Tt:function(n){return bu(n)&&fi.call(n,"callee")&&!xi.call(n,"callee")},cf=Gu.isArray,af=Hn?S(Hn):$t,lf=Wi||Ku,sf=Jn?S(Jn):Ft,hf=Yn?S(Yn):Pt,pf=Qn?S(Qn):Vt,_f=Xn?S(Xn):Kt,vf=nt?S(nt):Gt,gf=fe(Yt),df=fe(function(n,t){return n<=t}),yf=Zr(function(n,t){if(We(t)||hu(t))$r(t,Bu(t),n);else for(var r in t)fi.call(t,r)&&lt(n,r,t[r]);
	}),bf=Zr(function(n,t){$r(t,Lu(t),n)}),xf=Zr(function(n,t,r,e){$r(t,Lu(t),n,e)}),jf=Zr(function(n,t,r,e){$r(t,Bu(t),n,e)}),wf=_e(gt),mf=sr(function(n){return n.push(F,ct),r(xf,F,n)}),Af=sr(function(n){return n.push(F,Le),r(If,F,n)}),kf=te(function(n,t,r){n[t]=r},$u(Fu)),Ef=te(function(n,t,r){fi.call(n,t)?n[t].push(r):n[t]=[r]},be),Of=sr(Mt),Sf=Zr(function(n,t,r){tr(n,t,r)}),If=Zr(function(n,t,r,e){tr(n,t,r,e)}),Rf=_e(function(n,t){var r={};if(null==n)return r;var e=false;t=l(t,function(t){return t=zr(t,n),
	e||(e=1<t.length),t}),$r(n,ge(n),r),e&&(r=yt(r,7));for(var u=t.length;u--;)Ar(r,t[u]);return r}),zf=_e(function(n,t){return null==n?{}:ur(n,t)}),Wf=le(Bu),Bf=le(Lu),Lf=Hr(function(n,t,r){return t=t.toLowerCase(),n+(r?Du(t):t)}),Uf=Hr(function(n,t,r){return n+(r?"-":"")+t.toLowerCase()}),Cf=Hr(function(n,t,r){return n+(r?" ":"")+t.toLowerCase()}),Df=Gr("toLowerCase"),Mf=Hr(function(n,t,r){return n+(r?"_":"")+t.toLowerCase()}),Tf=Hr(function(n,t,r){return n+(r?" ":"")+Ff(t)}),$f=Hr(function(n,t,r){
	return n+(r?" ":"")+t.toUpperCase()}),Ff=Gr("toUpperCase"),Nf=sr(function(n,t){try{return r(n,F,t)}catch(n){return _u(n)?n:new Ju(n)}}),Pf=_e(function(n,t){return u(t,function(t){t=Te(t),vt(n,t,Jo(n[t],n))}),n}),Zf=Xr(),qf=Xr(true),Vf=sr(function(n,t){return function(r){return Mt(r,n,t)}}),Kf=sr(function(n,t){return function(r){return Mt(n,r,t)}}),Gf=ee(l),Hf=ee(o),Jf=ee(_),Yf=oe(),Qf=oe(true),Xf=re(function(n,t){return n+t},0),nc=ae("ceil"),tc=re(function(n,t){return n/t},1),rc=ae("floor"),ec=re(function(n,t){
	return n*t},1),uc=ae("round"),ic=re(function(n,t){return n-t},0);return On.after=function(n,t){if(typeof t!="function")throw new ri("Expected a function");return n=Eu(n),function(){if(1>--n)return t.apply(this,arguments)}},On.ary=uu,On.assign=yf,On.assignIn=bf,On.assignInWith=xf,On.assignWith=jf,On.at=wf,On.before=iu,On.bind=Jo,On.bindAll=Pf,On.bindKey=Yo,On.castArray=function(){if(!arguments.length)return[];var n=arguments[0];return cf(n)?n:[n]},On.chain=Qe,On.chunk=function(n,t,r){if(t=(r?Ie(n,t,r):t===F)?1:Ci(Eu(t),0),
	r=null==n?0:n.length,!r||1>t)return[];for(var e=0,u=0,i=Gu(Ii(r/t));e<r;)i[u++]=gr(n,e,e+=t);return i},On.compact=function(n){for(var t=-1,r=null==n?0:n.length,e=0,u=[];++t<r;){var i=n[t];i&&(u[e++]=i)}return u},On.concat=function(){var n=arguments.length;if(!n)return[];for(var t=Gu(n-1),r=arguments[0];n--;)t[n-1]=arguments[n];return s(cf(r)?Tr(r):[r],Et(t,1))},On.cond=function(n){var t=null==n?0:n.length,e=be();return n=t?l(n,function(n){if("function"!=typeof n[1])throw new ri("Expected a function");
	return[e(n[0]),n[1]]}):[],sr(function(e){for(var u=-1;++u<t;){var i=n[u];if(r(i[0],this,e))return r(i[1],this,e)}})},On.conforms=function(n){return bt(yt(n,1))},On.constant=$u,On.countBy=Fo,On.create=function(n,t){var r=uo(n);return null==t?r:pt(r,t)},On.curry=ou,On.curryRight=fu,On.debounce=cu,On.defaults=mf,On.defaultsDeep=Af,On.defer=Qo,On.delay=Xo,On.difference=mo,On.differenceBy=Ao,On.differenceWith=ko,On.drop=function(n,t,r){var e=null==n?0:n.length;return e?(t=r||t===F?1:Eu(t),gr(n,0>t?0:t,e)):[];
	},On.dropRight=function(n,t,r){var e=null==n?0:n.length;return e?(t=r||t===F?1:Eu(t),t=e-t,gr(n,0,0>t?0:t)):[]},On.dropRightWhile=function(n,t){return n&&n.length?kr(n,be(t,3),true,true):[]},On.dropWhile=function(n,t){return n&&n.length?kr(n,be(t,3),true):[]},On.fill=function(n,t,r,e){var u=null==n?0:n.length;if(!u)return[];for(r&&typeof r!="number"&&Ie(n,t,r)&&(r=0,e=u),u=n.length,r=Eu(r),0>r&&(r=-r>u?0:u+r),e=e===F||e>u?u:Eu(e),0>e&&(e+=u),e=r>e?0:Ou(e);r<e;)n[r++]=t;return n},On.filter=function(n,t){
	return(cf(n)?f:kt)(n,be(t,3))},On.flatMap=function(n,t){return Et(eu(n,t),1)},On.flatMapDeep=function(n,t){return Et(eu(n,t),N)},On.flatMapDepth=function(n,t,r){return r=r===F?1:Eu(r),Et(eu(n,t),r)},On.flatten=qe,On.flattenDeep=function(n){return(null==n?0:n.length)?Et(n,N):[]},On.flattenDepth=function(n,t){return null!=n&&n.length?(t=t===F?1:Eu(t),Et(n,t)):[]},On.flip=function(n){return se(n,512)},On.flow=Zf,On.flowRight=qf,On.fromPairs=function(n){for(var t=-1,r=null==n?0:n.length,e={};++t<r;){
	var u=n[t];e[u[0]]=u[1]}return e},On.functions=function(n){return null==n?[]:It(n,Bu(n))},On.functionsIn=function(n){return null==n?[]:It(n,Lu(n))},On.groupBy=Zo,On.initial=function(n){return(null==n?0:n.length)?gr(n,0,-1):[]},On.intersection=Eo,On.intersectionBy=Oo,On.intersectionWith=So,On.invert=kf,On.invertBy=Ef,On.invokeMap=qo,On.iteratee=Nu,On.keyBy=Vo,On.keys=Bu,On.keysIn=Lu,On.map=eu,On.mapKeys=function(n,t){var r={};return t=be(t,3),Ot(n,function(n,e,u){vt(r,t(n,e,u),n)}),r},On.mapValues=function(n,t){
	var r={};return t=be(t,3),Ot(n,function(n,e,u){vt(r,e,t(n,e,u))}),r},On.matches=function(n){return Xt(yt(n,1))},On.matchesProperty=function(n,t){return nr(n,yt(t,1))},On.memoize=au,On.merge=Sf,On.mergeWith=If,On.method=Vf,On.methodOf=Kf,On.mixin=Pu,On.negate=lu,On.nthArg=function(n){return n=Eu(n),sr(function(t){return rr(t,n)})},On.omit=Rf,On.omitBy=function(n,t){return Uu(n,lu(be(t)))},On.once=function(n){return iu(2,n)},On.orderBy=function(n,t,r,e){return null==n?[]:(cf(t)||(t=null==t?[]:[t]),
	r=e?F:r,cf(r)||(r=null==r?[]:[r]),er(n,t,r))},On.over=Gf,On.overArgs=nf,On.overEvery=Hf,On.overSome=Jf,On.partial=tf,On.partialRight=rf,On.partition=Ko,On.pick=zf,On.pickBy=Uu,On.property=qu,On.propertyOf=function(n){return function(t){return null==n?F:Rt(n,t)}},On.pull=Io,On.pullAll=Ge,On.pullAllBy=function(n,t,r){return n&&n.length&&t&&t.length?fr(n,t,be(r,2)):n},On.pullAllWith=function(n,t,r){return n&&n.length&&t&&t.length?fr(n,t,F,r):n},On.pullAt=Ro,On.range=Yf,On.rangeRight=Qf,On.rearg=ef,On.reject=function(n,t){
	return(cf(n)?f:kt)(n,lu(be(t,3)))},On.remove=function(n,t){var r=[];if(!n||!n.length)return r;var e=-1,u=[],i=n.length;for(t=be(t,3);++e<i;){var o=n[e];t(o,e,n)&&(r.push(o),u.push(e))}return cr(n,u),r},On.rest=function(n,t){if(typeof n!="function")throw new ri("Expected a function");return t=t===F?t:Eu(t),sr(n,t)},On.reverse=He,On.sampleSize=function(n,t,r){return t=(r?Ie(n,t,r):t===F)?1:Eu(t),(cf(n)?ot:pr)(n,t)},On.set=function(n,t,r){return null==n?n:_r(n,t,r)},On.setWith=function(n,t,r,e){return e=typeof e=="function"?e:F,
	null==n?n:_r(n,t,r,e)},On.shuffle=function(n){return(cf(n)?ft:vr)(n)},On.slice=function(n,t,r){var e=null==n?0:n.length;return e?(r&&typeof r!="number"&&Ie(n,t,r)?(t=0,r=e):(t=null==t?0:Eu(t),r=r===F?e:Eu(r)),gr(n,t,r)):[]},On.sortBy=Go,On.sortedUniq=function(n){return n&&n.length?xr(n):[]},On.sortedUniqBy=function(n,t){return n&&n.length?xr(n,be(t,2)):[]},On.split=function(n,t,r){return r&&typeof r!="number"&&Ie(n,t,r)&&(t=r=F),r=r===F?4294967295:r>>>0,r?(n=Ru(n))&&(typeof t=="string"||null!=t&&!pf(t))&&(t=wr(t),
	!t&&Bn.test(n))?Wr($(n),0,r):n.split(t,r):[]},On.spread=function(n,t){if(typeof n!="function")throw new ri("Expected a function");return t=t===F?0:Ci(Eu(t),0),sr(function(e){var u=e[t];return e=Wr(e,0,t),u&&s(e,u),r(n,this,e)})},On.tail=function(n){var t=null==n?0:n.length;return t?gr(n,1,t):[]},On.take=function(n,t,r){return n&&n.length?(t=r||t===F?1:Eu(t),gr(n,0,0>t?0:t)):[]},On.takeRight=function(n,t,r){var e=null==n?0:n.length;return e?(t=r||t===F?1:Eu(t),t=e-t,gr(n,0>t?0:t,e)):[]},On.takeRightWhile=function(n,t){
	return n&&n.length?kr(n,be(t,3),false,true):[]},On.takeWhile=function(n,t){return n&&n.length?kr(n,be(t,3)):[]},On.tap=function(n,t){return t(n),n},On.throttle=function(n,t,r){var e=true,u=true;if(typeof n!="function")throw new ri("Expected a function");return yu(r)&&(e="leading"in r?!!r.leading:e,u="trailing"in r?!!r.trailing:u),cu(n,t,{leading:e,maxWait:t,trailing:u})},On.thru=Xe,On.toArray=Au,On.toPairs=Wf,On.toPairsIn=Bf,On.toPath=function(n){return cf(n)?l(n,Te):mu(n)?[n]:Tr(wo(Ru(n)))},On.toPlainObject=Iu,
	On.transform=function(n,t,r){var e=cf(n),i=e||lf(n)||vf(n);if(t=be(t,4),null==r){var o=n&&n.constructor;r=i?e?new o:[]:yu(n)&&vu(o)?uo(yi(n)):{}}return(i?u:Ot)(n,function(n,e,u){return t(r,n,e,u)}),r},On.unary=function(n){return uu(n,1)},On.union=zo,On.unionBy=Wo,On.unionWith=Bo,On.uniq=function(n){return n&&n.length?mr(n):[]},On.uniqBy=function(n,t){return n&&n.length?mr(n,be(t,2)):[]},On.uniqWith=function(n,t){return t=typeof t=="function"?t:F,n&&n.length?mr(n,F,t):[]},On.unset=function(n,t){return null==n||Ar(n,t);
	},On.unzip=Je,On.unzipWith=Ye,On.update=function(n,t,r){return null==n?n:_r(n,t,Rr(r)(Rt(n,t)),void 0)},On.updateWith=function(n,t,r,e){return e=typeof e=="function"?e:F,null!=n&&(n=_r(n,t,Rr(r)(Rt(n,t)),e)),n},On.values=Cu,On.valuesIn=function(n){return null==n?[]:I(n,Lu(n))},On.without=Lo,On.words=Tu,On.wrap=function(n,t){return tf(Rr(t),n)},On.xor=Uo,On.xorBy=Co,On.xorWith=Do,On.zip=Mo,On.zipObject=function(n,t){return Sr(n||[],t||[],lt)},On.zipObjectDeep=function(n,t){return Sr(n||[],t||[],_r);
	},On.zipWith=To,On.entries=Wf,On.entriesIn=Bf,On.extend=bf,On.extendWith=xf,Pu(On,On),On.add=Xf,On.attempt=Nf,On.camelCase=Lf,On.capitalize=Du,On.ceil=nc,On.clamp=function(n,t,r){return r===F&&(r=t,t=F),r!==F&&(r=Su(r),r=r===r?r:0),t!==F&&(t=Su(t),t=t===t?t:0),dt(Su(n),t,r)},On.clone=function(n){return yt(n,4)},On.cloneDeep=function(n){return yt(n,5)},On.cloneDeepWith=function(n,t){return t=typeof t=="function"?t:F,yt(n,5,t)},On.cloneWith=function(n,t){return t=typeof t=="function"?t:F,yt(n,4,t)},
	On.conformsTo=function(n,t){return null==t||xt(n,t,Bu(t))},On.deburr=Mu,On.defaultTo=function(n,t){return null==n||n!==n?t:n},On.divide=tc,On.endsWith=function(n,t,r){n=Ru(n),t=wr(t);var e=n.length,e=r=r===F?e:dt(Eu(r),0,e);return r-=t.length,0<=r&&n.slice(r,e)==t},On.eq=su,On.escape=function(n){return(n=Ru(n))&&Y.test(n)?n.replace(H,et):n},On.escapeRegExp=function(n){return(n=Ru(n))&&fn.test(n)?n.replace(on,"\\$&"):n},On.every=function(n,t,r){var e=cf(n)?o:mt;return r&&Ie(n,t,r)&&(t=F),e(n,be(t,3));
	},On.find=No,On.findIndex=Pe,On.findKey=function(n,t){return v(n,be(t,3),Ot)},On.findLast=Po,On.findLastIndex=Ze,On.findLastKey=function(n,t){return v(n,be(t,3),St)},On.floor=rc,On.forEach=tu,On.forEachRight=ru,On.forIn=function(n,t){return null==n?n:fo(n,be(t,3),Lu)},On.forInRight=function(n,t){return null==n?n:co(n,be(t,3),Lu)},On.forOwn=function(n,t){return n&&Ot(n,be(t,3))},On.forOwnRight=function(n,t){return n&&St(n,be(t,3))},On.get=zu,On.gt=uf,On.gte=of,On.has=function(n,t){return null!=n&&me(n,t,Lt);
	},On.hasIn=Wu,On.head=Ve,On.identity=Fu,On.includes=function(n,t,r,e){return n=hu(n)?n:Cu(n),r=r&&!e?Eu(r):0,e=n.length,0>r&&(r=Ci(e+r,0)),wu(n)?r<=e&&-1<n.indexOf(t,r):!!e&&-1<d(n,t,r)},On.indexOf=function(n,t,r){var e=null==n?0:n.length;return e?(r=null==r?0:Eu(r),0>r&&(r=Ci(e+r,0)),d(n,t,r)):-1},On.inRange=function(n,t,r){return t=ku(t),r===F?(r=t,t=0):r=ku(r),n=Su(n),n>=Di(t,r)&&n<Ci(t,r)},On.invoke=Of,On.isArguments=ff,On.isArray=cf,On.isArrayBuffer=af,On.isArrayLike=hu,On.isArrayLikeObject=pu,
	On.isBoolean=function(n){return true===n||false===n||bu(n)&&"[object Boolean]"==Wt(n)},On.isBuffer=lf,On.isDate=sf,On.isElement=function(n){return bu(n)&&1===n.nodeType&&!ju(n)},On.isEmpty=function(n){if(null==n)return true;if(hu(n)&&(cf(n)||typeof n=="string"||typeof n.splice=="function"||lf(n)||vf(n)||ff(n)))return!n.length;var t=go(n);if("[object Map]"==t||"[object Set]"==t)return!n.size;if(We(n))return!Jt(n).length;for(var r in n)if(fi.call(n,r))return false;return true},On.isEqual=function(n,t){return Nt(n,t);
	},On.isEqualWith=function(n,t,r){var e=(r=typeof r=="function"?r:F)?r(n,t):F;return e===F?Nt(n,t,F,r):!!e},On.isError=_u,On.isFinite=function(n){return typeof n=="number"&&Bi(n)},On.isFunction=vu,On.isInteger=gu,On.isLength=du,On.isMap=hf,On.isMatch=function(n,t){return n===t||Zt(n,t,je(t))},On.isMatchWith=function(n,t,r){return r=typeof r=="function"?r:F,Zt(n,t,je(t),r)},On.isNaN=function(n){return xu(n)&&n!=+n},On.isNative=function(n){if(yo(n))throw new Ju("Unsupported core-js use. Try https://npms.io/search?q=ponyfill.");
	return qt(n)},On.isNil=function(n){return null==n},On.isNull=function(n){return null===n},On.isNumber=xu,On.isObject=yu,On.isObjectLike=bu,On.isPlainObject=ju,On.isRegExp=pf,On.isSafeInteger=function(n){return gu(n)&&-9007199254740991<=n&&9007199254740991>=n},On.isSet=_f,On.isString=wu,On.isSymbol=mu,On.isTypedArray=vf,On.isUndefined=function(n){return n===F},On.isWeakMap=function(n){return bu(n)&&"[object WeakMap]"==go(n)},On.isWeakSet=function(n){return bu(n)&&"[object WeakSet]"==Wt(n)},On.join=function(n,t){
	return null==n?"":Li.call(n,t)},On.kebabCase=Uf,On.last=Ke,On.lastIndexOf=function(n,t,r){var e=null==n?0:n.length;if(!e)return-1;var u=e;if(r!==F&&(u=Eu(r),u=0>u?Ci(e+u,0):Di(u,e-1)),t===t){for(r=u+1;r--&&n[r]!==t;);n=r}else n=g(n,b,u,true);return n},On.lowerCase=Cf,On.lowerFirst=Df,On.lt=gf,On.lte=df,On.max=function(n){return n&&n.length?At(n,Fu,Bt):F},On.maxBy=function(n,t){return n&&n.length?At(n,be(t,2),Bt):F},On.mean=function(n){return x(n,Fu)},On.meanBy=function(n,t){return x(n,be(t,2))},On.min=function(n){
	return n&&n.length?At(n,Fu,Yt):F},On.minBy=function(n,t){return n&&n.length?At(n,be(t,2),Yt):F},On.stubArray=Vu,On.stubFalse=Ku,On.stubObject=function(){return{}},On.stubString=function(){return""},On.stubTrue=function(){return true},On.multiply=ec,On.nth=function(n,t){return n&&n.length?rr(n,Eu(t)):F},On.noConflict=function(){return Zn._===this&&(Zn._=hi),this},On.noop=Zu,On.now=Ho,On.pad=function(n,t,r){n=Ru(n);var e=(t=Eu(t))?T(n):0;return!t||e>=t?n:(t=(t-e)/2,ue(Ri(t),r)+n+ue(Ii(t),r))},On.padEnd=function(n,t,r){
	n=Ru(n);var e=(t=Eu(t))?T(n):0;return t&&e<t?n+ue(t-e,r):n},On.padStart=function(n,t,r){n=Ru(n);var e=(t=Eu(t))?T(n):0;return t&&e<t?ue(t-e,r)+n:n},On.parseInt=function(n,t,r){return r||null==t?t=0:t&&(t=+t),Ti(Ru(n).replace(an,""),t||0)},On.random=function(n,t,r){if(r&&typeof r!="boolean"&&Ie(n,t,r)&&(t=r=F),r===F&&(typeof t=="boolean"?(r=t,t=F):typeof n=="boolean"&&(r=n,n=F)),n===F&&t===F?(n=0,t=1):(n=ku(n),t===F?(t=n,n=0):t=ku(t)),n>t){var e=n;n=t,t=e}return r||n%1||t%1?(r=$i(),Di(n+r*(t-n+$n("1e-"+((r+"").length-1))),t)):ar(n,t);
	},On.reduce=function(n,t,r){var e=cf(n)?h:m,u=3>arguments.length;return e(n,be(t,4),r,u,io)},On.reduceRight=function(n,t,r){var e=cf(n)?p:m,u=3>arguments.length;return e(n,be(t,4),r,u,oo)},On.repeat=function(n,t,r){return t=(r?Ie(n,t,r):t===F)?1:Eu(t),lr(Ru(n),t)},On.replace=function(){var n=arguments,t=Ru(n[0]);return 3>n.length?t:t.replace(n[1],n[2])},On.result=function(n,t,r){t=zr(t,n);var e=-1,u=t.length;for(u||(u=1,n=F);++e<u;){var i=null==n?F:n[Te(t[e])];i===F&&(e=u,i=r),n=vu(i)?i.call(n):i;
	}return n},On.round=uc,On.runInContext=w,On.sample=function(n){return(cf(n)?tt:hr)(n)},On.size=function(n){if(null==n)return 0;if(hu(n))return wu(n)?T(n):n.length;var t=go(n);return"[object Map]"==t||"[object Set]"==t?n.size:Jt(n).length},On.snakeCase=Mf,On.some=function(n,t,r){var e=cf(n)?_:dr;return r&&Ie(n,t,r)&&(t=F),e(n,be(t,3))},On.sortedIndex=function(n,t){return yr(n,t)},On.sortedIndexBy=function(n,t,r){return br(n,t,be(r,2))},On.sortedIndexOf=function(n,t){var r=null==n?0:n.length;if(r){
	var e=yr(n,t);if(e<r&&su(n[e],t))return e}return-1},On.sortedLastIndex=function(n,t){return yr(n,t,true)},On.sortedLastIndexBy=function(n,t,r){return br(n,t,be(r,2),true)},On.sortedLastIndexOf=function(n,t){if(null==n?0:n.length){var r=yr(n,t,true)-1;if(su(n[r],t))return r}return-1},On.startCase=Tf,On.startsWith=function(n,t,r){return n=Ru(n),r=dt(Eu(r),0,n.length),t=wr(t),n.slice(r,r+t.length)==t},On.subtract=ic,On.sum=function(n){return n&&n.length?k(n,Fu):0},On.sumBy=function(n,t){return n&&n.length?k(n,be(t,2)):0;
	},On.template=function(n,t,r){var e=On.templateSettings;r&&Ie(n,t,r)&&(t=F),n=Ru(n),t=xf({},t,e,ct),r=xf({},t.imports,e.imports,ct);var u,i,o=Bu(r),f=I(r,o),c=0;r=t.interpolate||An;var a="__p+='";r=ni((t.escape||An).source+"|"+r.source+"|"+(r===nn?gn:An).source+"|"+(t.evaluate||An).source+"|$","g");var l="sourceURL"in t?"//# sourceURL="+t.sourceURL+"\n":"";if(n.replace(r,function(t,r,e,o,f,l){return e||(e=o),a+=n.slice(c,l).replace(kn,B),r&&(u=true,a+="'+__e("+r+")+'"),f&&(i=true,a+="';"+f+";\n__p+='"),
	e&&(a+="'+((__t=("+e+"))==null?'':__t)+'"),c=l+t.length,t}),a+="';",(t=t.variable)||(a="with(obj){"+a+"}"),a=(i?a.replace(q,""):a).replace(V,"$1").replace(K,"$1;"),a="function("+(t||"obj")+"){"+(t?"":"obj||(obj={});")+"var __t,__p=''"+(u?",__e=_.escape":"")+(i?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+a+"return __p}",t=Nf(function(){return Yu(o,l+"return "+a).apply(F,f)}),t.source=a,_u(t))throw t;return t},On.times=function(n,t){if(n=Eu(n),1>n||9007199254740991<n)return[];
	var r=4294967295,e=Di(n,4294967295);for(t=be(t),n-=4294967295,e=E(e,t);++r<n;)t(r);return e},On.toFinite=ku,On.toInteger=Eu,On.toLength=Ou,On.toLower=function(n){return Ru(n).toLowerCase()},On.toNumber=Su,On.toSafeInteger=function(n){return dt(Eu(n),-9007199254740991,9007199254740991)},On.toString=Ru,On.toUpper=function(n){return Ru(n).toUpperCase()},On.trim=function(n,t,r){return(n=Ru(n))&&(r||t===F)?n.replace(cn,""):n&&(t=wr(t))?(n=$(n),r=$(t),t=z(n,r),r=W(n,r)+1,Wr(n,t,r).join("")):n},On.trimEnd=function(n,t,r){
	return(n=Ru(n))&&(r||t===F)?n.replace(ln,""):n&&(t=wr(t))?(n=$(n),t=W(n,$(t))+1,Wr(n,0,t).join("")):n},On.trimStart=function(n,t,r){return(n=Ru(n))&&(r||t===F)?n.replace(an,""):n&&(t=wr(t))?(n=$(n),t=z(n,$(t)),Wr(n,t).join("")):n},On.truncate=function(n,t){var r=30,e="...";if(yu(t))var u="separator"in t?t.separator:u,r="length"in t?Eu(t.length):r,e="omission"in t?wr(t.omission):e;n=Ru(n);var i=n.length;if(Bn.test(n))var o=$(n),i=o.length;if(r>=i)return n;if(i=r-T(e),1>i)return e;if(r=o?Wr(o,0,i).join(""):n.slice(0,i),
	u===F)return r+e;if(o&&(i+=r.length-i),pf(u)){if(n.slice(i).search(u)){var f=r;for(u.global||(u=ni(u.source,Ru(dn.exec(u))+"g")),u.lastIndex=0;o=u.exec(f);)var c=o.index;r=r.slice(0,c===F?i:c)}}else n.indexOf(wr(u),i)!=i&&(u=r.lastIndexOf(u),-1<u&&(r=r.slice(0,u)));return r+e},On.unescape=function(n){return(n=Ru(n))&&J.test(n)?n.replace(G,ut):n},On.uniqueId=function(n){var t=++ci;return Ru(n)+t},On.upperCase=$f,On.upperFirst=Ff,On.each=tu,On.eachRight=ru,On.first=Ve,Pu(On,function(){var n={};return Ot(On,function(t,r){
	fi.call(On.prototype,r)||(n[r]=t)}),n}(),{chain:false}),On.VERSION="4.17.2",u("bind bindKey curry curryRight partial partialRight".split(" "),function(n){On[n].placeholder=On}),u(["drop","take"],function(n,t){Mn.prototype[n]=function(r){var e=this.__filtered__;if(e&&!t)return new Mn(this);r=r===F?1:Ci(Eu(r),0);var u=this.clone();return e?u.__takeCount__=Di(r,u.__takeCount__):u.__views__.push({size:Di(r,4294967295),type:n+(0>u.__dir__?"Right":"")}),u},Mn.prototype[n+"Right"]=function(t){return this.reverse()[n](t).reverse();
	}}),u(["filter","map","takeWhile"],function(n,t){var r=t+1,e=1==r||3==r;Mn.prototype[n]=function(n){var t=this.clone();return t.__iteratees__.push({iteratee:be(n,3),type:r}),t.__filtered__=t.__filtered__||e,t}}),u(["head","last"],function(n,t){var r="take"+(t?"Right":"");Mn.prototype[n]=function(){return this[r](1).value()[0]}}),u(["initial","tail"],function(n,t){var r="drop"+(t?"":"Right");Mn.prototype[n]=function(){return this.__filtered__?new Mn(this):this[r](1)}}),Mn.prototype.compact=function(){
	return this.filter(Fu)},Mn.prototype.find=function(n){return this.filter(n).head()},Mn.prototype.findLast=function(n){return this.reverse().find(n)},Mn.prototype.invokeMap=sr(function(n,t){return typeof n=="function"?new Mn(this):this.map(function(r){return Mt(r,n,t)})}),Mn.prototype.reject=function(n){return this.filter(lu(be(n)))},Mn.prototype.slice=function(n,t){n=Eu(n);var r=this;return r.__filtered__&&(0<n||0>t)?new Mn(r):(0>n?r=r.takeRight(-n):n&&(r=r.drop(n)),t!==F&&(t=Eu(t),r=0>t?r.dropRight(-t):r.take(t-n)),
	r)},Mn.prototype.takeRightWhile=function(n){return this.reverse().takeWhile(n).reverse()},Mn.prototype.toArray=function(){return this.take(4294967295)},Ot(Mn.prototype,function(n,t){var r=/^(?:filter|find|map|reject)|While$/.test(t),e=/^(?:head|last)$/.test(t),u=On[e?"take"+("last"==t?"Right":""):t],i=e||/^find/.test(t);u&&(On.prototype[t]=function(){function t(n){return n=u.apply(On,s([n],f)),e&&h?n[0]:n}var o=this.__wrapped__,f=e?[1]:arguments,c=o instanceof Mn,a=f[0],l=c||cf(o);l&&r&&typeof a=="function"&&1!=a.length&&(c=l=false);
	var h=this.__chain__,p=!!this.__actions__.length,a=i&&!h,c=c&&!p;return!i&&l?(o=c?o:new Mn(this),o=n.apply(o,f),o.__actions__.push({func:Xe,args:[t],thisArg:F}),new zn(o,h)):a&&c?n.apply(this,f):(o=this.thru(t),a?e?o.value()[0]:o.value():o)})}),u("pop push shift sort splice unshift".split(" "),function(n){var t=ei[n],r=/^(?:push|sort|unshift)$/.test(n)?"tap":"thru",e=/^(?:pop|shift)$/.test(n);On.prototype[n]=function(){var n=arguments;if(e&&!this.__chain__){var u=this.value();return t.apply(cf(u)?u:[],n);
	}return this[r](function(r){return t.apply(cf(r)?r:[],n)})}}),Ot(Mn.prototype,function(n,t){var r=On[t];if(r){var e=r.name+"";(Hi[e]||(Hi[e]=[])).push({name:t,func:r})}}),Hi[ne(F,2).name]=[{name:"wrapper",func:F}],Mn.prototype.clone=function(){var n=new Mn(this.__wrapped__);return n.__actions__=Tr(this.__actions__),n.__dir__=this.__dir__,n.__filtered__=this.__filtered__,n.__iteratees__=Tr(this.__iteratees__),n.__takeCount__=this.__takeCount__,n.__views__=Tr(this.__views__),n},Mn.prototype.reverse=function(){
	if(this.__filtered__){var n=new Mn(this);n.__dir__=-1,n.__filtered__=true}else n=this.clone(),n.__dir__*=-1;return n},Mn.prototype.value=function(){var n,t=this.__wrapped__.value(),r=this.__dir__,e=cf(t),u=0>r,i=e?t.length:0;n=i;for(var o=this.__views__,f=0,c=-1,a=o.length;++c<a;){var l=o[c],s=l.size;switch(l.type){case"drop":f+=s;break;case"dropRight":n-=s;break;case"take":n=Di(n,f+s);break;case"takeRight":f=Ci(f,n-s)}}if(n={start:f,end:n},o=n.start,f=n.end,n=f-o,u=u?f:o-1,o=this.__iteratees__,f=o.length,
	c=0,a=Di(n,this.__takeCount__),!e||200>i||i==n&&a==n)return Er(t,this.__actions__);e=[];n:for(;n--&&c<a;){for(u+=r,i=-1,l=t[u];++i<f;){var h=o[i],s=h.type,h=(0,h.iteratee)(l);if(2==s)l=h;else if(!h){if(1==s)continue n;break n}}e[c++]=l}return e},On.prototype.at=$o,On.prototype.chain=function(){return Qe(this)},On.prototype.commit=function(){return new zn(this.value(),this.__chain__)},On.prototype.next=function(){this.__values__===F&&(this.__values__=Au(this.value()));var n=this.__index__>=this.__values__.length;
	return{done:n,value:n?F:this.__values__[this.__index__++]}},On.prototype.plant=function(n){for(var t,r=this;r instanceof Sn;){var e=Ne(r);e.__index__=0,e.__values__=F,t?u.__wrapped__=e:t=e;var u=e,r=r.__wrapped__}return u.__wrapped__=n,t},On.prototype.reverse=function(){var n=this.__wrapped__;return n instanceof Mn?(this.__actions__.length&&(n=new Mn(this)),n=n.reverse(),n.__actions__.push({func:Xe,args:[He],thisArg:F}),new zn(n,this.__chain__)):this.thru(He)},On.prototype.toJSON=On.prototype.valueOf=On.prototype.value=function(){
	return Er(this.__wrapped__,this.__actions__)},On.prototype.first=On.prototype.head,mi&&(On.prototype[mi]=nu),On}();typeof define=="function"&&typeof define.amd=="object"&&define.amd?(Zn._=it, define(function(){return it})):Vn?((Vn.exports=it)._=it,qn._=it):Zn._=it}).call(this);

/***/ },

/***/ "RkCM":
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*!
	 * translation.js v0.4.0
	 * https://github.com/Selection-Translator/translation.js#readme
	 * Copyright 2015 Milk Lee <milk.lee@qq.com>
	 * Licensed under MIT
	 */
	(function webpackUniversalModuleDefinition(root, factory) {
		if (true) module.exports = factory();else if (typeof define === 'function' && define.amd) define([], factory);else if (typeof exports === 'object') exports["tjs"] = factory();else root["tjs"] = factory();
	})(undefined, function () {
		return (/******/function (modules) {
				// webpackBootstrap
				/******/ // The module cache
				/******/var installedModules = {};

				/******/ // The require function
				/******/function __webpack_require__(moduleId) {

					/******/ // Check if module is in cache
					/******/if (installedModules[moduleId])
						/******/return installedModules[moduleId].exports;

					/******/ // Create a new module (and put it into the cache)
					/******/var module = installedModules[moduleId] = {
						/******/exports: {},
						/******/id: moduleId,
						/******/loaded: false
						/******/ };

					/******/ // Execute the module function
					/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

					/******/ // Flag the module as loaded
					/******/module.loaded = true;

					/******/ // Return the exports of the module
					/******/return module.exports;
					/******/
				}

				/******/ // expose the modules object (__webpack_modules__)
				/******/__webpack_require__.m = modules;

				/******/ // expose the module cache
				/******/__webpack_require__.c = installedModules;

				/******/ // __webpack_public_path__
				/******/__webpack_require__.p = "";

				/******/ // Load entry module and return exports
				/******/return __webpack_require__(0);
				/******/
			}(
			/************************************************************************/
			/******/[
			/* 0 */
			/***/function (module, exports, __webpack_require__) {

				// 请求 API 接口时发生了网络错误
				var NETWORK_ERROR = 0;

				// 请求 HTTP 接口时产生了服务器错误，例如 4xx 或 5xx 的响应，
				// 详情见 http://visionmedia.github.io/superagent/#error-handling
				var SERVER_ERROR = 1;

				function Translation() {
					this.APIs = {};
				}

				/**
	    * 判断 superAgent 的错误对象的类型
	    * @param {{timeout?:Number,status?:Number}} superAgentErr
	    * @returns {Number}
	    */
				function analyzeErrorType(superAgentErr) {
					if (!superAgentErr.status) {
						return NETWORK_ERROR;
					} else {
						return SERVER_ERROR;
					}
				}

				var p = Translation.prototype;

				/**
	    * 添加一个翻译实例
	    * @param {API} apiObject
	    */
				p.add = function (apiObject) {
					var APIs = this.APIs;
					var type = apiObject.type;
					var instances = APIs[type] || (APIs[type] = []);
					instances.push(apiObject);
				};

				/**
	    * 翻译方法
	    * @param {Query} queryObj
	    * @returns {Promise}
	    */
				p.translate = function (queryObj) {
					return this.call('translate', queryObj);
				};

				/**
	    * 返回语音 url 的方法
	    * @param queryObj
	    * @returns {Promise}
	    */
				p.audio = function (queryObj) {
					return this.call('audio', queryObj);
				};

				/**
	    * 检测语种的方法。注意，此方法返回的语种类型是 API 相关的，可能不会遵守标准。
	    * @param queryObj
	    * @returns {Promise}
	    */
				p.detect = function (queryObj) {
					return this.call('detect', queryObj);
				};

				/**
	    * 调用实例方法
	    * @param {String} method - 想调用实例的哪个方法
	    * @param {Query} queryObj
	    * @returns {Promise}
	    */
				p.call = function (method, queryObj) {
					var that = this;
					return new Promise(function (resolve, reject) {
						var instances = that.APIs[queryObj.api];
						if (!instances) {
							return reject('没有注册 ' + queryObj.api + ' API。');
						}

						var a = instances.shift();
						instances.push(a);
						a[method](queryObj).then(function (resultObj) {
							if (method === 'translate') {
								resultObj.api = a;
							}
							resolve(resultObj);
						}, function (superAgentError) {
							if (superAgentError == null) {
								return reject();
							}
							reject(analyzeErrorType(superAgentError));
						});
					});
				};

				var tjs = new Translation();

				tjs.NETWORK_ERROR = NETWORK_ERROR;
				tjs.SERVER_ERROR = SERVER_ERROR;

				// 绑定内置构造函数
				tjs.BaiDu = __webpack_require__(1);
				tjs.YouDao = __webpack_require__(8);
				tjs.Bing = __webpack_require__(9);
				tjs.Google = __webpack_require__(10);
				tjs.GoogleCN = __webpack_require__(12);

				module.exports = tjs;

				/***/
			},
			/* 1 */
			/***/function (module, exports, __webpack_require__) {

				/**
	    * 因为百度翻译 API 要收费，所以没有使用官方提供的接口，而是直接使用 fanyi.baidu.com 的翻译接口
	    */

				var superagent = __webpack_require__(2);
				var invertObj = __webpack_require__(7);

				// http://api.fanyi.baidu.com/api/trans/product/apidoc#languageList
				var standard2custom = {
					en: 'en',
					th: 'th',
					ru: 'ru',
					pt: 'pt',
					el: 'el',
					nl: 'nl',
					pl: 'pl',
					bg: 'bul',
					et: 'est',
					da: 'dan',
					fi: 'fin',
					cs: 'cs',
					ro: 'rom',
					sl: 'slo',
					sv: 'swe',
					hu: 'hu',
					de: 'de',
					it: 'it',
					zh: 'zh',
					'zh-CN': 'zh',
					'zh-TW': 'cht',
					'zh-HK': 'yue',
					ja: 'jp',
					ko: 'kor',
					es: 'spa',
					fr: 'fra',
					ar: 'ara'
				};

				var custom2standard = invertObj(standard2custom);

				/**
	    * 百度翻译构造函数
	    */
				function BaiDu() {
					this.name = '百度翻译';
					this.type = 'BaiDu';
					this.link = 'http://fanyi.baidu.com/';
				}

				/**
	    * 在自定义语种与标准语种之间转换，默认会将标准语种转换为自定义语种
	    * @param {String} lang
	    * @param {Boolean} [invert] - 但如果 invert 为真值，则会将自定义语种转换为标准语种
	    * @return {String}
	    */
				function langResolve(lang, invert) {
					return (invert ? custom2standard : standard2custom)[lang] || null;
				}

				var p = BaiDu.prototype;

				/**
	    * 翻译的方法
	    * @param queryObj
	    * @returns {Promise}
	    */
				p.translate = function (queryObj) {
					var that = this;
					return new Promise(function (resolve, reject) {
						superagent.get(that.link + '/v2transapi').query({
							from: standard2custom[queryObj.from] || 'auto',
							to: standard2custom[queryObj.to] || 'zh', // 非标准接口一定要提供目标语种
							query: queryObj.text,
							transtype: 'hash',
							simple_means_flag: 3
						}).end(function (err, res) {
							if (err) {
								reject(err);
							} else {
								resolve(that.transform(res.body, queryObj));
							}
						});
					});
				};

				/**
	    * 百度翻译返回的数据结构
	    * @typedef {Object} BaiDuRes
	    * @property {Number} [error_code] - 百度翻译错误码
	    * @property {String} from - 翻译结果的源语种，百度格式的
	    * @property {String} to - 翻译结果的目标语种，百度格式的
	    * @property {{src:String,dst:String}[]} [trans_result] - 翻译结果，偶尔抽风可能没有
	    */

				/**
	    * 将百度接口的数据转换为统一格式
	    * @param {BaiDuRes} rawRes
	    * @param {Query} queryObj
	    * @returns {{}}
	    */
				p.transform = function (rawRes, queryObj) {
					var obj = {
						text: queryObj.text,
						response: rawRes
					};

					// 源语种、目标语种与在线翻译地址
					try {
						var transResult = rawRes.trans_result || {};
						obj.from = langResolve(transResult.from, true);
						obj.to = langResolve(transResult.to, true);
						obj.linkToResult = this.link + '#auto/' + (transResult.to || 'auto') + '/' + queryObj.text;
					} catch (e) {}

					// 详细释义
					try {
						var detailed = [];
						rawRes.dict_result.simple_means.symbols[0].parts.forEach(function (v) {
							detailed.push(v.part + ' ' + v.means.join('，'));
						});
						obj.detailed = detailed;
					} catch (e) {}

					// 翻译结果
					try {
						obj.result = rawRes.trans_result.data.map(function (v) {
							return v.dst;
						});
					} catch (e) {}

					if (!obj.detailed && !obj.result) {
						obj.error = this.name + '没有返回有效的翻译结果，请稍后重试。';
					}

					return obj;
				};

				/**
	    * 检测语种的方法， 返回的语种为百度自己格式的语种。
	    * @param {Query} queryObj
	    * @returns {Promise}
	    */
				p.detect = function (queryObj) {
					var that = this;
					return new Promise(function (resolve, reject) {
						var from = queryObj.from;

						if (from) {
							return resolve(langResolve(from) ? from : null);
						}

						superagent.post(that.link + '/langdetect').send('query=' + queryObj.text.slice(0, 73)).end(function (err, res) {
							if (err) return reject(err);

							var body = res.body;
							if (body.error === 0) {
								var lang = langResolve(body.lan, true);
								if (lang) return resolve(lang);
							}

							resolve(null);
						});
					});
				};

				/**
	    * 返回语音播放的 url
	    * @param queryObj
	    * @returns {Promise}
	    */
				p.audio = function (queryObj) {
					return this.detect(queryObj).then(function (lang) {
						if (!lang) return null;
						var l = langResolve(lang);
						return l ? 'http://fanyi.baidu.com/gettts?lan=' + l + '&text=' + queryObj.text + '&spd=2&source=web' : null;
					});
				};

				module.exports = BaiDu;

				/***/
			},
			/* 2 */
			/***/function (module, exports, __webpack_require__) {

				/**
	    * Root reference for iframes.
	    */

				var root;
				if (typeof window !== 'undefined') {
					// Browser window
					root = window;
				} else if (typeof self !== 'undefined') {
					// Web Worker
					root = self;
				} else {
					// Other environments
					console.warn("Using browser-only version of superagent in non-browser environment");
					root = this;
				}

				var Emitter = __webpack_require__(3);
				var requestBase = __webpack_require__(4);
				var isObject = __webpack_require__(5);

				/**
	    * Noop.
	    */

				function noop() {};

				/**
	    * Expose `request`.
	    */

				var request = module.exports = __webpack_require__(6).bind(null, Request);

				/**
	    * Determine XHR.
	    */

				request.getXHR = function () {
					if (root.XMLHttpRequest && (!root.location || 'file:' != root.location.protocol || !root.ActiveXObject)) {
						return new XMLHttpRequest();
					} else {
						try {
							return new ActiveXObject('Microsoft.XMLHTTP');
						} catch (e) {}
						try {
							return new ActiveXObject('Msxml2.XMLHTTP.6.0');
						} catch (e) {}
						try {
							return new ActiveXObject('Msxml2.XMLHTTP.3.0');
						} catch (e) {}
						try {
							return new ActiveXObject('Msxml2.XMLHTTP');
						} catch (e) {}
					}
					throw Error("Browser-only verison of superagent could not find XHR");
				};

				/**
	    * Removes leading and trailing whitespace, added to support IE.
	    *
	    * @param {String} s
	    * @return {String}
	    * @api private
	    */

				var trim = ''.trim ? function (s) {
					return s.trim();
				} : function (s) {
					return s.replace(/(^\s*|\s*$)/g, '');
				};

				/**
	    * Serialize the given `obj`.
	    *
	    * @param {Object} obj
	    * @return {String}
	    * @api private
	    */

				function serialize(obj) {
					if (!isObject(obj)) return obj;
					var pairs = [];
					for (var key in obj) {
						pushEncodedKeyValuePair(pairs, key, obj[key]);
					}
					return pairs.join('&');
				}

				/**
	    * Helps 'serialize' with serializing arrays.
	    * Mutates the pairs array.
	    *
	    * @param {Array} pairs
	    * @param {String} key
	    * @param {Mixed} val
	    */

				function pushEncodedKeyValuePair(pairs, key, val) {
					if (val != null) {
						if (Array.isArray(val)) {
							val.forEach(function (v) {
								pushEncodedKeyValuePair(pairs, key, v);
							});
						} else if (isObject(val)) {
							for (var subkey in val) {
								pushEncodedKeyValuePair(pairs, key + '[' + subkey + ']', val[subkey]);
							}
						} else {
							pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
						}
					} else if (val === null) {
						pairs.push(encodeURIComponent(key));
					}
				}

				/**
	    * Expose serialization method.
	    */

				request.serializeObject = serialize;

				/**
	    * Parse the given x-www-form-urlencoded `str`.
	    *
	    * @param {String} str
	    * @return {Object}
	    * @api private
	    */

				function parseString(str) {
					var obj = {};
					var pairs = str.split('&');
					var pair;
					var pos;

					for (var i = 0, len = pairs.length; i < len; ++i) {
						pair = pairs[i];
						pos = pair.indexOf('=');
						if (pos == -1) {
							obj[decodeURIComponent(pair)] = '';
						} else {
							obj[decodeURIComponent(pair.slice(0, pos))] = decodeURIComponent(pair.slice(pos + 1));
						}
					}

					return obj;
				}

				/**
	    * Expose parser.
	    */

				request.parseString = parseString;

				/**
	    * Default MIME type map.
	    *
	    *     superagent.types.xml = 'application/xml';
	    *
	    */

				request.types = {
					html: 'text/html',
					json: 'application/json',
					xml: 'application/xml',
					urlencoded: 'application/x-www-form-urlencoded',
					'form': 'application/x-www-form-urlencoded',
					'form-data': 'application/x-www-form-urlencoded'
				};

				/**
	    * Default serialization map.
	    *
	    *     superagent.serialize['application/xml'] = function(obj){
	    *       return 'generated xml here';
	    *     };
	    *
	    */

				request.serialize = {
					'application/x-www-form-urlencoded': serialize,
					'application/json': JSON.stringify
				};

				/**
	    * Default parsers.
	    *
	    *     superagent.parse['application/xml'] = function(str){
	    *       return { object parsed from str };
	    *     };
	    *
	    */

				request.parse = {
					'application/x-www-form-urlencoded': parseString,
					'application/json': JSON.parse
				};

				/**
	    * Parse the given header `str` into
	    * an object containing the mapped fields.
	    *
	    * @param {String} str
	    * @return {Object}
	    * @api private
	    */

				function parseHeader(str) {
					var lines = str.split(/\r?\n/);
					var fields = {};
					var index;
					var line;
					var field;
					var val;

					lines.pop(); // trailing CRLF

					for (var i = 0, len = lines.length; i < len; ++i) {
						line = lines[i];
						index = line.indexOf(':');
						field = line.slice(0, index).toLowerCase();
						val = trim(line.slice(index + 1));
						fields[field] = val;
					}

					return fields;
				}

				/**
	    * Check if `mime` is json or has +json structured syntax suffix.
	    *
	    * @param {String} mime
	    * @return {Boolean}
	    * @api private
	    */

				function isJSON(mime) {
					return (/[\/+]json\b/.test(mime)
					);
				}

				/**
	    * Return the mime type for the given `str`.
	    *
	    * @param {String} str
	    * @return {String}
	    * @api private
	    */

				function type(str) {
					return str.split(/ *; */).shift();
				};

				/**
	    * Return header field parameters.
	    *
	    * @param {String} str
	    * @return {Object}
	    * @api private
	    */

				function params(str) {
					return str.split(/ *; */).reduce(function (obj, str) {
						var parts = str.split(/ *= */),
						    key = parts.shift(),
						    val = parts.shift();

						if (key && val) obj[key] = val;
						return obj;
					}, {});
				};

				/**
	    * Initialize a new `Response` with the given `xhr`.
	    *
	    *  - set flags (.ok, .error, etc)
	    *  - parse header
	    *
	    * Examples:
	    *
	    *  Aliasing `superagent` as `request` is nice:
	    *
	    *      request = superagent;
	    *
	    *  We can use the promise-like API, or pass callbacks:
	    *
	    *      request.get('/').end(function(res){});
	    *      request.get('/', function(res){});
	    *
	    *  Sending data can be chained:
	    *
	    *      request
	    *        .post('/user')
	    *        .send({ name: 'tj' })
	    *        .end(function(res){});
	    *
	    *  Or passed to `.send()`:
	    *
	    *      request
	    *        .post('/user')
	    *        .send({ name: 'tj' }, function(res){});
	    *
	    *  Or passed to `.post()`:
	    *
	    *      request
	    *        .post('/user', { name: 'tj' })
	    *        .end(function(res){});
	    *
	    * Or further reduced to a single call for simple cases:
	    *
	    *      request
	    *        .post('/user', { name: 'tj' }, function(res){});
	    *
	    * @param {XMLHTTPRequest} xhr
	    * @param {Object} options
	    * @api private
	    */

				function Response(req, options) {
					options = options || {};
					this.req = req;
					this.xhr = this.req.xhr;
					// responseText is accessible only if responseType is '' or 'text' and on older browsers
					this.text = this.req.method != 'HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text') || typeof this.xhr.responseType === 'undefined' ? this.xhr.responseText : null;
					this.statusText = this.req.xhr.statusText;
					this._setStatusProperties(this.xhr.status);
					this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
					// getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
					// getResponseHeader still works. so we get content-type even if getting
					// other headers fails.
					this.header['content-type'] = this.xhr.getResponseHeader('content-type');
					this._setHeaderProperties(this.header);
					this.body = this.req.method != 'HEAD' ? this._parseBody(this.text ? this.text : this.xhr.response) : null;
				}

				/**
	    * Get case-insensitive `field` value.
	    *
	    * @param {String} field
	    * @return {String}
	    * @api public
	    */

				Response.prototype.get = function (field) {
					return this.header[field.toLowerCase()];
				};

				/**
	    * Set header related properties:
	    *
	    *   - `.type` the content type without params
	    *
	    * A response of "Content-Type: text/plain; charset=utf-8"
	    * will provide you with a `.type` of "text/plain".
	    *
	    * @param {Object} header
	    * @api private
	    */

				Response.prototype._setHeaderProperties = function (header) {
					// content-type
					var ct = this.header['content-type'] || '';
					this.type = type(ct);

					// params
					var obj = params(ct);
					for (var key in obj) this[key] = obj[key];
				};

				/**
	    * Parse the given body `str`.
	    *
	    * Used for auto-parsing of bodies. Parsers
	    * are defined on the `superagent.parse` object.
	    *
	    * @param {String} str
	    * @return {Mixed}
	    * @api private
	    */

				Response.prototype._parseBody = function (str) {
					var parse = request.parse[this.type];
					if (!parse && isJSON(this.type)) {
						parse = request.parse['application/json'];
					}
					return parse && str && (str.length || str instanceof Object) ? parse(str) : null;
				};

				/**
	    * Set flags such as `.ok` based on `status`.
	    *
	    * For example a 2xx response will give you a `.ok` of __true__
	    * whereas 5xx will be __false__ and `.error` will be __true__. The
	    * `.clientError` and `.serverError` are also available to be more
	    * specific, and `.statusType` is the class of error ranging from 1..5
	    * sometimes useful for mapping respond colors etc.
	    *
	    * "sugar" properties are also defined for common cases. Currently providing:
	    *
	    *   - .noContent
	    *   - .badRequest
	    *   - .unauthorized
	    *   - .notAcceptable
	    *   - .notFound
	    *
	    * @param {Number} status
	    * @api private
	    */

				Response.prototype._setStatusProperties = function (status) {
					// handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
					if (status === 1223) {
						status = 204;
					}

					var type = status / 100 | 0;

					// status / class
					this.status = this.statusCode = status;
					this.statusType = type;

					// basics
					this.info = 1 == type;
					this.ok = 2 == type;
					this.clientError = 4 == type;
					this.serverError = 5 == type;
					this.error = 4 == type || 5 == type ? this.toError() : false;

					// sugar
					this.accepted = 202 == status;
					this.noContent = 204 == status;
					this.badRequest = 400 == status;
					this.unauthorized = 401 == status;
					this.notAcceptable = 406 == status;
					this.notFound = 404 == status;
					this.forbidden = 403 == status;
				};

				/**
	    * Return an `Error` representative of this response.
	    *
	    * @return {Error}
	    * @api public
	    */

				Response.prototype.toError = function () {
					var req = this.req;
					var method = req.method;
					var url = req.url;

					var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
					var err = new Error(msg);
					err.status = this.status;
					err.method = method;
					err.url = url;

					return err;
				};

				/**
	    * Expose `Response`.
	    */

				request.Response = Response;

				/**
	    * Initialize a new `Request` with the given `method` and `url`.
	    *
	    * @param {String} method
	    * @param {String} url
	    * @api public
	    */

				function Request(method, url) {
					var self = this;
					this._query = this._query || [];
					this.method = method;
					this.url = url;
					this.header = {}; // preserves header name case
					this._header = {}; // coerces header names to lowercase
					this.on('end', function () {
						var err = null;
						var res = null;

						try {
							res = new Response(self);
						} catch (e) {
							err = new Error('Parser is unable to parse the response');
							err.parse = true;
							err.original = e;
							// issue #675: return the raw response if the response parsing fails
							err.rawResponse = self.xhr && self.xhr.responseText ? self.xhr.responseText : null;
							// issue #876: return the http status code if the response parsing fails
							err.statusCode = self.xhr && self.xhr.status ? self.xhr.status : null;
							return self.callback(err);
						}

						self.emit('response', res);

						var new_err;
						try {
							if (res.status < 200 || res.status >= 300) {
								new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
								new_err.original = err;
								new_err.response = res;
								new_err.status = res.status;
							}
						} catch (e) {
							new_err = e; // #985 touching res may cause INVALID_STATE_ERR on old Android
						}

						// #1000 don't catch errors from the callback to avoid double calling it
						if (new_err) {
							self.callback(new_err, res);
						} else {
							self.callback(null, res);
						}
					});
				}

				/**
	    * Mixin `Emitter` and `requestBase`.
	    */

				Emitter(Request.prototype);
				for (var key in requestBase) {
					Request.prototype[key] = requestBase[key];
				}

				/**
	    * Set Content-Type to `type`, mapping values from `request.types`.
	    *
	    * Examples:
	    *
	    *      superagent.types.xml = 'application/xml';
	    *
	    *      request.post('/')
	    *        .type('xml')
	    *        .send(xmlstring)
	    *        .end(callback);
	    *
	    *      request.post('/')
	    *        .type('application/xml')
	    *        .send(xmlstring)
	    *        .end(callback);
	    *
	    * @param {String} type
	    * @return {Request} for chaining
	    * @api public
	    */

				Request.prototype.type = function (type) {
					this.set('Content-Type', request.types[type] || type);
					return this;
				};

				/**
	    * Set responseType to `val`. Presently valid responseTypes are 'blob' and
	    * 'arraybuffer'.
	    *
	    * Examples:
	    *
	    *      req.get('/')
	    *        .responseType('blob')
	    *        .end(callback);
	    *
	    * @param {String} val
	    * @return {Request} for chaining
	    * @api public
	    */

				Request.prototype.responseType = function (val) {
					this._responseType = val;
					return this;
				};

				/**
	    * Set Accept to `type`, mapping values from `request.types`.
	    *
	    * Examples:
	    *
	    *      superagent.types.json = 'application/json';
	    *
	    *      request.get('/agent')
	    *        .accept('json')
	    *        .end(callback);
	    *
	    *      request.get('/agent')
	    *        .accept('application/json')
	    *        .end(callback);
	    *
	    * @param {String} accept
	    * @return {Request} for chaining
	    * @api public
	    */

				Request.prototype.accept = function (type) {
					this.set('Accept', request.types[type] || type);
					return this;
				};

				/**
	    * Set Authorization field value with `user` and `pass`.
	    *
	    * @param {String} user
	    * @param {String} pass
	    * @param {Object} options with 'type' property 'auto' or 'basic' (default 'basic')
	    * @return {Request} for chaining
	    * @api public
	    */

				Request.prototype.auth = function (user, pass, options) {
					if (!options) {
						options = {
							type: 'basic'
						};
					}

					switch (options.type) {
						case 'basic':
							var str = btoa(user + ':' + pass);
							this.set('Authorization', 'Basic ' + str);
							break;

						case 'auto':
							this.username = user;
							this.password = pass;
							break;
					}
					return this;
				};

				/**
	   * Add query-string `val`.
	   *
	   * Examples:
	   *
	   *   request.get('/shoes')
	   *     .query('size=10')
	   *     .query({ color: 'blue' })
	   *
	   * @param {Object|String} val
	   * @return {Request} for chaining
	   * @api public
	   */

				Request.prototype.query = function (val) {
					if ('string' != typeof val) val = serialize(val);
					if (val) this._query.push(val);
					return this;
				};

				/**
	    * Queue the given `file` as an attachment to the specified `field`,
	    * with optional `filename`.
	    *
	    * ``` js
	    * request.post('/upload')
	    *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
	    *   .end(callback);
	    * ```
	    *
	    * @param {String} field
	    * @param {Blob|File} file
	    * @param {String} filename
	    * @return {Request} for chaining
	    * @api public
	    */

				Request.prototype.attach = function (field, file, filename) {
					this._getFormData().append(field, file, filename || file.name);
					return this;
				};

				Request.prototype._getFormData = function () {
					if (!this._formData) {
						this._formData = new root.FormData();
					}
					return this._formData;
				};

				/**
	    * Invoke the callback with `err` and `res`
	    * and handle arity check.
	    *
	    * @param {Error} err
	    * @param {Response} res
	    * @api private
	    */

				Request.prototype.callback = function (err, res) {
					var fn = this._callback;
					this.clearTimeout();
					fn(err, res);
				};

				/**
	    * Invoke callback with x-domain error.
	    *
	    * @api private
	    */

				Request.prototype.crossDomainError = function () {
					var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
					err.crossDomain = true;

					err.status = this.status;
					err.method = this.method;
					err.url = this.url;

					this.callback(err);
				};

				/**
	    * Invoke callback with timeout error.
	    *
	    * @api private
	    */

				Request.prototype._timeoutError = function () {
					var timeout = this._timeout;
					var err = new Error('timeout of ' + timeout + 'ms exceeded');
					err.timeout = timeout;
					this.callback(err);
				};

				/**
	    * Compose querystring to append to req.url
	    *
	    * @api private
	    */

				Request.prototype._appendQueryString = function () {
					var query = this._query.join('&');
					if (query) {
						this.url += ~this.url.indexOf('?') ? '&' + query : '?' + query;
					}
				};

				/**
	    * Initiate request, invoking callback `fn(res)`
	    * with an instanceof `Response`.
	    *
	    * @param {Function} fn
	    * @return {Request} for chaining
	    * @api public
	    */

				Request.prototype.end = function (fn) {
					var self = this;
					var xhr = this.xhr = request.getXHR();
					var timeout = this._timeout;
					var data = this._formData || this._data;

					// store callback
					this._callback = fn || noop;

					// state change
					xhr.onreadystatechange = function () {
						if (4 != xhr.readyState) return;

						// In IE9, reads to any property (e.g. status) off of an aborted XHR will
						// result in the error "Could not complete the operation due to error c00c023f"
						var status;
						try {
							status = xhr.status;
						} catch (e) {
							status = 0;
						}

						if (0 == status) {
							if (self.timedout) return self._timeoutError();
							if (self._aborted) return;
							return self.crossDomainError();
						}
						self.emit('end');
					};

					// progress
					var handleProgress = function (direction, e) {
						if (e.total > 0) {
							e.percent = e.loaded / e.total * 100;
						}
						e.direction = direction;
						self.emit('progress', e);
					};
					if (this.hasListeners('progress')) {
						try {
							xhr.onprogress = handleProgress.bind(null, 'download');
							if (xhr.upload) {
								xhr.upload.onprogress = handleProgress.bind(null, 'upload');
							}
						} catch (e) {
							// Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
							// Reported here:
							// https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
						}
					}

					// timeout
					if (timeout && !this._timer) {
						this._timer = setTimeout(function () {
							self.timedout = true;
							self.abort();
						}, timeout);
					}

					// querystring
					this._appendQueryString();

					// initiate request
					if (this.username && this.password) {
						xhr.open(this.method, this.url, true, this.username, this.password);
					} else {
						xhr.open(this.method, this.url, true);
					}

					// CORS
					if (this._withCredentials) xhr.withCredentials = true;

					// body
					if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
						// serialize stuff
						var contentType = this._header['content-type'];
						var serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
						if (!serialize && isJSON(contentType)) serialize = request.serialize['application/json'];
						if (serialize) data = serialize(data);
					}

					// set header fields
					for (var field in this.header) {
						if (null == this.header[field]) continue;
						xhr.setRequestHeader(field, this.header[field]);
					}

					if (this._responseType) {
						xhr.responseType = this._responseType;
					}

					// send stuff
					this.emit('request', this);

					// IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
					// We need null here if data is undefined
					xhr.send(typeof data !== 'undefined' ? data : null);
					return this;
				};

				/**
	    * Expose `Request`.
	    */

				request.Request = Request;

				/**
	    * GET `url` with optional callback `fn(res)`.
	    *
	    * @param {String} url
	    * @param {Mixed|Function} [data] or fn
	    * @param {Function} [fn]
	    * @return {Request}
	    * @api public
	    */

				request.get = function (url, data, fn) {
					var req = request('GET', url);
					if ('function' == typeof data) fn = data, data = null;
					if (data) req.query(data);
					if (fn) req.end(fn);
					return req;
				};

				/**
	    * HEAD `url` with optional callback `fn(res)`.
	    *
	    * @param {String} url
	    * @param {Mixed|Function} [data] or fn
	    * @param {Function} [fn]
	    * @return {Request}
	    * @api public
	    */

				request.head = function (url, data, fn) {
					var req = request('HEAD', url);
					if ('function' == typeof data) fn = data, data = null;
					if (data) req.send(data);
					if (fn) req.end(fn);
					return req;
				};

				/**
	    * OPTIONS query to `url` with optional callback `fn(res)`.
	    *
	    * @param {String} url
	    * @param {Mixed|Function} [data] or fn
	    * @param {Function} [fn]
	    * @return {Request}
	    * @api public
	    */

				request.options = function (url, data, fn) {
					var req = request('OPTIONS', url);
					if ('function' == typeof data) fn = data, data = null;
					if (data) req.send(data);
					if (fn) req.end(fn);
					return req;
				};

				/**
	    * DELETE `url` with optional callback `fn(res)`.
	    *
	    * @param {String} url
	    * @param {Function} [fn]
	    * @return {Request}
	    * @api public
	    */

				function del(url, fn) {
					var req = request('DELETE', url);
					if (fn) req.end(fn);
					return req;
				};

				request['del'] = del;
				request['delete'] = del;

				/**
	    * PATCH `url` with optional `data` and callback `fn(res)`.
	    *
	    * @param {String} url
	    * @param {Mixed} [data]
	    * @param {Function} [fn]
	    * @return {Request}
	    * @api public
	    */

				request.patch = function (url, data, fn) {
					var req = request('PATCH', url);
					if ('function' == typeof data) fn = data, data = null;
					if (data) req.send(data);
					if (fn) req.end(fn);
					return req;
				};

				/**
	    * POST `url` with optional `data` and callback `fn(res)`.
	    *
	    * @param {String} url
	    * @param {Mixed} [data]
	    * @param {Function} [fn]
	    * @return {Request}
	    * @api public
	    */

				request.post = function (url, data, fn) {
					var req = request('POST', url);
					if ('function' == typeof data) fn = data, data = null;
					if (data) req.send(data);
					if (fn) req.end(fn);
					return req;
				};

				/**
	    * PUT `url` with optional `data` and callback `fn(res)`.
	    *
	    * @param {String} url
	    * @param {Mixed|Function} [data] or fn
	    * @param {Function} [fn]
	    * @return {Request}
	    * @api public
	    */

				request.put = function (url, data, fn) {
					var req = request('PUT', url);
					if ('function' == typeof data) fn = data, data = null;
					if (data) req.send(data);
					if (fn) req.end(fn);
					return req;
				};

				/***/
			},
			/* 3 */
			/***/function (module, exports, __webpack_require__) {

				/**
	    * Expose `Emitter`.
	    */

				if (true) {
					module.exports = Emitter;
				}

				/**
	    * Initialize a new `Emitter`.
	    *
	    * @api public
	    */

				function Emitter(obj) {
					if (obj) return mixin(obj);
				};

				/**
	    * Mixin the emitter properties.
	    *
	    * @param {Object} obj
	    * @return {Object}
	    * @api private
	    */

				function mixin(obj) {
					for (var key in Emitter.prototype) {
						obj[key] = Emitter.prototype[key];
					}
					return obj;
				}

				/**
	    * Listen on the given `event` with `fn`.
	    *
	    * @param {String} event
	    * @param {Function} fn
	    * @return {Emitter}
	    * @api public
	    */

				Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
					this._callbacks = this._callbacks || {};
					(this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
					return this;
				};

				/**
	    * Adds an `event` listener that will be invoked a single
	    * time then automatically removed.
	    *
	    * @param {String} event
	    * @param {Function} fn
	    * @return {Emitter}
	    * @api public
	    */

				Emitter.prototype.once = function (event, fn) {
					function on() {
						this.off(event, on);
						fn.apply(this, arguments);
					}

					on.fn = fn;
					this.on(event, on);
					return this;
				};

				/**
	    * Remove the given callback for `event` or all
	    * registered callbacks.
	    *
	    * @param {String} event
	    * @param {Function} fn
	    * @return {Emitter}
	    * @api public
	    */

				Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
					this._callbacks = this._callbacks || {};

					// all
					if (0 == arguments.length) {
						this._callbacks = {};
						return this;
					}

					// specific event
					var callbacks = this._callbacks['$' + event];
					if (!callbacks) return this;

					// remove all handlers
					if (1 == arguments.length) {
						delete this._callbacks['$' + event];
						return this;
					}

					// remove specific handler
					var cb;
					for (var i = 0; i < callbacks.length; i++) {
						cb = callbacks[i];
						if (cb === fn || cb.fn === fn) {
							callbacks.splice(i, 1);
							break;
						}
					}
					return this;
				};

				/**
	    * Emit `event` with the given args.
	    *
	    * @param {String} event
	    * @param {Mixed} ...
	    * @return {Emitter}
	    */

				Emitter.prototype.emit = function (event) {
					this._callbacks = this._callbacks || {};
					var args = [].slice.call(arguments, 1),
					    callbacks = this._callbacks['$' + event];

					if (callbacks) {
						callbacks = callbacks.slice(0);
						for (var i = 0, len = callbacks.length; i < len; ++i) {
							callbacks[i].apply(this, args);
						}
					}

					return this;
				};

				/**
	    * Return array of callbacks for `event`.
	    *
	    * @param {String} event
	    * @return {Array}
	    * @api public
	    */

				Emitter.prototype.listeners = function (event) {
					this._callbacks = this._callbacks || {};
					return this._callbacks['$' + event] || [];
				};

				/**
	    * Check if this emitter has `event` handlers.
	    *
	    * @param {String} event
	    * @return {Boolean}
	    * @api public
	    */

				Emitter.prototype.hasListeners = function (event) {
					return !!this.listeners(event).length;
				};

				/***/
			},
			/* 4 */
			/***/function (module, exports, __webpack_require__) {

				/**
	    * Module of mixed-in functions shared between node and client code
	    */
				var isObject = __webpack_require__(5);

				/**
	    * Clear previous timeout.
	    *
	    * @return {Request} for chaining
	    * @api public
	    */

				exports.clearTimeout = function _clearTimeout() {
					this._timeout = 0;
					clearTimeout(this._timer);
					return this;
				};

				/**
	    * Override default response body parser
	    *
	    * This function will be called to convert incoming data into request.body
	    *
	    * @param {Function}
	    * @api public
	    */

				exports.parse = function parse(fn) {
					this._parser = fn;
					return this;
				};

				/**
	    * Override default request body serializer
	    *
	    * This function will be called to convert data set via .send or .attach into payload to send
	    *
	    * @param {Function}
	    * @api public
	    */

				exports.serialize = function serialize(fn) {
					this._serializer = fn;
					return this;
				};

				/**
	    * Set timeout to `ms`.
	    *
	    * @param {Number} ms
	    * @return {Request} for chaining
	    * @api public
	    */

				exports.timeout = function timeout(ms) {
					this._timeout = ms;
					return this;
				};

				/**
	    * Promise support
	    *
	    * @param {Function} resolve
	    * @param {Function} reject
	    * @return {Request}
	    */

				exports.then = function then(resolve, reject) {
					if (!this._fullfilledPromise) {
						var self = this;
						this._fullfilledPromise = new Promise(function (innerResolve, innerReject) {
							self.end(function (err, res) {
								if (err) innerReject(err);else innerResolve(res);
							});
						});
					}
					return this._fullfilledPromise.then(resolve, reject);
				};

				exports.catch = function (cb) {
					return this.then(undefined, cb);
				};

				/**
	    * Allow for extension
	    */

				exports.use = function use(fn) {
					fn(this);
					return this;
				};

				/**
	    * Get request header `field`.
	    * Case-insensitive.
	    *
	    * @param {String} field
	    * @return {String}
	    * @api public
	    */

				exports.get = function (field) {
					return this._header[field.toLowerCase()];
				};

				/**
	    * Get case-insensitive header `field` value.
	    * This is a deprecated internal API. Use `.get(field)` instead.
	    *
	    * (getHeader is no longer used internally by the superagent code base)
	    *
	    * @param {String} field
	    * @return {String}
	    * @api private
	    * @deprecated
	    */

				exports.getHeader = exports.get;

				/**
	    * Set header `field` to `val`, or multiple fields with one object.
	    * Case-insensitive.
	    *
	    * Examples:
	    *
	    *      req.get('/')
	    *        .set('Accept', 'application/json')
	    *        .set('X-API-Key', 'foobar')
	    *        .end(callback);
	    *
	    *      req.get('/')
	    *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
	    *        .end(callback);
	    *
	    * @param {String|Object} field
	    * @param {String} val
	    * @return {Request} for chaining
	    * @api public
	    */

				exports.set = function (field, val) {
					if (isObject(field)) {
						for (var key in field) {
							this.set(key, field[key]);
						}
						return this;
					}
					this._header[field.toLowerCase()] = val;
					this.header[field] = val;
					return this;
				};

				/**
	    * Remove header `field`.
	    * Case-insensitive.
	    *
	    * Example:
	    *
	    *      req.get('/')
	    *        .unset('User-Agent')
	    *        .end(callback);
	    *
	    * @param {String} field
	    */
				exports.unset = function (field) {
					delete this._header[field.toLowerCase()];
					delete this.header[field];
					return this;
				};

				/**
	    * Write the field `name` and `val`, or multiple fields with one object
	    * for "multipart/form-data" request bodies.
	    *
	    * ``` js
	    * request.post('/upload')
	    *   .field('foo', 'bar')
	    *   .end(callback);
	    *
	    * request.post('/upload')
	    *   .field({ foo: 'bar', baz: 'qux' })
	    *   .end(callback);
	    * ```
	    *
	    * @param {String|Object} name
	    * @param {String|Blob|File|Buffer|fs.ReadStream} val
	    * @return {Request} for chaining
	    * @api public
	    */
				exports.field = function (name, val) {

					// name should be either a string or an object.
					if (null === name || undefined === name) {
						throw new Error('.field(name, val) name can not be empty');
					}

					if (isObject(name)) {
						for (var key in name) {
							this.field(key, name[key]);
						}
						return this;
					}

					// val should be defined now
					if (null === val || undefined === val) {
						throw new Error('.field(name, val) val can not be empty');
					}
					this._getFormData().append(name, val);
					return this;
				};

				/**
	    * Abort the request, and clear potential timeout.
	    *
	    * @return {Request}
	    * @api public
	    */
				exports.abort = function () {
					if (this._aborted) {
						return this;
					}
					this._aborted = true;
					this.xhr && this.xhr.abort(); // browser
					this.req && this.req.abort(); // node
					this.clearTimeout();
					this.emit('abort');
					return this;
				};

				/**
	    * Enable transmission of cookies with x-domain requests.
	    *
	    * Note that for this to work the origin must not be
	    * using "Access-Control-Allow-Origin" with a wildcard,
	    * and also must set "Access-Control-Allow-Credentials"
	    * to "true".
	    *
	    * @api public
	    */

				exports.withCredentials = function () {
					// This is browser-only functionality. Node side is no-op.
					this._withCredentials = true;
					return this;
				};

				/**
	    * Set the max redirects to `n`. Does noting in browser XHR implementation.
	    *
	    * @param {Number} n
	    * @return {Request} for chaining
	    * @api public
	    */

				exports.redirects = function (n) {
					this._maxRedirects = n;
					return this;
				};

				/**
	    * Convert to a plain javascript object (not JSON string) of scalar properties.
	    * Note as this method is designed to return a useful non-this value,
	    * it cannot be chained.
	    *
	    * @return {Object} describing method, url, and data of this request
	    * @api public
	    */

				exports.toJSON = function () {
					return {
						method: this.method,
						url: this.url,
						data: this._data,
						headers: this._header
					};
				};

				/**
	    * Check if `obj` is a host object,
	    * we don't want to serialize these :)
	    *
	    * TODO: future proof, move to compoent land
	    *
	    * @param {Object} obj
	    * @return {Boolean}
	    * @api private
	    */

				exports._isHost = function _isHost(obj) {
					var str = {}.toString.call(obj);

					switch (str) {
						case '[object File]':
						case '[object Blob]':
						case '[object FormData]':
							return true;
						default:
							return false;
					}
				};

				/**
	    * Send `data` as the request body, defaulting the `.type()` to "json" when
	    * an object is given.
	    *
	    * Examples:
	    *
	    *       // manual json
	    *       request.post('/user')
	    *         .type('json')
	    *         .send('{"name":"tj"}')
	    *         .end(callback)
	    *
	    *       // auto json
	    *       request.post('/user')
	    *         .send({ name: 'tj' })
	    *         .end(callback)
	    *
	    *       // manual x-www-form-urlencoded
	    *       request.post('/user')
	    *         .type('form')
	    *         .send('name=tj')
	    *         .end(callback)
	    *
	    *       // auto x-www-form-urlencoded
	    *       request.post('/user')
	    *         .type('form')
	    *         .send({ name: 'tj' })
	    *         .end(callback)
	    *
	    *       // defaults to x-www-form-urlencoded
	    *      request.post('/user')
	    *        .send('name=tobi')
	    *        .send('species=ferret')
	    *        .end(callback)
	    *
	    * @param {String|Object} data
	    * @return {Request} for chaining
	    * @api public
	    */

				exports.send = function (data) {
					var obj = isObject(data);
					var type = this._header['content-type'];

					// merge
					if (obj && isObject(this._data)) {
						for (var key in data) {
							this._data[key] = data[key];
						}
					} else if ('string' == typeof data) {
						// default to x-www-form-urlencoded
						if (!type) this.type('form');
						type = this._header['content-type'];
						if ('application/x-www-form-urlencoded' == type) {
							this._data = this._data ? this._data + '&' + data : data;
						} else {
							this._data = (this._data || '') + data;
						}
					} else {
						this._data = data;
					}

					if (!obj || this._isHost(data)) return this;

					// default to json
					if (!type) this.type('json');
					return this;
				};

				/***/
			},
			/* 5 */
			/***/function (module, exports) {

				/**
	    * Check if `obj` is an object.
	    *
	    * @param {Object} obj
	    * @return {Boolean}
	    * @api private
	    */

				function isObject(obj) {
					return null !== obj && 'object' === typeof obj;
				}

				module.exports = isObject;

				/***/
			},
			/* 6 */
			/***/function (module, exports) {

				// The node and browser modules expose versions of this with the
				// appropriate constructor function bound as first argument
				/**
	    * Issue a request:
	    *
	    * Examples:
	    *
	    *    request('GET', '/users').end(callback)
	    *    request('/users').end(callback)
	    *    request('/users', callback)
	    *
	    * @param {String} method
	    * @param {String|Function} url or callback
	    * @return {Request}
	    * @api public
	    */

				function request(RequestConstructor, method, url) {
					// callback
					if ('function' == typeof url) {
						return new RequestConstructor('GET', method).end(url);
					}

					// url first
					if (2 == arguments.length) {
						return new RequestConstructor('GET', method);
					}

					return new RequestConstructor(method, url);
				}

				module.exports = request;

				/***/
			},
			/* 7 */
			/***/function (module, exports) {

				/**
	    * 反转一个对象的键值对
	    * @param obj
	    * @return {Object}
	    */
				module.exports = function (obj) {
					var result = {};
					for (var key in obj) {
						if (obj.hasOwnProperty(key)) {
							result[obj[key]] = key;
						}
					}
					return result;
				};

				/***/
			},
			/* 8 */
			/***/function (module, exports, __webpack_require__) {

				// @see http://fanyi.youdao.com/openapi?path=data-mode#bd

				/**
	    * 有道翻译返回的数据结构
	    * @typedef {Object} YouDaoRes
	    * @property {Number} errorCode - 有道翻译错误码，0 表示正常
	    * @property {{phonetic?:String,explains?:String[]}} [basic] - 翻译结果的源语种，百度格式的
	    * @property {String[]} [translation] - 翻译结果，偶尔抽风可能没有
	    */

				var request = __webpack_require__(2);
				var invertObj = __webpack_require__(7);
				var standard2custom = {
					en: 'eng',
					ja: 'jap',
					ko: 'ko',
					fr: 'fr',
					ru: 'ru',
					es: 'es'
				};
				var custom2standard = invertObj(standard2custom);

				function langTransform(lang, invert) {
					return (invert ? custom2standard : standard2custom)[lang] || null;
				}

				YouDao.resolve = langTransform;

				/**
	    * 有道翻译构造函数
	    * @param {Object} config
	    * @param {String} config.apiKey
	    * @param {String} config.keyFrom
	    */
				function YouDao(config) {
					if (!config || !config.apiKey || !config.keyFrom) {
						throw new Error('有道翻译必须要有 API Key 及 keyFrom，否则无法使用翻译接口。');
					}

					this.apiKey = config.apiKey;
					this.keyFrom = config.keyFrom;

					this.name = '有道翻译';
					this.link = 'http://fanyi.youdao.com/';
					this.type = 'YouDao';
					this.errMsg = {
						20: '有道翻译服务一次性只能翻译200个字符',
						30: '有道翻译暂时无法翻译这段文本',
						40: '有道翻译不支持这种语言',
						50: 'api key被封禁',
						60: '无词典结果'
					};
				}

				var p = YouDao.prototype;

				/**
	    * 翻译的方法。有道不支持指定源语种或目标语种。
	    * @param queryObj
	    * @returns {Promise}
	    */
				p.translate = function (queryObj) {
					var that = this;
					return new Promise(function (resolve, reject) {
						request.get('https://fanyi.youdao.com/openapi.do').query({
							key: that.apiKey,
							keyfrom: that.keyFrom,
							type: 'data',
							doctype: 'json',
							version: '1.1',
							q: queryObj.text
						}).end(function (err, res) {
							if (err) {
								reject(err);
							} else {
								resolve(that.transform(res.body, queryObj));
							}
						});
					});
				};

				/**
	    * 将有道接口的数据转换为统一格式
	    * @param {YouDaoRes} rawRes
	    * @param {Query} queryObj
	    * @returns {{}}
	    */
				p.transform = function (rawRes, queryObj) {
					var obj = {
						text: queryObj.text,
						response: rawRes,
						linkToResult: 'http://fanyi.youdao.com/translate?i=' + queryObj.text
					};

					// rawRes 偶尔是 null
					if (rawRes) {
						// 如果有错误码则直接处理错误
						if (rawRes.errorCode !== 0) {
							obj.error = this.errMsg[rawRes.errorCode];
						} else {
							// 详细释义
							try {
								var basic = rawRes.basic;
								obj.detailed = basic.explains;
								obj.phonetic = basic.phonetic;
							} catch (e) {}

							// 翻译结果
							try {
								obj.result = rawRes.translation;
							} catch (e) {}
						}
					}

					if (!obj.error && !obj.detailed && !obj.result) {
						obj.error = this.name + '没有返回有效的翻译结果，请稍后重试。';
					}

					return obj;
				};

				/**
	    * 检测语种的方法，有道没有，所以若没有提供源语种就总是返回 null
	    * @param {Query} queryObj
	    * @returns {Promise}
	    */
				p.detect = function (queryObj) {
					return new Promise(function (resolve, reject) {
						var from = queryObj.from;

						if (langTransform(from)) {
							resolve(from);
						} else {
							resolve(null);
						}
					});
				};

				/**
	    * 返回语音播放的 url
	    * @param queryObj
	    * @returns {Promise}
	    */
				p.audio = function (queryObj) {
					return this.detect(queryObj).then(function (lang) {
						if (!lang) return null;
						var l = langTransform(lang);
						return l ? 'http://tts.youdao.com/fanyivoice?keyfrom=fanyi%2Eweb%2Eindex&le=' + l + '&word=' + queryObj.text : null;
					});
				};

				module.exports = YouDao;

				/***/
			},
			/* 9 */
			/***/function (module, exports, __webpack_require__) {

				/**
	    * 必应词典的这个接口仅支持中文和英文；
	    * 中文会翻译成英文，反之英文会翻译成中文，
	    * 但其它语种全都不支持；
	    * 若翻译了一个不支持的语种（如日语），
	    * 那么语种会被判断为 EN，
	    * 但不会有任何翻译结果。
	    */

				var superagent = __webpack_require__(2);
				var invertObj = __webpack_require__(7);
				var custom2standard = {
					cn: 'zh-CN',
					en: 'en'
				};
				var standard2custom = invertObj(custom2standard);

				/**
	    * 在自定义语种与标准语种之间转换，默认会将标准语种转换为自定义语种
	    * @param {String} lang
	    * @param {Boolean} [invert] - 但如果 invert 为真值，则会将自定义语种转换为标准语种
	    * @return {String}
	    */
				function langTransform(lang, invert) {
					return (invert ? custom2standard : standard2custom)[lang] || null;
				}

				/**
	    * 必应翻译
	    */
				function Bing() {
					this.name = '必应翻译';
					this.type = 'Bing';
					this.link = 'http://cn.bing.com/dict/';
				}

				var p = Bing.prototype;

				/**
	    * 翻译的方法
	    * @param queryObj
	    * @returns {Promise}
	    */
				p.translate = function (queryObj) {
					var that = this;
					return new Promise(function (resolve, reject) {
						superagent.post('http://dict.bing.com.cn/io.aspx').type('form').send({
							t: 'dict',
							ut: 'default',
							q: queryObj.text,
							ulang: 'AUTO',
							tlang: 'AUTO'
						}).timeout(that.timeout).end(function (err, res) {
							if (err) {
								reject(err);
							} else {
								resolve(that.transform(res.text, queryObj));
							}
						});
					});
				};

				/**
	    * 将必应翻译的数据转换为统一格式
	    * @param responseText
	    * @param queryObj
	    * @returns {{}}
	    */
				p.transform = function (responseText, queryObj) {
					var rawRes = JSON.parse(responseText);
					var ROOT = rawRes.ROOT;
					var obj = {
						text: queryObj.text,
						to: queryObj.to || 'auto',
						response: rawRes,
						from: langTransform(ROOT.$LANG, true),
						linkToResult: this.link + 'search?q=' + queryObj.text
					};

					// 尝试获取错误消息
					try {
						var error = rawRes.ERR.$;
						if (error) {
							obj.error = error;
							return obj;
						}
					} catch (e) {}

					// 尝试获取详细释义
					try {
						var d = [];
						ROOT.DEF[0].SENS.forEach(function (v) {
							var s = v.$POS + '. ';
							if (Array.isArray(v.SEN)) {
								v.SEN.forEach(function (j) {
									s += j.D.$ + ' ';
								});
							} else {
								s += v.SEN.D.$;
							}
							d.push(s);
						});
						obj.detailed = d;
					} catch (e) {}

					// 尝试获取翻译结果
					try {
						obj.result = [ROOT.SMT.R.$.replace(/\{\d+#|\$\d+\}/g, '')];
					} catch (e) {}

					if (!obj.detailed && !obj.result) {
						obj.error = '必应翻译不支持此语种。';
						obj.from = ''; // 不支持的语种始终会被解析为 en，这是不正确的
					}
					return obj;
				};

				/**
	    * 使用必应翻译检测文本语种。
	    * @param queryObj
	    * @returns {Promise}
	    */
				p.detect = function (queryObj) {
					return new Promise(function (resolve) {
						var from = queryObj.from;
						if (langTransform(from)) {
							resolve(from);
						} else {
							resolve(null);
						}
					});
				};

				/**
	    * 暂时找不到必应的语音播放的接口。它网页上的语音播放没有规律可循。
	    * @returns {Promise}
	    */
				p.audio = function () {
					return Promise.resolve(null);
				};

				module.exports = Bing;

				/***/
			},
			/* 10 */
			/***/function (module, exports, __webpack_require__) {

				/**
	    * 谷歌翻译支持几乎所有语种，并且它的语种格式就是标准的。
	    */
				var request = __webpack_require__(2);
				var isEmpty = __webpack_require__(11);

				/**
	    * 谷歌翻译
	    */
				function Google() {
					this.name = '谷歌翻译';
					this.type = 'Google';
					this.translatePath = '/translate_a/single';
					this.link = 'https://translate.google.com';
					// To avoid browser same origin policy block request,
					// use googleapis as apiRoot in browser
					this.apiRoot = typeof window === 'object' && window.window === window ? Google.API_URL : this.link;
					this.audioRoot = this.link + '/translate_tts';
				}

				Google.API_URL = 'https://translate.googleapis.com';
				Google.ERROR = {
					UNKNOWN: '谷歌翻译发生了一个错误，可能是因为查询文本过长，或请求频率太高造成的。',
					NO_RESULT: '没有返回翻译结果，请稍后重试。'
				};

				var p = Google.prototype;

				// ISO839-1 Code from https://cloud.google.com/translate/docs/languages
				var supportedLang = ['af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bn', 'bs', 'bg', 'ca', 'ceb', 'ny', 'zh-CN', 'zh-TW', 'co', 'hr', 'cs', 'da', 'nl', 'en', 'eo', 'et', 'tl', 'fi', 'fr', 'fy', 'gl', 'ka', 'de', 'el', 'gu', 'ht', 'ha', 'haw', 'iw', 'hi', 'hmn', 'hu', 'is', 'ig', 'id', 'ga', 'it', 'ja', 'jw', 'kn', 'kk', 'km', 'ko', 'ku', 'ky', 'lo', 'la', 'lv', 'lt', 'lb', 'mk', 'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mn', 'my', 'ne', 'no', 'ps', 'fa', 'pl', 'pt', 'ma', 'ro', 'ru', 'sm', 'gd', 'sr', 'st', 'sn', 'sd', 'si', 'sk', 'sl', 'so', 'es', 'su', 'sw', 'sv', 'tg', 'ta', 'te', 'th', 'tr', 'uk', 'ur', 'uz', 'vi', 'cy', 'xh', 'yi', 'yo', 'zu'];

				/**
	    * 翻译的方法
	    * @param queryObj
	    * @returns {Promise}
	    */
				p.translate = function (queryObj) {
					var that = this;
					var acceptLanguage = queryObj.to ? queryObj.to + (queryObj.to.indexOf('-') > -1 ? ',' + queryObj.to.split('-')[0] : '') : 'en';
					acceptLanguage += ';q=0.8,en;q=0.6';
					return new Promise(function (resolve, reject) {
						request.get(that.apiRoot + that.translatePath).set('Accept-Language', acceptLanguage) // it affects dict language
						.query({
							// for detect language, just {client: 'gtx', sl: auto, dj: 1, ie: 'UTF-8', oe: 'UTF-8', q: 'test'}
							client: 'gtx',
							sl: queryObj.from || 'auto', // source language
							tl: queryObj.to || 'auto', // translated language
							dj: 1, // ensure return json is GoogleRes structure
							ie: 'UTF-8', // input string encoding
							oe: 'UTF-8', // output string encoding
							source: 'icon', // source
							q: queryObj.text, // text to be translated
							dt: ['t', 'bd'] // a list to add content to return json
							// possible dt values: correspond return json key
							// t: sentences
							// rm: sentences[1]
							// bd: dict
							// at: alternative_translations
							// ss: synsets
							// rw: related_words
							// ex: examples
							// ld: ld_result
						}).timeout(that.timeout).end(function (err, res) {
							if (err) {
								reject(err);
							} else {
								resolve(that.transform(res.body, queryObj));
							}
						});
					});
				};

				/**
	    * Google 翻译返回的数据结构
	    * @typedef {Object} GoogleRes
	    * @property {String} src - 原字符串语种，ISO839-1 格式，如果 queryObj dt 为空，则返回 json 只有这一个字段
	    * @property {Object[]} sentences
	    * @property {{trans: String, orig: String, backend: Number}} sentences[0] trans:翻译结果，orig:被翻译的字符串
	    * @property {{translit: String, src_translit: String}} sentences[1] translit:翻译结果音标，src_translit:原字符串音标
	    * @property {{pos: String, terms: String[], entry: Object[]}[]} dict 查词结果，只有请求单个单词翻译时会有，
	    * 中翻英经常有，小语种经常没有 pos:词性 terms:词语列表 entry:对每个词的详解
	    * @property {{srclangs: String[], srclangs_confidences: Number[], extended_srclangs: String[]}} ld_result
	    */
				/**
	    * 将谷歌翻译的数据转换为统一格式
	    * @param {GoogleRes} rawRes
	    * @param queryObj
	    * @returns {{}}
	    */
				p.transform = function (rawRes, queryObj) {
					var obj = {
						text: queryObj.text,
						to: queryObj.to || 'auto',
						response: rawRes
					};

					obj.linkToResult = this.link + '/#auto/' + obj.to + '/' + queryObj.text;

					if (typeof rawRes === 'string') {
						obj.error = Google.ERROR.UNKNOWN;
					} else {
						try {
							// 尝试获取详细释义
							obj.detailed = rawRes.dict.map(function (v) {
								return v.pos + '：' + (v.terms.slice(0, 3) || []).join(',');
							});
						} catch (e) {}
						try {
							// 尝试取得翻译结果
							var sentences = rawRes.sentences.filter(function (sentence) {
								return sentence.trans !== queryObj.text;
							});
							if (isEmpty(sentences)) {
								obj.from = null;
							} else {
								obj.from = rawRes.src;
								obj.result = sentences.map(function (sentence) {
									return sentence.trans;
								});
							}
						} catch (e) {}

						if (isEmpty(obj.detailed) && isEmpty(obj.result)) {
							obj.error = this.name + Google.ERROR.NO_RESULT;
						}
					}
					return obj;
				};

				/**
	    * 使用谷歌翻译检测文本语种。
	    * @param queryObj
	    * @returns {Promise}
	    */
				p.detect = function (queryObj) {
					var from = queryObj.from;
					if (from) {
						return supportedLang.indexOf(from) > -1 ? Promise.resolve(from) : Promise.resolve(null);
					}

					return this.translate(queryObj).then(function (result) {
						return result.from ? Promise.resolve(result.from) : Promise.resolve(null);
					});
				};

				/**
	    * 返回语音播放的 url
	    * @param queryObj
	    * @returns {Promise}
	    */
				p.audio = function (queryObj) {
					var that = this;
					return this.detect(queryObj).then(function (lang) {
						return supportedLang.indexOf(lang) > -1 ? that.audioRoot + '?ie=UTF-8&q=' + encodeURIComponent(queryObj.text) + '&tl=' + lang + '&client=gtx' : null;
					});
				};

				module.exports = Google;

				/***/
			},
			/* 11 */
			/***/function (module, exports) {

				/**
	    * This things are empty
	    * 1. undefined, null, void 0, [], {},
	    * 2. object with .length === 0,
	    * 3. object without a own enumerable property
	    * @param {Object} obj
	    * @return Boolean
	    */
				module.exports = function isEmpty(obj) {
					if (obj == null) return true;
					if (obj.length !== undefined) return obj.length === 0;
					return Object.keys(obj).length === 0;
				};

				/***/
			},
			/* 12 */
			/***/function (module, exports, __webpack_require__) {

				var Google = __webpack_require__(10);

				function GoogleCN(config) {
					Google.call(this, config);
					this.name = '谷歌翻译（国内）';
					this.type = 'GoogleCN';
					this.link = 'https://translate.google.cn';
					this.audioRoot = this.link + '/translate_tts';
					// To avoid browser same origin policy block request,
					// use googleapis as apiRoot in browser
					this.apiRoot = typeof window === 'object' && window.window === window ? Google.API_URL : this.link;
				}

				GoogleCN.prototype = Object.create(Google.prototype);
				GoogleCN.prototype.constructor = GoogleCN;

				module.exports = GoogleCN;

				/***/
			}
			/******/])
		);
	});
	;

/***/ },

/***/ "MjTT":
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	// get keyword from selected text
	let getSelection = (() => {
	  var _ref = _asyncToGenerator(function* (tabUrl) {
	    if (!tabUrl.isNormal) {
	      return _const.EMPTY_KEYWORDS;
	    }
	    // @TODO move it to contentScript.js, and execute while select change
	    // @TODO don't block popup here
	    var selection = yield chromeTabsProxy.executeScript({
	      code: 'window.getSelection().toString();',
	      allFrames: true
	    });

	    selection = (0, _base.filterEmptyStr)(selection).filter(function (selectStr) {
	      return selectStr.length <= _config2.default.selectionMaxLength;
	    });
	    // @TODO add all selection to auto-complete suggestion list
	    if (!_lodash2.default.isEmpty(selection)) {
	      return [{
	        word: selection[0],
	        confidence: _const.CONFIDENCE_PARAM.selection
	      }];
	    }
	    return _const.EMPTY_KEYWORDS;
	  });

	  return function getSelection(_x) {
	    return _ref.apply(this, arguments);
	  };
	})();

	// get keyword from tab url


	let getQueryString = (() => {
	  var _ref2 = _asyncToGenerator(function* (tabUrl) {
	    if (tabUrl.isGoogleFail) {
	      tabUrl = new _Url2.default(decodeURIComponent(tabUrl.getQueryVal('continue')));
	    }

	    let keys = yield _Engine2.default.searchKeys(tabUrl.host, false, true);
	    (0, _base.clog)('searched keys', keys, tabUrl.host);
	    if (keys.length <= 0) {
	      return _const.EMPTY_KEYWORDS;
	    }
	    // TODO: filter all engines here, not only keys[0]. Keep the matched(resultPageRegex), and if no matched, return EMPTY_KEYWORDS
	    // TODO: if there are two or more engine, use the open engine first
	    let engine = yield _Engine2.default.get(keys[0]);

	    try {
	      engine.resultPageRegex = engine.resultPageRegex || _lodash2.default.escapeRegExp(new _Url2.default(engine.url.split('%s', 1)[0]).pathName);
	      if (engine.resultPageRegex) {
	        let resultPageRegex = new RegExp(engine.resultPageRegex);
	        (0, _base.clog)(resultPageRegex);
	        if (!resultPageRegex.test(tabUrl.url)) {
	          (0, _base.clog)('Matched a engine, but not a result page. resultPageRegex: ', resultPageRegex);
	          return _const.EMPTY_KEYWORDS;
	        }
	      }
	    } catch (e) {
	      (0, _base.clog)('Error while try to test url', e);
	    }

	    if (engine.wordRegex) {
	      let wordRegex = new RegExp(engine.wordRegex);
	      (0, _base.clog)('wordRegex', wordRegex, 'tabUrl:', tabUrl.url);
	      let match = tabUrl.url.match(wordRegex);

	      return match ? [{
	        word: tabUrl.isWeiboUrl ? decodeURIComponent(decodeURIComponent(match[1])) : decodeURIComponent(match[1]),
	        confidence: _const.CONFIDENCE_PARAM.searchString
	      }] : _const.EMPTY_KEYWORDS;
	    }

	    let searchKey = new _Url2.default(engine.url).searchKey;
	    // TODO support no queryPairs engine
	    (0, _base.clog)('queryPairs:', tabUrl.queryPairs);
	    let searchStrings = _lodash2.default.filter(tabUrl.queryPairs, { key: searchKey });
	    if (!searchStrings.length) {
	      return _const.EMPTY_KEYWORDS;
	    }

	    let searchString = /google/.test(tabUrl.host) ? _lodash2.default.last(searchStrings).val : searchStrings[0].val;
	    (0, _base.clog)('match searchString from url:', searchString);
	    return searchString ? [{
	      word: decodeURIComponent(searchString),
	      confidence: _const.CONFIDENCE_PARAM.searchString
	    }] : _const.EMPTY_KEYWORDS;
	  });

	  return function getQueryString(_x2) {
	    return _ref2.apply(this, arguments);
	  };
	})();

	/**
	 * get keyword of current tab
	 * @return {{word:String, confidence: Number}[]} a Promise resolve an Array order by string frequency
	 * */


	let smartKeyword = (() => {
	  var _ref3 = _asyncToGenerator(function* (tabUrl) {
	    if (!tabUrl.isNormal) {
	      return _const.EMPTY_KEYWORDS;
	    }
	    let result = yield chromeTabsProxy.executeScript({
	      file: __webpack_require__("Kyhl")
	    });

	    let unfiltered = result[0];
	    if (!unfiltered) return _const.EMPTY_KEYWORDS;

	    let keywords = {};
	    Object.keys(unfiltered).forEach(function (key) {
	      keywords[key] = (0, _base.filterEmptyStr)(unfiltered[key]);
	    });

	    let keys = yield _Engine2.default.searchKeys(tabUrl.host, true);
	    let siteKeywords = null;
	    if (keys.length > 0) {
	      let engine = yield _Engine2.default.get(keys[0]);
	      siteKeywords = engine.siteKeywords || [];
	      (0, _base.clog)('configured siteKeywords:', siteKeywords);
	    }

	    (0, _base.clog)('content script result: ', [tabUrl.url, keywords.meta, keywords.title, keywords.h1, keywords.h2, siteKeywords]);
	    return (0, _smartKeyword2.default)(tabUrl, keywords.meta, keywords.title, keywords.h1, keywords.h2, siteKeywords);
	  });

	  return function smartKeyword(_x3) {
	    return _ref3.apply(this, arguments);
	  };
	})();

	/**
	 * @param {Url} tabUrl
	 * @return {Promise} resolve {{word: String, confidence: Number}[]}
	 * */


	let getKeyword = (() => {
	  var _ref4 = _asyncToGenerator(function* (tabUrl) {
	    let keywords = yield getSelection(tabUrl);
	    if (!_lodash2.default.isEqual(keywords, _const.EMPTY_KEYWORDS)) return keywords;

	    keywords = yield getQueryString(tabUrl);
	    if (!_lodash2.default.isEqual(keywords, _const.EMPTY_KEYWORDS)) return keywords;

	    keywords = yield smartKeyword(tabUrl);
	    return keywords;
	  });

	  return function getKeyword(_x4) {
	    return _ref4.apply(this, arguments);
	  };
	})();

	var _lodash = __webpack_require__("y7q8");

	var _lodash2 = _interopRequireDefault(_lodash);

	var _config = __webpack_require__("wYMm");

	var _config2 = _interopRequireDefault(_config);

	var _base = __webpack_require__("5a/Z");

	var _Engine = __webpack_require__("gLfi");

	var _Engine2 = _interopRequireDefault(_Engine);

	var _Url = __webpack_require__("tDBr");

	var _Url2 = _interopRequireDefault(_Url);

	var _ChromeAsync = __webpack_require__("cY+b");

	var _ChromeAsync2 = _interopRequireDefault(_ChromeAsync);

	var _const = __webpack_require__("+9hk");

	var _smartKeyword = __webpack_require__("ney3");

	var _smartKeyword2 = _interopRequireDefault(_smartKeyword);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

	let chromeAsync = new _ChromeAsync2.default(chrome);
	let chromeTabsProxy = chromeAsync.proxy(chrome.tabs);exports.default = getKeyword;

/***/ },

/***/ "28sW":
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ "cY+b":
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * proxy chrome apis
	 * @usage let chromeAsync = new ChromeAsync(chrome);
	 * let tabsProxy = chromeAsync.proxy(chrome.tabs);
	 * Created by ray7551@gmail.com on 12.10 010.
	 */

	class ChromeAsync {
	  constructor(chrome) {
	    this.chrome = chrome;
	    this.cache = {};
	  }

	  proxy(target) {
	    let that = this;
	    return new Proxy(target, {
	      get: function (target, key) {
	        if (that.cache[key]) {
	          return that.cache[key];
	        }
	        if (!(key in target)) {
	          throw new Error(`chromeAsync proxyErr: no property name ${ key }`);
	        }
	        let type = typeof target[key];
	        if (target[key] === null || ['undefined', 'boolean', 'number', 'string'].includes(type)) {
	          return that.cache[key] = target[key];
	        }
	        if (type !== 'function') {
	          return undefined;
	        }

	        // @TODO make it support chromeAsync.tabs.query
	        return that.cache[key] = function (...args) {
	          return new Promise((resolve, reject) => {
	            target[key](...args, function proxyCallback() {
	              if (that.chrome.runtime.lastError) {
	                return reject(new Error(key + 'Err' + that.chrome.runtime.lastError.message));
	              }
	              return resolve(...arguments);
	            });
	          });
	        };
	      }
	    });
	  }
	}

	exports.default = ChromeAsync;

/***/ },

/***/ "+9hk":
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EMPTY_KEYWORDS = exports.CONFIDENCE_MIN = exports.CONFIDENCE_PARAM = exports.KEYWORD_BLACKLIST = exports.PRINTABLE_EXTEND = exports.PRINTABLE_ASCII = exports.CJK_PUNCT = exports.CJK = exports.PUNCT_FLATTEN = exports.SPACES = exports.PUNCT = undefined;

	var _base = __webpack_require__("5a/Z");

	// Punctuations, excluding spaces
	// https://en.wikipedia.org/wiki/Punctuation_of_English
	const PUNCT = {
	  // punctuations
	  apostrophe: ['’', '\''],
	  brackets: ['[', ']', '(', ')', '{', '}', '⟨', '⟩', '（', '）', '【', '】'],
	  colon: [':', '：'],
	  comma: [',', '،', '、', '，'],
	  dash: ['-', '‐', '‒', '–', '—', '―'],
	  ellipsis: ['…', '...'],
	  exclamation: ['!', '！'],
	  period: ['.', '。'],
	  guillemets: {
	    left: ['‹', '«', '《', '〈', '『'],
	    right: ['›', '»', '》', '〉', '』']
	  },
	  question: ['?', '？'],
	  quotation: ['‘', '’', '“', '”', '\'', '\'', '"', '「', '」'],
	  semicolon: [';', '；'],
	  slash: ['/', '⁄', '\\'],
	  math: ['`', '+', '=', '<', '>', '°'],
	  // word dividers
	  interpunct: ['·', '・', '･'],
	  block: ['¶', '§'],

	  // typography
	  verticalBar: ['|', '¦', '‖', '∣'],
	  tilde: ['~', '˜', '∼'],
	  at: ['@'],
	  hash: ['#'],
	  currency: ['¤', '￥', '$', '€', '£'], // "₳", "฿", "₵", "¢", "₡", "₢", "₫", "₯", "֏", "₠", "ƒ", "₣", "₲", "₴", "₭", "₺", "ℳ", "₥", "₦", "₧", "₱", "₰", "៛", "₽", "₹", "₨", "₪", "৳", "₸", "₮", "₩"],
	  per: ['%', '‰', '‱'],
	  caret: ['^', '‸'],
	  ampersand: ['&'],
	  asterisk: ['*'],
	  underscore: ['_'],
	  ip: ['©', '℗', '®', '℠', '™']
	}; /**
	    * Created by ray7551@gmail.com on 12.14 014.
	    */

	const SPACES = [' ', ' ', ' ', '	'];

	let PUNCT_FLATTEN = (0, _base.deepValue)(PUNCT);
	/**
	 * keyword blacklist
	 * @notice all in lower case
	 * @see https://en.wikibooks.org/wiki/English_in_Use/Prepositions,_Conjunctions,_and_Interjections
	 */
	const KEYWORD_BLACKLIST = [...PUNCT_FLATTEN, 'i', 'me', 'you', 'he', 'she', 'they', 'it', 'one', 'there', 'that', 'this', 'other', 'some', 'someone', 'something', 'any', 'anybody', 'anything', 'my', 'your', 'his', 'her', 'there', 'own', 'the', 'a', 'my', 'more', 'much', 'either', 'while', 'meanwhile', 'be', 'is', 'isn\'t', 'isnt', 'am', 'ain\'t', 'aint', 'are', 'have', 'has', 'get', 'gets', 'got', 'was', 'wasnt', 'no', 'not', 'what', 'when', 'who', 'how', 'why', 'whereas', 'whether', 'very', 'so', 'most', 'least', 'all', 'only', 'just', 'but', 'do', 'doing', 'did', 'does', 'can', 'cannot', 'can\'t', 'up', 'should', 'would',
	// https://en.wikipedia.org/wiki/List_of_English_prepositions
	'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among', 'around', 'at', 'by', 'before', 'behind', 'below', 'beneath', 'beside', 'besides', 'between', 'beyond', 'during', 'except', 'for', 'from', 'in', 'into', 'of', 'off', 'on', 'over', 'past', 'through', 'to', 'toward', 'towards', 'under', 'underneath', 'until', 'with', 'without',
	// Conjunctions
	'and', 'as', 'both', 'because', 'even', 'for', 'if', 'that', 'then', 'since', 'seeing', 'so', 'or', 'nor', 'either', 'neither', 'than', 'though', 'although', 'yet', 'but', 'except', 'lest', 'unless'];

	/**
	 * @see http://www.unicode.org/reports/tr38/#BlockListing
	 * #Katakana 30A0–30FF
	 * #Hiragana 3040–309F
	 * Hangul Jamo  1100–11FF
	 * #CJK Unified Ideographs 4E00–9FD5
	 * #Hangul Syllables AC00–D7AF
	 * CJK Unified Ideographs Extension A 3400–4DB5
	 * #: most frequently used
	 */
	const CJK = _base.regex`\u30A0-\u30FF\u3040-\u309F\u1100-\u11FF\u4E00-\u9FD5`;

	// CJK punct excluding guillemets
	const CJK_PUNCT = '，。？！·‘’“”；：【】…（）—';

	// printable ASCII excluding spaces
	const PRINTABLE_ASCII = _base.regex`\u0021-\u007E`;
	// printable latin letters, punctuations, symbols, but excluding spaces
	// https://en.wikipedia.org/wiki/Latin_script_in_Unicode
	const PRINTABLE_EXTEND = _base.regex`\u0021-\u007E\u00A1–\u02FF\u1D00–\u1DBF\u1E00–\u1EFF\u2070–\u218F\u2C60–\u2C7F\uA720–\uA7FF\uAB30–\uAB6F\uFF00–\uFFEF`;

	// const CONFIDENCE = 1;
	const CONFIDENCE_PARAM = {
	  map: { base: 1, site: .1, vip: .49, originVip: 1.5 }, // for initialize candidateWords map
	  match: { title: 1, meta: 1, h1: 1, h2: .1, pathName: 1, queryPairs: .1 }, // for _matchKeyword()
	  keyword: { title: .35, h1: .4, h2: .05, pathName: .2, queryPairs: .1 }, // for divided keywords
	  searchString: 1, // must greater than CONFIDENCE_MIN
	  selection: 1 // must greater than CONFIDENCE_MIN
	};
	const CONFIDENCE_MIN = .99;
	const EMPTY_KEYWORDS = [{
	  word: '',
	  confidence: 0
	}];
	exports.PUNCT = PUNCT;
	exports.SPACES = SPACES;
	exports.PUNCT_FLATTEN = PUNCT_FLATTEN;
	exports.CJK = CJK;
	exports.CJK_PUNCT = CJK_PUNCT;
	exports.PRINTABLE_ASCII = PRINTABLE_ASCII;
	exports.PRINTABLE_EXTEND = PRINTABLE_EXTEND;
	exports.KEYWORD_BLACKLIST = KEYWORD_BLACKLIST;
	exports.CONFIDENCE_PARAM = CONFIDENCE_PARAM;
	exports.CONFIDENCE_MIN = CONFIDENCE_MIN;
	exports.EMPTY_KEYWORDS = EMPTY_KEYWORDS;

/***/ },

/***/ "ney3":
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _lodash = __webpack_require__("y7q8");

	var _lodash2 = _interopRequireDefault(_lodash);

	var _base = __webpack_require__("5a/Z");

	var _const = __webpack_require__("+9hk");

	var _wordHelper = __webpack_require__("I2Te");

	var _PriorityMap = __webpack_require__("tEcJ");

	var _PriorityMap2 = _interopRequireDefault(_PriorityMap);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	const keywordType = {
	  meta: Symbol(),
	  title: Symbol(),
	  h1: Symbol(),
	  h2: Symbol(),
	  url: Symbol()
	};

	/**
	 * @param {Url} tabUrl
	 * @param {String[]} meta
	 * @param {String} title
	 * @param {String} h1
	 * @param {String[]} h2
	 * @param {String[]} [siteKeywords=[]]
	 * */
	/**
	 * Intelligently get page's keyword, based on url, title, heading, keyword meta
	 * Created by ray7551@gmail.com on 12.10 010.
	 */
	function smartKeyword(tabUrl, meta, title, h1, h2, siteKeywords) {
	  siteKeywords = siteKeywords || [];
	  let candidateWords = new _PriorityMap2.default(tabUrl, _const.CONFIDENCE_PARAM.map, siteKeywords);

	  meta = _lodash2.default.flatten(meta.map(metaStr => (0, _wordHelper.divide)(metaStr)));
	  title = _fixSpaces(title);
	  h1 = _fixSpaces(h1);
	  (0, _base.clog)('divided meta:', meta);

	  // add original marked words to vipWords
	  (0, _wordHelper.forEachMarked)(title + h1, marked => {
	    candidateWords.addVipWords(marked, _const.CONFIDENCE_PARAM.map.originVip);
	  });

	  // marked words then add to vipWords
	  let titleMarked = (0, _wordHelper.markVipKeyword)(title),
	      h1Marked = (0, _wordHelper.markVipKeyword)(h1);
	  (0, _wordHelper.forEachMarked)(titleMarked + h1Marked, marked => {
	    candidateWords.addVipWords(marked, _const.CONFIDENCE_PARAM.map.vip);
	  });
	  (0, _base.clog)('Marked title:', titleMarked);
	  (0, _base.clog)('Marked h1', h1Marked);
	  (0, _base.clog)('vipWords:', JSON.stringify([...candidateWords.vipWords]));
	  (0, _base.clog)('siteWords:', JSON.stringify([...candidateWords.siteKeywords]));
	  // clog(tabUrl.url, meta, title, h1, h2);

	  if (_isQualified(candidateWords.vipArray, 2 * _const.CONFIDENCE_MIN)) {
	    (0, _base.clog)('use good vip keywords');
	    return candidateWords.vipArray;
	  }

	  // 1. without any divide, use meta keyword
	  // see if keywords.meta[i] appeared in title, head or tabUrl, use meta as keyword array
	  _matchKeywords(meta, keywordType.meta);
	  if (_isQualified(candidateWords.orderedArray)) {
	    (0, _base.clog)('use meta keywords');
	    return candidateWords.orderedArray;
	  }

	  // 2. completely divide all string into words(excluding meta keyword)
	  // get frequently appeared words as keyword array(ordered by priority)
	  // TODO: don't divide dash and dot between a-zA-Z0-9, in case of No.3 ANGULAR-2
	  candidateWords.clear();
	  let punctuations = _lodash2.default.chain(_const.PUNCT_FLATTEN).reduce(_lodash2.default.add);
	  // lodash.escapeRegExp will escape [], and \s is not properly escaped, so put them outside
	  let punctuationsRegex = '[' + _lodash2.default.escapeRegExp(punctuations) + '\\s]+|\\b';
	  let SEPARATE_REGEX = _getDividerRegex(punctuationsRegex, 'g');
	  (0, _base.clog)('separate regex', SEPARATE_REGEX);

	  let divideUrl = _lodash2.default.flow(_replaceUnderscore, str => str.split(SEPARATE_REGEX), _base.filterEmptyStr, _lodash2.default.uniq);
	  divideUrl(tabUrl.pathName).forEach(pathWord => {
	    candidateWords.increaseConfidence(pathWord, _const.CONFIDENCE_PARAM.keyword.pathName);
	  });
	  let divideStr = _lodash2.default.flow(_replaceUnderscore, _fixHyphen, str => str.split(SEPARATE_REGEX), _base.filterEmptyStr, _lodash2.default.uniq);
	  titleMarked = (0, _wordHelper.forEachMarked)(titleMarked, marked => {
	    candidateWords.increaseConfidence(marked, _const.CONFIDENCE_PARAM.keyword.title);
	  });
	  h1Marked = (0, _wordHelper.forEachMarked)(h1Marked, marked => {
	    candidateWords.increaseConfidence(marked, _const.CONFIDENCE_PARAM.keyword.h1);
	  });
	  titleMarked && divideStr(titleMarked).forEach(word => {
	    candidateWords.increaseConfidence(word, _const.CONFIDENCE_PARAM.keyword.title);
	  });
	  h1Marked && divideStr(h1Marked).forEach(word => {
	    candidateWords.increaseConfidence(word, _const.CONFIDENCE_PARAM.keyword.h1);
	  });
	  Array.isArray(h2) && h2.forEach(h2 => {
	    divideStr(h2).forEach(word => candidateWords.increaseConfidence(word, _const.CONFIDENCE_PARAM.keyword.h2));
	  });

	  (0, _base.clog)('most frequently appeared words: ', JSON.stringify(candidateWords.orderedArray));
	  if (_isQualified(candidateWords.orderedArray)) {
	    (0, _base.clog)('use divide keywords');
	    return candidateWords.orderedArray;
	  }

	  // 3. divide title with common separator
	  candidateWords.clear();
	  let divider = _lodash2.default.chain([..._const.PUNCT.dash, ..._const.PUNCT.verticalBar, ..._const.PUNCT.colon, ..._const.PUNCT.brackets, ..._const.PUNCT.comma, ..._const.PUNCT.question, ..._const.PUNCT.exclamation, ..._const.PUNCT.guillemets.left, ..._const.PUNCT.guillemets.right]).reduce(_lodash2.default.add);
	  let dividerStr = '[' + _lodash2.default.escapeRegExp(divider) + ']+|-{2,}';
	  let divideTitleRegExp = _getDividerRegex(dividerStr);
	  (0, _base.clog)(divideTitleRegExp);
	  let divideTitle = _lodash2.default.flow(_replaceUnderscore, _replaceSpaces, _fixHyphen, str => str.split(divideTitleRegExp), _base.filterEmptyStr, _lodash2.default.uniq);
	  let titleKeywords = divideTitle(title);
	  (0, _base.clog)('titleKeywords:', titleKeywords);
	  _matchKeywords(titleKeywords, keywordType.title);

	  if (_isQualified(candidateWords.orderedArray)) {
	    (0, _base.clog)('use title keywords');
	    return candidateWords.orderedArray;
	  }
	  (0, _base.clog)('vip array', candidateWords.vipArray);
	  if (_isQualified(candidateWords.vipArray)) {
	    (0, _base.clog)('use vip keywords');
	    return candidateWords.vipArray;
	  }

	  (0, _base.clog)('failed to get smartKeyword');
	  return _const.EMPTY_KEYWORDS;

	  function _matchKeywords(keywords, ignore) {
	    for (let keyword of keywords) {
	      if (ignore !== keywordType.title && title.includeString(keyword)) {
	        candidateWords.increaseConfidence(keyword, _const.CONFIDENCE_PARAM.match.title);
	      }
	      if (ignore !== keywordType.url) {
	        if (tabUrl.pathName.includeString(keyword)) {
	          candidateWords.increaseConfidence(keyword, _const.CONFIDENCE_PARAM.match.pathName);
	        }
	        tabUrl.queryPairs.map(pair => {
	          if (pair.val.includeString(keyword, pair.val.length >= 2)) {
	            candidateWords.increaseConfidence(keyword, _const.CONFIDENCE_PARAM.match.queryPairs);
	          }
	        });
	      }
	      ignore !== keywordType.meta && meta.forEach(metaKeyword => {
	        if (metaKeyword.includeString(keyword, true)) {
	          candidateWords.increaseConfidence(keyword, _const.CONFIDENCE_PARAM.match.meta);
	        }
	      });
	      if (ignore !== keywordType.h1 && h1.includeString(keyword)) {
	        candidateWords.increaseConfidence(keyword, _const.CONFIDENCE_PARAM.match.h1);
	      }
	      ignore !== keywordType.h2 && h2.forEach(function (h2) {
	        if (h2.includeString(keyword)) {
	          candidateWords.increaseConfidence(keyword, _const.CONFIDENCE_PARAM.match.h2);
	        }
	      });
	    }
	  }

	  function _isQualified(orderedArray, minConfidence = _const.CONFIDENCE_MIN) {
	    return !_lodash2.default.isEmpty(orderedArray) && orderedArray[0].confidence > minConfidence;
	  }

	  /**
	   * Escape '-' within a character set, but lodash.escapeRegExp will not do this.
	   * It's for avoiding this error:
	   * /^[.*-(]+$/.test('.*-'); // SyntaxError: Invalid regular expression: /^[.*-(]+$/: Range out of order in character class
	   * @param divider
	   * @param modifier
	   * @return {RegExp}
	   * @private
	   */
	  function _getDividerRegex(divider, modifier) {
	    let escapedStr = divider.replace(/(^.*[^\\]?\[.*)-(.*\])/g, '$1\\-$2');
	    return new RegExp(escapedStr, modifier);
	  }

	  function _replaceSpaces(str, replace = '|') {
	    replace = `$1${ replace }$2`;
	    return str.replace(/(\W)\s+(\W)/g, replace).replace(/(\W)\s+([a-z])/ig, replace).replace(/([a-z])\s+(\W)/ig, replace);
	  }

	  function _replaceUnderscore(str, replace = '|') {
	    replace = `$1${ replace }$2`;
	    return str.replace(/(\W)_+(\W)/g, replace).replace(/(\W)_+(\w)/g, replace).replace(/(\w)_+(\W)/g, replace);
	  }

	  /**
	   * replace multiple spaces and return to one space
	   * */
	  function _fixSpaces(str) {
	    return str.replace(/\s+/g, ' ').replace(/(\s+No\.)\s+(\d+)\b/ig, ' No.$2');
	  }
	  function _fixHyphen(str, replace = '') {
	    replace = `$1${ replace }$2`;
	    let hyphens = _const.PUNCT.dash.reduce((hyphens, current) => {
	      hyphens += current;
	      return hyphens;
	    }, '');
	    let regex = _getDividerRegex(`(\w)[${ hyphens }]+(\w)`, 'g');
	    return str.replace(regex, replace);
	  }
	}

	exports.default = smartKeyword;

/***/ },

/***/ "I2Te":
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.forEachMarked = exports.removeMarked = exports.divide = exports.markName = exports.markEnds = exports.markEnWord = exports.markUpperWord = exports.markVipKeyword = undefined;

	var _base = __webpack_require__("5a/Z");

	var _const = __webpack_require__("+9hk");

	// ASCII characters those not break word meaning
	/**
	 * mark very important keywords, which are:
	 * 1. English words(at least 2 [a-zA-Z] characters) surrounded by CJK characters
	 * 2. Uppercase words(at least first 2 character are uppercase)
	 * 3. Names(at least 2 words, and every word has capitalized first letter)
	 * @author ray7551@gmail.com
	 */
	const ASCII_CHAR = _base.regex`a-zA-Z\d~&*+'\-`;
	const ASCII_PUNCT = _base.regex`/_,\.<>\?\`!@#\$%\^=";\:\[\]{}\|\(\)\\`;
	const lGuimets = _const.PUNCT.guillemets.left.reduce((all, current) => {
	  all += current;
	  return all;
	}, '');
	const rGuimets = _const.PUNCT.guillemets.right.reduce((all, current) => {
	  all += current;
	  return all;
	}, '');

	let markUpperWord = function (str) {
	  let upperSubstrRegex = new RegExp(_base.regex`
	    (^|[^${ _const.CJK }a-zA-Z${ lGuimets }])
	    (
	      [A-Z]{2,}[${ ASCII_CHAR }]*
	      (?:\s+[A-Z]{2,}[${ ASCII_CHAR }]*)*
	    )
	    \b
	    (?![${ _const.CJK }${ rGuimets }]|\s+[A-Z]{2,})
	  `, 'g'); // ((\s+(?![A-Z]))?)
	  return str.replace(upperSubstrRegex, '$1《$2》');
	};

	let markEnWord = function (str) {
	  // let vipSubstrRegex = new RegExp(regex`(^|[${CJK}${CJK_PUNCT}${rGuimets}]|\s)([a-z]{2,}[${ASCII_CHAR}]*(?:\s+[${ASCII_CHAR}]+)*)([${CJK}${CJK_PUNCT}${lGuimets}]|\s)`, 'ig');
	  let vipSubstrRegex0 = new RegExp(_base.regex`(^)(\s*)([a-z]{2,}[${ ASCII_CHAR }]*(?:\s+[${ ASCII_CHAR }]+)*)(_*)\b(\s*|[${ ASCII_PUNCT }]*)([${ _const.CJK }])`, 'ig');
	  let vipSubstrRegex1 = new RegExp(_base.regex`([${ _const.CJK }])(\s*)([a-z]{2,}[${ ASCII_CHAR }]*(?:\s+[${ ASCII_CHAR }]+)*)\b`, 'ig');
	  let vipSubstrRegex2 = new RegExp(_base.regex`([${ rGuimets }${ _const.CJK_PUNCT }])(\s*)([a-z]{2,}[${ ASCII_CHAR }]*(?:\s+[${ ASCII_CHAR }]+)*)\b([^${ ASCII_PUNCT }\s])`, 'ig');
	  let vipSubstrRegex3 = new RegExp(_base.regex`([${ ASCII_PUNCT }])(\s*)([a-z]{2,}[${ ASCII_CHAR }]*(?:\s+[${ ASCII_CHAR }]+)*)(_*)\b(\s*|[${ ASCII_PUNCT }]*)([${ _const.CJK }])`, 'ig');
	  let modify = function (match, p1, p2, p3, p4) {
	    return p2 ? `${ p1 }${ p2 }《${ p3 }》${ p4 }` : `${ p1 }《${ p3 }》${ p4 }`;
	  };
	  return str.replace(vipSubstrRegex0, (match, p1, p2 = '', p3, p4 = '', p5 = '', p6) => {
	    return `${ p1 }${ p2 }《${ p3 }》${ p4 }${ p5 }${ p6 }`;
	  }).replace(vipSubstrRegex1, (match, p1, p2, p3) => {
	    return p2 ? `${ p1 }${ p2 }《${ p3 }》` : `${ p1 }《${ p3 }》`;
	  }).replace(vipSubstrRegex2, modify).replace(vipSubstrRegex3, (match, p1, p2 = '', p3, p4 = '', p5 = '', p6) => {
	    return `${ p1 }${ p2 }《${ p3 }》${ p4 }${ p5 }${ p6 }`;
	  });
	};

	let markEnds = function (str) {
	  let beginRegex = new RegExp(_base.regex`^([${ ASCII_CHAR }]+)》`);
	  let tailRegex = new RegExp(_base.regex`《([${ ASCII_CHAR }]+)$`);
	  return str.replace(beginRegex, '《$1》').replace(tailRegex, '《$1》');
	};

	let markName = function (str) {
	  let validCharacter = _base.regex`A-Za-zÀ-ÿ`;
	  let name = _base.regex`[A-Z][${ validCharacter }]+`;
	  let subElement = _base.regex`
	    (?:
	      (?:[Nn][roº]|[oO]p) # match string like 'No.3', 'Nr 3', 'Nº 3', 'op.13'
	      .\s?\d+
	    )
	    |(?:${ name })
	  `;
	  let nameRegex1 = new RegExp(_base.regex`
	    (^|[^${ _const.CJK }a-zA-Z${ lGuimets }])
	    (
	      (?:${ subElement })
	      (?:\s+(?:${ subElement }))+
	    )
	    \b
	    (?![${ _const.CJK }${ rGuimets }])
	  `, 'g'); // ((\s+(?![A-Z]))?)
	  // /[A-Z][a-z]+\s*[-_/]\s*[A-Z][a-z]+/.test('javascript - Mocha / Chai expect.se')
	  let nameRegex2 = new RegExp(_base.regex`
	    (^|[^${ _const.CJK }a-zA-Z${ lGuimets }])
	    (
	      (?:${ subElement })
	      (?:\s*[-_/]\s*(?:${ subElement }))+
	    )
	    (?![${ _const.CJK }${ rGuimets }])
	  `, 'g');
	  return str.replace(nameRegex1, (match, p1, p2) => {
	    let dividedName = p2.split(/\s+/g);
	    for (let name of dividedName) {
	      if (_const.KEYWORD_BLACKLIST.includes(name.toLowerCase())) return match;
	    }
	    return `${ p1 }《${ p2 }》`;
	  }).replace(nameRegex2, (match, p1 = '', p2) => {
	    let dividedName = p2.split(/[-_/]+|\s+/g);
	    for (let name of dividedName) {
	      if (_const.KEYWORD_BLACKLIST.includes(name.toLowerCase())) return match;
	    }
	    if (/\//.test(p2)) {
	      p2 = p2.replace(/(\s*)\/(\s*)/, '》$1/$2《');
	    }
	    return `${ p1 }《${ p2 }》`;
	  });
	};

	// 《p1》\s*《p2》 -> 《p1\s?p2》
	let concat = function (str) {
	  return str.replace(/》(\s*)《/g, ' ');
	};

	let markVipKeyword = function (str) {
	  return concat(markEnWord(markUpperWord(markName(str))));
	};

	/**
	 * @param {String} str
	 * @return {String[]}
	 * */
	let divide = function (str) {
	  // dividers, not include \s
	  let commonDivider = _base.regex`\,，。\<\>《》、\/\[\]\{\}・…`;
	  let regLeft = new RegExp(_base.regex`
	    ([${ _const.CJK }])\s+(.)
	  `, 'g');
	  let regRight = new RegExp(_base.regex`
	    (.)\s+([${ _const.CJK }])
	  `, 'g');
	  let require = new RegExp(_base.regex`[${ commonDivider }]+`, 'g');
	  return str.replace(regLeft, '$1|$2').replace(regRight, '$1|$2').replace(require, '|').split('|').map(word => {
	    return (0, _base.trim)(word, _base.regex`\.`);
	  }).filter(word => word);
	};

	let removeMarked = function (str) {
	  return str.replace(/《[^》]*》/g, ' ');
	};

	let forEachMarked = function (str, fn, remove) {
	  remove = remove === undefined ? true : !!remove;
	  let matched = (0, _base.match)(str, /《([^《》]+)》/g) || [];
	  matched.forEach(match => {
	    fn(match[1]);
	  });
	  return !remove ? str : str.replace(/《([^《》]+)》/g, ' ');
	};

	exports.default = markVipKeyword;
	exports.markVipKeyword = markVipKeyword;
	exports.markUpperWord = markUpperWord;
	exports.markEnWord = markEnWord;
	exports.markEnds = markEnds;
	exports.markName = markName;
	exports.divide = divide;
	exports.removeMarked = removeMarked;
	exports.forEachMarked = forEachMarked;

/***/ },

/***/ "Kyhl":
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "js/contentScript.js";

/***/ }

});