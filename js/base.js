if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }
    return start + search.length > this.length
      ? false
      : this.indexOf(search, start) !== -1;
  };
}
/**
 * case insensitive version of String.prototype.includes
 * */
String.prototype.includeString = function (search, start, caseSensitive) {
  'use strict';
  caseSensitive = caseSensitive === void 0 ? false : !!caseSensitive;
  if(caseSensitive) {
    return this.includes(search, start);
  }
  if (typeof start !== 'number') {
    start = 0;
  }
  return start + search.length > this.length
    ? false
    : this.toLowerCase().indexOf(search.toLowerCase(), start) !== -1;
};
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/) {
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
      if (k < 0) {k = 0;}
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
        (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
        return true;
      }
      k++;
    }
    return false;
  };
}

var clog = function() {
  if(CONFIG.devMode) {
    console.log.apply(this, arguments);
  }
};
clog.info = function() {
  Array.prototype.slice.call(arguments).forEach(function(text){
    clog('%c'+ text, 'color: blue');
  });
};
clog.warn = function() {
  Array.prototype.slice.call(arguments).forEach(function(text){
    clog('%c'+ text, 'color: yellow');
  });
};
clog.err = function() {
  Array.prototype.slice.call(arguments).forEach(function(text){
    clog('%c'+ text, 'color: red');
  });
};

var util = {
  $: function(selector) {
    return document.querySelector(selector);
  },
  $all: function (selector) {
    return document.querySelectorAll(selector);
  },

  /**
   * undefined, null, void 0, [], {}, ''
   * with .length === 0 is empty,
   * object without a own enumerable property is empty
   * @param Object obj
   * @return Boolean
   */
  isEmpty: function(obj) {
    if(obj == null) return true
    if(obj.length !== undefined) return obj.length === 0
    return Object.keys(obj).length === 0
  },

  /**
   * Returns a function, that, as long as it continues to be invoked, will not
   * be triggered. The function will be called after it stops being called for
   * `delay` milliseconds. If `atBegin` is passed, trigger the function on the
   * leading edge, instead of the trailing.
   * */
  debounce: function(fn, delay, atBegin) {
    var timeout;
    return function(){
      var that = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        timeout = null;
        if(!atBegin) fn.apply(that, args);
      }, delay);
      if(atBegin && !timeout) {
        fn.apply(that, args);
      }
    };
  },
  getMouseButton: function (evt) {
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