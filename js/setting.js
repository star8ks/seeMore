var Option = {
  // Restores select box state to saved value from localStorage.
  restore: function () {
    var requiredOptionKeys = Store.getRequiredOptionKeys();
    requiredOptionKeys.forEach(function (key) {
      var $checkbox = Util.$(key);
      if (!$checkbox) {
        localStorage.removeItem(key);
        return;
      }
      $checkbox.checked = localStorage[key];
    });

    Util.$('remove_redirect').checked = localStorage['remove_redirect'];
    // $('custom_name').value = localStorage.custom_name ? localStorage.custom_name : '';
    // $('custom_search').value = localStorage.custom_search ? localStorage.custom_search : '';
  },
  showStatus: function () {
    var status = Util.$("status");
    status.textContent = "选项已保存";
    setTimeout(function () {
      status.textContent = "";
    }, 1000);
  }
};


window.addEventListener("DOMContentLoaded", function () {
  document.querySelector('.about').innerHTML += '&nbsp;v' + chrome.runtime.getManifest().version;
  document.querySelector('form').onsubmit = function (e) {
    e.preventDefault();
    return false;
  };

  Option.restore();
  document.querySelectorAll('#options .required').forEach(function (checkbox) {
    Util.$(checkbox.id).addEventListener('click', function saveOption(evt) {
      localStorage[evt.target.id] = evt.target.checked ? 'checked' : '';
      Option.showStatus();
    });
  });

  Util.$('remove_redirect').addEventListener('click', function (evt) {
    localStorage['remove_redirect'] = evt.target.checked ? 'checked' : '';
    Option.showStatus();
  });

  // var $customName = $('custom_name');
  // var $customSearch = $('custom_search');
  // var saveCustomOptions = function () {
  //   localStorage.custom_name = $customName.value;
  //   localStorage.custom_search = $customSearch.value;
  //   showStatus();
  // };
  // $customName.addEventListener('input', saveCustomOptions); //自定义名称
  // $customSearch.addEventListener('input', saveCustomOptions); //自定义搜索
});
