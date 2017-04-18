webpackJsonp([3],{

/***/ "+hlx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
      (0, _base.$)('#cfg_remove_redirect').checked = val;
    });
  }

  function render() {
    var engineListTpl = (0, _base.$)('#tpl-engines').innerHTML.trim();

    var previewRender = _Render2.default.openEngines(engineListTpl).then(function (rendered) {
      (0, _base.$)('.preview').innerHTML = rendered;
    });
    var defaultRender = _Render2.default.defaultEngines(engineListTpl).then(function (rendered) {
      (0, _base.$)('.engines').innerHTML = rendered;
    });

    return Promise.all([previewRender, defaultRender]);
  }

  return {
    restore: restore,
    render: render
  };
}();

window.addEventListener('DOMContentLoaded', function () {
  (0, _base.$)('.about').innerHTML += '&nbsp;v' + chrome.runtime.getManifest().version;

  option.restore();
  option.render().then(function () {
    // set icons
    (0, _base.$all)('.icon-link').forEach(function ($link) {
      $link.style.backgroundImage = 'url(\'' + $link.getAttribute('data-favicon') + '\')';
    });
    new _Mason2.default((0, _base.$)('.preview'), {
      itemSelector: 'ul',
      columnNum: 6
    });
    new _Mason2.default((0, _base.$)('.engines'), {
      itemSelector: 'ul',
      columnNum: 6
    });
  }).catch(function (err) {
    _base.clog.err('render failed ' + err);
  });

  (0, _base.$)('#cfg_remove_redirect').addEventListener('click', function (evt) {
    _Setting2.default.set('cfg_remove_redirect', evt.target.checked);
  });
});

/***/ }),

/***/ "TMSX":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

/* eslint-env node*/
global.Promise = __webpack_require__("qgje");

__webpack_require__("zj96");
__webpack_require__("uIYl");
__webpack_require__("zWEr");
__webpack_require__("+hlx");
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("DuR2")))

/***/ }),

/***/ "mzR8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

/***/ }),

/***/ "zWEr":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},["TMSX"]);