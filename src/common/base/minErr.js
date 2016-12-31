/**
 * Created by ray7551@gmail.com on 12.06 006.
 */
/**
 * @return {ModuleErr}
 * */
function minErr(module) {
  ModuleErr.prototype = Object.create(Error.prototype);
  ModuleErr.prototype.constructor = ModuleErr;
  function ModuleErr(template) {
    var prefix = '[' + (module || '') + '] ',
      templateArgs = arguments;

    this.name = module + 'Error';
    this.message = prefix + template.replace(/\{\d+}/g, function (match) {
      var index = +match.slice(1, -1), arg;

      if (index + 1 < templateArgs.length) {
        arg = templateArgs[index + 1];
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
  }

  return ModuleErr;
}

export default minErr;