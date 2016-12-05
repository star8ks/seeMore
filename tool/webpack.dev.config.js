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
config.module.loaders = config.module.loaders.concat([{
  test: /\.(jpg|png)$/i, loader: 'url-loader?limit=900&name=img/[name].[ext]'
}]);

module.exports = config;