webpackJsonp([1,5],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

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

	    let siteWords = siteKeywords.concat(url.host.split('.').slice(0, -1));
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

	var _lodash = __webpack_require__("y7q8");

	var _lodash2 = _interopRequireDefault(_lodash);

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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_translation2.default.add(new _translation2.default.BaiDu());
	_translation2.default.add(new _translation2.default.Google());
	if (_config2.default.devMode) _translation2.default.add(new _translation2.default.GoogleCN());

	var popupErr = (0, _base.minErr)('Popup');

	/**
	 * @param {Error} e
	 * */
	function errorHandler(e) {
	  _base.clog.err(e.toString());
	  //noinspection JSUnresolvedVariable
	  _base.clog.err('Error stack: ', e.stack);
	}

	var Links = function ($links) {
	  this.$links = $links;
	};
	Links.prototype.init = function (tabId) {
	  this.$links.forEach(function ($link) {
	    // set icons
	    $link.style.backgroundImage = "url('" + $link.getAttribute('data-favicon') + "')";

	    $link.onclick = function (evt) {
	      var button = (0, _base.getMouseButton)(evt);
	      switch (button) {
	        case 'left':
	          chrome.tabs.update(tabId, { url: this.href });
	          break;
	        case 'middle':
	          chrome.tabs.create({ url: this.href });
	          break;
	        default:
	          break;
	      }
	      evt.preventDefault();
	    };
	  });
	};
	Links.prototype.updateHref = function (searchWord) {
	  if (!searchWord) return popupErr('invalid param', 'updateLinkHref with empty string');
	  this.$links.forEach(function ($link) {
	    $link.href = $link.getAttribute('data-url').replace(/%s/g, encodeURIComponent(searchWord));
	  });
	};

	(0, _base.onceLoaded)(_base.getCurrentTab).then(function onLoad(tab) {
	  var tabUrl = new _Url2.default(tab.url);
	  var $keyword = _base.$`#keyword`;
	  var $translation = _base.$`.translation`;
	  var links;
	  var engineListTpl = _base.$`#tpl-engines`.innerHTML.trim();
	  var $enginesSection = _base.$`.engines`;

	  $keyword.focus();
	  $keyword.addEventListener('input', _lodash2.default.debounce(function (e) {
	    //if press enter, search word using first enabled engine
	    if (e.key === 'Enter') {
	      _base.$`.se:not(.disable)`.dispatchEvent(new MouseEvent('click', { button: 0 }));
	    }
	    onKeywordUpdate(this.value);
	  }, 500));

	  _Render2.default.openEngines(engineListTpl).then(function (rendered) {
	    $enginesSection.innerHTML = rendered;
	    links = new Links(_base.$all`.engines .icon-link`);
	  }).then(function () {
	    new _Mason2.default(_base.$`.engines`, {
	      itemSelector: '.pin',
	      columnNum: 2
	    });
	    links.init(tab.id, $keyword.value);
	  }).catch(errorHandler);

	  (0, _keyword2.default)(tabUrl).then(function (keywords) {
	    (0, _base.clog)('get keywords: ', JSON.stringify(keywords));
	    var displayStr = keywords[0].word.trim();
	    // @TODO if input is not empty, cancel getKeyWord and don't change input and link
	    // @TODO add all keywords to auto-complete suggestion list
	    $keyword.value = displayStr;
	    onKeywordUpdate(displayStr);
	    if (displayStr && links) links.updateHref(displayStr);
	    return null;
	  }).catch(errorHandler);

	  /**
	   * @param {String} str
	   * */
	  function translate(str) {
	    str = str.trim().replace(/\n/, '') || '';
	    // @TODO only translate some language, from user config
	    // @TODO not translate some language, from user config
	    // if(chrome.i18n.detect)
	    if (str.length > _config2.default.translateMaxLength) {
	      return Promise.reject(popupErr('Translation', 'String too long: ' + str));
	    }

	    var lang = navigator.language.split('-', 1)[0];
	    return _translation2.default.translate({
	      api: _config2.default.devMode ? 'GoogleCN' : navigator.language === 'zh-CN' ? 'BaiDu' : 'Google',
	      text: str,
	      to: lang === 'zh' ? navigator.language : lang
	    }).then(function (resultObj) {
	      if (resultObj.error) return null;
	      return resultObj.detailed || resultObj.result;
	    }).then(function (translated) {
	      return _lodash2.default.isEmpty((0, _base.filterEmptyStr)(translated)) ? '' : translated.filter(function (line) {
	        return line.toLowerCase() !== str.toLowerCase();
	      }).reduce(function (html, line) {
	        html += line + '\n';
	        return html;
	      }, '');
	    });
	  }

	  function onKeywordUpdate(searchString) {
	    (0, _base.clog)('translate ', searchString);
	    if (searchString && searchString.length <= _config2.default.translateMaxLength) {
	      translate(searchString).then(function (html) {
	        $translation.innerText = html;
	      }).catch(errorHandler);
	    }
	    links && links.updateHref(searchString);
	  }
	});

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
	      code: "window.getSelection().toString();",
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

	    let keys = yield _Engine2.default.searchKeys(tabUrl.host);
	    if (keys.length <= 0) {
	      return _const.EMPTY_KEYWORDS;
	    }
	    // TODO filter all engines here, only keep the matched(resultPageRegex), and if no matched, return EMPTY_KEYWORDS
	    let engine = yield _Engine2.default.get(keys[0]);

	    try {
	      engine.resultPageRegex = engine.resultPageRegex || _lodash2.default.escapeRegExp(new _Url2.default(engine.url).pathName);
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
	    let searchKey = new _Url2.default(engine.url).searchKey;
	    let searchStrings = _lodash2.default.filter(tabUrl.queryPairs, { key: searchKey });
	    let searchString = /google/.test(tabUrl.host) && searchStrings.length ? _lodash2.default.last(searchStrings).val : searchStrings[0].val;
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

	    (0, _base.clog)('content script result: ', [tabUrl.url, keywords.meta, keywords.title, keywords.h1, keywords.h2]);
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
	  apostrophe: ["’", "'"],
	  brackets: ["[", "]", "(", ")", "{", "}", "⟨", "⟩", "（", "）", "【", "】"],
	  colon: [":", "："],
	  comma: [",", "،", "、", "，"],
	  dash: ["-", "‐", "‒", "–", "—", "―"],
	  ellipsis: ["…", "..."],
	  exclamation: ["!", "！"],
	  period: [".", "。"],
	  guillemets: {
	    left: ["‹", "«", "《", "〈", "『"],
	    right: ["›", "»", "》", "〉", "』"]
	  },
	  question: ["?", "？"],
	  quotation: ["‘", "’", "“", "”", "'", "'", "\"", "「", "」"],
	  semicolon: [";", "；"],
	  slash: ["/", "⁄", "\\"],
	  math: ["`", "+", "=", "<", ">", "°"],
	  // word dividers
	  interpunct: ["·", "・", "･"],
	  block: ["¶", "§"],

	  // typography
	  verticalBar: ["|", "¦", "‖", "∣"],
	  tilde: ["~", "˜", "∼"],
	  at: ["@"],
	  hash: ["#"],
	  currency: ["¤", "￥", "$", "€", "£"], // "₳", "฿", "₵", "¢", "₡", "₢", "₫", "₯", "֏", "₠", "ƒ", "₣", "₲", "₴", "₭", "₺", "ℳ", "₥", "₦", "₧", "₱", "₰", "៛", "₽", "₹", "₨", "₪", "৳", "₸", "₮", "₩"],
	  per: ["%", "‰", "‱"],
	  caret: ["^", "‸"],
	  ampersand: ["&"],
	  asterisk: ["*"],
	  underscore: ["_"],
	  ip: ["©", "℗", "®", "℠", "™"]
	}; /**
	    * Created by ray7551@gmail.com on 12.14 014.
	    */

	const SPACES = [" ", " ", " ", "	"];

	let PUNCT_FLATTEN = (0, _base.deepValue)(PUNCT);
	/**
	 * keyword blacklist
	 * @notice all in lower case
	 * @see https://en.wikibooks.org/wiki/English_in_Use/Prepositions,_Conjunctions,_and_Interjections
	 */
	const KEYWORD_BLACKLIST = [...PUNCT_FLATTEN, "i", "me", "you", "he", "she", "they", "it", "one", "there", "that", "this", "other", "some", "someone", "something", "any", "anybody", "anything", "my", "your", "his", "her", "there", "own", "the", "a", "my", "more", "much", "either", "while", "meanwhile", "be", "is", "isn't", "isnt", "am", "ain't", "aint", "are", "have", "has", "get", "gets", "got", "was", "wasnt", "no", "not", "what", "when", "who", "how", "why", "whereas", "whether", "very", "so", "most", "least", "all", "only", "just", "but", "do", "doing", "did", "does", "can", "cannot", "can't", "up", "should", "would",
	// https://en.wikipedia.org/wiki/List_of_English_prepositions
	"about", "above", "across", "after", "against", "along", "amid", "among", "around", "at", "by", "before", "behind", "below", "beneath", "beside", "besides", "between", "beyond", "during", "except", "for", "from", "in", "into", "of", "off", "on", "over", "past", "through", "to", "toward", "towards", "under", "underneath", "until", "with", "without",
	// Conjunctions
	"and", "as", "both", "because", "even", "for", "if", "that", "then", "since", "seeing", "so", "or", "nor", "either", "neither", "than", "though", "although", "yet", "but", "except", "lest", "unless"];

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
	  match: { title: 1, meta: 1, h1: 1, h2: .1, url: 1, queryPairs: .1 }, // for _matchKeyword()
	  keyword: { title: .5, h1: .4, h2: .05 }, // for divided keywords
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
	  (0, _base.clog)('vipWords: ', JSON.stringify([...candidateWords.vipWords]));
	  (0, _base.clog)('siteWords: ', JSON.stringify([...candidateWords.siteKeywords]));
	  // clog(tabUrl.url, meta, title, h1, h2);

	  if (_isQualified(candidateWords.vipArray, 2 * _const.CONFIDENCE_MIN)) {
	    (0, _base.clog)('use good vip keywords');
	    return candidateWords.vipArray;
	  }

	  // 1. without divide
	  // see if keywords.meta[i] appeared in title, head or tabUrl, use meta as keyword array
	  _matchKeywords(meta, keywordType.meta);
	  // clog(candidateWords)
	  if (_isQualified(candidateWords.orderedArray)) {
	    (0, _base.clog)('use meta keywords');
	    return candidateWords.orderedArray;
	  }

	  // 2. completely divide all string into words
	  // get frequently appeared words as keyword array(ordered by priority)
	  candidateWords.clear();
	  const punctuations = _lodash2.default.chain(_const.PUNCT_FLATTEN).reduce(_lodash2.default.add);
	  // lodash.escapeRegExp will escape [], and \s is not properly escaped, so put them outside
	  const punctuationsRegex = '[' + _lodash2.default.escapeRegExp(punctuations) + '\\s]+|\\b';
	  const SEPARATE_REGEX = _getDividerRegex(punctuationsRegex, 'g');
	  (0, _base.clog)('separate regex', SEPARATE_REGEX);

	  let dividePreProcess = _lodash2.default.flow(_replaceUnderscore, _fixHyphen);
	  title && (0, _base.filterEmptyStr)(dividePreProcess(title).split(SEPARATE_REGEX)).forEach(word => {
	    candidateWords.increaseConfidence(word, _const.CONFIDENCE_PARAM.keyword.title);
	  });
	  h1 && (0, _base.filterEmptyStr)(dividePreProcess(h1).split(SEPARATE_REGEX)).forEach(word => {
	    candidateWords.increaseConfidence(word, _const.CONFIDENCE_PARAM.keyword.h1);
	  });
	  Array.isArray(h2) && h2.forEach(h2 => {
	    // clog(h2.split(SEPARATE_REGEX))
	    (0, _base.filterEmptyStr)(h2.split(SEPARATE_REGEX)).forEach(word => candidateWords.increaseConfidence(word, _const.CONFIDENCE_PARAM.keyword.h2));
	  });
	  // @TODO divide tabUrl.url here

	  (0, _base.clog)('most frequently appeared words: ', JSON.stringify(candidateWords.orderedArray));
	  if (_isQualified(candidateWords.orderedArray)) {
	    (0, _base.clog)('use divide keywords');
	    return candidateWords.orderedArray;
	  }

	  // 3. divide title with common separator
	  candidateWords.clear();
	  const divider = _lodash2.default.chain([..._const.PUNCT.dash, ..._const.PUNCT.verticalBar, ..._const.PUNCT.colon, ..._const.PUNCT.brackets, ..._const.PUNCT.comma, ..._const.PUNCT.question, ..._const.PUNCT.exclamation, ..._const.PUNCT.guillemets.left, ..._const.PUNCT.guillemets.right]).reduce(_lodash2.default.add);
	  const dividerStr = '[' + _lodash2.default.escapeRegExp(divider) + ']+|-{2,}';
	  const TITLE_DIVIDE_REGEXP = _getDividerRegex(dividerStr);
	  (0, _base.clog)(TITLE_DIVIDE_REGEXP);
	  let preProcess = _lodash2.default.flow([_replaceUnderscore, _replaceSpaces, _fixHyphen]);
	  let titleKeywords = (0, _base.filterEmptyStr)(preProcess(title).split(TITLE_DIVIDE_REGEXP));
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
	      if (ignore !== keywordType.url && tabUrl.pathName.includeString(keyword)) {
	        candidateWords.increaseConfidence(keyword, _const.CONFIDENCE_PARAM.match.url);
	      }
	      ignore !== keywordType.url && tabUrl.queryPairs.map(pair => {
	        if (pair.val.includeString(keyword, pair.val.length >= 2)) {
	          candidateWords.increaseConfidence(keyword, _const.CONFIDENCE_PARAM.match.queryPairs);
	        }
	      });
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

	  function _getDividerRegex(divider, modifier) {
	    const escapedStr = divider.replace(/(^.*[^\\]?\[.*)-(.*\])/g, '$1\\-$2');
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
	  let upperSubstrRegex = new RegExp(_base.regex`(^|[^${ _const.CJK }a-zA-Z${ lGuimets }])([A-Z]{2,}[${ ASCII_CHAR }]*(?:\s+[A-Z]{2,}[${ ASCII_CHAR }]*)*)\b(?![${ _const.CJK }])`, 'g'); // ((\s+(?![A-Z]))?)
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
	  let validCharacter = _base.regex`a-zÀ-ÿ`;
	  let name = _base.regex`[A-Z][${ validCharacter }]+`;
	  let subElement = _base.regex`(?:[Nn]o.\s?\d+)|(?:${ name })`;
	  let nameRegex1 = new RegExp(_base.regex`
	    (^|[^${ _const.CJK }a-zA-Z${ lGuimets }])
	    (
	      (?:${ subElement })
	      (?:\s+(?:${ subElement }))+
	    )
	    \b
	    (?![${ _const.CJK }])
	  `, 'g'); // ((\s+(?![A-Z]))?)
	  // /[A-Z][a-z]+\s*[-_/]\s*[A-Z][a-z]+/.test('javascript - Mocha / Chai expect.se')
	  let nameRegex2 = new RegExp(_base.regex`
	    (^|[^${ _const.CJK }a-zA-Z${ lGuimets }])
	    (
	      (?:${ subElement })
	      (?:\s*[-_/]\s*(?:${ subElement }))+
	    )
	    (?![${ _const.CJK }])
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
	  return concat(markName(markEnWord(markUpperWord(str))));
	};

	let divide = function (str) {
	  // dividers, not include \s
	  let commonDivider = _base.regex`\.,，。\<\>《》、\/`;
	  let regLeft = new RegExp(_base.regex`
	    ([${ _const.CJK }])\s+(.)
	  `, 'g');
	  let regRight = new RegExp(_base.regex`
	    (.)\s+([${ _const.CJK }])
	  `, 'g');
	  let require = new RegExp(_base.regex`[${ commonDivider }]+`, 'g');
	  return str.replace(regLeft, '$1|$2').replace(regRight, '$1|$2').replace(require, '|').split('|');
	};

	let removeMarked = function (str) {
	  return str.replace(/《[^》]*》/g, ' ');
	};

	let forEachMarked = function (str, fn) {
	  let matched = (0, _base.match)(str, /《([^《》]+)》/g) || [];
	  matched.forEach(match => {
	    fn(match[1]);
	  });
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