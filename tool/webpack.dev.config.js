"use strict";
const path = require('path');
const getConfig = require('./webpack.base.config');

let distDirectory = 'dist-dev';
let config = getConfig(distDirectory);
config.watch = true;
config.resolve.alias = {
  localforage: path.resolve('./node_modules/localforage/dist/localforage.nopromises.min.js'),
  bluebird: path.resolve('./node_modules/bluebird/js/browser/bluebird.min.js'),
  mustache: path.resolve('./node_modules/mustache/mustache.min.js')
};

module.exports = config;