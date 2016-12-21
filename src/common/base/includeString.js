/**
 * Created by ray7551@gmail.com on 12.06 006.
 */
/**
 * case insensitive version of String.prototype.includes
 * @param {String} search
 * @param {Number} [start=0]
 * @param {Boolean} [caseSensitive=false]
 * */
String.prototype.includeString = function (search, start, caseSensitive, eachOther) {
  'use strict';
  caseSensitive = caseSensitive === void 0 ? false : !!caseSensitive;
  eachOther = eachOther === void 0 ? false : !!eachOther;
  if (caseSensitive) {
    return this.includes(search, start);
  }
  if (typeof start !== 'number') {
    start = 0;
  }
  if (start + search.length > this.length) return false;

  var include = this.toLowerCase().indexOf(search.toLowerCase(), start) !== -1;
  return !eachOther ? include : (include || search.toLowerCase().indexOf(this.toLowerCase()) !== -1);
};

export default String.prototype.includeString;