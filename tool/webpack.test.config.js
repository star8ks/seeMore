"use strict";
const path = require('path');
// const getConfig = require('./webpack.base.config');
//
// let distDirectory = 'dist-test';
// let config = getConfig(distDirectory);
// config.entry = {}; // 清空 entry
// config.plugins = [];
//
// const babelLoaderConfig = config.module.loaders.shift();
// babelLoaderConfig.exclude.push(path.resolve('src/'));
//
// config.module.preLoaders = [{
//   test: /\.spec\.js$/,
//   exclude: /node_modules/,
//   loader: 'babel-loader?cacheDirectory'// will use .babelrc config by default
// }];

module.exports = {
  resolve: {
    root: path.resolve('./src'),
    alias: {
      localforage: path.resolve('./node_modules/localforage/dist/localforage.nopromises.min.js'),
      bluebird: path.resolve('./node_modules/bluebird/js/browser/bluebird.min.js'),
      mustache: path.resolve('./node_modules/mustache/mustache.min.js'),
      lodash: path.resolve('./node_modules/lodash/lodash.min.js')
    }
  },
  // devtool: 'inline-source-map',
  module: {
    noParse: [
      /node_modules[\/\\]localforage[\/\\]dist[\/\\]localforage\.(nopromises\.)?(min\.)?js$/,
      /node_modules[\/\\]bluebird[\/\\]js[\/\\]browser[\/\\]bluebird.(min\.)?js$/,
      /node_modules[\/\\]mustache[\/\\]mustache.(min\.)?js$/,
      /node_modules[\/\\]lodash[\/\\]lodash.(min\.)?js$/
    ],
    loaders: [{
      // exclude: [/node_modules/, /localforage\/dist/],
      test: /\.js?$/,
      exclude: [/node_modules/],
      loader: 'babel-loader?cacheDirectory'
    }, {
      test: /\.(jpg|png)$/i, loader: 'url-loader?limit=10000&name=img/[name].[ext]'
    }],
    // postLoaders: [{
    //   test: /\.js$/,
    //   include: path.resolve('src/'),
    //   exclude: /(test|node_modules|tool)/,
    //   loader: 'istanbul-instrumenter'
    // }]
  }
};