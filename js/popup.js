;(function () {
  tjs.add(new tjs.BaiDu());
  tjs.add(new tjs.Bing());
  tjs.add(new tjs.Google())
  tjs.add(new tjs.GoogleCN())
  tjs.add(new tjs.YouDao({ apiKey: '1631498396', keyFrom: 'crx-translate7551' }));
  function translate(str) {
    // @TODO only translate some language, from user config
    // @TODO not translate some language, from user config
    // if(chrome.i18n.detect)
    if(str.length > CONFIG.translateMaxLength) {
      return Promise.reject('[Translation]trans string too long');
    }

    var lang = navigator.language.split('-', 1)[0];
    return tjs.translate({
      api: 'Google',
      text: str,
      to: lang === 'zh' ? navigator.language : lang
    }).then(function (resultObj) {
      return resultObj.detailed ? resultObj.detailed : resultObj.result;
    }).then(function (translated) {
      var html = '';
      translated.forEach(function (line) {
        html += line + '<br>';
      });
      return html;
    });
  }

  window.addEventListener("DOMContentLoaded", function onLoad() {

    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
      var tab = tabs[0];
      var tabUrl = new Url(tab.url);
      var $keyword = util.$('#keyword');
      var $translation = util.$('.translation');

      getSearchString().then(function (searchString) {
        clog('get searchString: ', searchString);
        setKeywordInput(searchString);
      });
      function getSearchString() {
        // get search string from selected text
        var getSelectionP = new Promise(function (resolve) {
          if(tabUrl.url.match(/^chrome/)){ // not support chrome pages now
            resolve('');
          }
          chrome.tabs.executeScript({
            code: "window.getSelection().toString();"
          }, function (selection) {
            if(selection.length && selection[0].length <= CONFIG.selectionMaxLength) {
              resolve(selection[0]);
            }
            resolve('');
          });
        });

        // get search string from url param
        return  getSelectionP.then(function (str) {
          return str ? str : getSearchString(tabUrl);
        });

        function getSearchString(tabUrl) {
          if(Url.googleFailedUrlPattern.test(tabUrl.url)) {
            tabUrl = new Url(decodeURIComponent(tabUrl.getQueryVal('continue')));
          }
          return Engine.searchKeys(tabUrl.host).then(function (keys) {
            if (keys.length <= 0) {
              return '';
            }
            return Engine.get(keys[0]).then(function (engine) {
              var searchKey = (new Url(engine.url)).searchKey;
              var searchString = tabUrl.getQueryVal(searchKey);
              return decodeURIComponent(searchString ? searchString : '');
            });
          })
        }
      }
      function setKeywordInput(searchString) {
        $keyword.value = searchString;
        $keyword.onkeyup = util.debounce(function (e) {
          //if press enter, search word using first enabled engine
          if(e.key == 'Enter') {
            util.$('.se:not(.disable)').dispatchEvent(new MouseEvent(
              'click',
              {button:0}
            ));
          }
          translate(this.value).then(function (html) {
            $translation.innerHTML = html;
          });
        }, 500);
        $keyword.focus();

        if($keyword.value) {
          clog('trans', $keyword.value);
          translate($keyword.value).then(function (html) {
            $translation.innerHTML = html;
          });
        }
      }

      var engineListTpl = util.$('#tpl-engines').innerHTML.trim();
      var $enginesSection = util.$('.engines');
      Render.openEngines(engineListTpl).then(function (rendered) {
        $enginesSection.innerHTML = rendered;
      }).then(function () {
        new Mason(util.$('.engines'), {
          itemSelector: '.pin',
          columnNum: 2
        });
        setLinks();
      });

      function setLinks() {
        util.$all('.engines .icon-link').forEach(function ($link) {
          // set icons
          var index = $link.getAttribute('data-se');

          Engine.get(index).then(function (engine) {
            $link.style.backgroundImage = "url('" + $link.getAttribute('data-favicon') + "')";

            $link.onclick = function (evt) {
              var searchParam = encodeURIComponent($keyword.value);
              var url = engine.url.replace(/%s/g, searchParam);
              var button = util.getMouseButton(evt);
              switch (button) {
                case 'left':
                  chrome.tabs.update(tab.id, {url: url});
                  break;
                case 'middle':
                  chrome.tabs.create({url: url});
                  break;
                default:
                  break;
              }
              evt.preventDefault();
            }
          });
        });
      }

    });

  });

})();
