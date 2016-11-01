if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }
    return start + search.length > this.length ? false : this.indexOf(search, start) !== -1;
  };
}
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
//@TODO case insensitive search Array.prototype.includeString

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
    clog('%c'+ text, 'color: red');
  });
};

var util = {
  '$': function(objStr) {
    return document.getElementById(objStr);
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

var Tpl = function (tplId) {
  this.openTag = '${';
  this.closeTag = '}';
  this.tplSelectorPre = "script[type='text/template']";
  this.$tpl = document.querySelector(this.tplSelectorPre + "#" + tplId);
  if (!this.$tpl) {
    throw new Error('No template found!');
  }
  this.tpl = this.$tpl.innerHTML.trim();
  this.output = this.tpl;
};
Tpl.prototype = {
  replace: function (search, replaceText) {
    this.output = this.output.replace(this.openTag + search + this.closeTag, replaceText);
    return this;
  },
  render: function (data) {
    this.output = this.tpl;
    Object.keys(data).forEach(function (key) {
      this.replace(key, data[key]);
    }.bind(this));
    return this.output;
  }
};

/**
 * @param {String} url A valid url
 * @param {Boolean?} openOnly Only search open engines
 * @return {Promise}
 * if not found in hosts, next then() will get false,
 * if found, next then() will get the engine keys
 * */
function searchEngineKeys(url) {
  clog('search Engine Keys: url=', url);
  var host = (new Url(url)).host;
  return Engine.getOpen().filter(function (se) {
    //@TODO it should be case insensitive includes here
    return se.hosts.includes(host);
  }).then(function (engines) {
    return Object.keys(DB.assoc(engines));
  }).catch(function (err) {
    throw new Error('Error in searchEngineKeys(url = ' + url + '): ', err);
  });
}