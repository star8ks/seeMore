/**
 * Created by ray7551@gmail.com on 12.06 006.
 */
function minErr(module) {
  return function () {
    var code = arguments[0],
      prefix = '[' + (module ? module + ':' : '') + code + '] ',
      template = arguments[1],
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
  };
}

export default minErr;