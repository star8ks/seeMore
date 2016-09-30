if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }
    return start + search.length > this.length ? false : this.indexOf(search, start) !== -1;
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
    clog('%c'+ text, 'color: red');
  });
};

var Util = {
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

var Url = {
  getQueryVal: function (url, key) {
    var val = url.match(new RegExp(key + "=([^\&]*)(\&?)", 'i'));
    return val ? val[1] : val;
  },

  getSearchWord: function(url) {
    var seName = this.getEngineName(url);
    if(!seName) {
      return '';
    }
    var urlTpl = CONFIG.engines[seName].url;
    var match = urlTpl.match(/([^#?&]+)=%s/i);
    if(!match) {
      return '';
    }
    var searchKey = match[1];
    return this.getQueryVal(url, searchKey);
  },

  getHost: function (url) {
    if(url.match(/^chrome:\/\//)) {
      return 'chrome';
    }
    
    var match = url.match(/^https?:\/\/([^\/]+)\/?/);
    if (!match) {
      throw Error('Not a valid url: ', url);
    } else {
      return match[1].toLowerCase();
    }
  },

  inRequiredHost: function (url) {
    var host = this.getHost(url);
    var seKey = Object.keys(CONFIG.engines);
    for (var i = 0, seHosts; i < seKey.length; i++) {
      seHosts = CONFIG.engines[seKey[i]].hosts;
      if (seHosts.indexOf(host) !== -1) {
        return true;
      }
    }
    return false;
  },

  getEngineName: function (url) {
    var host = this.getHost(url);
    var seKey = Object.keys(CONFIG.engines);
    for (var i = 0, seHosts; i < seKey.length; i++) {
      seHosts = CONFIG.engines[seKey[i]].hosts;
      if (seHosts.indexOf(host) !== -1) {
        return seKey[i];
      }
    }
    return false;
  },

  isHostOf: function (url, se) {
    if (!CONFIG.engines[se]) {
      throw Error('No such engine index: ', se);
    }
    var host = this.getHost(url);
    return CONFIG.engines[se].hosts.indexOf(host) !== -1;
  },

  isGoogleRedirect: function(url) {
    return this.isHostOf(url, 'google') && (url.includes('url?') || url.includes('imgres?'));
  }

};


var Store = {
  getKeys: function () {
    return Object.keys(localStorage);
  },
  // getData: function() {},
  getRequiredOptionKeys: function () {
    var keys = Store.getKeys();
    var requiredOptionKeys = [];
    var re = new RegExp('^' + CONFIG.engineClassPre + '\\w+$');
    keys.forEach(function (key) {
      if (re.test(key)) {
        requiredOptionKeys.push(key);
      }
    });
    return requiredOptionKeys;
  },
  /*getCustomEngine: function() {

   },*/
  getOpenedEngine: function () {
    var keys = Store.getKeys();
    var openedEngine = [];
    var re = new RegExp('^' + CONFIG.engineClassPre + '\\w+$');
    keys.forEach(function (key) {
      if (re.test(key) && localStorage[key] === 'checked') {
        openedEngine.push(key.substr(CONFIG.engineClassPre.length));
      }
    });
    // @TODO: merge data with Store.getCustomEngine()
    return openedEngine;
  }
};