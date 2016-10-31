(function () {
'use strict';
var Listener = (function () {

  function removeRedirect(tab) {
    return Promise.all([
      Engine.get('cfg_remove_redirect'),
      Engine.get('google')
    ]).spread(function(removeRedirect, engine) {
      if(!removeRedirect) {
        return;
      }

      var oUrl = new Url(tab.url);
      if(engine.hosts.includes(oUrl.host)) {
        return;
      }
      if(!oUrl.includes('url?') && !oUrl.includes('imgres?')) {
        return;
      }

      var originUrl = oUrl.getQueryVal('url');
      var originImgUrl = oUrl.getQueryVal('imgrefurl');
      if (originUrl) {
        clog.info('█████Remove redirection: ', tab.url, ' to ', decodeURIComponent(originUrl));
        chrome.tabs.update(tab.id, {url: decodeURIComponent(originUrl)});
      } else if (originImgUrl) {
        // clog.info('█████Remove redirection: ', tab.url, ' to ', decodeURIComponent(originImgUrl));
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
        if(!tab.url) {
          return;
        }
        removeRedirect(tab);
      });
    },

    onTabUpdated: function (tabId, changeInfo, tab) {
      if (!changeInfo.status || 'loading' != changeInfo.status
        || !tab.url || tab.url==='about:blank' || /^chrome/.test(tab.url)) {
        return;
      }

      var oUrl = new Url(tab.url);
      if(tab.favIconUrl) {
        clog('on updated favicon', tab.favIconUrl);
        var iconKey = 'icon_' + oUrl.host;
        Icon.set(iconKey, tab.favIconUrl);
      }

      removeRedirect(tab);

      searchEngineKeys(tab.url).then(function (keys) {
        if(keys.length > 0) {
          chrome.browserAction.setTitle({title: '点击切换搜索引擎', tabId: tabId});
        }
      });
    },

    onInstalled: function () {
      var manifest = chrome.runtime.getManifest();
      Object.keys(CONFIG.engines).forEach(function (key) {
        Engine.set(key, CONFIG.engines[key]);
      });
      Setting.set('cfg_remove_redirect', true);
      Setting.set('version', manifest.version);

      if (!CONFIG.devMode) {
        chrome.tabs.create({url: 'chrome://extensions/?options=' + chrome.runtime.id});
      }
    }
  }
})();

chrome.runtime.onInstalled.addListener(Listener.onInstalled);

chrome.tabs.onCreated.addListener(Listener.onTabCreated);
// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(Listener.onTabUpdated);

// @TODO 兼容旧版本数据
})();