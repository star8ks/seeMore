var Url = (function () {

  function getHost(url) {
    if (url.match(/^chrome/)) {
      return 'chrome';
    }

    var match = url.match(/^https?:\/\/([^\/]+)\/?/);
    if (!match) {
      throw Error('Not a valid url: ' + url);
    } else {
      return match[1].toLowerCase();
    }
  }
  /**
   * A regular expression for identifying favicon URLs.
   * @const {!RegExp}
   */
  var Url = function (urlStr) {
    this.url = urlStr;
    Object.defineProperties(this, {
      /**
       * host of url
       * eg: host part of 'https://www.se.com/g?q=3#t' is 'www.se.com'
       * @member {String} host
       * @memberOf Url#
       */
      host: {
        get: function () {
          //noinspection JSPotentiallyInvalidUsageOfThis,JSUnresolvedVariable
          return getHost(this.url);
        },
        enumerable: true
      },
      /**
       * origin of url
       * eg: origin part of 'https://se.com/g?q=3#t' is 'https://se.com'
       * */
      origin: {
        get: function () {
          var match = this.url.match(/^((http|https|chrome|chrome\-extension):\/\/[^\/]+)\/?/);
          if (!match) {
            throw Error('Not a valid url: ' + this.url);
          } else {
            return match[1].toLowerCase();
          }
        },
        enumerable: true
      },
      /**
       * Creates a favicon url depend on given url.
       * @param {number=} size Optional preferred size of the favicon.
       * @param {string=} type Optional type of favicon to request. Valid values
       *     are 'favicon' and 'touch-icon'. Default is 'favicon'.
       * @return {string} url for the favicon.
       */
      faviconUrl: {
        get: function (size, type) {
          size = size || 16;
          type = type || 'favicon';

          return 'chrome://' + type + '/size/' + size + '@1x/' +
            // Note: Literal 'iconurl' must match FAVICON_URL_REGEX
            (Url.FAVICON_URL_REGEX.test(this.url) ? 'iconurl/' + this.url : this.origin);
        },
        enumerable: true
      },
      searchKey: {
        get: function () {
          var match = this.url.match(/([^#?&]+)=%s/i);
          return !match ? '' : match[1];
        },
        enumerable: true
      },
      queryPairs: {
        get: function () {
          var regex = /([^?&#]+)=([^?&#]*)/g;
          var pairs = [], tempResult;

          /* eslint-disable no-cond-assign */
          while (tempResult = regex.exec(this.url)) {
            pairs.push(tempResult);
          }
          return pairs.map(function (pair) {
            return {
              key: pair[1],
              val: decodeURIComponent(pair[2] || '').replace(/\+/g, ' ')
            };
          });
        },
        enumerable: true
      },
      isNormal: {
        get: function () {
          return Url.NORMAL_REGEX.test(this.url);
        },
        enumerable: true
      },
      isGoogleFail: {
        get: function () {
          return Url.GOOGLE_FAILED_REGEX.test(this.url);
        },
        enumerable: true
      },
      isWeiboUrl: {
        get: function () {
          return Url.WEIBO_URL_REGEX.test(this.url);
        },
        enumerable: true
      },
      pathName: {
        get: function () {
          var match = this.url.match(/https?:\/\/[^\/]*(\/[^?]+)/);
          return match ? match[1] : '/';
        },
        enumerable: true
      }
    });
  };
  Url.isNormal = function(url) {
    return Url.NORMAL_REGEX.test(url);
  };
  Url.isDataURI = function(url) {
    return Url.DATA_URI_REGEX.test(url);
  };
  /**
   * Get root domain(not strictly) of a host.
   * @see Url.spec.js for detail usage
   * @param {String} host a valid host
   * */
  Url.getRootDomain = function(host) {
    var temp = host.replace(/^[^.]+\./, '');
    var firstPart = temp.match(/^([^.]+)\./);
    var commonDomainSuffix = ['com', 'net', 'edu', 'gov', 'org', 'co'];
    if(firstPart === null) {
      return host;
    }
    if(temp.split('.').length >= 3) {
      return Url.getRootDomain(temp);
    }
    if(commonDomainSuffix.includes(firstPart[1].toLowerCase())) {
      return host;
    }
    return temp;
  };
  Url.NORMAL_REGEX = /^https?:\/\//i;
  Url.DATA_URI_REGEX = /^data:.*,/i;
  Url.FAVICON_URL_REGEX = /\.ico$/i;
  Url.GOOGLE_FAILED_REGEX = /^https?:\/\/ipv[46]\.google\.[^/]*\/sorry/i;
  Url.WEIBO_URL_REGEX = /^https?:\/\/s\.weibo\.com\/weibo/i;
  Url.prototype = {
    includes: function (search) {
      return this.url.includeString(search);
    },

    getQueryVal: function (key) {
      var val = this.url.match(new RegExp('[#?&]' + key + '=([^?&#]*)(?:[?&#]|$)', 'i'));
      return val ? val[1].replace(/\+/g, ' ') : null;
    }
  };

  function fetchImgBlob(url) {
    return fetch(url).then(function(r) {
      return r.blob();
    });
  }

  function blobToDataURI(blob) {
    return new Promise(function(resolve, reject) {
      var a = new FileReader();
      a.onload = function(e) {
        resolve(e.target.result);
      };
      a.onerror = function(e) {
        reject(e);
      };
      a.readAsDataURL(blob);
    });
  }

  /**
   * @param {String} url, a valid normal url
   * @return {Promise}
   * @resolve {String} the dataURI of image/icon
   * */
  Url.toDataURI = function (url) {
    if(Url.DATA_URI_REGEX.test(url)) {
      return Promise.resolve(url);
    }
    if(!Url.NORMAL_REGEX.test(url)) {
      return Promise.reject(new Error('Not a valid normal url or dataURI'));
    }
    return fetchImgBlob(url).then(function(blob) {
      return blobToDataURI(blob);
    });
  };

  return Url;
})();

export default Url;