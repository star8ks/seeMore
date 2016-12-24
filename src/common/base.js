import includeString from './base/includeString';
import minErr from './base/minErr';
import clog from './base/clog';

/**
 * document.querySelector wrapper
 * @usage
 * let id = 'fancy poo';
 * $`#${id}` or $(`#${id}`)
 * */
function $(selector, ...vars) {
  selector = selector.raw ? selector : {raw: selector};
  return document.querySelector(String.raw(selector, ...vars));
}

/**
 * document.querySelectorAll wrapper
 * @usage
 * let class = 'fancy 💩';
 * $all`.${class}` or $all(`.${class}`)
 * */
function $all(selector, ...vars) {
  selector = selector.raw ? selector : {raw: selector};
  return Array.prototype.slice.call(
    document.querySelectorAll(
      String.raw(selector, ...vars)
    )
  );
}

/**
 * Make multiline and commentable regex possible
 * @caution it will compress all spaces
 * @caution You should escape the str first, and don't forget:
 * /^[.*-(]+$/.test('.*-'); // SyntaxError: Invalid regular expression: /^[.*-(]+$/: Range out of order in character class
 * You should escape '-' within a character set, but lodash.escapeRegExp will not do this
 * @why
 new RegExp('\d').test('4'); // false
 new RegExp('\\d').test('4'); // true
 // use regexp can avoid this
 new RegExp(regex`\d`).test('4'); // true
 * @usage
 regex`\s   \u000A
   \w # comment
   [-/]
 `
 which will output: \s\u000A\w[-/]
 */
function regex(str, ...values) {
  // TODO should escape str here?
  return String.raw(str, ...values).replace(/#.*$/mg, '').replace(/\s+/mg, '');
}

function onceLoaded(onLoad) {
  return new Promise(function (resolve) {
    window.addEventListener("DOMContentLoaded", function () {
      resolve(onLoad());
    });
  });
}

function getCurrentTab() {
  return new Promise(function (resolve) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
      var tab = tabs[0];
      resolve(tab);
    })
  });
}

/**
 * undefined, null, void 0, [], {}
 * Object with .length === 0 is empty,
 * object without a own enumerable property is empty
 * @param {Object} obj
 * @param {Boolean} [emptyStrIsEmpty=false]
 * @param {Boolean} [zeroIsEmpty=false]
 * @return Boolean
 */
function isEmpty(obj, emptyStrIsEmpty = false, zeroIsEmpty = false) {
  if (obj == null) return true;
  if (obj === '') return !!emptyStrIsEmpty;
  if (obj === 0) return !!zeroIsEmpty;
  if (['string', 'number', 'boolean'].includes(typeof obj)) return false;

  if (Array.isArray(obj)) {
    var filtered = obj.filter(function (item) {
      return !isEmpty(item, emptyStrIsEmpty, zeroIsEmpty);
    });
    return filtered.length === 0;
  }
  if (obj.length !== undefined) return obj.length === 0;
  return Object.keys(obj).length === 0;
}

/**
 * @param {String|String[]} arr
 * trim every item of arr, and filter empty string
 * */
function filterEmptyStr(arr) {
  if (typeof arr === 'string') {
    return arr.trim();
  }
  return Array.isArray(arr)
    ? arr.map(function (str) {
        return filterEmptyStr(str);
    }).filter(function (str) {
      return str;
    })
    : [];
}

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * `delay` milliseconds. If `atBegin` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 * */
function debounce(fn, delay, atBegin) {
  var timeout;
  return function () {
    var that = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!atBegin) fn.apply(that, args);
    }, delay);
    if (atBegin && !timeout) {
      fn.apply(that, args);
    }
  };
}

function getMouseButton(evt) {
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

function _enumOwnValues(obj) {
  if(Object.keys) {
    return Object.keys(obj).map(function (enumerableKey) {
      return obj[enumerableKey];
    })
  }
  var values = [];
  for(var k in obj) {
    if(obj.hasOwnProperty(k) && obj.propertyIsEnumerable(k)) {
      values.push(obj[k]);
    }
  }
}

function deepValue(obj) {
  if(obj === null || ['undefined', 'boolean', 'number', 'string'].includes(typeof obj)) {
    return obj;
  }
  var firstLevelVal = Array.isArray(obj) ? obj : _enumOwnValues(obj);
  return firstLevelVal.reduce(function (result, current) {
    return result.concat(deepValue(current));
  }, []);
}

/**
 * @param {String} str
 * @param {RegExp} regex
 * */
function match(str, regex) {
  var origLastIndex = regex.lastIndex, result, tempResult;
  regex.lastIndex = 0;

  if(!regex.global) {
    result = regex.exec(str);
  } else {
    result = [];
    while (tempResult = regex.exec(str)) {
      result.push(tempResult);
    }
  }

  regex.lastIndex = origLastIndex;  // restore
  return result;
}

var util = {
  $: $,
  $all: $all,
  onceLoaded: onceLoaded,
  getCurrentTab: getCurrentTab,
  isEmpty: isEmpty,
  filterEmptyStr: filterEmptyStr,
  debounce: debounce,
  getMouseButton: getMouseButton,
  matchAll: match,
  regex: regex
};

export default util;
export {
  $, $all, onceLoaded, getCurrentTab,
  isEmpty, filterEmptyStr, debounce, getMouseButton,
  deepValue, match, regex,
  includeString, clog, minErr
};