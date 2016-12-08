/**
 * Created by ray7551@gmail.com on 12.06 006.
 */
function run() {
  var $meta = document.querySelector('meta[name=keywords]');
  var metaKeywords = $meta ? $meta.content.split(',') : [];
  var $title = document.querySelector('title');
  var titleKeywords = $title ? $title.innerText : '';
  var $h1 = document.querySelector('h1');
  var h1Keywords = $h1 ? $h1.innerText : '';
  var $h2 = document.querySelectorAll('h2');
  var h2Keywords = $h2.length ? Array.prototype.slice.apply($h2).map(function (h2) {
    return h2.innerText;
  }) : [];

  return {
    meta: metaKeywords,
    title: titleKeywords,
    h1: h1Keywords,
    h2: h2Keywords
  };
}
run();
// chrome.storage.local.set({
//   'tmp-keywords': keywords
// });