;(function () {
var option = (function (){
  // Restores select box state to saved value from db.
  function restore() {
    Setting.get('cfg_remove_redirect').then(function (val) {
      util.$('#cfg_remove_redirect').checked = val;
    });
  }

  function render() {
    var engineListTpl = util.$('#tpl-engines').innerHTML.trim();

    var previewRender = Render.openEngines(engineListTpl).then(function (rendered) {
      util.$('.preview').innerHTML = rendered;
    });
    var defaultRender = Render.defaultEngines(engineListTpl).then(function (rendered) {
      util.$('.engines').innerHTML = rendered;
    });

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
      $link.style.backgroundImage = "url('" + $link.getAttribute('data-favicon') + "')";
    });
  });

  util.$('#cfg_remove_redirect').addEventListener('click', function (evt) {
    Setting.set('cfg_remove_redirect', evt.target.checked);
  });

});

})();