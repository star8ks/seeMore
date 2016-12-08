"use strict";
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HashedModuleIdsPlugin = require('./HashedModuleIdsPlugin');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

function getBaseConfig(distDirectory) {
  return {
    debug: true,
    // watch: true,
    entry: {
      background: './src/background/',
      setting: './src/setting/',
      popup: './src/popup/'
    },
    output: {
      // publicPath : 'chrome-extension://__MSG_@@extension_id__/bundle/' ,
      filename: 'js/[name].js',
      path: path.resolve('./' + distDirectory)
    },
    resolve: {
      alias: {
        localforage: path.resolve('./node_modules/localforage/dist/localforage.nopromises.js'),
        bluebird: path.resolve('./node_modules/bluebird/js/browser/bluebird.js'),
        mustache: path.resolve('./node_modules/mustache/mustache.js'),
        lodash: path.resolve('./node_modules/lodash/lodash.js')
      }
    },
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory'// will use .babelrc config by default
      }, {
        test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader')
      }, {
        test: /\.html$/, loader: 'html-loader?interpolate=require&' + JSON.stringify({
          attrs: ["img:src", "link:href"]
        })
      }]
    },
    postcss: function () {
      return [require('autoprefixer')()]
    },
    plugins: [
      new HashedModuleIdsPlugin(),
      new CleanWebpackPlugin([distDirectory], {
        root: path.resolve(__dirname, '../')
      }),
      /*new CommonsChunkPlugin({
       name: 'vendor',
       minChunks: function (module, count) {
       // any required modules inside node_modules are extracted to vendor
       return (
       module.resource &&
       /\.(js|css)$/.test(module.resource) &&
       module.resource.indexOf(
       path.join(__dirname, '../node_modules')
       ) === 0
       )
       }
       }),*/
      new CommonsChunkPlugin({
        name: 'uiCommon',
        filename: 'js/uiCommon.js',
        chunks: ['popup', 'setting']
      }),
      new CommonsChunkPlugin({
        name: 'common',
        filename: 'js/common.js',
        chunks: ['background', 'uiCommon']
      }),
      // extract webpack runtime and module manifest to its own file in order to
      // prevent vendor hash from being updated whenever app bundle is updated
      new CommonsChunkPlugin({
        name: 'manifest',
        // chunks: ['vendor']
      }),
      new HtmlWebpackPlugin({
        filename: 'popup.html',
        chunks: ['manifest', 'common', 'uiCommon', 'popup'],
        // chunksSortMode: 'dependency',
        template: './src/popup/popup.html'
      }),
      new HtmlWebpackPlugin({
        filename: 'setting.html',
        chunks: ['manifest', 'common', 'uiCommon', 'setting'],
        // chunksSortMode: 'dependency',
        template: './src/setting/setting.html'
      }),
      new CopyWebpackPlugin([{
        from: './*',
        context: 'static'
      }, {
        from: 'img/icon-+(16|19|32|38|48|64|128).png',
        context: 'static'
      }]),

      new ExtractTextPlugin('css/[name].css')
    ]
  };
}

module.exports = getBaseConfig;