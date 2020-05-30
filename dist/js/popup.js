webpackJsonp([0],{

/***/ "+9hk":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

/***/ }),

/***/ "0NI0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = __webpack_require__("5a/Z");

var _lodash = __webpack_require__("y7q8");

__webpack_require__("jc4J");

var _translation = __webpack_require__("qtYd");

var tjs = _interopRequireWildcard(_translation);

var _config = __webpack_require__("wYMm");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let searchBoxErr = (0, _base.minErr)('searchBox');
class SearchBox {

  /**
   * @eventOrder For input element, the event order is keydown->keypress->input & updated->keyup,
   *  Handlers can get the new input element value AFTER keypress.
   *  If you press a arrow key, enter, shift, ctrl, there are no keypress and input event.
   *  See http://jsbin.com/pusicuxanu/2
   * @param {HTMLElement} $element
   * @param {Array} engines
   * @param {Function} selectEngineFn
   * @param {Function} onKeyup
   * @param {Function} onKeydown
   * @param {Function} onUpdated
   */
  constructor({ $element, engines, selectEngineFn = null, onKeyup = null, onKeydown = null, onUpdated = null }) {
    this.suggestions = [];

    this.$keyword = $element.querySelector(SearchBox.selectors.keyword);
    this.$translation = $element.querySelector(SearchBox.selectors.translation);
    this._$translationText = this.$translation.querySelector('span');
    this.$tip = $element.querySelector('.searchBox__tip');
    this.engines = engines;
    this.suggestions.concat((0, _base.deepValue)(engines));

    this.$translation.addEventListener('mouseleave', () => {
      this._hideTranslation();
    });

    this.$keyword.focus();

    this.addKeydownHandler(e => {
      // replace $keyword value with placeholder
      if (e.key === 'Tab') {
        if (this.value === '') {
          this.$keyword.value = this.$keyword.placeholder;
          this.deactiveEngineSelect = true;
        }
        // prevent losing focus when press Tab
        e.preventDefault();
      }
    });
    selectEngineFn && this.$keyword.addEventListener('input', (0, _lodash.debounce)(() => this._onInput(), 500));

    // once updated, translate it
    this.addUpdatedHandler(e => {
      let searchString = e.detail.trim();
      if ( /*searchString === this.placeholder ||*/!searchString) {
        return;
      }
      if (searchString.length <= _config2.default.translateMaxLength) {
        return this.translate(searchString);
      }
    });

    this.addKeyupHandler(this._getDefaultKeyupHandler(selectEngineFn));
    onKeyup && this.addKeyupHandler(onKeyup);
    onKeydown && this.addKeydownHandler(onKeydown);
    onUpdated && this.addUpdatedHandler(onUpdated);
  }

  _getDefaultKeyupHandler(selectEngineFn) {
    return e => {
      if (this.matchedEngine) {
        if (e.key === 'Tab') {
          if (!this.deactiveEngineSelect) {
            // this.deactiveEngineSelect usually means this.value is just replaced by placeholder by pressing Tab,
            // in that case, don't need to do select engine below
            // TODO search in this.suggestion, and autocomplete by press Tab
            selectEngineFn(this.matchedEngine ? this.matchedEngine.$$key : '');
            // delete engine selector from input box
            this.value = this.value.substr(0, this.value.lastIndexOf(this.engineSelector));
          } else {
            this.deactiveEngineSelect = false;
          }
        }
      } else {
        if (e.key === 'Tab') {
          // TODO: if no matched engine and press Tab, select next link by links.setNextDefaultLink();
        }
      }
      this._set$tip();
    };
  }

  /**
   * input event handler that will triggered when input sth or placeholder changed
   * @private
   */
  _onInput() {
    this.$keyword.dispatchEvent(new CustomEvent('keywordUpdated', { detail: this.value || this.placeholder }));
  }

  _set$tip() {
    this.$tip.innerText = this.matchedEngine ? `Press Tab to use ${this.matchedEngine.displayName}` : '';
  }

  /**
   * get engine selector matched engine
   * @return {Object}
   */
  get matchedEngine() {
    if (!this.engineSelector) return null;

    let engineSelectorLower = this.engineSelector.toLowerCase();
    return this.engines.find(engine => {
      return engine.displayName.toLowerCase().startsWith(engineSelectorLower) || engine.$$key.toLowerCase().startsWith(engineSelectorLower);
    }) || null;
  }

  addUpdatedHandler(fn) {
    this.$keyword.addEventListener('keywordUpdated', fn);
  }

  addKeyupHandler(fn) {
    this.$keyword.addEventListener('keyup', fn);
  }

  addKeydownHandler(fn) {
    this.$keyword.addEventListener('keydown', fn);
  }

  get value() {
    return this.$keyword.value;
  }
  set value(val) {
    this.$keyword.value = val;
    this.$keyword.dispatchEvent(new CustomEvent('keywordUpdated', { detail: val || this.placeholder }));
  }

  get placeholder() {
    return this.$keyword.placeholder;
  }
  set placeholder(val) {
    this.$keyword.placeholder = val;
    this._onInput();
  }

  get engineSelector() {
    let match = this.$keyword.value.match(SearchBox.engineSelectorRegex);
    return match ? match[1] : '';
  }

  _hideTranslation() {
    this.$translation.classList.add(SearchBox.statusClass.hide);
  }
  _showTranslation() {
    this.$translation.classList.remove(SearchBox.statusClass.hide);
  }

  set translationText(text) {
    text.length > 0 ? this._showTranslation() : this._hideTranslation();
    this._$translationText.innerText = text;
  }

  /**
   * @param {String} str
   * */
  translate(str) {
    var _this = this;

    return _asyncToGenerator(function* () {
      str = str.trim().replace(/\n/, '') || '';
      // @TODO only translate some language, from user config
      // @TODO not translate some language, from user config
      // if(chrome.i18n.detect)
      if (str.length > _config2.default.translateMaxLength) {
        return Promise.reject(new Error('Translation: String too long: ' + str));
      }

      let lang = navigator.language.split('-', 1)[0];
      let resultObj = yield tjs.translate({
        api: 'youdao',
        text: str,
        to: _config2.default.devMode ? 'zh-CN' : lang === 'zh' ? navigator.language : lang
      });
      if (resultObj.error) return new searchBoxErr('translate error:' + resultObj.error);

      let translated = resultObj.detailed || resultObj.result;
      if ((0, _lodash.isEmpty)((0, _base.filterEmptyStr)(translated))) return;

      _this.translationText = translated.filter(function (line) {
        return line.toLowerCase() !== str.toLowerCase();
      }).reduce(function (html, line) {
        return html + line + '　';
      }, '');
    })();
  }
}

SearchBox.engineSelectorRegex = /(?:^|\s)([^\s]+)$/;
SearchBox.selectors = {
  keyword: '.searchBox__input',
  translation: '.searchBox__translation'
};
SearchBox.statusClass = {
  hide: 'searchBox__translation--hide'
};
exports.default = SearchBox;

/***/ }),

/***/ "0nVa":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__("KOGo");
function qs(obj) {
    if (!obj)
        return '';
    var r = [];
    var _loop_1 = function (key) {
        var v = [].concat(obj[key]);
        r.push.apply(r, v.map(function (valStr) { return key + "=" + encodeURIComponent(valStr); }));
    };
    for (var key in obj) {
        _loop_1(key);
    }
    return r.join('&');
}
function default_1(options) {
    var xhr = new XMLHttpRequest();
    var urlObj = new URL(options.url);
    urlObj.search = (urlObj.search ? '' : '?') + qs(options.query);
    var _a = options.method, method = _a === void 0 ? 'get' : _a;
    xhr.open(method, urlObj.toString());
    var body;
    if (method === 'post') {
        switch (options.type) {
            case 'form':
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                body = qs(options.body);
                break;
            case 'json':
            default:
                xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                body = JSON.stringify(options.body);
                break;
        }
    }
    var headers = options.headers;
    if (headers) {
        for (var header in headers) {
            xhr.setRequestHeader(header, headers[header]);
        }
    }
    return new Promise(function (resolve, reject) {
        xhr.onload = function () {
            if (xhr.status !== 200) {
                reject(new utils_1.TranslatorError("API_SERVER_ERROR" /* API_SERVER_ERROR */));
            }
            var res = xhr.responseText;
            try {
                resolve(JSON.parse(res));
            }
            catch (e) {
                resolve(res);
            }
        };
        xhr.onerror = function (e) {
            reject(new utils_1.TranslatorError("NETWORK_ERROR" /* NETWORK_ERROR */, e.message));
        };
        xhr.send(body);
    });
}
exports.default = default_1;


/***/ }),

/***/ "28sW":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "AJcs":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/* global define */

;(function ($) {
  'use strict'

  /*
  * Add integers, wrapping at 2^32. This uses 16-bit operations internally
  * to work around bugs in some JS interpreters.
  */
  function safeAdd (x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff)
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
    return (msw << 16) | (lsw & 0xffff)
  }

  /*
  * Bitwise rotate a 32-bit number to the left.
  */
  function bitRotateLeft (num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt))
  }

  /*
  * These functions implement the four basic operations the algorithm uses.
  */
  function md5cmn (q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
  }
  function md5ff (a, b, c, d, x, s, t) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t)
  }
  function md5gg (a, b, c, d, x, s, t) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t)
  }
  function md5hh (a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t)
  }
  function md5ii (a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t)
  }

  /*
  * Calculate the MD5 of an array of little-endian words, and a bit length.
  */
  function binlMD5 (x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << (len % 32)
    x[((len + 64) >>> 9 << 4) + 14] = len

    var i
    var olda
    var oldb
    var oldc
    var oldd
    var a = 1732584193
    var b = -271733879
    var c = -1732584194
    var d = 271733878

    for (i = 0; i < x.length; i += 16) {
      olda = a
      oldb = b
      oldc = c
      oldd = d

      a = md5ff(a, b, c, d, x[i], 7, -680876936)
      d = md5ff(d, a, b, c, x[i + 1], 12, -389564586)
      c = md5ff(c, d, a, b, x[i + 2], 17, 606105819)
      b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330)
      a = md5ff(a, b, c, d, x[i + 4], 7, -176418897)
      d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426)
      c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341)
      b = md5ff(b, c, d, a, x[i + 7], 22, -45705983)
      a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416)
      d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417)
      c = md5ff(c, d, a, b, x[i + 10], 17, -42063)
      b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162)
      a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682)
      d = md5ff(d, a, b, c, x[i + 13], 12, -40341101)
      c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290)
      b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329)

      a = md5gg(a, b, c, d, x[i + 1], 5, -165796510)
      d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632)
      c = md5gg(c, d, a, b, x[i + 11], 14, 643717713)
      b = md5gg(b, c, d, a, x[i], 20, -373897302)
      a = md5gg(a, b, c, d, x[i + 5], 5, -701558691)
      d = md5gg(d, a, b, c, x[i + 10], 9, 38016083)
      c = md5gg(c, d, a, b, x[i + 15], 14, -660478335)
      b = md5gg(b, c, d, a, x[i + 4], 20, -405537848)
      a = md5gg(a, b, c, d, x[i + 9], 5, 568446438)
      d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690)
      c = md5gg(c, d, a, b, x[i + 3], 14, -187363961)
      b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501)
      a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467)
      d = md5gg(d, a, b, c, x[i + 2], 9, -51403784)
      c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473)
      b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734)

      a = md5hh(a, b, c, d, x[i + 5], 4, -378558)
      d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463)
      c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562)
      b = md5hh(b, c, d, a, x[i + 14], 23, -35309556)
      a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060)
      d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353)
      c = md5hh(c, d, a, b, x[i + 7], 16, -155497632)
      b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640)
      a = md5hh(a, b, c, d, x[i + 13], 4, 681279174)
      d = md5hh(d, a, b, c, x[i], 11, -358537222)
      c = md5hh(c, d, a, b, x[i + 3], 16, -722521979)
      b = md5hh(b, c, d, a, x[i + 6], 23, 76029189)
      a = md5hh(a, b, c, d, x[i + 9], 4, -640364487)
      d = md5hh(d, a, b, c, x[i + 12], 11, -421815835)
      c = md5hh(c, d, a, b, x[i + 15], 16, 530742520)
      b = md5hh(b, c, d, a, x[i + 2], 23, -995338651)

      a = md5ii(a, b, c, d, x[i], 6, -198630844)
      d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415)
      c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905)
      b = md5ii(b, c, d, a, x[i + 5], 21, -57434055)
      a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571)
      d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606)
      c = md5ii(c, d, a, b, x[i + 10], 15, -1051523)
      b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799)
      a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359)
      d = md5ii(d, a, b, c, x[i + 15], 10, -30611744)
      c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380)
      b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649)
      a = md5ii(a, b, c, d, x[i + 4], 6, -145523070)
      d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379)
      c = md5ii(c, d, a, b, x[i + 2], 15, 718787259)
      b = md5ii(b, c, d, a, x[i + 9], 21, -343485551)

      a = safeAdd(a, olda)
      b = safeAdd(b, oldb)
      c = safeAdd(c, oldc)
      d = safeAdd(d, oldd)
    }
    return [a, b, c, d]
  }

  /*
  * Convert an array of little-endian words to a string
  */
  function binl2rstr (input) {
    var i
    var output = ''
    var length32 = input.length * 32
    for (i = 0; i < length32; i += 8) {
      output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff)
    }
    return output
  }

  /*
  * Convert a raw string to an array of little-endian words
  * Characters >255 have their high-byte silently ignored.
  */
  function rstr2binl (input) {
    var i
    var output = []
    output[(input.length >> 2) - 1] = undefined
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0
    }
    var length8 = input.length * 8
    for (i = 0; i < length8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32)
    }
    return output
  }

  /*
  * Calculate the MD5 of a raw string
  */
  function rstrMD5 (s) {
    return binl2rstr(binlMD5(rstr2binl(s), s.length * 8))
  }

  /*
  * Calculate the HMAC-MD5, of a key and some data (raw strings)
  */
  function rstrHMACMD5 (key, data) {
    var i
    var bkey = rstr2binl(key)
    var ipad = []
    var opad = []
    var hash
    ipad[15] = opad[15] = undefined
    if (bkey.length > 16) {
      bkey = binlMD5(bkey, key.length * 8)
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636
      opad[i] = bkey[i] ^ 0x5c5c5c5c
    }
    hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
    return binl2rstr(binlMD5(opad.concat(hash), 512 + 128))
  }

  /*
  * Convert a raw string to a hex string
  */
  function rstr2hex (input) {
    var hexTab = '0123456789abcdef'
    var output = ''
    var x
    var i
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i)
      output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f)
    }
    return output
  }

  /*
  * Encode a string as utf-8
  */
  function str2rstrUTF8 (input) {
    return unescape(encodeURIComponent(input))
  }

  /*
  * Take string arguments and return either raw or hex encoded strings
  */
  function rawMD5 (s) {
    return rstrMD5(str2rstrUTF8(s))
  }
  function hexMD5 (s) {
    return rstr2hex(rawMD5(s))
  }
  function rawHMACMD5 (k, d) {
    return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d))
  }
  function hexHMACMD5 (k, d) {
    return rstr2hex(rawHMACMD5(k, d))
  }

  function md5 (string, key, raw) {
    if (!key) {
      if (!raw) {
        return hexMD5(string)
      }
      return rawMD5(string)
    }
    if (!raw) {
      return hexHMACMD5(key, string)
    }
    return rawHMACMD5(key, string)
  }

  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return md5
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else if (typeof module === 'object' && module.exports) {
    module.exports = md5
  } else {
    $.md5 = md5
  }
})(this)


/***/ }),

/***/ "FKZI":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__("y7q8");

var _Mason = __webpack_require__("74xW");

var _Mason2 = _interopRequireDefault(_Mason);

var _base = __webpack_require__("5a/Z");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Links {

  constructor($linksWrapper, tabId) {
    this.$linksWrapper = $linksWrapper;
    this.$links = this.$linksWrapper.querySelectorAll(Links.selectors.link);
    this.$defaultLink = null;
    this.setDefaultLink();
    this.render();
    this._init(tabId);
  }

  render() {
    new _Mason2.default(this.$linksWrapper, {
      itemSelector: '.pin',
      columnNum: 2
    });
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

  get defaultLinkIndex() {
    return Array.from(this.$links).indexOf(this.$defaultLink);
  }

  updateHref(searchWord) {
    if (!searchWord) return new Error('invalid param: updateLinkHref with empty string');
    this.$links.forEach($link => {
      if ($link.hasAttribute('data-lowercase-keyword')) {
        searchWord = searchWord.toLowerCase();
      }
      $link.href = $link.getAttribute('data-url').replace(/%s/g, encodeURIComponent(searchWord));
    });
  }

  _setDefaultLink($link) {
    if ($link === null) return;
    if (this.$defaultLink) {
      this.$defaultLink.classList.remove(Links.statusClass.defaultLink);
    }
    this.$defaultLink = $link;
    this.$defaultLink.classList.add(Links.statusClass.defaultLink);
  }

  _searchLink(engineName) {
    engineName = engineName.toLowerCase();
    for (let $link of this.$links) {
      if ($link.getAttribute('data-se').toLowerCase() === engineName) {
        return $link;
      }
    }
    return null;
  }

  setDefaultLink(engineName) {
    if ((0, _lodash.isEmpty)(engineName)) {
      if (this.$defaultLink === null) {
        this._setDefaultLink(this.$links[0]);
      }
      return;
    }
    this._setDefaultLink(this._searchLink(engineName));
  }

  setPrevDefaultLink() {
    let currentIndex = this.defaultLinkIndex;
    let $link = currentIndex >= 1 ? this.$links[currentIndex - 1] : this.$links[this.$links.length - 1];
    this._setDefaultLink($link);
  }

  setNextDefaultLink() {
    let currentIndex = this.defaultLinkIndex;
    let $link = currentIndex >= this.$links.length - 1 ? this.$links[0] : this.$links[currentIndex + 1];
    this._setDefaultLink($link);
  }

  setRightDefaultLink() {
    let currentUl = this.$defaultLink.parentElement.parentElement;
    let nextUl = currentUl.nextElementSibling || currentUl.parentElement.firstElementChild;
    let nextDefaultLink = nextUl.querySelector(Links.selectors.link);
    nextDefaultLink && this._setDefaultLink(nextDefaultLink);
  }

  /**
   * set another same type link as $defaultLink
   * @param engineName
   */
  setDefaultLinkSameType(engineName) {
    let $link = this._searchLink(engineName);
    if ($link === null) return;
    $link.classList.add(Links.statusClass.tempSelected);

    let ul = $link.parentElement.parentElement;
    if (ul.querySelectorAll(Links.selectors.link).length > 1) {
      let defaultLink = ul.querySelector(`${Links.selectors.link}:not(.${Links.statusClass.tempSelected})`);
      defaultLink && this._setDefaultLink(defaultLink);
    }

    $link.classList.remove(Links.statusClass.tempSelected);
  }
}

/*class ResultList {
 constructor($listWrapper, tabId, results) {
 this.$listWrapper = $listWrapper;
 results.forEach(result => this.add(result));
 }

 moveToHead() {}
 add() {}
 }
 // result item
 class Result {
 innerHtml = '';
 constructor() {}
 onSelect() {}
 onTab() {}
 onEnter() {}
 render() {}
 }
 class TextResult extends Result {}
 class LinkResult extends Result {}*/

Links.selectors = {
  link: '.engines__item'
};
Links.statusClass = {
  defaultLink: 'engines__item--default',
  tempSelected: 'engines__item--temp'
};
exports.default = Links;

/***/ }),

/***/ "I2Te":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
const lGuimets = _const.PUNCT.guillemets.left.reduce((all, current) => all + current, '');
const rGuimets = _const.PUNCT.guillemets.right.reduce((all, current) => all + current, '');

let markUpperWord = function (str) {
  let upperSubstrRegex = new RegExp(_base.regex`
    (^|[^${_const.CJK}a-zA-Z${lGuimets}])
    (
      [A-Z]{2,}[${ASCII_CHAR}]*
      (?:\s+[A-Z]{2,}[${ASCII_CHAR}]*)*
    )
    \b
    (?![${_const.CJK}${rGuimets}]|\s+[A-Z]{2,})
  `, 'g'); // ((\s+(?![A-Z]))?)
  return str.replace(upperSubstrRegex, '$1《$2》');
};

let markEnWord = function (str) {
  // let vipSubstrRegex = new RegExp(regex`(^|[${CJK}${CJK_PUNCT}${rGuimets}]|\s)([a-z]{2,}[${ASCII_CHAR}]*(?:\s+[${ASCII_CHAR}]+)*)([${CJK}${CJK_PUNCT}${lGuimets}]|\s)`, 'ig');
  let vipSubstrRegex0 = new RegExp(_base.regex`(^)(\s*)([a-z]{2,}[${ASCII_CHAR}]*(?:\s+[${ASCII_CHAR}]+)*)(_*)\b(\s*|[${ASCII_PUNCT}]*)([${_const.CJK}])`, 'ig');
  let vipSubstrRegex1 = new RegExp(_base.regex`([${_const.CJK}])(\s*)([a-z]{2,}[${ASCII_CHAR}]*(?:\s+[${ASCII_CHAR}]+)*)\b`, 'ig');
  let vipSubstrRegex2 = new RegExp(_base.regex`([${rGuimets}${_const.CJK_PUNCT}])(\s*)([a-z]{2,}[${ASCII_CHAR}]*(?:\s+[${ASCII_CHAR}]+)*)\b([^${ASCII_PUNCT}\s])`, 'ig');
  let vipSubstrRegex3 = new RegExp(_base.regex`([${ASCII_PUNCT}])(\s*)([a-z]{2,}[${ASCII_CHAR}]*(?:\s+[${ASCII_CHAR}]+)*)(_*)\b(\s*|[${ASCII_PUNCT}]*)([${_const.CJK}])`, 'ig');
  let modify = function (match, p1, p2, p3, p4) {
    return p2 ? `${p1}${p2}《${p3}》${p4}` : `${p1}《${p3}》${p4}`;
  };
  return str.replace(vipSubstrRegex0, (match, p1, p2 = '', p3, p4 = '', p5 = '', p6) => {
    return `${p1}${p2}《${p3}》${p4}${p5}${p6}`;
  }).replace(vipSubstrRegex1, (match, p1, p2, p3) => {
    return p2 ? `${p1}${p2}《${p3}》` : `${p1}《${p3}》`;
  }).replace(vipSubstrRegex2, modify).replace(vipSubstrRegex3, (match, p1, p2 = '', p3, p4 = '', p5 = '', p6) => {
    return `${p1}${p2}《${p3}》${p4}${p5}${p6}`;
  });
};

let markEnds = function (str) {
  let beginRegex = new RegExp(_base.regex`^([${ASCII_CHAR}]+)》`);
  let tailRegex = new RegExp(_base.regex`《([${ASCII_CHAR}]+)$`);
  return str.replace(beginRegex, '《$1》').replace(tailRegex, '《$1》');
};

let markName = function (str) {
  let validCharacter = _base.regex`A-Za-zÀ-ÿ`;
  let name = _base.regex`[A-Z][${validCharacter}]+`;
  let subElement = _base.regex`
    (?:
      (?:[Nn][roº]|[oO]p) # match string like 'No.3', 'Nr 3', 'Nº 3', 'op.13'
      .\s?\d+
    )
    |(?:${name})
  `;
  let nameRegex1 = new RegExp(_base.regex`
    (^|[^${_const.CJK}a-zA-Z${lGuimets}])
    (
      (?:${subElement})
      (?:\s+(?:${subElement}))+
    )
    \b
    (?![${_const.CJK}${rGuimets}])
  `, 'g'); // ((\s+(?![A-Z]))?)
  // /[A-Z][a-z]+\s*[-_/]\s*[A-Z][a-z]+/.test('javascript - Mocha / Chai expect.se')
  let nameRegex2 = new RegExp(_base.regex`
    (^|[^${_const.CJK}a-zA-Z${lGuimets}])
    (
      (?:${subElement})
      (?:\s*[-_/]\s*(?:${subElement}))+
    )
    (?![${_const.CJK}${rGuimets}])
  `, 'g');
  return str.replace(nameRegex1, (match, p1, p2) => {
    let dividedName = p2.split(/\s+/g);
    for (let name of dividedName) {
      if (_const.KEYWORD_BLACKLIST.includes(name.toLowerCase())) return match;
    }
    return `${p1}《${p2}》`;
  }).replace(nameRegex2, (match, p1 = '', p2) => {
    let dividedName = p2.split(/[-_/]+|\s+/g);
    for (let name of dividedName) {
      if (_const.KEYWORD_BLACKLIST.includes(name.toLowerCase())) return match;
    }
    if (/\//.test(p2)) {
      p2 = p2.replace(/(\s*)\/(\s*)/, '》$1/$2《');
    }
    return `${p1}《${p2}》`;
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
    ([${_const.CJK}])\s+(.)
  `, 'g');
  let regRight = new RegExp(_base.regex`
    (.)\s+([${_const.CJK}])
  `, 'g');
  let require = new RegExp(_base.regex`[${commonDivider}]+`, 'g');
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

/***/ }),

/***/ "KOGo":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/** 反转对象 */
function invert(obj) {
    var result = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[obj[key]] = key;
        }
    }
    return result;
}
exports.invert = invert;
/**
 * 安全的获取一个变量上指定路径的值
 * @param obj
 * @param {string | string[]} pathArray
 * @param defaultValue
 * @return {any}
 */
function getValue(obj, pathArray, defaultValue) {
    if (obj == null)
        return defaultValue;
    if (typeof pathArray === 'string') {
        pathArray = [pathArray];
    }
    var value = obj;
    for (var i = 0; i < pathArray.length; i += 1) {
        var key = pathArray[i];
        value = value[key];
        if (value == null) {
            return defaultValue;
        }
    }
    return value;
}
exports.getValue = getValue;
var TranslatorError = /** @class */ (function (_super) {
    __extends(TranslatorError, _super);
    function TranslatorError(code, message) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        return _this;
    }
    return TranslatorError;
}(Error));
exports.TranslatorError = TranslatorError;
function transformOptions(options) {
    if (typeof options === 'string') {
        return {
            text: options
        };
    }
    return options;
}
exports.transformOptions = transformOptions;


/***/ }),

/***/ "Kyhl":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "js/contentScript.js";

/***/ }),

/***/ "MjTT":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
    let selection = [];
    try {
      selection = yield chromeTabsProxy.executeScript({
        code: 'window.getSelection().toString();',
        allFrames: true
      });
    } catch (e) {
      // ignore some executeScript error in some frames that have no permission to reach
      // like: executeScriptErr: Cannot access contents of url "data:text/html,chromewebdata"
      (0, _base.clog)(e.toString());
    }
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

/**
 * Get keyword from tab url
 * @param {Url} tabUrl
 */


let getQueryString = (() => {
  var _ref2 = _asyncToGenerator(function* (tabUrl) {
    if (!tabUrl.isNormal) {
      return _const.EMPTY_KEYWORDS;
    }
    if (tabUrl.isGoogleFail) {
      tabUrl = new _Url2.default(tabUrl.getQueryVal('continue'));
    }

    let keys = yield _Engine2.default.searchKeys(tabUrl.host, { searchAll: true });
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

    let keys = yield _Engine2.default.searchKeys(tabUrl.host, { includeRootDomain: true });
    let siteKeywords = null;
    if (keys.length > 0) {
      let engine = yield _Engine2.default.get(keys[0]);
      siteKeywords = engine.siteKeywords || [];
      (0, _base.clog)('configured siteKeywords:', siteKeywords);
    }

    (0, _base.clog)('content script result: ', [tabUrl.url, keywords.meta, keywords.title, keywords.h1, keywords.h2, siteKeywords]);
    return (0, _smartKeyword2.default)(tabUrl, keywords, siteKeywords);
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

/** @module src/popup/keyword */


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

/***/ }),

/***/ "OloO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = __webpack_require__("0nVa");
var utils_1 = __webpack_require__("KOGo");
var google_token_1 = __webpack_require__("VFFl");
function translate(options) {
    var _a = utils_1.transformOptions(options), text = _a.text, _b = _a.from, from = _b === void 0 ? 'auto' : _b, _c = _a.to, to = _c === void 0 ? 'zh-CN' : _c, com = _a.com;
    text = text.toLowerCase();
    return google_token_1.default(text, com)
        .then(function (tk) {
        return node_1.default({
            url: 'https://translate.google.' +
                (com ? 'com' : 'cn') +
                '/translate_a/single',
            query: {
                client: 't',
                sl: from,
                tl: to,
                hl: to,
                tk: tk,
                dt: ['at', 'bd', 'ex', 'ld', 'md', 'qca', 'rw', 'rm', 'ss', 't'],
                ie: 'UTF-8',
                oe: 'UTF-8',
                otf: '1',
                ssel: '0',
                tsel: '0',
                kc: '7',
                q: text
            }
        });
    })
        .then(function (body) {
        var googleFrom = body[2];
        var result = {
            text: text,
            raw: body,
            from: googleFrom,
            to: to,
            link: "https://translate.google." + (com ? 'com' : 'cn') + "/#" + googleFrom + "/" + to + "/" + encodeURIComponent(text)
        };
        try {
            result.dict = body[1].map(function (arr) {
                return arr[0] + '：' + arr[1].join('，');
            });
        }
        catch (e) { }
        try {
            result.result = body[0]
                .map(function (arr) { return arr[0]; })
                .filter(function (x) { return x; })
                .map(function (x) { return x.trim(); });
        }
        catch (e) { }
        return result;
    });
}
function detect(options) {
    var text = utils_1.transformOptions(options).text;
    return translate(text).then(function (result) { return result.from; });
}
function audio(options) {
    var _a = utils_1.transformOptions(options), text = _a.text, from = _a.from, com = _a.com;
    return Promise.all([
        new Promise(function (resolve, reject) {
            if (from) {
                resolve(from);
            }
            else {
                detect(text).then(resolve, reject);
            }
        }),
        google_token_1.default(text, com)
    ]).then(function (_a) {
        var lang = _a[0], tk = _a[1];
        return "https://translate.google." + (com ? 'com' : 'cn') + "/translate_tts?ie=UTF-8&q=" + encodeURIComponent(text) + "&tl=" + lang + "&total=1&idx=0&textlen=" + text.length + "&tk=" + tk + "&client=t";
    });
}
exports.default = {
    id: 'google',
    translate: translate,
    detect: detect,
    audio: audio
};


/***/ }),

/***/ "Peua":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = __webpack_require__("SbOy");
var node_2 = __webpack_require__("0nVa");
var utils_1 = __webpack_require__("KOGo");
var link = 'https://fanyi.youdao.com';
var translateAPI = link + '/translate_o?smartresult=dict&smartresult=rule';
var languageList = {
    en: 'en',
    ru: 'ru',
    pt: 'pt',
    es: 'es',
    'zh-CN': 'zh-CHS',
    ja: 'ja',
    ko: 'ko',
    fr: 'fr'
};
var client = 'fanyideskweb';
var sk = "rY0D^0'nM0}g5Mm1z%1G4";
/**
 * 有道翻译接口的签名算法
 * @param {string} text
 * @return {{client: string, salt: number, sign: string}}
 */
function sign(text) {
    var salt = Date.now() + parseInt(String(10 * Math.random()), 10);
    return {
        client: client,
        salt: salt,
        sign: node_1.default(client + text + salt + sk)
    };
}
var languageListInvert = utils_1.invert(languageList);
function translate(options) {
    var _a = utils_1.transformOptions(options), text = _a.text, from = _a.from, to = _a.to;
    text = text.slice(0, 5000);
    if (from) {
        from = languageList[from];
    }
    else {
        from = 'AUTO';
    }
    if (to) {
        to = languageList[to];
    }
    else {
        to = 'AUTO';
    }
    // 有道网页翻译的接口的语种与目标语种中必须有一个是中文
    if (!((from === 'AUTO' && to === 'AUTO') ||
        (from === 'zh-CHS' || to === 'zh-CHS'))) {
        return Promise.reject(new utils_1.TranslatorError("UNSUPPORTED_LANG" /* UNSUPPORTED_LANG */, '有道翻译的源语种与目标语种中必须有一个是中文，或者两个都是 AUTO'));
    }
    return node_2.default({
        method: 'post',
        url: translateAPI,
        type: 'form',
        body: Object.assign(sign(text), {
            i: text,
            from: from,
            to: to,
            smartresult: 'dict',
            doctype: 'json',
            version: '2.1',
            keyfrom: 'fanyi.web',
            action: 'FY_BY_REALTIME',
            typoResult: 'true'
        }),
        // tslint:disable-next-line:strict-type-predicates
        headers: typeof window === 'undefined' ? { Referer: link } : undefined
    }).then(function (body) {
        if (body.errorCode !== 0) {
            throw new utils_1.TranslatorError("API_SERVER_ERROR" /* API_SERVER_ERROR */, '有道翻译接口出错了');
        }
        var _a = body.type.split('2'), from = _a[0], to = _a[1];
        from = languageListInvert[from];
        to = languageListInvert[to];
        var smartResult = body.smartResult;
        var result = {
            raw: body,
            text: text,
            from: from,
            to: to,
            link: smartResult
                ? "https://dict.youdao.com/search?q=" + encodeURIComponent(text) + "&keyfrom=fanyi.smartResult"
                : "http://fanyi.youdao.com/translate?i=" + encodeURIComponent(text)
        };
        if (smartResult) {
            try {
                result.dict = smartResult.entries.filter(function (s) { return s; }).map(function (s) { return s.trim(); });
            }
            catch (e) { }
        }
        try {
            result.result = body.translateResult[0].map(function (o) { return o.tgt.trim(); });
        }
        catch (e) { }
        return result;
    });
}
function detect(options) {
    var text = utils_1.transformOptions(options).text;
    return translate(text).then(function (result) {
        var from = result.from;
        if (!from) {
            throw new utils_1.TranslatorError("UNSUPPORTED_LANG" /* UNSUPPORTED_LANG */, '有道翻译不支持这个语种');
        }
        return from;
    });
}
function audio(options) {
    var _a = utils_1.transformOptions(options), text = _a.text, from = _a.from;
    return new Promise(function (res, rej) {
        if (from) {
            res(from);
        }
        else {
            detect(text).then(res, rej);
        }
    }).then(function (from) {
        return "https://dict.youdao.com/dictvoice?audio=" + encodeURIComponent(text) + "&le=" + languageList[from];
    });
}
exports.default = {
    id: 'youdao',
    translate: translate,
    detect: detect,
    audio: audio
};


/***/ }),

/***/ "SbOy":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// blueimp-md5 是一个 CommonJS 模块，为了跟 ./node.ts 保持一致，这里将它转换为 ES6 模块
var bluemd5 = __webpack_require__("AJcs");
exports.default = bluemd5;


/***/ }),

/***/ "V4gC":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _base = __webpack_require__("5a/Z");

var _Url = __webpack_require__("tDBr");

var _Url2 = _interopRequireDefault(_Url);

var _Render = __webpack_require__("qpDX");

var _Render2 = _interopRequireDefault(_Render);

var _keyword = __webpack_require__("MjTT");

var _keyword2 = _interopRequireDefault(_keyword);

var _Engine = __webpack_require__("gLfi");

var _Engine2 = _interopRequireDefault(_Engine);

var _SearchBox = __webpack_require__("0NI0");

var _SearchBox2 = _interopRequireDefault(_SearchBox);

var _Links = __webpack_require__("FKZI");

var _Links2 = _interopRequireDefault(_Links);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * @param {Error} e
 **/
function errorHandler(e) {
  //noinspection JSUnresolvedVariable
  _base.clog.err(e.toString());
  _base.clog.err('Error stack: ', e.stack);
}

(0, _base.onceLoaded)(_base.getCurrentTab).then((() => {
  var _ref = _asyncToGenerator(function* (tab) {
    let tabUrl = new _Url2.default(tab.url);
    let engineListTpl = _base.$`#tpl-engines`.innerHTML.trim();
    let $enginesSection = _base.$`.engines`;

    return Promise.all([(0, _keyword2.default)(tabUrl), _Render2.default.openEngines(engineListTpl)]).spread((() => {
      var _ref2 = _asyncToGenerator(function* (keywords, html) {
        $enginesSection.innerHTML = html;
        let links = new _Links2.default(_base.$`.engines`, tab.id);
        tabUrl.isNormal && _Engine2.default.searchKeys(tabUrl.host, { includeRootDomain: true }).then(function (keys) {
          // TODO if keys.length <= 0, look for history and see which engine will be more likely selected
          keys.length && links.setDefaultLinkSameType(keys[0]);
        });

        let searchBox = new _SearchBox2.default({
          $element: _base.$`.searchBox`,
          engines: yield _Engine2.default.getOpen({
            returnType: _Engine2.default.returnType.normal,
            fields: ['displayName', '$$key']
          }),
          selectEngineFn: function (engineKey) {
            return links.setDefaultLink(engineKey);
          },
          onKeyup: function (e) {
            if (e.key === 'Enter') {
              links.$defaultLink.dispatchEvent(new MouseEvent('click', { button: _base.btnCode.left }));
            }
          },
          onKeydown: function (e) {
            if (e.key === 'ArrowDown') {
              links.setNextDefaultLink();
            } else if (e.key === 'ArrowUp') {
              links.setPrevDefaultLink();
            }
          },
          onUpdated: function (e) {
            let searchString = e.detail.trim();
            if (!searchString) return;
            (0, _base.clog)('update link by searchString:', searchString);

            links.updateHref(searchString);
          }
        });

        (0, _base.clog)('get keywords: ', JSON.stringify(keywords));
        // @TODO if input is not empty, cancel getKeyWord and don't change input and link
        // @TODO add all keywords to auto-complete suggestion list
        if (typeof searchBox === 'undefined') {
          (0, _base.clog)('no searchBox');
          return;
        }
        keywords.forEach(function (kw) {
          return searchBox.suggestions.push(kw.word.trim());
        });
        let newPlaceholder = keywords[0].word.trim();
        if (newPlaceholder) searchBox.placeholder = newPlaceholder;
      });

      return function (_x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    })());
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})()).catch(errorHandler);

/***/ }),

/***/ "VFFl":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * 代码来自 https://github.com/matheuss/google-translate-token
 * 做了一些修改以适应本项目
 */
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = __webpack_require__("0nVa");
var tk = '';
// region 复制过来的代码，做了一些修改确保 typescript 不会报错
/* tslint:disable */
var yr = null;
function sM(a) {
    var b;
    if (null !== yr)
        b = yr;
    else {
        b = (yr = tk || '') || '';
    }
    var d = ['t', 'k'];
    var c1 = '&' + d.join('') + '=';
    d = b.split('.');
    b = Number(d[0]) || 0;
    for (var e = [], f = 0, g = 0; g < a.length; g++) {
        var l = a.charCodeAt(g);
        128 > l
            ? (e[f++] = l)
            : (2048 > l
                ? (e[f++] = (l >> 6) | 192)
                : (55296 == (l & 64512) &&
                    g + 1 < a.length &&
                    56320 == (a.charCodeAt(g + 1) & 64512)
                    ? ((l = 65536 + ((l & 1023) << 10) + (a.charCodeAt(++g) & 1023)),
                        (e[f++] = (l >> 18) | 240),
                        (e[f++] = ((l >> 12) & 63) | 128))
                    : (e[f++] = (l >> 12) | 224),
                    (e[f++] = ((l >> 6) & 63) | 128)),
                (e[f++] = (l & 63) | 128));
    }
    a = b;
    for (f = 0; f < e.length; f++)
        (a += e[f]), (a = xr(a, '+-a^+6'));
    a = xr(a, '+-3^+b+-f');
    a ^= Number(d[1]) || 0;
    0 > a && (a = (a & 2147483647) + 2147483648);
    a %= 1e6;
    return c1 + (a.toString() + '.' + (a ^ b));
}
function xr(a, b) {
    for (var c = 0; c < b.length - 2; c += 3) {
        var d = b.charAt(c + 2), d1 = 'a' <= d ? d.charCodeAt(0) - 87 : Number(d), d2 = '+' == b.charAt(c + 1) ? a >>> d1 : a << d1;
        a = '+' == b.charAt(c) ? (a + d2) & 4294967295 : a ^ d2;
    }
    return a;
}
// endregion
/* tslint:enable */
function default_1(text, com) {
    return new Promise(function (resolve, reject) {
        var now = Math.floor(Date.now() / 3600000);
        // token 每小时才刷新一次，如果没过期则直接使用上次更新的 token
        if (Number(tk.split('.')[0]) === now) {
            resolve();
        }
        else {
            // 从谷歌翻译的网页上获取到最新的 token
            node_1.default({
                url: 'https://translate.google.' + (com ? 'com' : 'cn')
            }).then(function (text) {
                var match = text.match(/TKK=eval\('\(\(function\(\){(.*?)}\)\(\)\)'\);/);
                if (match) {
                    // 函数体不接收 ASCII 码，所以这里要手动转换一遍
                    var code = match[1].replace(/\\x3d/g, '=').replace(/\\x27/g, "'");
                    try {
                        tk = new Function(code)();
                    }
                    catch (e) { }
                }
                resolve();
            }, reject);
        }
    }).then(function () { return sM(text).replace('&tk=', ''); });
}
exports.default = default_1;


/***/ }),

/***/ "aRHt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__("KOGo");
var node_1 = __webpack_require__("0nVa");
// http://api.fanyi.baidu.com/api/trans/product/apidoc#languageList
// 共 27 个，除去了百度特有的文言文（wyw）无法归类进去
var languageList = {
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
    // zh: 'zh',
    'zh-CN': 'zh',
    'zh-TW': 'cht',
    'zh-HK': 'yue',
    ja: 'jp',
    ko: 'kor',
    es: 'spa',
    fr: 'fra',
    ar: 'ara'
};
var languageListInvert = utils_1.invert(languageList);
var link = 'https://fanyi.baidu.com';
function detect(options) {
    var text = utils_1.transformOptions(options).text;
    return node_1.default({
        method: 'post',
        url: link + '/langdetect',
        body: {
            query: text.slice(0, 73)
        },
        type: 'form'
    }).then(function (body) {
        if (body.error === 0) {
            var iso689lang = languageListInvert[body.lan];
            if (iso689lang)
                return iso689lang;
        }
        throw new utils_1.TranslatorError("UNSUPPORTED_LANG" /* UNSUPPORTED_LANG */, '百度翻译不支持这个语种');
    });
}
function getAudioURI(text, lang) {
    return (link +
        ("/gettts?lan=" + lang + "&text=" + encodeURIComponent(text) + "&spd=3&source=web"));
}
/**
 * 获取指定文本的网络语音地址
 * @param {string} options
 * @return {string|void}
 */
function audio(options) {
    var _a = utils_1.transformOptions(options), text = _a.text, from = _a.from;
    return new Promise(function (res, rej) {
        if (from) {
            res(from);
        }
        else {
            detect(text).then(res, rej);
        }
    }).then(function (from) {
        var lang;
        if (from === 'en-GB') {
            lang = 'uk';
        }
        else {
            lang = languageList[from];
        }
        return getAudioURI(text, lang);
    });
}
function translate(options) {
    var _a = utils_1.transformOptions(options), from = _a.from, to = _a.to, text = _a.text;
    return new Promise(function (res, rej) {
        if (from) {
            res(from);
        }
        else {
            detect(text).then(res, rej);
        }
    }).then(function (from) {
        return node_1.default({
            url: link + '/v2transapi',
            type: 'form',
            method: 'post',
            body: {
                from: (from && languageList[from]) || 'auto',
                to: (to && languageList[to]) || 'zh',
                query: text,
                transtype: 'hash',
                simple_means_flag: 3
            }
        }).then(function (body) {
            var transResult = body.trans_result;
            var baiduFrom = utils_1.getValue(transResult, 'from', 'auto');
            var baiduTo = utils_1.getValue(transResult, 'to', 'auto');
            var result = {
                text: text,
                raw: body,
                link: link + ("/#" + baiduFrom + "/" + baiduTo + "/" + encodeURIComponent(text)),
                from: languageListInvert[baiduFrom],
                to: languageListInvert[baiduTo]
            };
            var symbols = utils_1.getValue(body, [
                'dict_result',
                'simple_means',
                'symbols',
                '0'
            ]);
            if (symbols) {
                // region 解析音标
                var phonetic = [];
                var ph_am = symbols.ph_am, ph_en = symbols.ph_en;
                if (ph_am) {
                    phonetic.push({
                        name: '美',
                        ttsURI: getAudioURI(text, 'en'),
                        value: ph_am
                    });
                }
                if (ph_en) {
                    phonetic.push({
                        name: '英',
                        ttsURI: getAudioURI(text, 'en-GB'),
                        value: ph_en
                    });
                }
                if (phonetic.length) {
                    result.phonetic = phonetic;
                }
                // endregion
                // 解析词典数据
                try {
                    result.dict = symbols.parts.map(function (part) {
                        return part.part + ' ' + part.means.join('；');
                    });
                }
                catch (e) { }
            }
            // 解析普通的翻译结果
            try {
                result.result = transResult.data.map(function (d) { return d.dst; });
            }
            catch (e) { }
            return result;
        });
    });
}
exports.default = {
    id: 'baidu',
    translate: translate,
    detect: detect,
    audio: audio
};


/***/ }),

/***/ "cY+b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
          throw new Error(`chromeAsync proxyErr: no property name ${key}`);
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

/***/ }),

/***/ "jc4J":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// see https://github.com/Selection-Translator/translation.js#2-%E7%BB%99%E6%9C%89%E9%81%93%E7%BF%BB%E8%AF%91%E6%8E%A5%E5%8F%A3%E6%B7%BB%E5%8A%A0-referer-%E8%AF%B7%E6%B1%82%E5%A4%B4
chrome.webRequest.onBeforeSendHeaders.addListener(({ requestHeaders }) => {
  const r = {
    name: 'Referer',
    value: 'https://fanyi.youdao.com'
  };
  const index = requestHeaders.findIndex(({ name }) => name.toLowerCase() === 'referer');
  if (index >= 0) {
    requestHeaders.splice(index, 1, r);
  } else {
    requestHeaders.push(r);
  }
  return { requestHeaders };
}, {
  urls: ['https://fanyi.youdao.com/translate_o'],
  types: ['xmlhttprequest']
}, ['blocking', 'requestHeaders']);

/***/ }),

/***/ "mUJK":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

/* eslint-env node*/
global.Promise = __webpack_require__("qgje");

__webpack_require__("zj96");
__webpack_require__("uIYl");
__webpack_require__("28sW");
__webpack_require__("V4gC");
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("DuR2")))

/***/ }),

/***/ "ney3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
function smartKeyword(tabUrl, { meta = [], title = '', h1 = '', h2 = [] }, siteKeywords = []) {
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
    replace = `$1${replace}$2`;
    return str.replace(/(\W)\s+(\W)/g, replace).replace(/(\W)\s+([a-z])/ig, replace).replace(/([a-z])\s+(\W)/ig, replace);
  }

  function _replaceUnderscore(str, replace = '|') {
    replace = `$1${replace}$2`;
    return str.replace(/(\W)_+(\W)/g, replace).replace(/(\W)_+(\w)/g, replace).replace(/(\w)_+(\W)/g, replace);
  }

  /**
   * replace multiple spaces and return to one space
   * */
  function _fixSpaces(str) {
    return str.replace(/\s+/g, ' ').replace(/(\s+No\.)\s+(\d+)\b/ig, ' No.$2');
  }
  function _fixHyphen(str, replace = '') {
    replace = `$1${replace}$2`;
    let hyphens = _const.PUNCT.dash.reduce((hyphens, current) => hyphens + current, '');
    let regex = _getDividerRegex(`(\w)[${hyphens}]+(\w)`, 'g');
    return str.replace(regex, replace);
  }
}

exports.default = smartKeyword;

/***/ }),

/***/ "qtYd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var baidu_1 = __webpack_require__("aRHt");
var youdao_1 = __webpack_require__("Peua");
var google_1 = __webpack_require__("OloO");
var utils_1 = __webpack_require__("KOGo");
var defaultAPI = 'google';
var apis = {};
add(baidu_1.default);
add(youdao_1.default);
add(google_1.default);
function getAPI(id) {
    return apis[id];
}
function add(api) {
    apis[api.id] = api;
}
function call(method, options) {
    var _a = utils_1.transformOptions(options).api, apiID = _a === void 0 ? defaultAPI : _a;
    var api = getAPI(apiID);
    if (api) {
        return api[method](options);
    }
    else {
        return Promise.reject(new utils_1.TranslatorError("NO_THIS_API" /* NO_THIS_API */, "\u627E\u4E0D\u5230 \"" + apiID + "\" \u63A5\u53E3\u3002"));
    }
}
function translate(options) {
    return call('translate', options);
}
exports.translate = translate;
function detect(options) {
    return call('detect', options);
}
exports.detect = detect;
function audio(options) {
    return call('audio', options);
}
exports.audio = audio;


/***/ }),

/***/ "tEcJ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
    return _const.KEYWORD_BLACKLIST.includes(word) || /^\d+$/.test(word) || word.length <= 0 || word.length <= 2 && /^[a-z]+$/i.test(word) || word.length === 1 && new RegExp(`[${_const.PRINTABLE_EXTEND}]`).test(word);
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

/***/ }),

/***/ "y7q8":
/***/ (function(module, exports) {

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
"\u0149":"'n","\u017f":"s"}),et=w({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}),ut=w({"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"}),it=function w(En){function On(n){if(xu(n)&&!af(n)&&!(n instanceof Mn)){if(n instanceof zn)return n;if(ci.call(n,"__wrapped__"))return Pe(n)}return new zn(n)}function Sn(){}function zn(n,t){this.__wrapped__=n,this.__actions__=[],this.__chain__=!!t,this.__index__=0,this.__values__=F}function Mn(n){this.__wrapped__=n,this.__actions__=[],this.__dir__=1,
this.__filtered__=false,this.__iteratees__=[],this.__takeCount__=4294967295,this.__views__=[]}function Tn(n){var t=-1,r=null==n?0:n.length;for(this.clear();++t<r;){var e=n[t];this.set(e[0],e[1])}}function Nn(n){var t=-1,r=null==n?0:n.length;for(this.clear();++t<r;){var e=n[t];this.set(e[0],e[1])}}function Pn(n){var t=-1,r=null==n?0:n.length;for(this.clear();++t<r;){var e=n[t];this.set(e[0],e[1])}}function qn(n){var t=-1,r=null==n?0:n.length;for(this.__data__=new Pn;++t<r;)this.add(n[t])}function Vn(n){
this.size=(this.__data__=new Nn(n)).size}function Gn(n,t){var r,e=af(n),u=!e&&cf(n),i=!e&&!u&&sf(n),o=!e&&!u&&!i&&gf(n),u=(e=e||u||i||o)?E(n.length,ri):[],f=u.length;for(r in n)!t&&!ci.call(n,r)||e&&("length"==r||i&&("offset"==r||"parent"==r)||o&&("buffer"==r||"byteLength"==r||"byteOffset"==r)||Re(r,f))||u.push(r);return u}function tt(n){var t=n.length;return t?n[cr(0,t-1)]:F}function ot(n,t){return Te(Mr(n),gt(t,0,n.length))}function ft(n){return Te(Mr(n))}function ct(n,t,r){(r===F||hu(n[t],r))&&(r!==F||t in n)||_t(n,t,r);
}function at(n,t,r){var e=n[t];ci.call(n,t)&&hu(e,r)&&(r!==F||t in n)||_t(n,t,r)}function lt(n,t){for(var r=n.length;r--;)if(hu(n[r][0],t))return r;return-1}function st(n,t,r,e){return oo(n,function(n,u,i){t(e,n,r(n),i)}),e}function ht(n,t){return n&&Tr(t,Lu(t),n)}function pt(n,t){return n&&Tr(t,Uu(t),n)}function _t(n,t,r){"__proto__"==t&&Ei?Ei(n,t,{configurable:true,enumerable:true,value:r,writable:true}):n[t]=r}function vt(n,t){for(var r=-1,e=t.length,u=Hu(e),i=null==n;++r<e;)u[r]=i?F:Wu(n,t[r]);return u;
}function gt(n,t,r){return n===n&&(r!==F&&(n=n<=r?n:r),t!==F&&(n=n>=t?n:t)),n}function dt(n,t,r,e,i,o){var f,c=1&t,a=2&t,l=4&t;if(r&&(f=i?r(n,e,i,o):r(n)),f!==F)return f;if(!bu(n))return n;if(e=af(n)){if(f=Ee(n),!c)return Mr(n,f)}else{var s=yo(n),h="[object Function]"==s||"[object GeneratorFunction]"==s;if(sf(n))return Wr(n,c);if("[object Object]"==s||"[object Arguments]"==s||h&&!i){if(f=a||h?{}:Oe(n),!c)return a?Fr(n,pt(f,n)):$r(n,ht(f,n))}else{if(!Dn[s])return i?n:{};f=Se(n,s,dt,c)}}if(o||(o=new Vn),
i=o.get(n))return i;o.set(n,f);var a=l?a?ye:de:a?Uu:Lu,p=e?F:a(n);return u(p||n,function(e,u){p&&(u=e,e=n[u]),at(f,u,dt(e,t,r,u,n,o))}),f}function yt(n){var t=Lu(n);return function(r){return bt(r,n,t)}}function bt(n,t,r){var e=r.length;if(null==n)return!e;for(n=ni(n);e--;){var u=r[e],i=t[u],o=n[u];if(o===F&&!(u in n)||!i(o))return false}return true}function xt(n,t,r){if(typeof n!="function")throw new ei("Expected a function");return jo(function(){n.apply(F,r)},t)}function jt(n,t,r,e){var u=-1,i=c,o=true,f=n.length,s=[],h=t.length;
if(!f)return s;r&&(t=l(t,S(r))),e?(i=a,o=false):200<=t.length&&(i=R,o=false,t=new qn(t));n:for(;++u<f;){var p=n[u],_=null==r?p:r(p),p=e||0!==p?p:0;if(o&&_===_){for(var v=h;v--;)if(t[v]===_)continue n;s.push(p)}else i(t,_,e)||s.push(p)}return s}function wt(n,t){var r=true;return oo(n,function(n,e,u){return r=!!t(n,e,u)}),r}function mt(n,t,r){for(var e=-1,u=n.length;++e<u;){var i=n[e],o=t(i);if(null!=o&&(f===F?o===o&&!Au(o):r(o,f)))var f=o,c=i}return c}function At(n,t){var r=[];return oo(n,function(n,e,u){
t(n,e,u)&&r.push(n)}),r}function kt(n,t,r,e,u){var i=-1,o=n.length;for(r||(r=Ie),u||(u=[]);++i<o;){var f=n[i];0<t&&r(f)?1<t?kt(f,t-1,r,e,u):s(u,f):e||(u[u.length]=f)}return u}function Et(n,t){return n&&co(n,t,Lu)}function Ot(n,t){return n&&ao(n,t,Lu)}function St(n,t){return f(t,function(t){return gu(n[t])})}function It(n,t){t=Rr(t,n);for(var r=0,e=t.length;null!=n&&r<e;)n=n[$e(t[r++])];return r&&r==e?n:F}function Rt(n,t,r){return t=t(n),af(n)?t:s(t,r(n))}function zt(n){if(null==n)n=n===F?"[object Undefined]":"[object Null]";else if(ki&&ki in ni(n)){
var t=ci.call(n,ki),r=n[ki];try{n[ki]=F;var e=true}catch(n){}var u=si.call(n);e&&(t?n[ki]=r:delete n[ki]),n=u}else n=si.call(n);return n}function Wt(n,t){return n>t}function Bt(n,t){return null!=n&&ci.call(n,t)}function Lt(n,t){return null!=n&&t in ni(n)}function Ut(n,t,r){for(var e=r?a:c,u=n[0].length,i=n.length,o=i,f=Hu(i),s=1/0,h=[];o--;){var p=n[o];o&&t&&(p=l(p,S(t))),s=Mi(p.length,s),f[o]=!r&&(t||120<=u&&120<=p.length)?new qn(o&&p):F}var p=n[0],_=-1,v=f[0];n:for(;++_<u&&h.length<s;){var g=p[_],d=t?t(g):g,g=r||0!==g?g:0;
if(v?!R(v,d):!e(h,d,r)){for(o=i;--o;){var y=f[o];if(y?!R(y,d):!e(n[o],d,r))continue n}v&&v.push(d),h.push(g)}}return h}function Ct(n,t,r){var e={};return Et(n,function(n,u,i){t(e,r(n),u,i)}),e}function Dt(n,t,e){return t=Rr(t,n),n=2>t.length?n:It(n,vr(t,0,-1)),t=null==n?n:n[$e(Ge(t))],null==t?F:r(t,n,e)}function Mt(n){return xu(n)&&"[object Arguments]"==zt(n)}function Tt(n){return xu(n)&&"[object ArrayBuffer]"==zt(n)}function $t(n){return xu(n)&&"[object Date]"==zt(n)}function Ft(n,t,r,e,u){if(n===t)t=true;else if(null==n||null==t||!xu(n)&&!xu(t))t=n!==n&&t!==t;else n:{
var i=af(n),o=af(t),f=i?"[object Array]":yo(n),c=o?"[object Array]":yo(t),f="[object Arguments]"==f?"[object Object]":f,c="[object Arguments]"==c?"[object Object]":c,a="[object Object]"==f,o="[object Object]"==c;if((c=f==c)&&sf(n)){if(!sf(t)){t=false;break n}i=true,a=false}if(c&&!a)u||(u=new Vn),t=i||gf(n)?_e(n,t,r,e,Ft,u):ve(n,t,f,r,e,Ft,u);else{if(!(1&r)&&(i=a&&ci.call(n,"__wrapped__"),f=o&&ci.call(t,"__wrapped__"),i||f)){n=i?n.value():n,t=f?t.value():t,u||(u=new Vn),t=Ft(n,t,r,e,u);break n}if(c)t:if(u||(u=new Vn),
i=1&r,f=de(n),o=f.length,c=de(t).length,o==c||i){for(a=o;a--;){var l=f[a];if(!(i?l in t:ci.call(t,l))){t=false;break t}}if((c=u.get(n))&&u.get(t))t=c==t;else{c=true,u.set(n,t),u.set(t,n);for(var s=i;++a<o;){var l=f[a],h=n[l],p=t[l];if(e)var _=i?e(p,h,l,t,n,u):e(h,p,l,n,t,u);if(_===F?h!==p&&!Ft(h,p,r,e,u):!_){c=false;break}s||(s="constructor"==l)}c&&!s&&(r=n.constructor,e=t.constructor,r!=e&&"constructor"in n&&"constructor"in t&&!(typeof r=="function"&&r instanceof r&&typeof e=="function"&&e instanceof e)&&(c=false)),
u.delete(n),u.delete(t),t=c}}else t=false;else t=false}}return t}function Nt(n){return xu(n)&&"[object Map]"==yo(n)}function Pt(n,t,r,e){var u=r.length,i=u,o=!e;if(null==n)return!i;for(n=ni(n);u--;){var f=r[u];if(o&&f[2]?f[1]!==n[f[0]]:!(f[0]in n))return false}for(;++u<i;){var f=r[u],c=f[0],a=n[c],l=f[1];if(o&&f[2]){if(a===F&&!(c in n))return false}else{if(f=new Vn,e)var s=e(a,l,c,n,t,f);if(s===F?!Ft(l,a,3,e,f):!s)return false}}return true}function Zt(n){return!(!bu(n)||li&&li in n)&&(gu(n)?_i:xn).test(Fe(n))}function qt(n){
return xu(n)&&"[object RegExp]"==zt(n)}function Vt(n){return xu(n)&&"[object Set]"==yo(n)}function Kt(n){return xu(n)&&yu(n.length)&&!!Cn[zt(n)]}function Gt(n){return typeof n=="function"?n:null==n?Nu:typeof n=="object"?af(n)?Xt(n[0],n[1]):Qt(n):Vu(n)}function Ht(n){if(!Le(n))return Ci(n);var t,r=[];for(t in ni(n))ci.call(n,t)&&"constructor"!=t&&r.push(t);return r}function Jt(n,t){return n<t}function Yt(n,t){var r=-1,e=pu(n)?Hu(n.length):[];return oo(n,function(n,u,i){e[++r]=t(n,u,i)}),e}function Qt(n){
var t=me(n);return 1==t.length&&t[0][2]?Ue(t[0][0],t[0][1]):function(r){return r===n||Pt(r,n,t)}}function Xt(n,t){return We(n)&&t===t&&!bu(t)?Ue($e(n),t):function(r){var e=Wu(r,n);return e===F&&e===t?Bu(r,n):Ft(t,e,3)}}function nr(n,t,r,e,u){n!==t&&co(t,function(i,o){if(bu(i)){u||(u=new Vn);var f=u,c=n[o],a=t[o],l=f.get(a);if(l)ct(n,o,l);else{var l=e?e(c,a,o+"",n,t,f):F,s=l===F;if(s){var h=af(a),p=!h&&sf(a),_=!h&&!p&&gf(a),l=a;h||p||_?af(c)?l=c:_u(c)?l=Mr(c):p?(s=false,l=Wr(a,true)):_?(s=false,l=Lr(a,true)):l=[]:wu(a)||cf(a)?(l=c,
cf(c)?l=Ru(c):(!bu(c)||r&&gu(c))&&(l=Oe(a))):s=false}s&&(f.set(a,l),nr(l,a,r,e,f),f.delete(a)),ct(n,o,l)}}else f=e?e(n[o],i,o+"",n,t,u):F,f===F&&(f=i),ct(n,o,f)},Uu)}function tr(n,t){var r=n.length;if(r)return t+=0>t?r:0,Re(t,r)?n[t]:F}function rr(n,t,r){var e=-1;return t=l(t.length?t:[Nu],S(je())),n=Yt(n,function(n){return{a:l(t,function(t){return t(n)}),b:++e,c:n}}),A(n,function(n,t){var e;n:{e=-1;for(var u=n.a,i=t.a,o=u.length,f=r.length;++e<o;){var c=Ur(u[e],i[e]);if(c){e=e>=f?c:c*("desc"==r[e]?-1:1);
break n}}e=n.b-t.b}return e})}function er(n,t){return ur(n,t,function(t,r){return Bu(n,r)})}function ur(n,t,r){for(var e=-1,u=t.length,i={};++e<u;){var o=t[e],f=It(n,o);r(f,o)&&pr(i,Rr(o,n),f)}return i}function ir(n){return function(t){return It(t,n)}}function or(n,t,r,e){var u=e?y:d,i=-1,o=t.length,f=n;for(n===t&&(t=Mr(t)),r&&(f=l(n,S(r)));++i<o;)for(var c=0,a=t[i],a=r?r(a):a;-1<(c=u(f,a,c,e));)f!==n&&wi.call(f,c,1),wi.call(n,c,1);return n}function fr(n,t){for(var r=n?t.length:0,e=r-1;r--;){var u=t[r];
if(r==e||u!==i){var i=u;Re(u)?wi.call(n,u,1):mr(n,u)}}}function cr(n,t){return n+zi(Fi()*(t-n+1))}function ar(n,t){var r="";if(!n||1>t||9007199254740991<t)return r;do t%2&&(r+=n),(t=zi(t/2))&&(n+=n);while(t);return r}function lr(n,t){return wo(Ce(n,t,Nu),n+"")}function sr(n){return tt(Du(n))}function hr(n,t){var r=Du(n);return Te(r,gt(t,0,r.length))}function pr(n,t,r,e){if(!bu(n))return n;t=Rr(t,n);for(var u=-1,i=t.length,o=i-1,f=n;null!=f&&++u<i;){var c=$e(t[u]),a=r;if(u!=o){var l=f[c],a=e?e(l,c,f):F;
a===F&&(a=bu(l)?l:Re(t[u+1])?[]:{})}at(f,c,a),f=f[c]}return n}function _r(n){return Te(Du(n))}function vr(n,t,r){var e=-1,u=n.length;for(0>t&&(t=-t>u?0:u+t),r=r>u?u:r,0>r&&(r+=u),u=t>r?0:r-t>>>0,t>>>=0,r=Hu(u);++e<u;)r[e]=n[e+t];return r}function gr(n,t){var r;return oo(n,function(n,e,u){return r=t(n,e,u),!r}),!!r}function dr(n,t,r){var e=0,u=null==n?e:n.length;if(typeof t=="number"&&t===t&&2147483647>=u){for(;e<u;){var i=e+u>>>1,o=n[i];null!==o&&!Au(o)&&(r?o<=t:o<t)?e=i+1:u=i}return u}return yr(n,t,Nu,r);
}function yr(n,t,r,e){t=r(t);for(var u=0,i=null==n?0:n.length,o=t!==t,f=null===t,c=Au(t),a=t===F;u<i;){var l=zi((u+i)/2),s=r(n[l]),h=s!==F,p=null===s,_=s===s,v=Au(s);(o?e||_:a?_&&(e||h):f?_&&h&&(e||!p):c?_&&h&&!p&&(e||!v):p||v?0:e?s<=t:s<t)?u=l+1:i=l}return Mi(i,4294967294)}function br(n,t){for(var r=-1,e=n.length,u=0,i=[];++r<e;){var o=n[r],f=t?t(o):o;if(!r||!hu(f,c)){var c=f;i[u++]=0===o?0:o}}return i}function xr(n){return typeof n=="number"?n:Au(n)?P:+n}function jr(n){if(typeof n=="string")return n;
if(af(n))return l(n,jr)+"";if(Au(n))return uo?uo.call(n):"";var t=n+"";return"0"==t&&1/n==-N?"-0":t}function wr(n,t,r){var e=-1,u=c,i=n.length,o=true,f=[],l=f;if(r)o=false,u=a;else if(200<=i){if(u=t?null:po(n))return D(u);o=false,u=R,l=new qn}else l=t?[]:f;n:for(;++e<i;){var s=n[e],h=t?t(s):s,s=r||0!==s?s:0;if(o&&h===h){for(var p=l.length;p--;)if(l[p]===h)continue n;t&&l.push(h),f.push(s)}else u(l,h,r)||(l!==f&&l.push(h),f.push(s))}return f}function mr(n,t){return t=Rr(t,n),n=2>t.length?n:It(n,vr(t,0,-1)),
null==n||delete n[$e(Ge(t))]}function Ar(n,t,r,e){for(var u=n.length,i=e?u:-1;(e?i--:++i<u)&&t(n[i],i,n););return r?vr(n,e?0:i,e?i+1:u):vr(n,e?i+1:0,e?u:i)}function kr(n,t){var r=n;return r instanceof Mn&&(r=r.value()),h(t,function(n,t){return t.func.apply(t.thisArg,s([n],t.args))},r)}function Er(n,t,r){var e=n.length;if(2>e)return e?wr(n[0]):[];for(var u=-1,i=Hu(e);++u<e;)for(var o=n[u],f=-1;++f<e;)f!=u&&(i[u]=jt(i[u]||o,n[f],t,r));return wr(kt(i,1),t,r)}function Or(n,t,r){for(var e=-1,u=n.length,i=t.length,o={};++e<u;)r(o,n[e],e<i?t[e]:F);
return o}function Sr(n){return _u(n)?n:[]}function Ir(n){return typeof n=="function"?n:Nu}function Rr(n,t){return af(n)?n:We(n,t)?[n]:mo(zu(n))}function zr(n,t,r){var e=n.length;return r=r===F?e:r,!t&&r>=e?n:vr(n,t,r)}function Wr(n,t){if(t)return n.slice();var r=n.length,r=yi?yi(r):new n.constructor(r);return n.copy(r),r}function Br(n){var t=new n.constructor(n.byteLength);return new di(t).set(new di(n)),t}function Lr(n,t){return new n.constructor(t?Br(n.buffer):n.buffer,n.byteOffset,n.length)}function Ur(n,t){
if(n!==t){var r=n!==F,e=null===n,u=n===n,i=Au(n),o=t!==F,f=null===t,c=t===t,a=Au(t);if(!f&&!a&&!i&&n>t||i&&o&&c&&!f&&!a||e&&o&&c||!r&&c||!u)return 1;if(!e&&!i&&!a&&n<t||a&&r&&u&&!e&&!i||f&&r&&u||!o&&u||!c)return-1}return 0}function Cr(n,t,r,e){var u=-1,i=n.length,o=r.length,f=-1,c=t.length,a=Di(i-o,0),l=Hu(c+a);for(e=!e;++f<c;)l[f]=t[f];for(;++u<o;)(e||u<i)&&(l[r[u]]=n[u]);for(;a--;)l[f++]=n[u++];return l}function Dr(n,t,r,e){var u=-1,i=n.length,o=-1,f=r.length,c=-1,a=t.length,l=Di(i-f,0),s=Hu(l+a);
for(e=!e;++u<l;)s[u]=n[u];for(l=u;++c<a;)s[l+c]=t[c];for(;++o<f;)(e||u<i)&&(s[l+r[o]]=n[u++]);return s}function Mr(n,t){var r=-1,e=n.length;for(t||(t=Hu(e));++r<e;)t[r]=n[r];return t}function Tr(n,t,r,e){var u=!r;r||(r={});for(var i=-1,o=t.length;++i<o;){var f=t[i],c=e?e(r[f],n[f],f,r,n):F;c===F&&(c=n[f]),u?_t(r,f,c):at(r,f,c)}return r}function $r(n,t){return Tr(n,vo(n),t)}function Fr(n,t){return Tr(n,go(n),t)}function Nr(n,t){return function(r,u){var i=af(r)?e:st,o=t?t():{};return i(r,n,je(u,2),o);
}}function Pr(n){return lr(function(t,r){var e=-1,u=r.length,i=1<u?r[u-1]:F,o=2<u?r[2]:F,i=3<n.length&&typeof i=="function"?(u--,i):F;for(o&&ze(r[0],r[1],o)&&(i=3>u?F:i,u=1),t=ni(t);++e<u;)(o=r[e])&&n(t,o,e,i);return t})}function Zr(n,t){return function(r,e){if(null==r)return r;if(!pu(r))return n(r,e);for(var u=r.length,i=t?u:-1,o=ni(r);(t?i--:++i<u)&&false!==e(o[i],i,o););return r}}function qr(n){return function(t,r,e){var u=-1,i=ni(t);e=e(t);for(var o=e.length;o--;){var f=e[n?o:++u];if(false===r(i[f],f,i))break;
}return t}}function Vr(n,t,r){function e(){return(this&&this!==Zn&&this instanceof e?i:n).apply(u?r:this,arguments)}var u=1&t,i=Hr(n);return e}function Kr(n){return function(t){t=zu(t);var r=Bn.test(t)?$(t):F,e=r?r[0]:t.charAt(0);return t=r?zr(r,1).join(""):t.slice(1),e[n]()+t}}function Gr(n){return function(t){return h($u(Tu(t).replace(In,"")),n,"")}}function Hr(n){return function(){var t=arguments;switch(t.length){case 0:return new n;case 1:return new n(t[0]);case 2:return new n(t[0],t[1]);case 3:
return new n(t[0],t[1],t[2]);case 4:return new n(t[0],t[1],t[2],t[3]);case 5:return new n(t[0],t[1],t[2],t[3],t[4]);case 6:return new n(t[0],t[1],t[2],t[3],t[4],t[5]);case 7:return new n(t[0],t[1],t[2],t[3],t[4],t[5],t[6])}var r=io(n.prototype),t=n.apply(r,t);return bu(t)?t:r}}function Jr(n,t,e){function u(){for(var o=arguments.length,f=Hu(o),c=o,a=xe(u);c--;)f[c]=arguments[c];return c=3>o&&f[0]!==a&&f[o-1]!==a?[]:C(f,a),o-=c.length,o<e?fe(n,t,Xr,u.placeholder,F,f,c,F,F,e-o):r(this&&this!==Zn&&this instanceof u?i:n,this,f);
}var i=Hr(n);return u}function Yr(n){return function(t,r,e){var u=ni(t);if(!pu(t)){var i=je(r,3);t=Lu(t),r=function(n){return i(u[n],n,u)}}return r=n(t,r,e),-1<r?u[i?t[r]:r]:F}}function Qr(n){return ge(function(t){var r=t.length,e=r,u=zn.prototype.thru;for(n&&t.reverse();e--;){var i=t[e];if(typeof i!="function")throw new ei("Expected a function");if(u&&!o&&"wrapper"==be(i))var o=new zn([],true)}for(e=o?e:r;++e<r;)var i=t[e],u=be(i),f="wrapper"==u?_o(i):F,o=f&&Be(f[0])&&424==f[1]&&!f[4].length&&1==f[9]?o[be(f[0])].apply(o,f[3]):1==i.length&&Be(i)?o[u]():o.thru(i);
return function(){var n=arguments,e=n[0];if(o&&1==n.length&&af(e))return o.plant(e).value();for(var u=0,n=r?t[u].apply(this,n):e;++u<r;)n=t[u].call(this,n);return n}})}function Xr(n,t,r,e,u,i,o,f,c,a){function l(){for(var d=arguments.length,y=Hu(d),b=d;b--;)y[b]=arguments[b];if(_){var x,j=xe(l),b=y.length;for(x=0;b--;)y[b]===j&&++x}if(e&&(y=Cr(y,e,u,_)),i&&(y=Dr(y,i,o,_)),d-=x,_&&d<a)return j=C(y,j),fe(n,t,Xr,l.placeholder,r,y,j,f,c,a-d);if(j=h?r:this,b=p?j[n]:n,d=y.length,f){x=y.length;for(var w=Mi(f.length,x),m=Mr(y);w--;){
var A=f[w];y[w]=Re(A,x)?m[A]:F}}else v&&1<d&&y.reverse();return s&&c<d&&(y.length=c),this&&this!==Zn&&this instanceof l&&(b=g||Hr(b)),b.apply(j,y)}var s=128&t,h=1&t,p=2&t,_=24&t,v=512&t,g=p?F:Hr(n);return l}function ne(n,t){return function(r,e){return Ct(r,n,t(e))}}function te(n,t){return function(r,e){var u;if(r===F&&e===F)return t;if(r!==F&&(u=r),e!==F){if(u===F)return e;typeof r=="string"||typeof e=="string"?(r=jr(r),e=jr(e)):(r=xr(r),e=xr(e)),u=n(r,e)}return u}}function re(n){return ge(function(t){
return t=l(t,S(je())),lr(function(e){var u=this;return n(t,function(n){return r(n,u,e)})})})}function ee(n,t){t=t===F?" ":jr(t);var r=t.length;return 2>r?r?ar(t,n):t:(r=ar(t,Ri(n/T(t))),Bn.test(t)?zr($(r),0,n).join(""):r.slice(0,n))}function ue(n,t,e,u){function i(){for(var t=-1,c=arguments.length,a=-1,l=u.length,s=Hu(l+c),h=this&&this!==Zn&&this instanceof i?f:n;++a<l;)s[a]=u[a];for(;c--;)s[a++]=arguments[++t];return r(h,o?e:this,s)}var o=1&t,f=Hr(n);return i}function ie(n){return function(t,r,e){
e&&typeof e!="number"&&ze(t,r,e)&&(r=e=F),t=Eu(t),r===F?(r=t,t=0):r=Eu(r),e=e===F?t<r?1:-1:Eu(e);var u=-1;r=Di(Ri((r-t)/(e||1)),0);for(var i=Hu(r);r--;)i[n?r:++u]=t,t+=e;return i}}function oe(n){return function(t,r){return typeof t=="string"&&typeof r=="string"||(t=Iu(t),r=Iu(r)),n(t,r)}}function fe(n,t,r,e,u,i,o,f,c,a){var l=8&t,s=l?o:F;o=l?F:o;var h=l?i:F;return i=l?F:i,t=(t|(l?32:64))&~(l?64:32),4&t||(t&=-4),u=[n,t,u,h,s,i,o,f,c,a],r=r.apply(F,u),Be(n)&&xo(r,u),r.placeholder=e,De(r,n,t)}function ce(n){
var t=Xu[n];return function(n,r){if(n=Iu(n),r=null==r?0:Mi(Ou(r),292)){var e=(zu(n)+"e").split("e"),e=t(e[0]+"e"+(+e[1]+r)),e=(zu(e)+"e").split("e");return+(e[0]+"e"+(+e[1]-r))}return t(n)}}function ae(n){return function(t){var r=yo(t);return"[object Map]"==r?L(t):"[object Set]"==r?M(t):O(t,n(t))}}function le(n,t,r,e,u,i,o,f){var c=2&t;if(!c&&typeof n!="function")throw new ei("Expected a function");var a=e?e.length:0;if(a||(t&=-97,e=u=F),o=o===F?o:Di(Ou(o),0),f=f===F?f:Ou(f),a-=u?u.length:0,64&t){
var l=e,s=u;e=u=F}var h=c?F:_o(n);return i=[n,t,r,e,u,l,s,i,o,f],h&&(r=i[1],n=h[1],t=r|n,e=128==n&&8==r||128==n&&256==r&&i[7].length<=h[8]||384==n&&h[7].length<=h[8]&&8==r,131>t||e)&&(1&n&&(i[2]=h[2],t|=1&r?0:4),(r=h[3])&&(e=i[3],i[3]=e?Cr(e,r,h[4]):r,i[4]=e?C(i[3],"__lodash_placeholder__"):h[4]),(r=h[5])&&(e=i[5],i[5]=e?Dr(e,r,h[6]):r,i[6]=e?C(i[5],"__lodash_placeholder__"):h[6]),(r=h[7])&&(i[7]=r),128&n&&(i[8]=null==i[8]?h[8]:Mi(i[8],h[8])),null==i[9]&&(i[9]=h[9]),i[0]=h[0],i[1]=t),n=i[0],t=i[1],
r=i[2],e=i[3],u=i[4],f=i[9]=i[9]===F?c?0:n.length:Di(i[9]-a,0),!f&&24&t&&(t&=-25),De((h?lo:xo)(t&&1!=t?8==t||16==t?Jr(n,t,f):32!=t&&33!=t||u.length?Xr.apply(F,i):ue(n,t,r,e):Vr(n,t,r),i),n,t)}function se(n,t,r,e){return n===F||hu(n,ii[r])&&!ci.call(e,r)?t:n}function he(n,t,r,e,u,i){return bu(n)&&bu(t)&&(i.set(t,n),nr(n,t,F,he,i),i.delete(t)),n}function pe(n){return wu(n)?F:n}function _e(n,t,r,e,u,i){var o=1&r,f=n.length,c=t.length;if(f!=c&&!(o&&c>f))return false;if((c=i.get(n))&&i.get(t))return c==t;var c=-1,a=true,l=2&r?new qn:F;
for(i.set(n,t),i.set(t,n);++c<f;){var s=n[c],h=t[c];if(e)var p=o?e(h,s,c,t,n,i):e(s,h,c,n,t,i);if(p!==F){if(p)continue;a=false;break}if(l){if(!_(t,function(n,t){if(!R(l,t)&&(s===n||u(s,n,r,e,i)))return l.push(t)})){a=false;break}}else if(s!==h&&!u(s,h,r,e,i)){a=false;break}}return i.delete(n),i.delete(t),a}function ve(n,t,r,e,u,i,o){switch(r){case"[object DataView]":if(n.byteLength!=t.byteLength||n.byteOffset!=t.byteOffset)break;n=n.buffer,t=t.buffer;case"[object ArrayBuffer]":if(n.byteLength!=t.byteLength||!i(new di(n),new di(t)))break;
return true;case"[object Boolean]":case"[object Date]":case"[object Number]":return hu(+n,+t);case"[object Error]":return n.name==t.name&&n.message==t.message;case"[object RegExp]":case"[object String]":return n==t+"";case"[object Map]":var f=L;case"[object Set]":if(f||(f=D),n.size!=t.size&&!(1&e))break;return(r=o.get(n))?r==t:(e|=2,o.set(n,t),t=_e(f(n),f(t),e,u,i,o),o.delete(n),t);case"[object Symbol]":if(eo)return eo.call(n)==eo.call(t)}return false}function ge(n){return wo(Ce(n,F,Ve),n+"")}function de(n){
return Rt(n,Lu,vo)}function ye(n){return Rt(n,Uu,go)}function be(n){for(var t=n.name+"",r=Ji[t],e=ci.call(Ji,t)?r.length:0;e--;){var u=r[e],i=u.func;if(null==i||i==n)return u.name}return t}function xe(n){return(ci.call(On,"placeholder")?On:n).placeholder}function je(){var n=On.iteratee||Pu,n=n===Pu?Gt:n;return arguments.length?n(arguments[0],arguments[1]):n}function we(n,t){var r=n.__data__,e=typeof t;return("string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t)?r[typeof t=="string"?"string":"hash"]:r.map;
}function me(n){for(var t=Lu(n),r=t.length;r--;){var e=t[r],u=n[e];t[r]=[e,u,u===u&&!bu(u)]}return t}function Ae(n,t){var r=null==n?F:n[t];return Zt(r)?r:F}function ke(n,t,r){t=Rr(t,n);for(var e=-1,u=t.length,i=false;++e<u;){var o=$e(t[e]);if(!(i=null!=n&&r(n,o)))break;n=n[o]}return i||++e!=u?i:(u=null==n?0:n.length,!!u&&yu(u)&&Re(o,u)&&(af(n)||cf(n)))}function Ee(n){var t=n.length,r=n.constructor(t);return t&&"string"==typeof n[0]&&ci.call(n,"index")&&(r.index=n.index,r.input=n.input),r}function Oe(n){
return typeof n.constructor!="function"||Le(n)?{}:io(bi(n))}function Se(r,e,u,i){var o=r.constructor;switch(e){case"[object ArrayBuffer]":return Br(r);case"[object Boolean]":case"[object Date]":return new o(+r);case"[object DataView]":return e=i?Br(r.buffer):r.buffer,new r.constructor(e,r.byteOffset,r.byteLength);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":
case"[object Uint16Array]":case"[object Uint32Array]":return Lr(r,i);case"[object Map]":return e=i?u(L(r),1):L(r),h(e,n,new r.constructor);case"[object Number]":case"[object String]":return new o(r);case"[object RegExp]":return e=new r.constructor(r.source,dn.exec(r)),e.lastIndex=r.lastIndex,e;case"[object Set]":return e=i?u(D(r),1):D(r),h(e,t,new r.constructor);case"[object Symbol]":return eo?ni(eo.call(r)):{}}}function Ie(n){return af(n)||cf(n)||!!(mi&&n&&n[mi])}function Re(n,t){return t=null==t?9007199254740991:t,
!!t&&(typeof n=="number"||wn.test(n))&&-1<n&&0==n%1&&n<t}function ze(n,t,r){if(!bu(r))return false;var e=typeof t;return!!("number"==e?pu(r)&&Re(t,r.length):"string"==e&&t in r)&&hu(r[t],n)}function We(n,t){if(af(n))return false;var r=typeof n;return!("number"!=r&&"symbol"!=r&&"boolean"!=r&&null!=n&&!Au(n))||(rn.test(n)||!tn.test(n)||null!=t&&n in ni(t))}function Be(n){var t=be(n),r=On[t];return typeof r=="function"&&t in Mn.prototype&&(n===r||(t=_o(r),!!t&&n===t[0]))}function Le(n){var t=n&&n.constructor;
return n===(typeof t=="function"&&t.prototype||ii)}function Ue(n,t){return function(r){return null!=r&&(r[n]===t&&(t!==F||n in ni(r)))}}function Ce(n,t,e){return t=Di(t===F?n.length-1:t,0),function(){for(var u=arguments,i=-1,o=Di(u.length-t,0),f=Hu(o);++i<o;)f[i]=u[t+i];for(i=-1,o=Hu(t+1);++i<t;)o[i]=u[i];return o[t]=e(f),r(n,this,o)}}function De(n,t,r){var e=t+"";t=wo;var u,i=Ne;return u=(u=e.match(hn))?u[1].split(pn):[],r=i(u,r),(i=r.length)&&(u=i-1,r[u]=(1<i?"& ":"")+r[u],r=r.join(2<i?", ":" "),
e=e.replace(sn,"{\n/* [wrapped with "+r+"] */\n")),t(n,e)}function Me(n){var t=0,r=0;return function(){var e=Ti(),u=16-(e-r);if(r=e,0<u){if(800<=++t)return arguments[0]}else t=0;return n.apply(F,arguments)}}function Te(n,t){var r=-1,e=n.length,u=e-1;for(t=t===F?e:t;++r<t;){var e=cr(r,u),i=n[e];n[e]=n[r],n[r]=i}return n.length=t,n}function $e(n){if(typeof n=="string"||Au(n))return n;var t=n+"";return"0"==t&&1/n==-N?"-0":t}function Fe(n){if(null!=n){try{return fi.call(n)}catch(n){}return n+""}return"";
}function Ne(n,t){return u(Z,function(r){var e="_."+r[0];t&r[1]&&!c(n,e)&&n.push(e)}),n.sort()}function Pe(n){if(n instanceof Mn)return n.clone();var t=new zn(n.__wrapped__,n.__chain__);return t.__actions__=Mr(n.__actions__),t.__index__=n.__index__,t.__values__=n.__values__,t}function Ze(n,t,r){var e=null==n?0:n.length;return e?(r=null==r?0:Ou(r),0>r&&(r=Di(e+r,0)),g(n,je(t,3),r)):-1}function qe(n,t,r){var e=null==n?0:n.length;if(!e)return-1;var u=e-1;return r!==F&&(u=Ou(r),u=0>r?Di(e+u,0):Mi(u,e-1)),
g(n,je(t,3),u,true)}function Ve(n){return(null==n?0:n.length)?kt(n,1):[]}function Ke(n){return n&&n.length?n[0]:F}function Ge(n){var t=null==n?0:n.length;return t?n[t-1]:F}function He(n,t){return n&&n.length&&t&&t.length?or(n,t):n}function Je(n){return null==n?n:Ni.call(n)}function Ye(n){if(!n||!n.length)return[];var t=0;return n=f(n,function(n){if(_u(n))return t=Di(n.length,t),true}),E(t,function(t){return l(n,j(t))})}function Qe(n,t){if(!n||!n.length)return[];var e=Ye(n);return null==t?e:l(e,function(n){
return r(t,F,n)})}function Xe(n){return n=On(n),n.__chain__=true,n}function nu(n,t){return t(n)}function tu(){return this}function ru(n,t){return(af(n)?u:oo)(n,je(t,3))}function eu(n,t){return(af(n)?i:fo)(n,je(t,3))}function uu(n,t){return(af(n)?l:Yt)(n,je(t,3))}function iu(n,t,r){return t=r?F:t,t=n&&null==t?n.length:t,le(n,128,F,F,F,F,t)}function ou(n,t){var r;if(typeof t!="function")throw new ei("Expected a function");return n=Ou(n),function(){return 0<--n&&(r=t.apply(this,arguments)),1>=n&&(t=F),
r}}function fu(n,t,r){return t=r?F:t,n=le(n,8,F,F,F,F,F,t),n.placeholder=fu.placeholder,n}function cu(n,t,r){return t=r?F:t,n=le(n,16,F,F,F,F,F,t),n.placeholder=cu.placeholder,n}function au(n,t,r){function e(t){var r=c,e=a;return c=a=F,_=t,s=n.apply(e,r)}function u(n){var r=n-p;return n-=_,p===F||r>=t||0>r||g&&n>=l}function i(){var n=Jo();if(u(n))return o(n);var r,e=jo;r=n-_,n=t-(n-p),r=g?Mi(n,l-r):n,h=e(i,r)}function o(n){return h=F,d&&c?e(n):(c=a=F,s)}function f(){var n=Jo(),r=u(n);if(c=arguments,
a=this,p=n,r){if(h===F)return _=n=p,h=jo(i,t),v?e(n):s;if(g)return h=jo(i,t),e(p)}return h===F&&(h=jo(i,t)),s}var c,a,l,s,h,p,_=0,v=false,g=false,d=true;if(typeof n!="function")throw new ei("Expected a function");return t=Iu(t)||0,bu(r)&&(v=!!r.leading,l=(g="maxWait"in r)?Di(Iu(r.maxWait)||0,t):l,d="trailing"in r?!!r.trailing:d),f.cancel=function(){h!==F&&ho(h),_=0,c=p=a=h=F},f.flush=function(){return h===F?s:o(Jo())},f}function lu(n,t){function r(){var e=arguments,u=t?t.apply(this,e):e[0],i=r.cache;return i.has(u)?i.get(u):(e=n.apply(this,e),
r.cache=i.set(u,e)||i,e)}if(typeof n!="function"||null!=t&&typeof t!="function")throw new ei("Expected a function");return r.cache=new(lu.Cache||Pn),r}function su(n){if(typeof n!="function")throw new ei("Expected a function");return function(){var t=arguments;switch(t.length){case 0:return!n.call(this);case 1:return!n.call(this,t[0]);case 2:return!n.call(this,t[0],t[1]);case 3:return!n.call(this,t[0],t[1],t[2])}return!n.apply(this,t)}}function hu(n,t){return n===t||n!==n&&t!==t}function pu(n){return null!=n&&yu(n.length)&&!gu(n);
}function _u(n){return xu(n)&&pu(n)}function vu(n){if(!xu(n))return false;var t=zt(n);return"[object Error]"==t||"[object DOMException]"==t||typeof n.message=="string"&&typeof n.name=="string"&&!wu(n)}function gu(n){return!!bu(n)&&(n=zt(n),"[object Function]"==n||"[object GeneratorFunction]"==n||"[object AsyncFunction]"==n||"[object Proxy]"==n)}function du(n){return typeof n=="number"&&n==Ou(n)}function yu(n){return typeof n=="number"&&-1<n&&0==n%1&&9007199254740991>=n}function bu(n){var t=typeof n;return null!=n&&("object"==t||"function"==t);
}function xu(n){return null!=n&&typeof n=="object"}function ju(n){return typeof n=="number"||xu(n)&&"[object Number]"==zt(n)}function wu(n){return!(!xu(n)||"[object Object]"!=zt(n))&&(n=bi(n),null===n||(n=ci.call(n,"constructor")&&n.constructor,typeof n=="function"&&n instanceof n&&fi.call(n)==hi))}function mu(n){return typeof n=="string"||!af(n)&&xu(n)&&"[object String]"==zt(n)}function Au(n){return typeof n=="symbol"||xu(n)&&"[object Symbol]"==zt(n)}function ku(n){if(!n)return[];if(pu(n))return mu(n)?$(n):Mr(n);
if(Ai&&n[Ai]){n=n[Ai]();for(var t,r=[];!(t=n.next()).done;)r.push(t.value);return r}return t=yo(n),("[object Map]"==t?L:"[object Set]"==t?D:Du)(n)}function Eu(n){return n?(n=Iu(n),n===N||n===-N?1.7976931348623157e308*(0>n?-1:1):n===n?n:0):0===n?n:0}function Ou(n){n=Eu(n);var t=n%1;return n===n?t?n-t:n:0}function Su(n){return n?gt(Ou(n),0,4294967295):0}function Iu(n){if(typeof n=="number")return n;if(Au(n))return P;if(bu(n)&&(n=typeof n.valueOf=="function"?n.valueOf():n,n=bu(n)?n+"":n),typeof n!="string")return 0===n?n:+n;
n=n.replace(cn,"");var t=bn.test(n);return t||jn.test(n)?Fn(n.slice(2),t?2:8):yn.test(n)?P:+n}function Ru(n){return Tr(n,Uu(n))}function zu(n){return null==n?"":jr(n)}function Wu(n,t,r){return n=null==n?F:It(n,t),n===F?r:n}function Bu(n,t){return null!=n&&ke(n,t,Lt)}function Lu(n){return pu(n)?Gn(n):Ht(n)}function Uu(n){if(pu(n))n=Gn(n,true);else if(bu(n)){var t,r=Le(n),e=[];for(t in n)("constructor"!=t||!r&&ci.call(n,t))&&e.push(t);n=e}else{if(t=[],null!=n)for(r in ni(n))t.push(r);n=t}return n}function Cu(n,t){
if(null==n)return{};var r=l(ye(n),function(n){return[n]});return t=je(t),ur(n,r,function(n,r){return t(n,r[0])})}function Du(n){return null==n?[]:I(n,Lu(n))}function Mu(n){return Nf(zu(n).toLowerCase())}function Tu(n){return(n=zu(n))&&n.replace(mn,rt).replace(Rn,"")}function $u(n,t,r){return n=zu(n),t=r?F:t,t===F?Ln.test(n)?n.match(Wn)||[]:n.match(_n)||[]:n.match(t)||[]}function Fu(n){return function(){return n}}function Nu(n){return n}function Pu(n){return Gt(typeof n=="function"?n:dt(n,1))}function Zu(n,t,r){
var e=Lu(t),i=St(t,e);null!=r||bu(t)&&(i.length||!e.length)||(r=t,t=n,n=this,i=St(t,Lu(t)));var o=!(bu(r)&&"chain"in r&&!r.chain),f=gu(n);return u(i,function(r){var e=t[r];n[r]=e,f&&(n.prototype[r]=function(){var t=this.__chain__;if(o||t){var r=n(this.__wrapped__);return(r.__actions__=Mr(this.__actions__)).push({func:e,args:arguments,thisArg:n}),r.__chain__=t,r}return e.apply(n,s([this.value()],arguments))})}),n}function qu(){}function Vu(n){return We(n)?j($e(n)):ir(n)}function Ku(){return[]}function Gu(){
return false}En=null==En?Zn:it.defaults(Zn.Object(),En,it.pick(Zn,Un));var Hu=En.Array,Ju=En.Date,Yu=En.Error,Qu=En.Function,Xu=En.Math,ni=En.Object,ti=En.RegExp,ri=En.String,ei=En.TypeError,ui=Hu.prototype,ii=ni.prototype,oi=En["__core-js_shared__"],fi=Qu.prototype.toString,ci=ii.hasOwnProperty,ai=0,li=function(){var n=/[^.]+$/.exec(oi&&oi.keys&&oi.keys.IE_PROTO||"");return n?"Symbol(src)_1."+n:""}(),si=ii.toString,hi=fi.call(ni),pi=Zn._,_i=ti("^"+fi.call(ci).replace(on,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),vi=Kn?En.Buffer:F,gi=En.Symbol,di=En.Uint8Array,yi=vi?vi.f:F,bi=U(ni.getPrototypeOf,ni),xi=ni.create,ji=ii.propertyIsEnumerable,wi=ui.splice,mi=gi?gi.isConcatSpreadable:F,Ai=gi?gi.iterator:F,ki=gi?gi.toStringTag:F,Ei=function(){
try{var n=Ae(ni,"defineProperty");return n({},"",{}),n}catch(n){}}(),Oi=En.clearTimeout!==Zn.clearTimeout&&En.clearTimeout,Si=Ju&&Ju.now!==Zn.Date.now&&Ju.now,Ii=En.setTimeout!==Zn.setTimeout&&En.setTimeout,Ri=Xu.ceil,zi=Xu.floor,Wi=ni.getOwnPropertySymbols,Bi=vi?vi.isBuffer:F,Li=En.isFinite,Ui=ui.join,Ci=U(ni.keys,ni),Di=Xu.max,Mi=Xu.min,Ti=Ju.now,$i=En.parseInt,Fi=Xu.random,Ni=ui.reverse,Pi=Ae(En,"DataView"),Zi=Ae(En,"Map"),qi=Ae(En,"Promise"),Vi=Ae(En,"Set"),Ki=Ae(En,"WeakMap"),Gi=Ae(ni,"create"),Hi=Ki&&new Ki,Ji={},Yi=Fe(Pi),Qi=Fe(Zi),Xi=Fe(qi),no=Fe(Vi),to=Fe(Ki),ro=gi?gi.prototype:F,eo=ro?ro.valueOf:F,uo=ro?ro.toString:F,io=function(){
function n(){}return function(t){return bu(t)?xi?xi(t):(n.prototype=t,t=new n,n.prototype=F,t):{}}}();On.templateSettings={escape:Q,evaluate:X,interpolate:nn,variable:"",imports:{_:On}},On.prototype=Sn.prototype,On.prototype.constructor=On,zn.prototype=io(Sn.prototype),zn.prototype.constructor=zn,Mn.prototype=io(Sn.prototype),Mn.prototype.constructor=Mn,Tn.prototype.clear=function(){this.__data__=Gi?Gi(null):{},this.size=0},Tn.prototype.delete=function(n){return n=this.has(n)&&delete this.__data__[n],
this.size-=n?1:0,n},Tn.prototype.get=function(n){var t=this.__data__;return Gi?(n=t[n],"__lodash_hash_undefined__"===n?F:n):ci.call(t,n)?t[n]:F},Tn.prototype.has=function(n){var t=this.__data__;return Gi?t[n]!==F:ci.call(t,n)},Tn.prototype.set=function(n,t){var r=this.__data__;return this.size+=this.has(n)?0:1,r[n]=Gi&&t===F?"__lodash_hash_undefined__":t,this},Nn.prototype.clear=function(){this.__data__=[],this.size=0},Nn.prototype.delete=function(n){var t=this.__data__;return n=lt(t,n),!(0>n)&&(n==t.length-1?t.pop():wi.call(t,n,1),
--this.size,true)},Nn.prototype.get=function(n){var t=this.__data__;return n=lt(t,n),0>n?F:t[n][1]},Nn.prototype.has=function(n){return-1<lt(this.__data__,n)},Nn.prototype.set=function(n,t){var r=this.__data__,e=lt(r,n);return 0>e?(++this.size,r.push([n,t])):r[e][1]=t,this},Pn.prototype.clear=function(){this.size=0,this.__data__={hash:new Tn,map:new(Zi||Nn),string:new Tn}},Pn.prototype.delete=function(n){return n=we(this,n).delete(n),this.size-=n?1:0,n},Pn.prototype.get=function(n){return we(this,n).get(n);
},Pn.prototype.has=function(n){return we(this,n).has(n)},Pn.prototype.set=function(n,t){var r=we(this,n),e=r.size;return r.set(n,t),this.size+=r.size==e?0:1,this},qn.prototype.add=qn.prototype.push=function(n){return this.__data__.set(n,"__lodash_hash_undefined__"),this},qn.prototype.has=function(n){return this.__data__.has(n)},Vn.prototype.clear=function(){this.__data__=new Nn,this.size=0},Vn.prototype.delete=function(n){var t=this.__data__;return n=t.delete(n),this.size=t.size,n},Vn.prototype.get=function(n){
return this.__data__.get(n)},Vn.prototype.has=function(n){return this.__data__.has(n)},Vn.prototype.set=function(n,t){var r=this.__data__;if(r instanceof Nn){var e=r.__data__;if(!Zi||199>e.length)return e.push([n,t]),this.size=++r.size,this;r=this.__data__=new Pn(e)}return r.set(n,t),this.size=r.size,this};var oo=Zr(Et),fo=Zr(Ot,true),co=qr(),ao=qr(true),lo=Hi?function(n,t){return Hi.set(n,t),n}:Nu,so=Ei?function(n,t){return Ei(n,"toString",{configurable:true,enumerable:false,value:Fu(t),writable:true})}:Nu,ho=Oi||function(n){
return Zn.clearTimeout(n)},po=Vi&&1/D(new Vi([,-0]))[1]==N?function(n){return new Vi(n)}:qu,_o=Hi?function(n){return Hi.get(n)}:qu,vo=Wi?function(n){return null==n?[]:(n=ni(n),f(Wi(n),function(t){return ji.call(n,t)}))}:Ku,go=Wi?function(n){for(var t=[];n;)s(t,vo(n)),n=bi(n);return t}:Ku,yo=zt;(Pi&&"[object DataView]"!=yo(new Pi(new ArrayBuffer(1)))||Zi&&"[object Map]"!=yo(new Zi)||qi&&"[object Promise]"!=yo(qi.resolve())||Vi&&"[object Set]"!=yo(new Vi)||Ki&&"[object WeakMap]"!=yo(new Ki))&&(yo=function(n){
var t=zt(n);if(n=(n="[object Object]"==t?n.constructor:F)?Fe(n):"")switch(n){case Yi:return"[object DataView]";case Qi:return"[object Map]";case Xi:return"[object Promise]";case no:return"[object Set]";case to:return"[object WeakMap]"}return t});var bo=oi?gu:Gu,xo=Me(lo),jo=Ii||function(n,t){return Zn.setTimeout(n,t)},wo=Me(so),mo=function(n){n=lu(n,function(n){return 500===t.size&&t.clear(),n});var t=n.cache;return n}(function(n){var t=[];return en.test(n)&&t.push(""),n.replace(un,function(n,r,e,u){
t.push(e?u.replace(vn,"$1"):r||n)}),t}),Ao=lr(function(n,t){return _u(n)?jt(n,kt(t,1,_u,true)):[]}),ko=lr(function(n,t){var r=Ge(t);return _u(r)&&(r=F),_u(n)?jt(n,kt(t,1,_u,true),je(r,2)):[]}),Eo=lr(function(n,t){var r=Ge(t);return _u(r)&&(r=F),_u(n)?jt(n,kt(t,1,_u,true),F,r):[]}),Oo=lr(function(n){var t=l(n,Sr);return t.length&&t[0]===n[0]?Ut(t):[]}),So=lr(function(n){var t=Ge(n),r=l(n,Sr);return t===Ge(r)?t=F:r.pop(),r.length&&r[0]===n[0]?Ut(r,je(t,2)):[]}),Io=lr(function(n){var t=Ge(n),r=l(n,Sr);return(t=typeof t=="function"?t:F)&&r.pop(),
r.length&&r[0]===n[0]?Ut(r,F,t):[]}),Ro=lr(He),zo=ge(function(n,t){var r=null==n?0:n.length,e=vt(n,t);return fr(n,l(t,function(n){return Re(n,r)?+n:n}).sort(Ur)),e}),Wo=lr(function(n){return wr(kt(n,1,_u,true))}),Bo=lr(function(n){var t=Ge(n);return _u(t)&&(t=F),wr(kt(n,1,_u,true),je(t,2))}),Lo=lr(function(n){var t=Ge(n),t=typeof t=="function"?t:F;return wr(kt(n,1,_u,true),F,t)}),Uo=lr(function(n,t){return _u(n)?jt(n,t):[]}),Co=lr(function(n){return Er(f(n,_u))}),Do=lr(function(n){var t=Ge(n);return _u(t)&&(t=F),
Er(f(n,_u),je(t,2))}),Mo=lr(function(n){var t=Ge(n),t=typeof t=="function"?t:F;return Er(f(n,_u),F,t)}),To=lr(Ye),$o=lr(function(n){var t=n.length,t=1<t?n[t-1]:F,t=typeof t=="function"?(n.pop(),t):F;return Qe(n,t)}),Fo=ge(function(n){function t(t){return vt(t,n)}var r=n.length,e=r?n[0]:0,u=this.__wrapped__;return!(1<r||this.__actions__.length)&&u instanceof Mn&&Re(e)?(u=u.slice(e,+e+(r?1:0)),u.__actions__.push({func:nu,args:[t],thisArg:F}),new zn(u,this.__chain__).thru(function(n){return r&&!n.length&&n.push(F),
n})):this.thru(t)}),No=Nr(function(n,t,r){ci.call(n,r)?++n[r]:_t(n,r,1)}),Po=Yr(Ze),Zo=Yr(qe),qo=Nr(function(n,t,r){ci.call(n,r)?n[r].push(t):_t(n,r,[t])}),Vo=lr(function(n,t,e){var u=-1,i=typeof t=="function",o=pu(n)?Hu(n.length):[];return oo(n,function(n){o[++u]=i?r(t,n,e):Dt(n,t,e)}),o}),Ko=Nr(function(n,t,r){_t(n,r,t)}),Go=Nr(function(n,t,r){n[r?0:1].push(t)},function(){return[[],[]]}),Ho=lr(function(n,t){if(null==n)return[];var r=t.length;return 1<r&&ze(n,t[0],t[1])?t=[]:2<r&&ze(t[0],t[1],t[2])&&(t=[t[0]]),
rr(n,kt(t,1),[])}),Jo=Si||function(){return Zn.Date.now()},Yo=lr(function(n,t,r){var e=1;if(r.length)var u=C(r,xe(Yo)),e=32|e;return le(n,e,t,r,u)}),Qo=lr(function(n,t,r){var e=3;if(r.length)var u=C(r,xe(Qo)),e=32|e;return le(t,e,n,r,u)}),Xo=lr(function(n,t){return xt(n,1,t)}),nf=lr(function(n,t,r){return xt(n,Iu(t)||0,r)});lu.Cache=Pn;var tf=lr(function(n,t){t=1==t.length&&af(t[0])?l(t[0],S(je())):l(kt(t,1),S(je()));var e=t.length;return lr(function(u){for(var i=-1,o=Mi(u.length,e);++i<o;)u[i]=t[i].call(this,u[i]);
return r(n,this,u)})}),rf=lr(function(n,t){return le(n,32,F,t,C(t,xe(rf)))}),ef=lr(function(n,t){return le(n,64,F,t,C(t,xe(ef)))}),uf=ge(function(n,t){return le(n,256,F,F,F,t)}),of=oe(Wt),ff=oe(function(n,t){return n>=t}),cf=Mt(function(){return arguments}())?Mt:function(n){return xu(n)&&ci.call(n,"callee")&&!ji.call(n,"callee")},af=Hu.isArray,lf=Hn?S(Hn):Tt,sf=Bi||Gu,hf=Jn?S(Jn):$t,pf=Yn?S(Yn):Nt,_f=Qn?S(Qn):qt,vf=Xn?S(Xn):Vt,gf=nt?S(nt):Kt,df=oe(Jt),yf=oe(function(n,t){return n<=t}),bf=Pr(function(n,t){
if(Le(t)||pu(t))Tr(t,Lu(t),n);else for(var r in t)ci.call(t,r)&&at(n,r,t[r])}),xf=Pr(function(n,t){Tr(t,Uu(t),n)}),jf=Pr(function(n,t,r,e){Tr(t,Uu(t),n,e)}),wf=Pr(function(n,t,r,e){Tr(t,Lu(t),n,e)}),mf=ge(vt),Af=lr(function(n){return n.push(F,se),r(jf,F,n)}),kf=lr(function(n){return n.push(F,he),r(Rf,F,n)}),Ef=ne(function(n,t,r){n[t]=r},Fu(Nu)),Of=ne(function(n,t,r){ci.call(n,t)?n[t].push(r):n[t]=[r]},je),Sf=lr(Dt),If=Pr(function(n,t,r){nr(n,t,r)}),Rf=Pr(function(n,t,r,e){nr(n,t,r,e)}),zf=ge(function(n,t){
var r={};if(null==n)return r;var e=false;t=l(t,function(t){return t=Rr(t,n),e||(e=1<t.length),t}),Tr(n,ye(n),r),e&&(r=dt(r,7,pe));for(var u=t.length;u--;)mr(r,t[u]);return r}),Wf=ge(function(n,t){return null==n?{}:er(n,t)}),Bf=ae(Lu),Lf=ae(Uu),Uf=Gr(function(n,t,r){return t=t.toLowerCase(),n+(r?Mu(t):t)}),Cf=Gr(function(n,t,r){return n+(r?"-":"")+t.toLowerCase()}),Df=Gr(function(n,t,r){return n+(r?" ":"")+t.toLowerCase()}),Mf=Kr("toLowerCase"),Tf=Gr(function(n,t,r){return n+(r?"_":"")+t.toLowerCase();
}),$f=Gr(function(n,t,r){return n+(r?" ":"")+Nf(t)}),Ff=Gr(function(n,t,r){return n+(r?" ":"")+t.toUpperCase()}),Nf=Kr("toUpperCase"),Pf=lr(function(n,t){try{return r(n,F,t)}catch(n){return vu(n)?n:new Yu(n)}}),Zf=ge(function(n,t){return u(t,function(t){t=$e(t),_t(n,t,Yo(n[t],n))}),n}),qf=Qr(),Vf=Qr(true),Kf=lr(function(n,t){return function(r){return Dt(r,n,t)}}),Gf=lr(function(n,t){return function(r){return Dt(n,r,t)}}),Hf=re(l),Jf=re(o),Yf=re(_),Qf=ie(),Xf=ie(true),nc=te(function(n,t){return n+t},0),tc=ce("ceil"),rc=te(function(n,t){
return n/t},1),ec=ce("floor"),uc=te(function(n,t){return n*t},1),ic=ce("round"),oc=te(function(n,t){return n-t},0);return On.after=function(n,t){if(typeof t!="function")throw new ei("Expected a function");return n=Ou(n),function(){if(1>--n)return t.apply(this,arguments)}},On.ary=iu,On.assign=bf,On.assignIn=xf,On.assignInWith=jf,On.assignWith=wf,On.at=mf,On.before=ou,On.bind=Yo,On.bindAll=Zf,On.bindKey=Qo,On.castArray=function(){if(!arguments.length)return[];var n=arguments[0];return af(n)?n:[n]},
On.chain=Xe,On.chunk=function(n,t,r){if(t=(r?ze(n,t,r):t===F)?1:Di(Ou(t),0),r=null==n?0:n.length,!r||1>t)return[];for(var e=0,u=0,i=Hu(Ri(r/t));e<r;)i[u++]=vr(n,e,e+=t);return i},On.compact=function(n){for(var t=-1,r=null==n?0:n.length,e=0,u=[];++t<r;){var i=n[t];i&&(u[e++]=i)}return u},On.concat=function(){var n=arguments.length;if(!n)return[];for(var t=Hu(n-1),r=arguments[0];n--;)t[n-1]=arguments[n];return s(af(r)?Mr(r):[r],kt(t,1))},On.cond=function(n){var t=null==n?0:n.length,e=je();return n=t?l(n,function(n){
if("function"!=typeof n[1])throw new ei("Expected a function");return[e(n[0]),n[1]]}):[],lr(function(e){for(var u=-1;++u<t;){var i=n[u];if(r(i[0],this,e))return r(i[1],this,e)}})},On.conforms=function(n){return yt(dt(n,1))},On.constant=Fu,On.countBy=No,On.create=function(n,t){var r=io(n);return null==t?r:ht(r,t)},On.curry=fu,On.curryRight=cu,On.debounce=au,On.defaults=Af,On.defaultsDeep=kf,On.defer=Xo,On.delay=nf,On.difference=Ao,On.differenceBy=ko,On.differenceWith=Eo,On.drop=function(n,t,r){var e=null==n?0:n.length;
return e?(t=r||t===F?1:Ou(t),vr(n,0>t?0:t,e)):[]},On.dropRight=function(n,t,r){var e=null==n?0:n.length;return e?(t=r||t===F?1:Ou(t),t=e-t,vr(n,0,0>t?0:t)):[]},On.dropRightWhile=function(n,t){return n&&n.length?Ar(n,je(t,3),true,true):[]},On.dropWhile=function(n,t){return n&&n.length?Ar(n,je(t,3),true):[]},On.fill=function(n,t,r,e){var u=null==n?0:n.length;if(!u)return[];for(r&&typeof r!="number"&&ze(n,t,r)&&(r=0,e=u),u=n.length,r=Ou(r),0>r&&(r=-r>u?0:u+r),e=e===F||e>u?u:Ou(e),0>e&&(e+=u),e=r>e?0:Su(e);r<e;)n[r++]=t;
return n},On.filter=function(n,t){return(af(n)?f:At)(n,je(t,3))},On.flatMap=function(n,t){return kt(uu(n,t),1)},On.flatMapDeep=function(n,t){return kt(uu(n,t),N)},On.flatMapDepth=function(n,t,r){return r=r===F?1:Ou(r),kt(uu(n,t),r)},On.flatten=Ve,On.flattenDeep=function(n){return(null==n?0:n.length)?kt(n,N):[]},On.flattenDepth=function(n,t){return null!=n&&n.length?(t=t===F?1:Ou(t),kt(n,t)):[]},On.flip=function(n){return le(n,512)},On.flow=qf,On.flowRight=Vf,On.fromPairs=function(n){for(var t=-1,r=null==n?0:n.length,e={};++t<r;){
var u=n[t];e[u[0]]=u[1]}return e},On.functions=function(n){return null==n?[]:St(n,Lu(n))},On.functionsIn=function(n){return null==n?[]:St(n,Uu(n))},On.groupBy=qo,On.initial=function(n){return(null==n?0:n.length)?vr(n,0,-1):[]},On.intersection=Oo,On.intersectionBy=So,On.intersectionWith=Io,On.invert=Ef,On.invertBy=Of,On.invokeMap=Vo,On.iteratee=Pu,On.keyBy=Ko,On.keys=Lu,On.keysIn=Uu,On.map=uu,On.mapKeys=function(n,t){var r={};return t=je(t,3),Et(n,function(n,e,u){_t(r,t(n,e,u),n)}),r},On.mapValues=function(n,t){
var r={};return t=je(t,3),Et(n,function(n,e,u){_t(r,e,t(n,e,u))}),r},On.matches=function(n){return Qt(dt(n,1))},On.matchesProperty=function(n,t){return Xt(n,dt(t,1))},On.memoize=lu,On.merge=If,On.mergeWith=Rf,On.method=Kf,On.methodOf=Gf,On.mixin=Zu,On.negate=su,On.nthArg=function(n){return n=Ou(n),lr(function(t){return tr(t,n)})},On.omit=zf,On.omitBy=function(n,t){return Cu(n,su(je(t)))},On.once=function(n){return ou(2,n)},On.orderBy=function(n,t,r,e){return null==n?[]:(af(t)||(t=null==t?[]:[t]),
r=e?F:r,af(r)||(r=null==r?[]:[r]),rr(n,t,r))},On.over=Hf,On.overArgs=tf,On.overEvery=Jf,On.overSome=Yf,On.partial=rf,On.partialRight=ef,On.partition=Go,On.pick=Wf,On.pickBy=Cu,On.property=Vu,On.propertyOf=function(n){return function(t){return null==n?F:It(n,t)}},On.pull=Ro,On.pullAll=He,On.pullAllBy=function(n,t,r){return n&&n.length&&t&&t.length?or(n,t,je(r,2)):n},On.pullAllWith=function(n,t,r){return n&&n.length&&t&&t.length?or(n,t,F,r):n},On.pullAt=zo,On.range=Qf,On.rangeRight=Xf,On.rearg=uf,On.reject=function(n,t){
return(af(n)?f:At)(n,su(je(t,3)))},On.remove=function(n,t){var r=[];if(!n||!n.length)return r;var e=-1,u=[],i=n.length;for(t=je(t,3);++e<i;){var o=n[e];t(o,e,n)&&(r.push(o),u.push(e))}return fr(n,u),r},On.rest=function(n,t){if(typeof n!="function")throw new ei("Expected a function");return t=t===F?t:Ou(t),lr(n,t)},On.reverse=Je,On.sampleSize=function(n,t,r){return t=(r?ze(n,t,r):t===F)?1:Ou(t),(af(n)?ot:hr)(n,t)},On.set=function(n,t,r){return null==n?n:pr(n,t,r)},On.setWith=function(n,t,r,e){return e=typeof e=="function"?e:F,
null==n?n:pr(n,t,r,e)},On.shuffle=function(n){return(af(n)?ft:_r)(n)},On.slice=function(n,t,r){var e=null==n?0:n.length;return e?(r&&typeof r!="number"&&ze(n,t,r)?(t=0,r=e):(t=null==t?0:Ou(t),r=r===F?e:Ou(r)),vr(n,t,r)):[]},On.sortBy=Ho,On.sortedUniq=function(n){return n&&n.length?br(n):[]},On.sortedUniqBy=function(n,t){return n&&n.length?br(n,je(t,2)):[]},On.split=function(n,t,r){return r&&typeof r!="number"&&ze(n,t,r)&&(t=r=F),r=r===F?4294967295:r>>>0,r?(n=zu(n))&&(typeof t=="string"||null!=t&&!_f(t))&&(t=jr(t),
!t&&Bn.test(n))?zr($(n),0,r):n.split(t,r):[]},On.spread=function(n,t){if(typeof n!="function")throw new ei("Expected a function");return t=null==t?0:Di(Ou(t),0),lr(function(e){var u=e[t];return e=zr(e,0,t),u&&s(e,u),r(n,this,e)})},On.tail=function(n){var t=null==n?0:n.length;return t?vr(n,1,t):[]},On.take=function(n,t,r){return n&&n.length?(t=r||t===F?1:Ou(t),vr(n,0,0>t?0:t)):[]},On.takeRight=function(n,t,r){var e=null==n?0:n.length;return e?(t=r||t===F?1:Ou(t),t=e-t,vr(n,0>t?0:t,e)):[]},On.takeRightWhile=function(n,t){
return n&&n.length?Ar(n,je(t,3),false,true):[]},On.takeWhile=function(n,t){return n&&n.length?Ar(n,je(t,3)):[]},On.tap=function(n,t){return t(n),n},On.throttle=function(n,t,r){var e=true,u=true;if(typeof n!="function")throw new ei("Expected a function");return bu(r)&&(e="leading"in r?!!r.leading:e,u="trailing"in r?!!r.trailing:u),au(n,t,{leading:e,maxWait:t,trailing:u})},On.thru=nu,On.toArray=ku,On.toPairs=Bf,On.toPairsIn=Lf,On.toPath=function(n){return af(n)?l(n,$e):Au(n)?[n]:Mr(mo(zu(n)))},On.toPlainObject=Ru,
On.transform=function(n,t,r){var e=af(n),i=e||sf(n)||gf(n);if(t=je(t,4),null==r){var o=n&&n.constructor;r=i?e?new o:[]:bu(n)&&gu(o)?io(bi(n)):{}}return(i?u:Et)(n,function(n,e,u){return t(r,n,e,u)}),r},On.unary=function(n){return iu(n,1)},On.union=Wo,On.unionBy=Bo,On.unionWith=Lo,On.uniq=function(n){return n&&n.length?wr(n):[]},On.uniqBy=function(n,t){return n&&n.length?wr(n,je(t,2)):[]},On.uniqWith=function(n,t){return t=typeof t=="function"?t:F,n&&n.length?wr(n,F,t):[]},On.unset=function(n,t){return null==n||mr(n,t);
},On.unzip=Ye,On.unzipWith=Qe,On.update=function(n,t,r){return null==n?n:pr(n,t,Ir(r)(It(n,t)),void 0)},On.updateWith=function(n,t,r,e){return e=typeof e=="function"?e:F,null!=n&&(n=pr(n,t,Ir(r)(It(n,t)),e)),n},On.values=Du,On.valuesIn=function(n){return null==n?[]:I(n,Uu(n))},On.without=Uo,On.words=$u,On.wrap=function(n,t){return rf(Ir(t),n)},On.xor=Co,On.xorBy=Do,On.xorWith=Mo,On.zip=To,On.zipObject=function(n,t){return Or(n||[],t||[],at)},On.zipObjectDeep=function(n,t){return Or(n||[],t||[],pr);
},On.zipWith=$o,On.entries=Bf,On.entriesIn=Lf,On.extend=xf,On.extendWith=jf,Zu(On,On),On.add=nc,On.attempt=Pf,On.camelCase=Uf,On.capitalize=Mu,On.ceil=tc,On.clamp=function(n,t,r){return r===F&&(r=t,t=F),r!==F&&(r=Iu(r),r=r===r?r:0),t!==F&&(t=Iu(t),t=t===t?t:0),gt(Iu(n),t,r)},On.clone=function(n){return dt(n,4)},On.cloneDeep=function(n){return dt(n,5)},On.cloneDeepWith=function(n,t){return t=typeof t=="function"?t:F,dt(n,5,t)},On.cloneWith=function(n,t){return t=typeof t=="function"?t:F,dt(n,4,t)},
On.conformsTo=function(n,t){return null==t||bt(n,t,Lu(t))},On.deburr=Tu,On.defaultTo=function(n,t){return null==n||n!==n?t:n},On.divide=rc,On.endsWith=function(n,t,r){n=zu(n),t=jr(t);var e=n.length,e=r=r===F?e:gt(Ou(r),0,e);return r-=t.length,0<=r&&n.slice(r,e)==t},On.eq=hu,On.escape=function(n){return(n=zu(n))&&Y.test(n)?n.replace(H,et):n},On.escapeRegExp=function(n){return(n=zu(n))&&fn.test(n)?n.replace(on,"\\$&"):n},On.every=function(n,t,r){var e=af(n)?o:wt;return r&&ze(n,t,r)&&(t=F),e(n,je(t,3));
},On.find=Po,On.findIndex=Ze,On.findKey=function(n,t){return v(n,je(t,3),Et)},On.findLast=Zo,On.findLastIndex=qe,On.findLastKey=function(n,t){return v(n,je(t,3),Ot)},On.floor=ec,On.forEach=ru,On.forEachRight=eu,On.forIn=function(n,t){return null==n?n:co(n,je(t,3),Uu)},On.forInRight=function(n,t){return null==n?n:ao(n,je(t,3),Uu)},On.forOwn=function(n,t){return n&&Et(n,je(t,3))},On.forOwnRight=function(n,t){return n&&Ot(n,je(t,3))},On.get=Wu,On.gt=of,On.gte=ff,On.has=function(n,t){return null!=n&&ke(n,t,Bt);
},On.hasIn=Bu,On.head=Ke,On.identity=Nu,On.includes=function(n,t,r,e){return n=pu(n)?n:Du(n),r=r&&!e?Ou(r):0,e=n.length,0>r&&(r=Di(e+r,0)),mu(n)?r<=e&&-1<n.indexOf(t,r):!!e&&-1<d(n,t,r)},On.indexOf=function(n,t,r){var e=null==n?0:n.length;return e?(r=null==r?0:Ou(r),0>r&&(r=Di(e+r,0)),d(n,t,r)):-1},On.inRange=function(n,t,r){return t=Eu(t),r===F?(r=t,t=0):r=Eu(r),n=Iu(n),n>=Mi(t,r)&&n<Di(t,r)},On.invoke=Sf,On.isArguments=cf,On.isArray=af,On.isArrayBuffer=lf,On.isArrayLike=pu,On.isArrayLikeObject=_u,
On.isBoolean=function(n){return true===n||false===n||xu(n)&&"[object Boolean]"==zt(n)},On.isBuffer=sf,On.isDate=hf,On.isElement=function(n){return xu(n)&&1===n.nodeType&&!wu(n)},On.isEmpty=function(n){if(null==n)return true;if(pu(n)&&(af(n)||typeof n=="string"||typeof n.splice=="function"||sf(n)||gf(n)||cf(n)))return!n.length;var t=yo(n);if("[object Map]"==t||"[object Set]"==t)return!n.size;if(Le(n))return!Ht(n).length;for(var r in n)if(ci.call(n,r))return false;return true},On.isEqual=function(n,t){return Ft(n,t);
},On.isEqualWith=function(n,t,r){var e=(r=typeof r=="function"?r:F)?r(n,t):F;return e===F?Ft(n,t,F,r):!!e},On.isError=vu,On.isFinite=function(n){return typeof n=="number"&&Li(n)},On.isFunction=gu,On.isInteger=du,On.isLength=yu,On.isMap=pf,On.isMatch=function(n,t){return n===t||Pt(n,t,me(t))},On.isMatchWith=function(n,t,r){return r=typeof r=="function"?r:F,Pt(n,t,me(t),r)},On.isNaN=function(n){return ju(n)&&n!=+n},On.isNative=function(n){if(bo(n))throw new Yu("Unsupported core-js use. Try https://npms.io/search?q=ponyfill.");
return Zt(n)},On.isNil=function(n){return null==n},On.isNull=function(n){return null===n},On.isNumber=ju,On.isObject=bu,On.isObjectLike=xu,On.isPlainObject=wu,On.isRegExp=_f,On.isSafeInteger=function(n){return du(n)&&-9007199254740991<=n&&9007199254740991>=n},On.isSet=vf,On.isString=mu,On.isSymbol=Au,On.isTypedArray=gf,On.isUndefined=function(n){return n===F},On.isWeakMap=function(n){return xu(n)&&"[object WeakMap]"==yo(n)},On.isWeakSet=function(n){return xu(n)&&"[object WeakSet]"==zt(n)},On.join=function(n,t){
return null==n?"":Ui.call(n,t)},On.kebabCase=Cf,On.last=Ge,On.lastIndexOf=function(n,t,r){var e=null==n?0:n.length;if(!e)return-1;var u=e;if(r!==F&&(u=Ou(r),u=0>u?Di(e+u,0):Mi(u,e-1)),t===t){for(r=u+1;r--&&n[r]!==t;);n=r}else n=g(n,b,u,true);return n},On.lowerCase=Df,On.lowerFirst=Mf,On.lt=df,On.lte=yf,On.max=function(n){return n&&n.length?mt(n,Nu,Wt):F},On.maxBy=function(n,t){return n&&n.length?mt(n,je(t,2),Wt):F},On.mean=function(n){return x(n,Nu)},On.meanBy=function(n,t){return x(n,je(t,2))},On.min=function(n){
return n&&n.length?mt(n,Nu,Jt):F},On.minBy=function(n,t){return n&&n.length?mt(n,je(t,2),Jt):F},On.stubArray=Ku,On.stubFalse=Gu,On.stubObject=function(){return{}},On.stubString=function(){return""},On.stubTrue=function(){return true},On.multiply=uc,On.nth=function(n,t){return n&&n.length?tr(n,Ou(t)):F},On.noConflict=function(){return Zn._===this&&(Zn._=pi),this},On.noop=qu,On.now=Jo,On.pad=function(n,t,r){n=zu(n);var e=(t=Ou(t))?T(n):0;return!t||e>=t?n:(t=(t-e)/2,ee(zi(t),r)+n+ee(Ri(t),r))},On.padEnd=function(n,t,r){
n=zu(n);var e=(t=Ou(t))?T(n):0;return t&&e<t?n+ee(t-e,r):n},On.padStart=function(n,t,r){n=zu(n);var e=(t=Ou(t))?T(n):0;return t&&e<t?ee(t-e,r)+n:n},On.parseInt=function(n,t,r){return r||null==t?t=0:t&&(t=+t),$i(zu(n).replace(an,""),t||0)},On.random=function(n,t,r){if(r&&typeof r!="boolean"&&ze(n,t,r)&&(t=r=F),r===F&&(typeof t=="boolean"?(r=t,t=F):typeof n=="boolean"&&(r=n,n=F)),n===F&&t===F?(n=0,t=1):(n=Eu(n),t===F?(t=n,n=0):t=Eu(t)),n>t){var e=n;n=t,t=e}return r||n%1||t%1?(r=Fi(),Mi(n+r*(t-n+$n("1e-"+((r+"").length-1))),t)):cr(n,t);
},On.reduce=function(n,t,r){var e=af(n)?h:m,u=3>arguments.length;return e(n,je(t,4),r,u,oo)},On.reduceRight=function(n,t,r){var e=af(n)?p:m,u=3>arguments.length;return e(n,je(t,4),r,u,fo)},On.repeat=function(n,t,r){return t=(r?ze(n,t,r):t===F)?1:Ou(t),ar(zu(n),t)},On.replace=function(){var n=arguments,t=zu(n[0]);return 3>n.length?t:t.replace(n[1],n[2])},On.result=function(n,t,r){t=Rr(t,n);var e=-1,u=t.length;for(u||(u=1,n=F);++e<u;){var i=null==n?F:n[$e(t[e])];i===F&&(e=u,i=r),n=gu(i)?i.call(n):i;
}return n},On.round=ic,On.runInContext=w,On.sample=function(n){return(af(n)?tt:sr)(n)},On.size=function(n){if(null==n)return 0;if(pu(n))return mu(n)?T(n):n.length;var t=yo(n);return"[object Map]"==t||"[object Set]"==t?n.size:Ht(n).length},On.snakeCase=Tf,On.some=function(n,t,r){var e=af(n)?_:gr;return r&&ze(n,t,r)&&(t=F),e(n,je(t,3))},On.sortedIndex=function(n,t){return dr(n,t)},On.sortedIndexBy=function(n,t,r){return yr(n,t,je(r,2))},On.sortedIndexOf=function(n,t){var r=null==n?0:n.length;if(r){
var e=dr(n,t);if(e<r&&hu(n[e],t))return e}return-1},On.sortedLastIndex=function(n,t){return dr(n,t,true)},On.sortedLastIndexBy=function(n,t,r){return yr(n,t,je(r,2),true)},On.sortedLastIndexOf=function(n,t){if(null==n?0:n.length){var r=dr(n,t,true)-1;if(hu(n[r],t))return r}return-1},On.startCase=$f,On.startsWith=function(n,t,r){return n=zu(n),r=null==r?0:gt(Ou(r),0,n.length),t=jr(t),n.slice(r,r+t.length)==t},On.subtract=oc,On.sum=function(n){return n&&n.length?k(n,Nu):0},On.sumBy=function(n,t){return n&&n.length?k(n,je(t,2)):0;
},On.template=function(n,t,r){var e=On.templateSettings;r&&ze(n,t,r)&&(t=F),n=zu(n),t=jf({},t,e,se),r=jf({},t.imports,e.imports,se);var u,i,o=Lu(r),f=I(r,o),c=0;r=t.interpolate||An;var a="__p+='";r=ti((t.escape||An).source+"|"+r.source+"|"+(r===nn?gn:An).source+"|"+(t.evaluate||An).source+"|$","g");var l="sourceURL"in t?"//# sourceURL="+t.sourceURL+"\n":"";if(n.replace(r,function(t,r,e,o,f,l){return e||(e=o),a+=n.slice(c,l).replace(kn,B),r&&(u=true,a+="'+__e("+r+")+'"),f&&(i=true,a+="';"+f+";\n__p+='"),
e&&(a+="'+((__t=("+e+"))==null?'':__t)+'"),c=l+t.length,t}),a+="';",(t=t.variable)||(a="with(obj){"+a+"}"),a=(i?a.replace(q,""):a).replace(V,"$1").replace(K,"$1;"),a="function("+(t||"obj")+"){"+(t?"":"obj||(obj={});")+"var __t,__p=''"+(u?",__e=_.escape":"")+(i?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+a+"return __p}",t=Pf(function(){return Qu(o,l+"return "+a).apply(F,f)}),t.source=a,vu(t))throw t;return t},On.times=function(n,t){if(n=Ou(n),1>n||9007199254740991<n)return[];
var r=4294967295,e=Mi(n,4294967295);for(t=je(t),n-=4294967295,e=E(e,t);++r<n;)t(r);return e},On.toFinite=Eu,On.toInteger=Ou,On.toLength=Su,On.toLower=function(n){return zu(n).toLowerCase()},On.toNumber=Iu,On.toSafeInteger=function(n){return n?gt(Ou(n),-9007199254740991,9007199254740991):0===n?n:0},On.toString=zu,On.toUpper=function(n){return zu(n).toUpperCase()},On.trim=function(n,t,r){return(n=zu(n))&&(r||t===F)?n.replace(cn,""):n&&(t=jr(t))?(n=$(n),r=$(t),t=z(n,r),r=W(n,r)+1,zr(n,t,r).join("")):n;
},On.trimEnd=function(n,t,r){return(n=zu(n))&&(r||t===F)?n.replace(ln,""):n&&(t=jr(t))?(n=$(n),t=W(n,$(t))+1,zr(n,0,t).join("")):n},On.trimStart=function(n,t,r){return(n=zu(n))&&(r||t===F)?n.replace(an,""):n&&(t=jr(t))?(n=$(n),t=z(n,$(t)),zr(n,t).join("")):n},On.truncate=function(n,t){var r=30,e="...";if(bu(t))var u="separator"in t?t.separator:u,r="length"in t?Ou(t.length):r,e="omission"in t?jr(t.omission):e;n=zu(n);var i=n.length;if(Bn.test(n))var o=$(n),i=o.length;if(r>=i)return n;if(i=r-T(e),1>i)return e;
if(r=o?zr(o,0,i).join(""):n.slice(0,i),u===F)return r+e;if(o&&(i+=r.length-i),_f(u)){if(n.slice(i).search(u)){var f=r;for(u.global||(u=ti(u.source,zu(dn.exec(u))+"g")),u.lastIndex=0;o=u.exec(f);)var c=o.index;r=r.slice(0,c===F?i:c)}}else n.indexOf(jr(u),i)!=i&&(u=r.lastIndexOf(u),-1<u&&(r=r.slice(0,u)));return r+e},On.unescape=function(n){return(n=zu(n))&&J.test(n)?n.replace(G,ut):n},On.uniqueId=function(n){var t=++ai;return zu(n)+t},On.upperCase=Ff,On.upperFirst=Nf,On.each=ru,On.eachRight=eu,On.first=Ke,
Zu(On,function(){var n={};return Et(On,function(t,r){ci.call(On.prototype,r)||(n[r]=t)}),n}(),{chain:false}),On.VERSION="4.17.4",u("bind bindKey curry curryRight partial partialRight".split(" "),function(n){On[n].placeholder=On}),u(["drop","take"],function(n,t){Mn.prototype[n]=function(r){r=r===F?1:Di(Ou(r),0);var e=this.__filtered__&&!t?new Mn(this):this.clone();return e.__filtered__?e.__takeCount__=Mi(r,e.__takeCount__):e.__views__.push({size:Mi(r,4294967295),type:n+(0>e.__dir__?"Right":"")}),e},Mn.prototype[n+"Right"]=function(t){
return this.reverse()[n](t).reverse()}}),u(["filter","map","takeWhile"],function(n,t){var r=t+1,e=1==r||3==r;Mn.prototype[n]=function(n){var t=this.clone();return t.__iteratees__.push({iteratee:je(n,3),type:r}),t.__filtered__=t.__filtered__||e,t}}),u(["head","last"],function(n,t){var r="take"+(t?"Right":"");Mn.prototype[n]=function(){return this[r](1).value()[0]}}),u(["initial","tail"],function(n,t){var r="drop"+(t?"":"Right");Mn.prototype[n]=function(){return this.__filtered__?new Mn(this):this[r](1);
}}),Mn.prototype.compact=function(){return this.filter(Nu)},Mn.prototype.find=function(n){return this.filter(n).head()},Mn.prototype.findLast=function(n){return this.reverse().find(n)},Mn.prototype.invokeMap=lr(function(n,t){return typeof n=="function"?new Mn(this):this.map(function(r){return Dt(r,n,t)})}),Mn.prototype.reject=function(n){return this.filter(su(je(n)))},Mn.prototype.slice=function(n,t){n=Ou(n);var r=this;return r.__filtered__&&(0<n||0>t)?new Mn(r):(0>n?r=r.takeRight(-n):n&&(r=r.drop(n)),
t!==F&&(t=Ou(t),r=0>t?r.dropRight(-t):r.take(t-n)),r)},Mn.prototype.takeRightWhile=function(n){return this.reverse().takeWhile(n).reverse()},Mn.prototype.toArray=function(){return this.take(4294967295)},Et(Mn.prototype,function(n,t){var r=/^(?:filter|find|map|reject)|While$/.test(t),e=/^(?:head|last)$/.test(t),u=On[e?"take"+("last"==t?"Right":""):t],i=e||/^find/.test(t);u&&(On.prototype[t]=function(){function t(n){return n=u.apply(On,s([n],f)),e&&h?n[0]:n}var o=this.__wrapped__,f=e?[1]:arguments,c=o instanceof Mn,a=f[0],l=c||af(o);
l&&r&&typeof a=="function"&&1!=a.length&&(c=l=false);var h=this.__chain__,p=!!this.__actions__.length,a=i&&!h,c=c&&!p;return!i&&l?(o=c?o:new Mn(this),o=n.apply(o,f),o.__actions__.push({func:nu,args:[t],thisArg:F}),new zn(o,h)):a&&c?n.apply(this,f):(o=this.thru(t),a?e?o.value()[0]:o.value():o)})}),u("pop push shift sort splice unshift".split(" "),function(n){var t=ui[n],r=/^(?:push|sort|unshift)$/.test(n)?"tap":"thru",e=/^(?:pop|shift)$/.test(n);On.prototype[n]=function(){var n=arguments;if(e&&!this.__chain__){
var u=this.value();return t.apply(af(u)?u:[],n)}return this[r](function(r){return t.apply(af(r)?r:[],n)})}}),Et(Mn.prototype,function(n,t){var r=On[t];if(r){var e=r.name+"";(Ji[e]||(Ji[e]=[])).push({name:t,func:r})}}),Ji[Xr(F,2).name]=[{name:"wrapper",func:F}],Mn.prototype.clone=function(){var n=new Mn(this.__wrapped__);return n.__actions__=Mr(this.__actions__),n.__dir__=this.__dir__,n.__filtered__=this.__filtered__,n.__iteratees__=Mr(this.__iteratees__),n.__takeCount__=this.__takeCount__,n.__views__=Mr(this.__views__),
n},Mn.prototype.reverse=function(){if(this.__filtered__){var n=new Mn(this);n.__dir__=-1,n.__filtered__=true}else n=this.clone(),n.__dir__*=-1;return n},Mn.prototype.value=function(){var n,t=this.__wrapped__.value(),r=this.__dir__,e=af(t),u=0>r,i=e?t.length:0;n=i;for(var o=this.__views__,f=0,c=-1,a=o.length;++c<a;){var l=o[c],s=l.size;switch(l.type){case"drop":f+=s;break;case"dropRight":n-=s;break;case"take":n=Mi(n,f+s);break;case"takeRight":f=Di(f,n-s)}}if(n={start:f,end:n},o=n.start,f=n.end,n=f-o,
o=u?f:o-1,f=this.__iteratees__,c=f.length,a=0,l=Mi(n,this.__takeCount__),!e||!u&&i==n&&l==n)return kr(t,this.__actions__);e=[];n:for(;n--&&a<l;){for(o+=r,u=-1,i=t[o];++u<c;){var h=f[u],s=h.type,h=(0,h.iteratee)(i);if(2==s)i=h;else if(!h){if(1==s)continue n;break n}}e[a++]=i}return e},On.prototype.at=Fo,On.prototype.chain=function(){return Xe(this)},On.prototype.commit=function(){return new zn(this.value(),this.__chain__)},On.prototype.next=function(){this.__values__===F&&(this.__values__=ku(this.value()));
var n=this.__index__>=this.__values__.length;return{done:n,value:n?F:this.__values__[this.__index__++]}},On.prototype.plant=function(n){for(var t,r=this;r instanceof Sn;){var e=Pe(r);e.__index__=0,e.__values__=F,t?u.__wrapped__=e:t=e;var u=e,r=r.__wrapped__}return u.__wrapped__=n,t},On.prototype.reverse=function(){var n=this.__wrapped__;return n instanceof Mn?(this.__actions__.length&&(n=new Mn(this)),n=n.reverse(),n.__actions__.push({func:nu,args:[Je],thisArg:F}),new zn(n,this.__chain__)):this.thru(Je);
},On.prototype.toJSON=On.prototype.valueOf=On.prototype.value=function(){return kr(this.__wrapped__,this.__actions__)},On.prototype.first=On.prototype.head,Ai&&(On.prototype[Ai]=tu),On}();typeof define=="function"&&typeof define.amd=="object"&&define.amd?(Zn._=it, define(function(){return it})):Vn?((Vn.exports=it)._=it,qn._=it):Zn._=it}).call(this);

/***/ })

},["mUJK"]);