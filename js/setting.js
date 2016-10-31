;(function () {
var option = (function (){
  // Restores select box state to saved value from localStorage.
  function restore() {
    Setting.get('cfg_remove_redirect').then(function (val) {
      util.$('cfg_remove_redirect').checked = val;
    });
    // $('custom_name').value = localStorage.custom_name ? localStorage.custom_name : '';
    // $('custom_search').value = localStorage.custom_search ? localStorage.custom_search : '';
  }

  function show() {
    // store.get();
    var tpl = new Tpl('tpl-se-link');
    var rendered = '';
    var $engineSection = document.querySelector('.selected');

    return Engine.getOpen().map(function (se) {
      var oUrl = new Url(se.url);
      var iconKey = 'icon_' + oUrl.host;

      return Icon.get(iconKey).then(function (url) {
        var iconUrl = url || oUrl.faviconUrl;
        rendered += tpl.render({
          'se-index': se.$$key,
          'se-name': se.displayName,
          'se-favicon': "url('" + iconUrl + "')"
        });
      });
    }).then(function (promiseArr) {
      return new Promise.all(promiseArr);
    }).then(function () {
      $engineSection.innerHTML = rendered;
    });
  }

  return {
    restore: restore,
    show: show
  };
})();

window.addEventListener("DOMContentLoaded", function () {
  document.querySelector('.about').innerHTML += '&nbsp;v' + chrome.runtime.getManifest().version;

  option.restore();
  option.show().then(function () {
    // set icons
    document.querySelectorAll('.selected .se').forEach(function ($link) {
      $link.style.backgroundImage = $link.getAttribute('data-favicon');
    });
  });

  util.$('cfg_remove_redirect').addEventListener('click', function (evt) {
    Setting.set('cfg_remove_redirect', evt.target.checked);
  });

});

})();