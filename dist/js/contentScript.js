'use strict';

/**
 * Created by ray7551@gmail.com on 12.06 006.
 */
function run() {
  var $meta = document.querySelector('meta[name=keywords]');
  var metaKeywords = $meta ? $meta.content.split(',') : [];
  var $title = document.querySelector('title');
  var titleKeywords = $title ? $title.innerText : '';
  var $h1 = Array.prototype.slice.apply(document.querySelectorAll('h1'));
  var h1Keywords = $h1.filter(function (h1) {
    return h1.innerText;
  });
  var $h2 = Array.prototype.slice.apply(document.querySelectorAll('h2'));
  var h2Keywords = $h2.map(function (h2) {
    return h2.innerText || '';
  }).filter(function (h2) {
    return h2;
  });

  return {
    meta: metaKeywords,
    title: titleKeywords,
    h1: h1Keywords[0] ? h1Keywords[0].innerText : '',
    h2: h2Keywords
  };
}
run();
// chrome.storage.local.set({
//   'tmp-keywords': keywords
// });