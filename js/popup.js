;(function () {
  window.addEventListener("DOMContentLoaded", function onLoad() {

    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
      var tab = tabs[0];
      var tabUrl = new Url(tab.url);
      var $keyword = util.$('keyword');

      getSearchString().then(function (searchString) {
        clog('get searchString: ', searchString);
        setKeywordInput(searchString);
      });
      function getSearchString() {
        // get search string from selected text
        var getSelection = new Promise(function (resolve) {
          if(tab.url.match(/^chrome/)){ // not support chrome pages now
            resolve('');
          }
          chrome.tabs.executeScript({
            code: "window.getSelection().toString();"
          }, function (selection) {
            resolve(selection ? selection[0] : '');
          });
        });

        // get search string from url param
        return getSelection.then(function (selectString) {
          return selectString ? selectString : searchEngineKeys(tabUrl.url).then(function (keys) {
            if (keys.length <= 0) {
              return '';
            }
            return Engine.get(keys[0]).then(function (engine) {
              var searchKey = (new Url(engine.url)).searchKey;
              var searchString = tabUrl.getQueryVal(searchKey);
              return decodeURIComponent(searchString ? searchString : '');
            });
          })
        });

      }
      function setKeywordInput(searchString) {
        $keyword.value = searchString;
        $keyword.onkeyup = function (e) {
          //if press enter, search word using first enabled engine
          if(e.key == "Enter") {
            document.querySelector('.se:not(.disable)').click();
          }
        };
        $keyword.focus();
      }


      var tpl = new Tpl('tpl-engine');
      var rendered = '';
      var $engineSection = document.querySelector('section.engine');
      Engine.getOpen().map(function (se) {
        var seUrl = new Url(se.url);

        return Icon.get(seUrl.host).then(function (url) {
          var iconUrl = url || seUrl.faviconUrl;
          rendered += tpl.render({
            'se-index': se.$$key,
            'se-name': se.displayName,
            'se-favicon': "url('" + iconUrl + "')",
            'se-current': seUrl.origin === tabUrl.origin ? 'disable' : ''
          });
        });
      }).then(function () {
        $engineSection.innerHTML = rendered;
        setLinks();
      });

      function setLinks() {
        document.querySelectorAll('section .se').forEach(function ($link) {
          // set icons
          var index = $link.getAttribute('data-se');

          Engine.get(index).then(function (engine) {
            $link.style.backgroundImage = $link.getAttribute('data-favicon');

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
