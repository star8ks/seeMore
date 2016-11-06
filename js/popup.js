;(function () {
  window.addEventListener("DOMContentLoaded", function onLoad() {

    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
      var tab = tabs[0];
      var tabUrl = new Url(tab.url);
      var $keyword = util.$('#keyword');

      getSearchString().then(function (searchString) {
        clog('get searchString: ', searchString);
        setKeywordInput(searchString);
      });
      function getSearchString() {
        // get search string from selected text
        var getSelection = new Promise(function (resolve) {
          if(tabUrl.url.match(/^chrome/)){ // not support chrome pages now
            resolve('');
          }
          chrome.tabs.executeScript({
            code: "window.getSelection().toString();"
          }, function (selection) {
            resolve(selection ? selection[0] : '');
          });
        });

        // get search string from url param
        return getSelection.then(function (str) {
          return str ? str : Engine.searchKeys(tabUrl.host).then(function (keys) {
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
            util.$('.se:not(.disable)').click();
          }
        };
        $keyword.focus();
      }

      var engineListTpl = util.$('#tpl-engines').innerHTML.trim();
      var $enginesSection = util.$('.engines');
      Render.openEngines(engineListTpl).then(function (rendered) {
        $enginesSection.innerHTML = rendered;
      }).then(function () {
        setLinks();
      });

      function setLinks() {
        util.$all('.engines .icon-link').forEach(function ($link) {
          // set icons
          var index = $link.getAttribute('data-se');

          Engine.get(index).then(function (engine) {
            $link.style.backgroundImage = "url('" + $link.getAttribute('data-favicon') + "')";

            $link.onmousedown = function (evt) {
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
