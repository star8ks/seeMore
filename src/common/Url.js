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

class Url {
  /**
   * A regular expression for identifying favicon URLs.
   * @const {!RegExp}
   */
  constructor(urlStr) {
    this.url = urlStr;
    Object.defineProperty(this, 'url', {
      get: () => urlStr
    });
  }

  get pathName() {
    var match = this.url.match(/https?:\/\/[^\/]*(\/[^?]+)/);
    return match ? match[1] : '/';
  }

  get isWeiboUrl() {
    return Url.WEIBO_URL_REGEX.test(this.url);
  }
  get isGoogleFail() {
    return Url.GOOGLE_FAILED_REGEX.test(this.url);
  }
  get isNormal() {
    return Url.NORMAL_REGEX.test(this.url);
  }
  get isDataURI() {
    return Url.isDataURI(this.url);
  }
  get queryPairs() {
    var regex = /([^?&#]+)=([^?&#]*)/g;
    var pairs = [], tempResult;

    /* eslint-disable no-cond-assign */
    while (tempResult = regex.exec(this.url)) {
      pairs.push(tempResult);
    }
    return pairs.map(pair => {
      return {
        key: pair[1],
        val: decodeURIComponent(pair[2] || '').replace(/\+/g, ' ')
      };
    });
  }

  get searchKey() {
    var match = this.url.match(/([^#?&]+)=%s/i);
    return !match ? '' : match[1];
  }

  /**
   * host of url
   * eg: host part of 'https://www.se.com/g?q=3#t' is 'www.se.com'
   * @member {String} host
   * @memberOf Url#
   */
  get host() {
    return getHost(this.url);
  }

  /**
   * origin of url
   * eg: origin part of 'https://se.com/g?q=3#t' is 'https://se.com'
   * */
  get origin() {
    var match = this.url.match(/^((http|https|chrome|chrome\-extension):\/\/[^\/]+)\/?/);
    if (!match) {
      throw Error('Not a valid url: ' + this.url);
    } else {
      return match[1].toLowerCase();
    }
  }

  get faviconUrl() {
    return Url.faviconUrl(this.url);
  }

  get yandexFaviconUrl() {
    return 'http://favicon.yandex.net/favicon/' + this.host;
  }

  /**
   * Create a favicon url of current url host.
   * @param url
   * @param {Number=} size Optional preferred size of the favicon.
   * @param {String=} type Optional type of favicon to request. Valid values
   *     are 'favicon' and 'touch-icon'. Default is 'favicon'.
   * @return {String} url for the favicon.
   */
  static faviconUrl(url, {size = 16, type = 'favicon'}={}) {
    return 'chrome://' + type + '/size/' + size + '@1x/' +
      // Note: Literal 'iconurl' must match FAVICON_URL_REGEX
      (Url.FAVICON_URL_REGEX.test(url) ? 'iconurl/' + url : new Url(url).origin);
  }

  includes(search) {
    return this.url.includeString(search);
  }

  getQueryVal(key) {
    var val = this.url.match(new RegExp('[#?&]' + key + '=([^?&#]*)(?:[?&#]|$)', 'i'));
    return val ? decodeURIComponent(val[1].replace(/\+/g, ' ')) : null;
  }

  static isNormal(url) {
    return Url.NORMAL_REGEX.test(url);
  }

  /**
   * @param {String} url
   * @return {boolean}
   */
  static isDataURI(url) {
    return Url.DATA_URI_REGEX.test(url);
  }

  static isInvalidFavicon(url) {
    return Url.INVALID_FAVICON_DATAURI.includes(url);
  }

  /**
   * Get root domain(not strictly) of a host.
   * @see Url.spec.js for detail usage
   * @param {String} host a valid host
   * */
  static getRootDomain(host) {
    var temp = host.replace(/^[^.]+\./, '');
    var firstPart = temp.match(/^([^.]+)\./);
    var commonDomainSuffix = ['com', 'net', 'edu', 'gov', 'org', 'co'];
    if (firstPart === null) {
      return host;
    }
    if (temp.split('.').length >= 3) {
      return Url.getRootDomain(temp);
    }
    if (commonDomainSuffix.includes(firstPart[1].toLowerCase())) {
      return host;
    }
    return temp;
  }

  /**
   * @param {String} url, a valid normal url
   * @return {Promise}
   * @resolve {String} the dataURI of image/icon
   * */
  static toDataURI(url) {
    if (Url.DATA_URI_REGEX.test(url)) {
      return Promise.resolve(url);
    }
    if (!Url.NORMAL_REGEX.test(url)) {
      return Promise.reject(new Error('Not a valid normal url or dataURI'));
    }
    return fetchImgBlob(url).then(function (blob) {
      return blobToDataURI(blob);
    });
  }
}
Url.NORMAL_REGEX = /^https?:\/\//i;
Url.DATA_URI_REGEX = /^data:.*,/i;
Url.FAVICON_URL_REGEX = /\.ico$/i;
Url.GOOGLE_FAILED_REGEX = /^https?:\/\/ipv[46]\.google\.[^/]*\/sorry/i;
Url.WEIBO_URL_REGEX = /^https?:\/\/s\.weibo\.com\/weibo/i;
Url.INVALID_FAVICON_DATAURI = [
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4AWIAAYAAAwAABQABggWTzwAAAABJRU5ErkJggg=='
];


function fetchImgBlob(url) {
  return fetch(url).then(function (r) {
    if (r.status !== 200) {
      return Promise.reject(new Error('fetchImgBlob: fetch error'));
    }
    return r.blob();
  });
}

function blobToDataURI(blob) {
  return new Promise(function (resolve, reject) {
    var a = new FileReader();
    a.onload = function (e) {
      resolve(e.target.result);
    };
    a.onerror = function (e) {
      reject(e);
    };
    a.readAsDataURL(blob);
  });
}

export default Url;