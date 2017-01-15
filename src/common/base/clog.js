/**
 * Created by ray7551@gmail.com on 12.06 006.
 */
import CONFIG from '../config';
var clog = function () {
  if (CONFIG.devMode) {
    /* eslint-disable no-console */
    console.log.apply(this, arguments);
  }
};
clog.info = function () {
  Array.prototype.slice.call(arguments).forEach(function (text) {
    clog('%c' + text, 'color: blue');
  });
};
clog.warn = function () {
  Array.prototype.slice.call(arguments).forEach(function (text) {
    clog('%c' + text, 'color: yellow');
  });
};
clog.err = function () {
  Array.prototype.slice.call(arguments).forEach(function (text) {
    clog('%c' + text, 'color: red');
  });
};

export default clog;