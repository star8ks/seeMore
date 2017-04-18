import CONFIG from '../common/config.js';
import {clog, minErr} from '../common/base.js';
import Engine from '../common/db/Engine.js';
import EngineType from '../common/db/EngineType.js';
import Setting from '../common/db/Setting.js';
import Icon from '../common/db/Icon.js';
import Url from '../common/Url.js';

let bgWarn = minErr('Background Warning');
let Listener = (function () {

  function removeRedirect(tab) {
    const {url, id} = tab;
    let tabUrl = new Url(url);
    if (!tabUrl.isNormal || !Number.isInteger(id)) {
      return;
    }

    return Promise.all([
      Setting.get('cfg_remove_redirect'),
      Engine.get('google')
    ]).spread(function (removeRedirect, engine) {
      if (!removeRedirect) {
        return;
      }

      if (!engine.hosts.includes(tabUrl.host.toLowerCase())
        || (!tabUrl.includes('url?') && !tabUrl.includes('imgres?'))) {
        // clog('Not a valid google redirect url', tabUrl);
        return;
      }

      let originUrl = tabUrl.getQueryVal('url');
      let originImgUrl = tabUrl.getQueryVal('imgrefurl');
      // google's interstitial page will warn people 'This site may harm your computer'
      // so keep it as it is
      // if(/^\/interstitial\?url=/.test(originUrl)) {
      //   let tempUrl = new Url('http://google.com' + originUrl);
      //   originUrl = decodeURIComponent(tempUrl.getQueryVal('url'));
      // }
      if (Url.isNormal(originUrl)) {
        clog.info('█████Remove redirection: ', url, ' to ', originUrl);
        chrome.tabs.update(id, {url: originUrl});
      } else if (Url.isNormal(originImgUrl)) {
        clog.info('█████Remove redirection: ', url, ' to ', originImgUrl);
        chrome.tabs.update(id, {url: originImgUrl});
      }
    }).catch(function (error) {
      throw new Error('Error in remove redirect: ' + error);
    });
  }

  return {
    onTabCreated: function (tabInfo) {
      // chrome.tabs.onCreated listener may not get tab url properly,
      // but it takes shorter time compare to chrome.tabs.onUpdated
      if (!tabInfo.url || !/^https?/.test(tabInfo.url)) {
        return;
      }
      removeRedirect(tabInfo);
    },

    onTabUpdated: function (tabId, changeInfo, tab) {
      if (!changeInfo.status || 'loading' !== changeInfo.status
        || !tab.url || !/^https?/.test(tab.url)) {
        return;
      }
      removeRedirect(tab);

      let tabUrl = new Url(tab.url);
      let faviconUrl = new Url(tab.favIconUrl);
      Engine.searchKeys(tabUrl.host).then(function (keys) {
        if (!keys.length) {
          throw new bgWarn('onTabUpdated: Not found engine for host: {0}', tabUrl.host);
        }
        chrome.browserAction.setTitle({title: '点击切换搜索引擎', tabId: tabId});
        if (!faviconUrl.isNormal && !faviconUrl.isDataURI) {
          throw new bgWarn('onTabUpdated: Not found valid favIconUrl: {0}', tab.favIconUrl);
        }
        return Icon.get(tabUrl.host);
      }).then(function (iconUrl) {
        if (Url.isDataURI(iconUrl)) {
          throw new bgWarn('onTabUpdated: No need to update favicon url.');
        }
        return Url.toDataURI(tab.favIconUrl);
      }).then(function (dataURI) {
        clog('Update favicon of:', tabUrl.host, dataURI);
        return Icon.set(tabUrl.host, dataURI);
      }).catch(bgWarn, function (e) {
        // ignore
        clog(e.toString());
      });
    },

    onInstalled: function () {
      let manifest = chrome.runtime.getManifest();
      Setting.set('version', manifest.version);

      Object.keys(CONFIG.engineTypes).forEach(function (typeId) {
        EngineType.set(typeId, CONFIG.engineTypes[typeId]).catch(function (err) {
          clog.err('Error when init set engineTypes' + err);
        });
      });
      Object.keys(CONFIG.engines).forEach(function (key) {
        Engine.set(key, CONFIG.engines[key]).catch(function (err) {
          clog.err('Error when init set engines' + err);
        });
      });
      Setting.set('cfg_remove_redirect', true);
      if (!CONFIG.devMode) {
        chrome.tabs.create({url: 'chrome://extensions/?options=' + chrome.runtime.id});
      } else {
        chrome.tabs.create({url: 'chrome-extension://' + chrome.runtime.id + '/popup.html'});
      }
    }
  };
})();

chrome.runtime.onInstalled.addListener(Listener.onInstalled);

chrome.tabs.onCreated.addListener(Listener.onTabCreated);
// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(Listener.onTabUpdated);