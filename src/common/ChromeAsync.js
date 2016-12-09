/**
 * Created by ray7551@gmail.com on 12.10 010.
 */
import {clog} from './base';

class ChromeAsync {
  constructor(chrome) {
    this.chrome = chrome;
    this.cache = {};
  }
  proxy(target) {
    let that = this;
    return new Proxy(target, {
      get: function (target, key) {
        clog(`getting key: `, key);
        clog(`chromeProxy cache:`, that.cache);
        if (that.cache[key]) {
          clog('use chromeTabsCache');
          return that.cache[key];
        }
        if (!(key in target)) {
          throw new Error(`chromeAsync proxyErr: no property name ${key}`);
        }
        if (['boolean', 'number', 'string'].includes(typeof target[key])) {
          return that.cache[key] = target[key];
        }
        if (typeof target[key] !== 'function') {
          return undefined;
        }

        // @TODO make it support proxy(chrome) and proxy(chrome.tabs)
        // @TODO make chrome as a outer dependency
        return that.cache[key] = function (...args) {
          return new Promise((resolve, reject) => {
            target[key](...args, function proxyCallback() {
              clog('chromeTabProxy callback executing: ', ...arguments);
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