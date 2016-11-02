;(function () {
var option = (function (){
  // Restores select box state to saved value from localStorage.
  function restore() {
    Setting.get('cfg_remove_redirect').then(function (val) {
      util.$('#cfg_remove_redirect').checked = val;
    });
    // $('custom_name').value = localStorage.custom_name ? localStorage.custom_name : '';
    // $('custom_search').value = localStorage.custom_search ? localStorage.custom_search : '';
  }

  function render() {
    // store.get();
    var tpl = new Tpl('tpl-se-link');
    var previewEngineHtml = {};
    var defaultEngineHtml = {};
    var $previewWrapper = util.$('.preview');
    var $enginesWrapper = util.$('.engines');

    var previewRender = EngineType.getAllReal().map(function (typeObj) {
      var typeId = typeObj['$$key'];
      previewEngineHtml[typeId] = '';
      return Engine.getOpen(false, function (engine) {
        return ''+engine.typeId === typeId;// key always saved as string
      }).map(function (se) {
        var oUrl = new Url(se.url);
        return Icon.get(oUrl.host).then(function (url) {
          var iconUrl = url || oUrl.faviconUrl;
          previewEngineHtml[typeId] += tpl.render({
            'se-index': se.$$key,
            'se-name': se.displayName,
            'se-favicon': "url('" + iconUrl + "')"
          });
        });
      });
    }).then(function () {
      $previewWrapper.innerHTML += combineHtml(previewEngineHtml);
    });

    var defaultRender = EngineType.getAllDefault().map(function (typeObj) {
      var typeId = typeObj['$$key'];
      defaultEngineHtml[typeId] = '';
      return Engine.getSortedAll(false, function (engine) {
        // if(''+engine.defaultTypeId === typeId) clog(engine.displayName, typeId, typeObj.name);
        return ''+engine.defaultTypeId === typeId;// key always saved as string
      }).map(function (se) {
        var oUrl = new Url(se.url);
        return Icon.get(oUrl.host).then(function (url) {
          var iconUrl = url || oUrl.faviconUrl;
          defaultEngineHtml[typeId] += tpl.render({
            'se-index': se.$$key,
            'se-name': se.displayName,
            'se-favicon': "url('" + iconUrl + "')"
          });
        });
      });
    }).then(function () {
      $enginesWrapper.innerHTML += combineHtml(defaultEngineHtml);
    });

    function combineHtml(htmlObj) {
      var html = '';
      Object.keys(htmlObj).forEach(function (type) {
        if(htmlObj[type] === '') {
          return;
        }
        html += '<ul>' + htmlObj[type] + '</ul>';
      });
      return html;
    }

    return Promise.all([
      previewRender,
      defaultRender
    ]);
  }

  return {
    restore: restore,
    render: render
  };
})();

window.addEventListener("DOMContentLoaded", function () {
  util.$('.about').innerHTML += '&nbsp;v' + chrome.runtime.getManifest().version;

  option.restore();
  option.render().then(function () {
    // set icons
    util.$all('.icon-link').forEach(function ($link) {
      $link.style.backgroundImage = $link.getAttribute('data-favicon');
    });
  });

  util.$('#cfg_remove_redirect').addEventListener('click', function (evt) {
    Setting.set('cfg_remove_redirect', evt.target.checked);
  });

});

})();