;(function() {
  var Tpl = function (tplId) {
    this.openTag = '${';
    this.closeTag = '}';
    this.tplSelectorPre = "script[type='text/template']";
    this.$tpl = document.querySelector(this.tplSelectorPre + "#" + tplId);
    if (!this.$tpl) {
      throw new Error('No template found!');
    }
    this.tpl = this.$tpl.text;
    this.output = this.tpl;
  };
  Tpl.prototype = {
    replace: function (search, replaceText) {
      this.output = this.output.replace(this.openTag + search + this.closeTag, replaceText);
      return this;
    },
    render: function (data) {
      this.output = this.tpl;
      Object.keys(data).forEach(function (key) {
        this.replace(key, data[key]);
      }.bind(this));
      return this.output;
    }
  };

  window.addEventListener("DOMContentLoaded", function onLoad() {
    var tpl = new Tpl('tpl-engine');
    var rendered = '';
    var $engineSection = document.querySelector('section.engine');
    var $keyword = Util.$('keyword');

    Store.getOpenedEngine().sort(function (a, b) {
      return b === 'google' ? 1 : a > b;
    }).forEach(function (index) {
      if (!CONFIG.engines[index]) {
        return;
      }

      var iconKey = 'icon_' + Url.getHost(CONFIG.engines[index].url);
      var iconUrl = localStorage[iconKey] ? localStorage[iconKey] : Url.getFaviconUrl(CONFIG.engines[index].url);
      rendered += tpl.render({
        'se-index': index,
        'se-name': CONFIG.engines[index].displayName,
        'se-favicon': "url('" + iconUrl + "')"
      });
    });
    $engineSection.innerHTML = rendered;

    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
      var tab = tabs[0];

      // Set search box value to search word or selected text
      localStorage['word'] = decodeURIComponent(Url.getSearchWord(tab.url));
      if (localStorage['word'] !== '') {
        $keyword.value = localStorage['word'];
      } else {
        chrome.tabs.executeScript({
          code: "window.getSelection().toString();"
        }, function(selection) {
          if(selection[0]) {
            $keyword.value = localStorage['word'] = selection[0];
          }
        });
      }

      $keyword.onkeyup = function(e){
        localStorage['word'] = this.value;
        //@TODO if press enter, search word using first engine
        // if(e.key == "Enter") {

        // }
      };
      $keyword.focus();

      // @TODO insert custom engine link
      // @TODO disable current engine link
      document.querySelectorAll('section .se').forEach(function ($link) {
        // set icons
        var index = $link.getAttribute('data-se');
        var engine = CONFIG.engines[index];
        $link.style.backgroundImage = $link.getAttribute('data-favicon');

        $link.onclick = function (evt) {
          var searchParam = encodeURIComponent(localStorage['word']);
          var url = engine.url.replace('%s', searchParam);
          var button = Util.getMouseButton(evt);
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

  });
})();
