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
      rendered += tpl.render({
        'se-index': index,
        'se-name': CONFIG.engines[index].displayName
      });
    });
    $engineSection.innerHTML = rendered;


    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
      var tab = tabs[0];

      localStorage['word'] = Url.getSearchWord(tab.url);
      $keyword.value = localStorage['word'];
      $keyword.onkeyup = function(){
        localStorage['word'] = this.value;
      };

      // @TODO insert custom engine link
      // @TODO disable current engine link
      document.querySelectorAll('section .se').forEach(function ($link) {
        $link.onclick = function (evt) {
          var index = this.getAttribute('data-se');
          var url = CONFIG.engines[index].url.replace('%s', localStorage.word);
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
