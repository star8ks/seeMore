webpackJsonp([2,5],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	// require('babel-runtime/core-js/promise').default = require('bluebird');
	global.Promise = __webpack_require__("qgje");

	__webpack_require__("zj96");
	__webpack_require__("uIYl");
	__webpack_require__("zWEr");
	__webpack_require__("+hlx");
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "zWEr":
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ "+hlx":
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _base = __webpack_require__("5a/Z");

	var _Setting = __webpack_require__("mzR8");

	var _Setting2 = _interopRequireDefault(_Setting);

	var _Render = __webpack_require__("qpDX");

	var _Render2 = _interopRequireDefault(_Render);

	var _Mason = __webpack_require__("74xW");

	var _Mason2 = _interopRequireDefault(_Mason);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var option = function () {
	  // Restores select box state to saved value from db.
	  function restore() {
	    _Setting2.default.get('cfg_remove_redirect').then(function (val) {
	      _base.util.$('#cfg_remove_redirect').checked = val;
	    });
	  }

	  function render() {
	    var engineListTpl = _base.util.$('#tpl-engines').innerHTML.trim();

	    var previewRender = _Render2.default.openEngines(engineListTpl).then(function (rendered) {
	      _base.util.$('.preview').innerHTML = rendered;
	    });
	    var defaultRender = _Render2.default.defaultEngines(engineListTpl).then(function (rendered) {
	      _base.util.$('.engines').innerHTML = rendered;
	    });

	    return Promise.all([previewRender, defaultRender]);
	  }

	  return {
	    restore: restore,
	    render: render
	  };
	}();

	window.addEventListener("DOMContentLoaded", function () {
	  _base.util.$('.about').innerHTML += '&nbsp;v' + chrome.runtime.getManifest().version;

	  option.restore();
	  option.render().then(function () {
	    // set icons
	    _base.util.$all('.icon-link').forEach(function ($link) {
	      $link.style.backgroundImage = "url('" + $link.getAttribute('data-favicon') + "')";
	    });
	    new _Mason2.default(_base.util.$('.preview'), {
	      itemSelector: 'ul',
	      columnNum: 6
	    });
	    new _Mason2.default(_base.util.$('.engines'), {
	      itemSelector: 'ul',
	      columnNum: 6
	    });
	  }).catch(function (err) {
	    _base.clog.err('render failed ' + err);
	  });

	  _base.util.$('#cfg_remove_redirect').addEventListener('click', function (evt) {
	    _Setting2.default.set('cfg_remove_redirect', evt.target.checked);
	  });
	});

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