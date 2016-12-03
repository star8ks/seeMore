webpackJsonp([1,4],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	__webpack_require__("//Fk").default = __webpack_require__("0Qa9");
	global.Promise = __webpack_require__("0Qa9");

	__webpack_require__("zj96");
	__webpack_require__("uIYl");
	__webpack_require__("28sW");
	__webpack_require__("V4gC");
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "74xW":
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _keys = __webpack_require__("fZjL");

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @usage:
	 new Mason(util.$('.waterfall'), {
	      itemSelector: '.item',
	      columnWidth: 140,
	      columnNum: 3
	    });
	 * @withHTML:
	 <div class="waterfall">
	 <div class="item"></div>
	 <div class="item"></div>
	 <div class="item"></div>
	 <div class="item"></div>
	 </div>
	 */
	function Mason(container, option) {
	  this.$container = container;
	  this.itemSelector = option.itemSelector;
	  this.$items = this.$container.querySelectorAll(this.itemSelector);
	  this.columnNum = option.columnNum;
	  this.colHeightArr = new Array(option.columnNum).fill(0);
	  this.columnWidth = option.columnWidth ? option.columnWidth : getRealWidth(this.$items[0]);
	  // @TODO add container's max height option
	  // this.containerMaxHeight = option.containerMaxHeight ? option.containerMaxHeight : window.document.body.scrollHeight;
	  this.renderAll();
	}

	Mason.prototype = {
	  renderAll: function renderAll() {
	    var length = this.$items.length;
	    for (var i = 0; i < length; i++) {
	      var minHeight = min(this.colHeightArr);
	      var insertColIndex = this.colHeightArr.indexOf(minHeight);

	      setStyle(this.$items[i], {
	        position: 'absolute',
	        top: this.colHeightArr[insertColIndex] + 'px',
	        left: insertColIndex * this.columnWidth + 'px'
	      });
	      this.colHeightArr[insertColIndex] += getRealHeight(this.$items[i]);
	    }

	    setStyle(this.$container, {
	      position: 'relative',
	      height: max(this.colHeightArr) + 'px'
	    });
	  }
	  // @TODO add items
	  // add: function(){}
	};

	function getComputedVal($el, property) {
	  var style = window.getComputedStyle($el);
	  if (!style.hasOwnProperty(property)) {
	    throw new Error('Error: element have no style named ' + property);
	  }
	  return parseFloat(style[property].slice(0, -2));
	}

	function getRealWidth($el) {
	  var marginLeft = getComputedVal($el, 'marginLeft');
	  var marginRight = getComputedVal($el, 'marginRight');
	  return $el.offsetWidth + marginLeft + marginRight;
	}

	function getRealHeight($el) {
	  var marginTop = getComputedVal($el, 'marginTop');
	  var marginBottom = getComputedVal($el, 'marginBottom');
	  return $el.offsetHeight + marginTop + marginBottom;
	}

	function setStyle($el, style) {
	  (0, _keys2.default)(style).forEach(function (property) {
	    $el.style[property] = style[property];
	  });
	}

	function min(arr) {
	  return Math.min.apply(Math, arr);
	}
	function max(arr) {
	  return Math.max.apply(Math, arr);
	}

	exports.default = Mason;

/***/ },

/***/ "uIYl":
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ "28sW":
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ "V4gC":
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _promise = __webpack_require__("//Fk");

	var _promise2 = _interopRequireDefault(_promise);

	var _translation = __webpack_require__("RkCM");

	var _translation2 = _interopRequireDefault(_translation);

	var _config = __webpack_require__("wYMm");

	var _config2 = _interopRequireDefault(_config);

	var _base = __webpack_require__("5a/Z");

	var _Url = __webpack_require__("tDBr");

	var _Url2 = _interopRequireDefault(_Url);

	var _Engine = __webpack_require__("gLfi");

	var _Engine2 = _interopRequireDefault(_Engine);

	var _Render = __webpack_require__("qpDX");

	var _Render2 = _interopRequireDefault(_Render);

	var _Mason = __webpack_require__("74xW");

	var _Mason2 = _interopRequireDefault(_Mason);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__("//Fk").default = __webpack_require__("0Qa9");

	_translation2.default.add(new _translation2.default.BaiDu());
	_translation2.default.add(new _translation2.default.Google());

	var popupErr = (0, _base.minErr)('Popup');

	/**
	 * @param {Error} e
	 * */
	function errorHandler(e) {
	  _base.clog.err(e.toString());
	  //noinspection JSUnresolvedVariable
	  _base.clog.err('Error stack: ', e.stack);
	}

	var Links = function Links($links) {
	  this.$links = $links;
	};
	Links.prototype.init = function (tabId) {
	  this.$links.forEach(function ($link) {
	    // set icons
	    $link.style.backgroundImage = "url('" + $link.getAttribute('data-favicon') + "')";

	    $link.onclick = function (evt) {
	      var button = _base.util.getMouseButton(evt);
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
	  if (!searchWord) return new popupErr('invalid param', 'updateLinkHref with empty string');
	  this.$links.forEach(function ($link) {
	    $link.href = $link.getAttribute('data-url').replace(/%s/g, encodeURIComponent(searchWord));
	  });
	};

	_base.util.onceLoaded(_base.util.getCurrentTab).then(function onLoad(tab) {
	  var tabUrl = new _Url2.default(tab.url);
	  var $keyword = _base.util.$('#keyword');
	  var $translation = _base.util.$('.translation');
	  var links;
	  var engineListTpl = _base.util.$('#tpl-engines').innerHTML.trim();
	  var $enginesSection = _base.util.$('.engines');

	  _Render2.default.openEngines(engineListTpl).then(function (rendered) {
	    $enginesSection.innerHTML = rendered;
	    links = new Links(_base.util.$all('.engines .icon-link'));
	  }).then(function () {
	    new _Mason2.default(_base.util.$('.engines'), {
	      itemSelector: '.pin',
	      columnNum: 2
	    });
	    links.init(tab.id, $keyword.value);
	  }).catch(errorHandler);

	  getSearchString().then(function (searchString) {
	    searchString = searchString.trim();
	    (0, _base.clog)('get searchString: ', searchString);
	    setKeywordInput(searchString);
	    if (searchString && links) links.updateHref(searchString);
	    return null;
	  }).catch(errorHandler);

	  function translate(str) {
	    // @TODO only translate some language, from user config
	    // @TODO not translate some language, from user config
	    // if(chrome.i18n.detect)
	    if (str.length > _config2.default.translateMaxLength) {
	      return _promise2.default.reject('[Translation]trans string too long');
	    }

	    var lang = navigator.language.split('-', 1)[0];
	    return _translation2.default.translate({
	      api: navigator.language === 'zh-CN' ? 'BaiDu' : 'Google',
	      text: str,
	      to: lang === 'zh' ? navigator.language : lang
	    }).then(function (resultObj, err) {
	      (0, _base.clog)(resultObj, err);
	      if (resultObj.error) return null;
	      return resultObj.detailed || resultObj.result;
	    }).then(function (translated) {
	      return _base.util.isEmpty(translated) ? '' : translated.filter(function (line) {
	        return line.toLowerCase() !== str.toLowerCase();
	      }).reduce(function (html, line) {
	        html += line + '<br>';
	        return html;
	      }, '');
	    });
	  }

	  function getSearchString() {
	    // get search string from selected text
	    var getSelectionP = new _promise2.default(function (resolve) {
	      if (tabUrl.url.match(/^chrome/)) {
	        // not support chrome pages now
	        resolve('');
	      }

	      // @TODO move it to contentScript.js
	      // @TODO don't block popup here
	      chrome.tabs.executeScript({
	        code: "window.getSelection().toString();"
	      }, function (selection) {
	        if (!_base.util.isEmpty(selection) && selection[0].length <= _config2.default.selectionMaxLength) {
	          resolve(selection[0]);
	        }
	        resolve('');
	      });
	    });

	    // get search string from url param
	    return getSelectionP.then(function (str) {
	      return str ? str : getQueryString(tabUrl);
	    });

	    function getQueryString(tabUrl) {
	      if (_Url2.default.googleFailedUrlPattern.test(tabUrl.url)) {
	        tabUrl = new _Url2.default(decodeURIComponent(tabUrl.getQueryVal('continue')));
	      }
	      return _Engine2.default.searchKeys(tabUrl.host).then(function (keys) {
	        if (keys.length <= 0) {
	          return '';
	        }
	        return _Engine2.default.get(keys[0]).then(function (engine) {
	          var searchKey = new _Url2.default(engine.url).searchKey;
	          var searchString = tabUrl.getQueryVal(searchKey);
	          searchString = searchString ? searchString : '';
	          return decodeURIComponent(searchString || '');
	        });
	      });
	    }
	  }

	  function setKeywordInput(searchString) {
	    if (searchString) {
	      $keyword.value = searchString;
	      (0, _base.clog)('trans', $keyword.value);
	      translate($keyword.value).then(function (html) {
	        $translation.innerHTML = html;
	      });
	    }

	    $keyword.oninput = _base.util.debounce(function (e) {
	      //if press enter, search word using first enabled engine
	      e.key === 'Enter' && _base.util.$('.se:not(.disable)').dispatchEvent(new MouseEvent('click', { button: 0 }));

	      links && links.updateHref(this.value);
	      translate(this.value).then(function (html) {
	        $translation.innerHTML = html;
	      });
	    }, 500);
	    $keyword.focus();
	  }
	});

/***/ },

/***/ "RkCM":
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _create = __webpack_require__("OvRC");

	var _create2 = _interopRequireDefault(_create);

	var _keys = __webpack_require__("fZjL");

	var _keys2 = _interopRequireDefault(_keys);

	var _stringify = __webpack_require__("mvHQ");

	var _stringify2 = _interopRequireDefault(_stringify);

	var _promise = __webpack_require__("//Fk");

	var _promise2 = _interopRequireDefault(_promise);

	var _typeof2 = __webpack_require__("pFYg");

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*!
	 * translation.js v0.4.0
	 * https://github.com/Selection-Translator/translation.js#readme
	 * Copyright 2015 Milk Lee <milk.lee@qq.com>
	 * Licensed under MIT
	 */
	(function webpackUniversalModuleDefinition(root, factory) {
		if (( false ? 'undefined' : (0, _typeof3.default)(exports)) === 'object' && ( false ? 'undefined' : (0, _typeof3.default)(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : (0, _typeof3.default)(exports)) === 'object') exports["tjs"] = factory();else root["tjs"] = factory();
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
					return new _promise2.default(function (resolve, reject) {
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
					return new _promise2.default(function (resolve, reject) {
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
					return new _promise2.default(function (resolve, reject) {
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
					'application/json': _stringify2.default
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
					for (var key in obj) {
						this[key] = obj[key];
					}
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
					var handleProgress = function handleProgress(direction, e) {
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
						this._fullfilledPromise = new _promise2.default(function (innerResolve, innerReject) {
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
					return null !== obj && 'object' === (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj));
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
					return new _promise2.default(function (resolve, reject) {
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
					return new _promise2.default(function (resolve, reject) {
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
					return new _promise2.default(function (resolve, reject) {
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
					return new _promise2.default(function (resolve) {
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
					return _promise2.default.resolve(null);
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
					this.apiRoot = (typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) === 'object' && window.window === window ? Google.API_URL : this.link;
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
					return new _promise2.default(function (resolve, reject) {
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
						return supportedLang.indexOf(from) > -1 ? _promise2.default.resolve(from) : _promise2.default.resolve(null);
					}

					return this.translate(queryObj).then(function (result) {
						return result.from ? _promise2.default.resolve(result.from) : _promise2.default.resolve(null);
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
					return (0, _keys2.default)(obj).length === 0;
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
					this.apiRoot = (typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) === 'object' && window.window === window ? Google.API_URL : this.link;
				}

				GoogleCN.prototype = (0, _create2.default)(Google.prototype);
				GoogleCN.prototype.constructor = GoogleCN;

				module.exports = GoogleCN;

				/***/
			}
			/******/])
		);
	});
	;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("3IRH")(module)))

/***/ },

/***/ "zj96":
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ "OvRC":
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__("oM7Q"), __esModule: true };

/***/ },

/***/ "oM7Q":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("sF+V");
	var $Object = __webpack_require__("FeBl").Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },

/***/ "sF+V":
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__("kM2E")
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__("Yobk")});

/***/ },

/***/ "qpDX":
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promise = __webpack_require__("//Fk");

	var _promise2 = _interopRequireDefault(_promise);

	var _mustache = __webpack_require__("1i/z");

	var _mustache2 = _interopRequireDefault(_mustache);

	var _Url = __webpack_require__("tDBr");

	var _Url2 = _interopRequireDefault(_Url);

	var _Engine = __webpack_require__("gLfi");

	var _Engine2 = _interopRequireDefault(_Engine);

	var _EngineType = __webpack_require__("Tsvq");

	var _EngineType2 = _interopRequireDefault(_EngineType);

	var _Icon = __webpack_require__("sInu");

	var _Icon2 = _interopRequireDefault(_Icon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function setProperties(engines) {
	  return _promise2.default.map(engines, function (se) {
	    var oUrl = new _Url2.default(se.url);
	    se.index = se['$$key'];
	    return _Icon2.default.get(oUrl.host).then(function (url) {
	      se.favicon = url || oUrl.faviconUrl;
	      return se;
	    });
	  });
	}

	function renderList(engines) {
	  return _mustache2.default.render(this.template, {
	    typeName: this.typeName,
	    engines: engines
	  });
	}

	var Render = {
	  openEngines: function openEngines(template) {
	    return _EngineType2.default.getAllReal().map(function (typeObj) {
	      var typeId = typeObj['$$key'];
	      return _Engine2.default.getOpen(false, function (engine) {
	        return '' + engine.typeId === typeId; // key always saved as string
	      }).bind({
	        typeName: typeObj.name,
	        template: template
	      }).then(setProperties).then(renderList);
	    }).then(function (lists) {
	      return combineHtml(lists);
	    });
	  },

	  defaultEngines: function defaultEngines(template) {
	    return _EngineType2.default.getAllDefault().map(function (typeObj) {
	      var typeId = typeObj['$$key'];
	      return _Engine2.default.getSortedAll(false, function (engine) {
	        // if(''+engine.defaultTypeId === typeId) clog(engine.displayName, typeId, typeObj.name);
	        return '' + engine.defaultTypeId === typeId; // key always saved as string
	      }).bind({
	        typeName: typeObj.name,
	        template: template
	      }).then(setProperties).then(renderList);
	    }).then(function (lists) {
	      return combineHtml(lists);
	    });
	  }
	};

	function combineHtml(lists) {
	  return lists.reduce(function (html, list) {
	    if (list !== '') {
	      html += list;
	    }
	    return html;
	  }, '');
	}

	exports.default = Render;

/***/ },

/***/ "1i/z":
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * mustache.js - Logic-less {{mustache}} templates with JavaScript
	 * http://github.com/janl/mustache.js
	 */

	/*global define: false Mustache: true*/

	(function defineMustache (global, factory) {
	  if (typeof exports === 'object' && exports && typeof exports.nodeName !== 'string') {
	    factory(exports); // CommonJS
	  } else if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
	  } else {
	    global.Mustache = {};
	    factory(global.Mustache); // script, wsh, asp
	  }
	}(this, function mustacheFactory (mustache) {

	  var objectToString = Object.prototype.toString;
	  var isArray = Array.isArray || function isArrayPolyfill (object) {
	    return objectToString.call(object) === '[object Array]';
	  };

	  function isFunction (object) {
	    return typeof object === 'function';
	  }

	  /**
	   * More correct typeof string handling array
	   * which normally returns typeof 'object'
	   */
	  function typeStr (obj) {
	    return isArray(obj) ? 'array' : typeof obj;
	  }

	  function escapeRegExp (string) {
	    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
	  }

	  /**
	   * Null safe way of checking whether or not an object,
	   * including its prototype, has a given property
	   */
	  function hasProperty (obj, propName) {
	    return obj != null && typeof obj === 'object' && (propName in obj);
	  }

	  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
	  // See https://github.com/janl/mustache.js/issues/189
	  var regExpTest = RegExp.prototype.test;
	  function testRegExp (re, string) {
	    return regExpTest.call(re, string);
	  }

	  var nonSpaceRe = /\S/;
	  function isWhitespace (string) {
	    return !testRegExp(nonSpaceRe, string);
	  }

	  var entityMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#39;',
	    '/': '&#x2F;',
	    '`': '&#x60;',
	    '=': '&#x3D;'
	  };

	  function escapeHtml (string) {
	    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
	      return entityMap[s];
	    });
	  }

	  var whiteRe = /\s*/;
	  var spaceRe = /\s+/;
	  var equalsRe = /\s*=/;
	  var curlyRe = /\s*\}/;
	  var tagRe = /#|\^|\/|>|\{|&|=|!/;

	  /**
	   * Breaks up the given `template` string into a tree of tokens. If the `tags`
	   * argument is given here it must be an array with two string values: the
	   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
	   * course, the default is to use mustaches (i.e. mustache.tags).
	   *
	   * A token is an array with at least 4 elements. The first element is the
	   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
	   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
	   * all text that appears outside a symbol this element is "text".
	   *
	   * The second element of a token is its "value". For mustache tags this is
	   * whatever else was inside the tag besides the opening symbol. For text tokens
	   * this is the text itself.
	   *
	   * The third and fourth elements of the token are the start and end indices,
	   * respectively, of the token in the original template.
	   *
	   * Tokens that are the root node of a subtree contain two more elements: 1) an
	   * array of tokens in the subtree and 2) the index in the original template at
	   * which the closing tag for that section begins.
	   */
	  function parseTemplate (template, tags) {
	    if (!template)
	      return [];

	    var sections = [];     // Stack to hold section tokens
	    var tokens = [];       // Buffer to hold the tokens
	    var spaces = [];       // Indices of whitespace tokens on the current line
	    var hasTag = false;    // Is there a {{tag}} on the current line?
	    var nonSpace = false;  // Is there a non-space char on the current line?

	    // Strips all whitespace tokens array for the current line
	    // if there was a {{#tag}} on it and otherwise only space.
	    function stripSpace () {
	      if (hasTag && !nonSpace) {
	        while (spaces.length)
	          delete tokens[spaces.pop()];
	      } else {
	        spaces = [];
	      }

	      hasTag = false;
	      nonSpace = false;
	    }

	    var openingTagRe, closingTagRe, closingCurlyRe;
	    function compileTags (tagsToCompile) {
	      if (typeof tagsToCompile === 'string')
	        tagsToCompile = tagsToCompile.split(spaceRe, 2);

	      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
	        throw new Error('Invalid tags: ' + tagsToCompile);

	      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
	      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
	      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
	    }

	    compileTags(tags || mustache.tags);

	    var scanner = new Scanner(template);

	    var start, type, value, chr, token, openSection;
	    while (!scanner.eos()) {
	      start = scanner.pos;

	      // Match any text between tags.
	      value = scanner.scanUntil(openingTagRe);

	      if (value) {
	        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
	          chr = value.charAt(i);

	          if (isWhitespace(chr)) {
	            spaces.push(tokens.length);
	          } else {
	            nonSpace = true;
	          }

	          tokens.push([ 'text', chr, start, start + 1 ]);
	          start += 1;

	          // Check for whitespace on the current line.
	          if (chr === '\n')
	            stripSpace();
	        }
	      }

	      // Match the opening tag.
	      if (!scanner.scan(openingTagRe))
	        break;

	      hasTag = true;

	      // Get the tag type.
	      type = scanner.scan(tagRe) || 'name';
	      scanner.scan(whiteRe);

	      // Get the tag value.
	      if (type === '=') {
	        value = scanner.scanUntil(equalsRe);
	        scanner.scan(equalsRe);
	        scanner.scanUntil(closingTagRe);
	      } else if (type === '{') {
	        value = scanner.scanUntil(closingCurlyRe);
	        scanner.scan(curlyRe);
	        scanner.scanUntil(closingTagRe);
	        type = '&';
	      } else {
	        value = scanner.scanUntil(closingTagRe);
	      }

	      // Match the closing tag.
	      if (!scanner.scan(closingTagRe))
	        throw new Error('Unclosed tag at ' + scanner.pos);

	      token = [ type, value, start, scanner.pos ];
	      tokens.push(token);

	      if (type === '#' || type === '^') {
	        sections.push(token);
	      } else if (type === '/') {
	        // Check section nesting.
	        openSection = sections.pop();

	        if (!openSection)
	          throw new Error('Unopened section "' + value + '" at ' + start);

	        if (openSection[1] !== value)
	          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
	      } else if (type === 'name' || type === '{' || type === '&') {
	        nonSpace = true;
	      } else if (type === '=') {
	        // Set the tags for the next time around.
	        compileTags(value);
	      }
	    }

	    // Make sure there are no open sections when we're done.
	    openSection = sections.pop();

	    if (openSection)
	      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

	    return nestTokens(squashTokens(tokens));
	  }

	  /**
	   * Combines the values of consecutive text tokens in the given `tokens` array
	   * to a single token.
	   */
	  function squashTokens (tokens) {
	    var squashedTokens = [];

	    var token, lastToken;
	    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
	      token = tokens[i];

	      if (token) {
	        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
	          lastToken[1] += token[1];
	          lastToken[3] = token[3];
	        } else {
	          squashedTokens.push(token);
	          lastToken = token;
	        }
	      }
	    }

	    return squashedTokens;
	  }

	  /**
	   * Forms the given array of `tokens` into a nested tree structure where
	   * tokens that represent a section have two additional items: 1) an array of
	   * all tokens that appear in that section and 2) the index in the original
	   * template that represents the end of that section.
	   */
	  function nestTokens (tokens) {
	    var nestedTokens = [];
	    var collector = nestedTokens;
	    var sections = [];

	    var token, section;
	    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
	      token = tokens[i];

	      switch (token[0]) {
	        case '#':
	        case '^':
	          collector.push(token);
	          sections.push(token);
	          collector = token[4] = [];
	          break;
	        case '/':
	          section = sections.pop();
	          section[5] = token[2];
	          collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
	          break;
	        default:
	          collector.push(token);
	      }
	    }

	    return nestedTokens;
	  }

	  /**
	   * A simple string scanner that is used by the template parser to find
	   * tokens in template strings.
	   */
	  function Scanner (string) {
	    this.string = string;
	    this.tail = string;
	    this.pos = 0;
	  }

	  /**
	   * Returns `true` if the tail is empty (end of string).
	   */
	  Scanner.prototype.eos = function eos () {
	    return this.tail === '';
	  };

	  /**
	   * Tries to match the given regular expression at the current position.
	   * Returns the matched text if it can match, the empty string otherwise.
	   */
	  Scanner.prototype.scan = function scan (re) {
	    var match = this.tail.match(re);

	    if (!match || match.index !== 0)
	      return '';

	    var string = match[0];

	    this.tail = this.tail.substring(string.length);
	    this.pos += string.length;

	    return string;
	  };

	  /**
	   * Skips all text until the given regular expression can be matched. Returns
	   * the skipped string, which is the entire tail if no match can be made.
	   */
	  Scanner.prototype.scanUntil = function scanUntil (re) {
	    var index = this.tail.search(re), match;

	    switch (index) {
	      case -1:
	        match = this.tail;
	        this.tail = '';
	        break;
	      case 0:
	        match = '';
	        break;
	      default:
	        match = this.tail.substring(0, index);
	        this.tail = this.tail.substring(index);
	    }

	    this.pos += match.length;

	    return match;
	  };

	  /**
	   * Represents a rendering context by wrapping a view object and
	   * maintaining a reference to the parent context.
	   */
	  function Context (view, parentContext) {
	    this.view = view;
	    this.cache = { '.': this.view };
	    this.parent = parentContext;
	  }

	  /**
	   * Creates a new context using the given view with this context
	   * as the parent.
	   */
	  Context.prototype.push = function push (view) {
	    return new Context(view, this);
	  };

	  /**
	   * Returns the value of the given name in this context, traversing
	   * up the context hierarchy if the value is absent in this context's view.
	   */
	  Context.prototype.lookup = function lookup (name) {
	    var cache = this.cache;

	    var value;
	    if (cache.hasOwnProperty(name)) {
	      value = cache[name];
	    } else {
	      var context = this, names, index, lookupHit = false;

	      while (context) {
	        if (name.indexOf('.') > 0) {
	          value = context.view;
	          names = name.split('.');
	          index = 0;

	          /**
	           * Using the dot notion path in `name`, we descend through the
	           * nested objects.
	           *
	           * To be certain that the lookup has been successful, we have to
	           * check if the last object in the path actually has the property
	           * we are looking for. We store the result in `lookupHit`.
	           *
	           * This is specially necessary for when the value has been set to
	           * `undefined` and we want to avoid looking up parent contexts.
	           **/
	          while (value != null && index < names.length) {
	            if (index === names.length - 1)
	              lookupHit = hasProperty(value, names[index]);

	            value = value[names[index++]];
	          }
	        } else {
	          value = context.view[name];
	          lookupHit = hasProperty(context.view, name);
	        }

	        if (lookupHit)
	          break;

	        context = context.parent;
	      }

	      cache[name] = value;
	    }

	    if (isFunction(value))
	      value = value.call(this.view);

	    return value;
	  };

	  /**
	   * A Writer knows how to take a stream of tokens and render them to a
	   * string, given a context. It also maintains a cache of templates to
	   * avoid the need to parse the same template twice.
	   */
	  function Writer () {
	    this.cache = {};
	  }

	  /**
	   * Clears all cached templates in this writer.
	   */
	  Writer.prototype.clearCache = function clearCache () {
	    this.cache = {};
	  };

	  /**
	   * Parses and caches the given `template` and returns the array of tokens
	   * that is generated from the parse.
	   */
	  Writer.prototype.parse = function parse (template, tags) {
	    var cache = this.cache;
	    var tokens = cache[template];

	    if (tokens == null)
	      tokens = cache[template] = parseTemplate(template, tags);

	    return tokens;
	  };

	  /**
	   * High-level method that is used to render the given `template` with
	   * the given `view`.
	   *
	   * The optional `partials` argument may be an object that contains the
	   * names and templates of partials that are used in the template. It may
	   * also be a function that is used to load partial templates on the fly
	   * that takes a single argument: the name of the partial.
	   */
	  Writer.prototype.render = function render (template, view, partials) {
	    var tokens = this.parse(template);
	    var context = (view instanceof Context) ? view : new Context(view);
	    return this.renderTokens(tokens, context, partials, template);
	  };

	  /**
	   * Low-level method that renders the given array of `tokens` using
	   * the given `context` and `partials`.
	   *
	   * Note: The `originalTemplate` is only ever used to extract the portion
	   * of the original template that was contained in a higher-order section.
	   * If the template doesn't use higher-order sections, this argument may
	   * be omitted.
	   */
	  Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate) {
	    var buffer = '';

	    var token, symbol, value;
	    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
	      value = undefined;
	      token = tokens[i];
	      symbol = token[0];

	      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);
	      else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);
	      else if (symbol === '>') value = this.renderPartial(token, context, partials, originalTemplate);
	      else if (symbol === '&') value = this.unescapedValue(token, context);
	      else if (symbol === 'name') value = this.escapedValue(token, context);
	      else if (symbol === 'text') value = this.rawValue(token);

	      if (value !== undefined)
	        buffer += value;
	    }

	    return buffer;
	  };

	  Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate) {
	    var self = this;
	    var buffer = '';
	    var value = context.lookup(token[1]);

	    // This function is used to render an arbitrary template
	    // in the current context by higher-order sections.
	    function subRender (template) {
	      return self.render(template, context, partials);
	    }

	    if (!value) return;

	    if (isArray(value)) {
	      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
	        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
	      }
	    } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
	      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
	    } else if (isFunction(value)) {
	      if (typeof originalTemplate !== 'string')
	        throw new Error('Cannot use higher-order sections without the original template');

	      // Extract the portion of the original template that the section contains.
	      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

	      if (value != null)
	        buffer += value;
	    } else {
	      buffer += this.renderTokens(token[4], context, partials, originalTemplate);
	    }
	    return buffer;
	  };

	  Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate) {
	    var value = context.lookup(token[1]);

	    // Use JavaScript's definition of falsy. Include empty arrays.
	    // See https://github.com/janl/mustache.js/issues/186
	    if (!value || (isArray(value) && value.length === 0))
	      return this.renderTokens(token[4], context, partials, originalTemplate);
	  };

	  Writer.prototype.renderPartial = function renderPartial (token, context, partials) {
	    if (!partials) return;

	    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
	    if (value != null)
	      return this.renderTokens(this.parse(value), context, partials, value);
	  };

	  Writer.prototype.unescapedValue = function unescapedValue (token, context) {
	    var value = context.lookup(token[1]);
	    if (value != null)
	      return value;
	  };

	  Writer.prototype.escapedValue = function escapedValue (token, context) {
	    var value = context.lookup(token[1]);
	    if (value != null)
	      return mustache.escape(value);
	  };

	  Writer.prototype.rawValue = function rawValue (token) {
	    return token[1];
	  };

	  mustache.name = 'mustache.js';
	  mustache.version = '2.3.0';
	  mustache.tags = [ '{{', '}}' ];

	  // All high-level mustache.* functions use this writer.
	  var defaultWriter = new Writer();

	  /**
	   * Clears all cached templates in the default writer.
	   */
	  mustache.clearCache = function clearCache () {
	    return defaultWriter.clearCache();
	  };

	  /**
	   * Parses and caches the given template in the default writer and returns the
	   * array of tokens it contains. Doing this ahead of time avoids the need to
	   * parse templates on the fly as they are rendered.
	   */
	  mustache.parse = function parse (template, tags) {
	    return defaultWriter.parse(template, tags);
	  };

	  /**
	   * Renders the `template` with the given `view` and `partials` using the
	   * default writer.
	   */
	  mustache.render = function render (template, view, partials) {
	    if (typeof template !== 'string') {
	      throw new TypeError('Invalid template! Template should be a "string" ' +
	                          'but "' + typeStr(template) + '" was given as the first ' +
	                          'argument for mustache#render(template, view, partials)');
	    }

	    return defaultWriter.render(template, view, partials);
	  };

	  // This is here for backwards compatibility with 0.4.x.,
	  /*eslint-disable */ // eslint wants camel cased function name
	  mustache.to_html = function to_html (template, view, partials, send) {
	    /*eslint-enable*/

	    var result = mustache.render(template, view, partials);

	    if (isFunction(send)) {
	      send(result);
	    } else {
	      return result;
	    }
	  };

	  // Export the escaping function so that the user may override it.
	  // See https://github.com/janl/mustache.js/issues/244
	  mustache.escape = escapeHtml;

	  // Export these mainly for testing, but also for advanced usage.
	  mustache.Scanner = Scanner;
	  mustache.Context = Context;
	  mustache.Writer = Writer;

	  return mustache;
	}));


/***/ },

/***/ "3IRH":
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }

});