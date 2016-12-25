"use strict";
const path = require('path');
const getConfig = require('./webpack.base.config');

let distDirectory = 'dist';
let config = getConfig(distDirectory);

config.module.noParse.push(/node_modules[\/\\]lodash[\/\\]lodash.(min\.)?js$/);
config.resolve.alias = {
  localforage: path.resolve('./node_modules/localforage/dist/localforage.nopromises.min.js'),
  bluebird: path.resolve('./node_modules/bluebird/js/browser/bluebird.min.js'),
  mustache: path.resolve('./node_modules/mustache/mustache.min.js'),
  lodash: path.resolve('./node_modules/lodash/lodash.min.js')
};
config.module.loaders = config.module.loaders.concat([{
  test: /\.(jpg|png)$/i, loader: 'url-loader?limit=1000&name=img/[name].[ext]'
}]);

module.exports = config;