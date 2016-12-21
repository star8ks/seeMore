/**
 * Created by ray7551@gmail.com on 12.06 006.
 */
function run($meta, $title, $h1, $h2) {
  /**
   * @param {String[]} strArr
   * */
  var trimFilter = function (strArr) {
    return strArr.map(function (str) {
      return str.trim();
    }).filter(function (str) {
      return str;
    });
  };
  var visibleFilter = function (elements) {
    return elements.filter(function ($el) {
      return $el.offsetParent;
    });
  };
  var metaKeywords = $meta ? trimFilter($meta.content.split(',')) : [];
  var titleKeywords = $title ? $title.innerText.trim() : '';
  var h1 = trimFilter(visibleFilter($h1).map(function(h1) {
    return h1.innerText;
  }));
  var h1Str = h1.length ? h1[0] : '';
  var h2Keywords = trimFilter(visibleFilter($h2).map(function (h2) {
    return h2.innerText;
  }));

  return {
    meta: metaKeywords,
    title: titleKeywords,
    h1: h1Str,
    h2: h2Keywords
  };
}
run(
  document.querySelector('meta[name=keywords]'),
  document.querySelector('title'),
  Array.prototype.slice.apply(document.querySelectorAll('h1')),
  Array.prototype.slice.apply(document.querySelectorAll('h2'))
);
// chrome.storage.local.set({
//   'tmp-keywords': keywords
// });