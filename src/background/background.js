import CONFIG from "../common/config.js";
import "../common/base.js";
import Engine from "../common/db/Engine.js";
import EngineType from "../common/db/EngineType.js";
import Setting from "../common/db/Setting.js";
import Icon from "../common/db/Icon.js";
import Url from "../common/Url.js";

var Listener = (function () {

  function removeRedirect(tab) {
    return Promise.all([
      Setting.get('cfg_remove_redirect'),
      Engine.get('google')
    ]).spread(function(removeRedirect, engine) {
      if(!removeRedirect) {
        return;
      }

      var tabUrl = new Url(tab.url);
      if(!engine.hosts.includes(tabUrl.host.toLowerCase())
        || (!tabUrl.includes('url?') && !tabUrl.includes('imgres?'))) {
        // clog('Not a valid google redirect url', tab.url);
        return;
      }

      var originUrl = tabUrl.getQueryVal('url');
      var originImgUrl = tabUrl.getQueryVal('imgrefurl');
      if (originUrl) {
        clog.info('█████Remove redirection: ', tab.url, ' to ', decodeURIComponent(originUrl));
        chrome.tabs.update(tab.id, {url: decodeURIComponent(originUrl)});
      } else if (originImgUrl) {
        clog.info('█████Remove redirection: ', tab.url, ' to ', decodeURIComponent(originImgUrl));
        chrome.tabs.update(tab.id, {url: decodeURIComponent(originImgUrl)});
      }
    }).catch(function (error) {
      throw new Error('Error in remove redirect: ' + error);
    });
  }

  return {
    onTabCreated: function (tabInfo) {
      // Since chrome.tabs.onCreated listener may not get tab.url properly,
      // but It seem that chrome.tabs.get listener will be called
      // AFTER tab.url is ready(at most of time).
      // This way takes shorter time compare to chrome.tabs.onUpdated
      chrome.tabs.get(tabInfo.id, function (tab) {
        if(!tab.url || !/^https?/.test(tab.url)) {
          return;
        }
        removeRedirect(tab);
      });
    },

    onTabUpdated: function (tabId, changeInfo, tab) {
      if (!changeInfo.status || 'loading' != changeInfo.status
        || !tab.url || !/^https?/.test(tab.url)) {
        return;
      }

      var oUrl = new Url(tab.url);
      if(tab.favIconUrl) {
        clog('on updated favicon', tab.favIconUrl);
        Icon.set(oUrl.host, tab.favIconUrl);
      }

      removeRedirect(tab);

      Engine.searchKeys(oUrl.host).then(function (keys) {
        if(keys.length > 0) {
          chrome.browserAction.setTitle({title: '点击切换搜索引擎', tabId: tabId});
        }
      });
    },

    onInstalled: function () {
      var manifest = chrome.runtime.getManifest();
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
        chrome.tabs.create({url: 'chrome-extension://' + chrome.runtime.id + '/setting.html'});
      }
    }
  }
})();

chrome.runtime.onInstalled.addListener(Listener.onInstalled);

chrome.tabs.onCreated.addListener(Listener.onTabCreated);
// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(Listener.onTabUpdated);

// @TODO 兼容旧版本数据