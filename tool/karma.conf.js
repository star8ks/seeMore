const path = require('path');
const webpack = require('webpack');
const webpackCfg = require('./webpack.test.config');
// Karma configuration
// Generated on Thu Oct 27 2016 17:01:23 GMT+0800 (中国标准时间)
module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    frameworks: ['mocha'],

    client: {
      mocha: {
        // opts: 'test/mocha.opts',
        // change Karma's debug.html to the mocha web reporter
        reporter: 'html'
      }
    },

    plugins: [
      require("karma-webpack"),
      require('karma-mocha'),
      require('karma-chrome-launcher'),
      require('karma-mocha-reporter'),
      // require('karma-coverage'),
      require('karma-sourcemap-loader')
    ],

    files: [
      // {pattern: 'test/util.spec.js', watched: false},
      // '../test/**/*.js'
      'karma.notify.js',
      'testEntry.js'
    ],

    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // '../test/util.spec.js': ['webpack'],
      // '../test/**/*.js': ['webpack']
      'karma.notify.js': ['webpack'],// 'sourcemap'],
      'testEntry.js': ['webpack',]// 'sourcemap']
    },

    // webpack: webpackCfg,
    webpack: webpackCfg,
    webpackMiddleware: {
      noInfo: true //please don't spam the console when running in karma!
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // reporters: ['mocha', 'coverage'],
    reporters: ['mocha'],
    mochaReporter: {
      output: 'autowatch', // first run will have the full output and the next runs just output the summary and errors in mocha style
      showDiff: true,
      symbols: {
        success: '✔',
        info: 'ℹ',
        warning: '⚠',
        error: '✖'
      }
    },
    // coverageReporter: {
    //   dir: '../coverage',
    //   reporters: [{type: 'text'}] // don't use html and lcov reporters, they are incompatible with `istanbul-instrumenter-loader v1.0.0`
    // },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};
