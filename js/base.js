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