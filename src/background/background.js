import CONFIG from '../common/config.js';
import {clog, minErr} from '../common/base.js';
import Engine from '../common/db/Engine.js';
import EngineType from '../common/db/EngineType.js';
import Setting from '../common/db/Setting.js';
import Icon from '../common/db/Icon.js';
import Url from '../common/Url.js';
import iconData from '../common/iconData';

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

  function loadInitData() {
    let manifest = chrome.runtime.getManifest();
    let loadDataPromises = [];
    loadDataPromises.push(Setting.set('version', manifest.version));

    iconData.forEach(group => {
      group.hosts.forEach(host => {
        loadDataPromises.push(Icon.set(host, group.dataURI));
      });
    });

    Object.keys(CONFIG.engineTypes).forEach(function (typeId) {
      loadDataPromises.push(EngineType.set(typeId, CONFIG.engineTypes[typeId]));
    });

    Object.keys(CONFIG.engines).forEach(function (key) {
      loadDataPromises.push(Engine.set(key, CONFIG.engines[key]));
    });

    loadDataPromises.push(Setting.set('cfg_remove_redirect', true));
    if (CONFIG.devMode) {
      // Promise.all(loadDataPromises).then(() => {
      //   clog('load init data done!');
      //   chrome.tabs.create({url: 'chrome-extension://' + chrome.runtime.id + '/popup.html'});
      // }).catch(e => clog('load init data error', e.toString()));
    }
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
      clog('installed');
      if (CONFIG.devMode) {
        Icon.clear();
        Setting.clear();
        Engine.clear();
        EngineType.clear();
        loadInitData();
      }
    },

    onStartup() {
      clog('startup');
      loadInitData();
    }
  };
})();

chrome.runtime.onInstalled.addListener(Listener.onInstalled);
chrome.runtime.onStartup.addListener(Listener.onStartup);

chrome.tabs.onCreated.addListener(Listener.onTabCreated);
// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(Listener.onTabUpdated);