/**
 * Test entry file for karma
 * @author ray7551@gmail.com
 */
var context = require.context('../test', true, /\.js?$/); // make sure you have your directory and regex test set correctly!
context.keys().forEach(function(path) {
  try {
    context(path);
  } catch(err) {
    console.error('[ERROR] WITH SPEC FILE: ', path);
    console.error(err);
  }
});