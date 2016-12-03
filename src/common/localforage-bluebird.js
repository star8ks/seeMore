require('babel-runtime/core-js/promise').default = require('bluebird');
global.Promise = require('bluebird');

let localforage = require('localforage');

export default localforage;