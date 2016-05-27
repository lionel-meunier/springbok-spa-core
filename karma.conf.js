// Karma configuration
// Generated on Sat Feb 13 2016 23:29:09 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'jspm_packages/github/jashkenas/underscore@1.8.3/underscore.js',
      'jspm_packages/github/epeli/underscore.string@3.3.4/dist/underscore.string.js',
      'jspm_packages/github/angular/bower-angular@1.5.0/angular.js',
      'jspm_packages/github/angular/bower-angular-mocks@1.5.0/angular-mocks.js',
      'jspm_packages/github/angular/bower-angular-route@1.5.0/angular-route.js',
      'jspm_packages/github/angular/bower-angular-sanitize@1.5.0/angular-sanitize.js',
      'jspm_packages/github/angular-translate/bower-angular-translate@2.9.2/angular-translate.js',
      'jspm_packages/github/angular-translate/bower-angular-translate-loader-static-files@2.9.2/angular-translate-loader-static-files.js',
      'jspm_packages/github/angular-translate/bower-angular-translate-handler-log@2.9.2/angular-translate-handler-log.js',
      'app/**/*.js',
      'test/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/**/*.js': ['babel'],
      'test/**/*.spec.js': ['babel']
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
