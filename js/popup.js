;(function () {
  tjs.add(new tjs.BaiDu());
  tjs.add(new tjs.Google());

  var popupErr = minErr('Popup');

  function errorHandler(e) {
    clog.err(e.toString());
    clog.err('Error stack: ', e.stack);
  }

  var Links = function ($links) {
    this.$links = $links;
  };
  Links.prototype.init = function (tabId) {
    this.$links.forEach(function ($link) {
      // set icons
      $link.style.backgroundImage = "url('" + $link.getAttribute('data-favicon') + "')";

      $link.onclick = function (evt) {
        var button = util.getMouseButton(evt);
        switch (button) {
          case 'left':
            chrome.tabs.update(tabId, {url: this.href});
            break;
          case 'middle':
            chrome.tabs.create({url: this.href});
            break;
          default:
            break;
        }
        evt.preventDefault();
      }
    });
  };

  Links.prototype.updateHref = function (searchWord) {
    if (!searchWord) return new popupErr('invalid param', 'updateLinkHref with empty string');
    this.$links.forEach(function ($link) {
      $link.href = $link.getAttribute('data-url').replace(/%s/g, encodeURIComponent(searchWord));
    });
  };

  util.onceLoaded(util.getCurrentTab).then(function onLoad(tab) {
    var tabUrl = new Url(tab.url);
    var $keyword = util.$('#keyword');
    var $translation = util.$('.translation');
    var links;
    var engineListTpl = util.$('#tpl-engines').innerHTML.trim();
    var $enginesSection = util.$('.engines');

    Render.openEngines(engineListTpl).then(function (rendered) {
      $enginesSection.innerHTML = rendered;
      links = new Links(util.$all('.engines .icon-link'));
    }).then(function () {
      new Mason(util.$('.engines'), {
        itemSelector: '.pin',
        columnNum: 2
      });
      links.init(tab.id, $keyword.value);
    }).catch(errorHandler);

    getSearchString().then(function (searchString) {
      searchString = searchString.trim();
      clog('get searchString: ', searchString);
      setKeywordInput(searchString);
      if (searchString && links) links.updateHref(searchString);
    }).catch(errorHandler);

    function translate(str) {
      // @TODO only translate some language, from user config
      // @TODO not translate some language, from user config
      // if(chrome.i18n.detect)
      if (str.length > CONFIG.translateMaxLength) {
        return Promise.reject('[Translation]trans string too long');
      }

      var lang = navigator.language.split('-', 1)[0];
      return tjs.translate({
        api: navigator.language === 'zh-CN' ? 'BaiDu' : 'Google',
        text: str,
        to: lang === 'zh' ? navigator.language : lang
      }).then(function (resultObj, err) {
        clog(resultObj, err);
        if (resultObj.error) return null;
        return resultObj.detailed || resultObj.result;
      }).then(function (translated) {
        return util.isEmpty(translated) ? '' : translated.filter(function (line) {
          return line.toLowerCase() !== str.toLowerCase();
        }).reduce(function (html, line) {
          html += line + '<br>';
          return html;
        }, '');
      });
    }

    function getSearchString() {
      // get search string from selected text
      var getSelectionP = new Promise(function (resolve) {
        if (tabUrl.url.match(/^chrome/)) { // not support chrome pages now
          resolve('');
        }

        // @TODO move it to contentScript.js
        // @TODO don't block popup here
        chrome.tabs.executeScript({
          code: "window.getSelection().toString();"
        }, function (selection) {
          if (!util.isEmpty(selection) && selection[0].length <= CONFIG.selectionMaxLength) {
            resolve(selection[0]);
          }
          resolve('');
        });
      });

      // get search string from url param
      return getSelectionP.then(function (str) {
        return str ? str : getQueryString(tabUrl);
      });

      function getQueryString(tabUrl) {
        if (Url.googleFailedUrlPattern.test(tabUrl.url)) {
          tabUrl = new Url(decodeURIComponent(tabUrl.getQueryVal('continue')));
        }
        return Engine.searchKeys(tabUrl.host).then(function (keys) {
          if (keys.length <= 0) {
            return '';
          }
          return Engine.get(keys[0]).then(function (engine) {
            var searchKey = (new Url(engine.url)).searchKey;
            var searchString = tabUrl.getQueryVal(searchKey);
            searchString = searchString ? searchString : '';
            return decodeURIComponent(searchString || '');
          });
        })
      }
    }

    function setKeywordInput(searchString) {
      if (searchString) {
        $keyword.value = searchString;
        clog('trans', $keyword.value);
        translate($keyword.value).then(function (html) {
          $translation.innerHTML = html;
        });
      }

      $keyword.oninput = util.debounce(function (e) {
        //if press enter, search word using first enabled engine
        e.key === 'Enter' && util.$('.se:not(.disable)').dispatchEvent(new MouseEvent(
          'click',
          {button: 0}
        ));

        links && links.updateHref(this.value);
        translate(this.value).then(function (html) {
          $translation.innerHTML = html;
        });
      }, 500);
      $keyword.focus();

    }

  });

})();
