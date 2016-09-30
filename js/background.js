

var listener = {
  onTabCreated: function (tabInfo) {
    // clog(tabInfo);
    // Since chrome.tabs.onCreated listener may not get tab.url properly,
    // but It SEEMS that chrome.tabs.get listener will be called
    // when tab.url is ready.
    // This way takes shorter time compare to chrome.tabs.onUpdated
    chrome.tabs.get(tabInfo.id, function (tab) {
      // clog('tabs.onCreated + tabs.get----------->tab.url', tab.url);
      if (tab.url && localStorage['remove_redirect'] && Url.isGoogleRedirect(tab.url)) {
        listener.removeRedirect(tab);
      }
    });
  },

  onTabUpdated: function (tabId, changeInfo, tab) {
    if (!changeInfo.status || 'loading' != changeInfo.status) {
      return;
    }
    // clog('changeInfo.url', changeInfo.url);
    // clog('changeInfo.status', changeInfo.status);
    // clog.info('tab updated! tab.url', tab.url);

    if (/^chrome/.test(tab.url)) {
      localStorage["word"] = '';
      return;
    }

    if(tab.url){
      if (tab.url && localStorage['remove_redirect'] && Url.isGoogleRedirect(tab.url)) {
        listener.removeRedirect(tab);
      }
    }

    // TODO: inRequiredHost or inCustomHost
    if (Url.inRequiredHost(tab.url)) {
      chrome.browserAction.setTitle({title: '点击切换搜索引擎', tabId: tabId});
    }
  },

  removeRedirect: function (tab) {
    var originUrl = Url.getQueryVal(tab.url, 'url');
    var originImgUrl = Url.getQueryVal(tab.url, 'imgrefurl');
    if (originUrl) {
      clog.info('█████Remove redirection: ', tab.url, ' to ', decodeURIComponent(originUrl));
      chrome.tabs.update(tab.id, {url: decodeURIComponent(originUrl)});
    } else if (originImgUrl) {
      clog.info('█████Remove redirection: ', tab.url, ' to ', decodeURIComponent(originImgUrl));
      chrome.tabs.update(tab.id, {url: decodeURIComponent(originImgUrl)});
    }
  },

  onInstalled: function() {
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
};

chrome.runtime.onInstalled.addListener(listener.onInstalled);
chrome.tabs.onCreated.addListener(listener.onTabCreated);

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(listener.onTabUpdated);


// 从 url 提取目的页地址直接访问
// chrome.browserAction.onClicked.addListener(function actionClick(tab) {
//   if (Url.getQueryVal(tab.url, 'url')) {
//     chrome.tabs.update(tab.id, {url: decodeURIComponent(args['url'])});
//   } else if (Url.getQueryVal(tab.url, 'imgrefurl')){
//     chrome.tabs.update(tab.id, {url: decodeURIComponent(args['imgrefurl'])});
//   }
// });

// Listen for the content script to send a message
// chrome.runtime.onMessage.addListener(function onRequest(request) {
//   if (request.search) {
//     localStorage["word"] = request.search;
//   }
//   if (request.browserEvent === 'urlChanged') {
//     clog('updated from contentscript');
//   }
// });


// @TODO 兼容旧版本数据

