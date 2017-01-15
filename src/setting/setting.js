import {clog, $, $all} from '../common/base.js';
import Setting from '../common/db/Setting';
import Render from '../common/Render';
import Mason from '../common/Mason';

var option = (function (){
  // Restores select box state to saved value from db.
  function restore() {
    Setting.get('cfg_remove_redirect').then(function (val) {
      $('#cfg_remove_redirect').checked = val;
    });
  }

  function render() {
    var engineListTpl = $('#tpl-engines').innerHTML.trim();

    var previewRender = Render.openEngines(engineListTpl).then(function (rendered) {
      $('.preview').innerHTML = rendered;
    });
    var defaultRender = Render.defaultEngines(engineListTpl).then(function (rendered) {
      $('.engines').innerHTML = rendered;
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

window.addEventListener('DOMContentLoaded', function () {
  $('.about').innerHTML += '&nbsp;v' + chrome.runtime.getManifest().version;

  option.restore();
  option.render().then(function () {
    // set icons
    $all('.icon-link').forEach(function ($link) {
      $link.style.backgroundImage = 'url(\'' + $link.getAttribute('data-favicon') + '\')';
    });
    new Mason($('.preview'), {
      itemSelector: 'ul',
      columnNum: 6
    });
    new Mason($('.engines'), {
      itemSelector: 'ul',
      columnNum: 6
    });
  }).catch(function (err) {
    clog.err('render failed ' + err);
  });

  $('#cfg_remove_redirect').addEventListener('click', function (evt) {
    Setting.set('cfg_remove_redirect', evt.target.checked);
  });

});