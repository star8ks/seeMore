/* eslint-env node*/
global.Promise = require('bluebird');
// no need to replace babel's promise like this:
// require('babel-runtime/core-js/promise').default = global.Promise;
// global.Promise = require('bluebird');

let localforage = require('localforage');

export default localforage;