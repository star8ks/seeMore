webpackJsonp([0,5],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	// require('babel-runtime/core-js/promise').default = require('bluebird');
	global.Promise = __webpack_require__("qgje");

	__webpack_require__("/FMp");
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "/FMp":
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _config = __webpack_require__("wYMm");

	var _config2 = _interopRequireDefault(_config);

	var _base = __webpack_require__("5a/Z");

	var _Engine = __webpack_require__("gLfi");

	var _Engine2 = _interopRequireDefault(_Engine);

	var _EngineType = __webpack_require__("Tsvq");

	var _EngineType2 = _interopRequireDefault(_EngineType);

	var _Setting = __webpack_require__("mzR8");

	var _Setting2 = _interopRequireDefault(_Setting);

	var _Icon = __webpack_require__("sInu");

	var _Icon2 = _interopRequireDefault(_Icon);

	var _Url = __webpack_require__("tDBr");

	var _Url2 = _interopRequireDefault(_Url);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Listener = function () {

	  function removeRedirect(tab) {
	    return Promise.all([_Setting2.default.get('cfg_remove_redirect'), _Engine2.default.get('google')]).spread(function (removeRedirect, engine) {
	      if (!removeRedirect) {
	        return;
	      }

	      var tabUrl = new _Url2.default(tab.url);
	      if (!engine.hosts.includes(tabUrl.host.toLowerCase()) || !tabUrl.includes('url?') && !tabUrl.includes('imgres?')) {
	        // clog('Not a valid google redirect url', tab.url);
	        return;
	      }

	      var originUrl = decodeURIComponent(tabUrl.getQueryVal('url'));
	      var originImgUrl = decodeURIComponent(tabUrl.getQueryVal('imgrefurl'));
	      // google's interstitial page will warn people 'This site may harm your computer'
	      // so keep it as it is
	      // if(/^\/interstitial\?url=/.test(originUrl)) {
	      //   let tempUrl = new Url('http://google.com' + originUrl);
	      //   originUrl = decodeURIComponent(tempUrl.getQueryVal('url'));
	      // }
	      if (_Url2.default.isNormal(originUrl)) {
	        _base.clog.info('█████Remove redirection: ', tab.url, ' to ', originUrl);
	        chrome.tabs.update(tab.id, { url: originUrl });
	      } else if (_Url2.default.isNormal(originImgUrl)) {
	        _base.clog.info('█████Remove redirection: ', tab.url, ' to ', originImgUrl);
	        chrome.tabs.update(tab.id, { url: originImgUrl });
	      }
	    }).catch(function (error) {
	      throw new Error('Error in remove redirect: ' + error);
	    });
	  }

	  return {
	    onTabCreated: function onTabCreated(tabInfo) {
	      // Since chrome.tabs.onCreated listener may not get tab.url properly,
	      // but It seem that chrome.tabs.get listener will be called
	      // AFTER tab.url is ready(at most of time).
	      // This way takes shorter time compare to chrome.tabs.onUpdated
	      chrome.tabs.get(tabInfo.id, function (tab) {
	        if (!tab.url || !/^https?/.test(tab.url)) {
	          return;
	        }
	        removeRedirect(tab);
	      });
	    },

	    onTabUpdated: function onTabUpdated(tabId, changeInfo, tab) {
	      if (!changeInfo.status || 'loading' != changeInfo.status || !tab.url || !/^https?/.test(tab.url)) {
	        return;
	      }

	      var oUrl = new _Url2.default(tab.url);
	      if (tab.favIconUrl) {
	        (0, _base.clog)('on updated favicon', tab.favIconUrl);
	        _Icon2.default.set(oUrl.host, tab.favIconUrl);
	      }

	      removeRedirect(tab);

	      _Engine2.default.searchKeys(oUrl.host).then(function (keys) {
	        if (keys.length > 0) {
	          chrome.browserAction.setTitle({ title: '点击切换搜索引擎', tabId: tabId });
	        }
	      });
	    },

	    onInstalled: function onInstalled() {
	      var manifest = chrome.runtime.getManifest();
	      _Setting2.default.set('version', manifest.version);

	      Object.keys(_config2.default.engineTypes).forEach(function (typeId) {
	        _EngineType2.default.set(typeId, _config2.default.engineTypes[typeId]).catch(function (err) {
	          _base.clog.err('Error when init set engineTypes' + err);
	        });
	      });
	      Object.keys(_config2.default.engines).forEach(function (key) {
	        _Engine2.default.set(key, _config2.default.engines[key]).catch(function (err) {
	          _base.clog.err('Error when init set engines' + err);
	        });
	      });
	      _Setting2.default.set('cfg_remove_redirect', true);
	      if (!_config2.default.devMode) {
	        chrome.tabs.create({ url: 'chrome://extensions/?options=' + chrome.runtime.id });
	      } else {
	        chrome.tabs.create({ url: 'chrome-extension://' + chrome.runtime.id + '/setting.html' });
	      }
	    }
	  };
	}();

	chrome.runtime.onInstalled.addListener(Listener.onInstalled);

	chrome.tabs.onCreated.addListener(Listener.onTabCreated);
	// Listen for any changes to the URL of any tab.
	chrome.tabs.onUpdated.addListener(Listener.onTabUpdated);

	// @TODO 兼容旧版本数据

/***/ },

/***/ "mzR8":
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

	let Setting = new _DB2.default(_localforageBluebird2.default, 'setting');
	exports.default = Setting;

/***/ }

});