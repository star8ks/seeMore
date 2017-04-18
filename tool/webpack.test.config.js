"use strict";
const path = require('path');
const webpack = require('webpack');
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
  entry: {
    test: './tool/testEntry.js',
  },
  output: {
    // publicPath : 'chrome-extension://__MSG_@@extension_id__/bundle/' ,
    filename: 'js/[name].js',
    path: path.resolve('./dist-test')
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      'node_modules'
    ],
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
    rules: [{
      test: /\.js$/,
      exclude: [/node_modules/],
      use: [{
        loader: 'babel-loader', // will use .babelrc config by default
        options: {
          cacheDirectory: true
        }
      }]
    }, {
      test: /\.(jpg|png)$/i, use: [{
        loader: 'url-loader',
        options: {
          limit: 900,
          name: 'img/[name].[ext]'
        }
      }]
    }]
    // postLoaders: [{
    //   test: /\.js$/,
    //   include: path.resolve('src/'),
    //   exclude: /(test|node_modules|tool)/,
    //   loader: 'istanbul-instrumenter'
    // }]
  },
  plugins: [new webpack.DefinePlugin({
    '__BUILD__': {
      ENV: JSON.stringify('test')
    }
  })]
};