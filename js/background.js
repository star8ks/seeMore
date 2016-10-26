var Listener = (function () {
  function removeRedirect(tab) {
    var originUrl = Url.getQueryVal(tab.url, 'url');
    var originImgUrl = Url.getQueryVal(tab.url, 'imgrefurl');
    if (originUrl) {
      // clog.info('█████Remove redirection: ', tab.url, ' to ', decodeURIComponent(originUrl));
      chrome.tabs.update(tab.id, {url: decodeURIComponent(originUrl)});
    } else if (originImgUrl) {
      // clog.info('█████Remove redirection: ', tab.url, ' to ', decodeURIComponent(originImgUrl));
      chrome.tabs.update(tab.id, {url: decodeURIComponent(originImgUrl)});
    }
  }

  return {
    onTabCreated: function (tabInfo) {
      // Since chrome.tabs.onCreated listener may not get tab.url properly,
      // but It SEEMS that chrome.tabs.get listener will be called
      // AFTER tab.url is ready.
      // This way takes shorter time compare to chrome.tabs.onUpdated
      chrome.tabs.get(tabInfo.id, function (tab) {
        // clog('tabs.onCreated + tabs.get----------->tab.url', tab.url);
        if (localStorage['remove_redirect'] && Url.isGoogleRedirect(tab.url)) {
          removeRedirect(tab);
        }
      });
    },

    onTabUpdated: function (tabId, changeInfo, tab) {
      if (!changeInfo.status || 'loading' != changeInfo.status || !tab.url) {
        return;
      }
      if (/^chrome/.test(tab.url)) {
        localStorage['word'] = '';
        return;
      }

      if(tab.favIconUrl) {
        var iconKey = 'icon_' + Url.getHost(tab.url);
        localStorage[iconKey] = tab.favIconUrl;
      }

      if (localStorage['remove_redirect'] && Url.isGoogleRedirect(tab.url)) {
        removeRedirect(tab);
      }

      // TODO: inRequiredHost or inCustomHost
      if (Url.inRequiredHost(tab.url)) {
        chrome.browserAction.setTitle({title: '点击切换搜索引擎', tabId: tabId});
      }
    },

    onInstalled: function () {
      var manifest = chrome.runtime.getManifest();
      CONFIG.defaultEngine.forEach(function (searchEngine) {
        var index = CONFIG.engineClassPre + searchEngine;
        localStorage[index] = 'checked';
      });
      localStorage['remove_redirect'] = 'checked';
      localStorage['version'] = manifest.version;

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