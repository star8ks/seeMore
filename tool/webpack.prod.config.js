'use strict';
const path = require('path');
const webpack = require('webpack');
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

config.module.rules = config.module.rules.concat([{
  test: /\.(jpg|png)$/i, use: [{
    loader: 'url-loader',
    options: {
      limit: 1000,
      name: 'img/[name].[ext]'
    }
  }]
}]);

config.plugins.push(new webpack.DefinePlugin({
  '__BUILD__': {
    // you must JSON.stringify any string here
    ENV: JSON.stringify('prod')
  }
}));

module.exports = config;