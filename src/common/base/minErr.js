/**
 * Created by ray7551@gmail.com on 12.06 006.
 */
/**
 * @return {moduleErr}
 * */
function minErr(module) {
  /**
   * @function
   * @name moduleErr
   * @inner
   * @param {String} code
   * @param {String} template
   * @return {Error}
   * */
  function moduleErr(code, template) {
    var prefix = '[' + (module ? module + ':' : '') + code + '] ',
      templateArgs = arguments,
      message;

    message = prefix + template.replace(/\{\d+\}/g, function (match) {
      var index = +match.slice(1, -1), arg;

      if (index + 2 < templateArgs.length) {
        arg = templateArgs[index + 2];
        if (typeof arg === 'function') {
          return arg.toString().replace(/ ?\{[\s\S]*$/, '');
        } else if (typeof arg === 'undefined') {
          return 'undefined';
        } else if (typeof arg !== 'string') {
          return JSON.stringify(arg);
        }
        return arg;
      }
      return match;
    });

    return new Error(message);
  }
  return moduleErr;
}

export default minErr;