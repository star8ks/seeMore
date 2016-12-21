/**
 * proxy chrome apis
 * @usage let chromeAsync = new ChromeAsync(chrome);
 * let tabsProxy = chromeAsync.proxy(chrome.tabs);
 * Created by ray7551@gmail.com on 12.10 010.
 */

class ChromeAsync {
  constructor(chrome) {
    this.chrome = chrome;
    this.cache = {};
  }

  proxy(target) {
    let that = this;
    return new Proxy(target, {
      get: function (target, key) {
        if (that.cache[key]) {
          return that.cache[key];
        }
        if (!(key in target)) {
          throw new Error(`chromeAsync proxyErr: no property name ${key}`);
        }
        let type = typeof target[key];
        if (target[key] === null || ['undefined', 'boolean', 'number', 'string'].includes(type)) {
          return that.cache[key] = target[key];
        }
        if (type !== 'function') {
          return undefined;
        }

        // @TODO make it support chromeAsync.tabs.query
        return that.cache[key] = function (...args) {
          return new Promise((resolve, reject) => {
            target[key](...args, function proxyCallback() {
              if (that.chrome.runtime.lastError) {
                return reject(new Error(key + 'Err' + that.chrome.runtime.lastError.message));
              }
              return resolve(...arguments);
            })
          })
        };
      }
    });
  }
}

export default ChromeAsync;