module.exports = function(config) {
  config.set({
    basePath: '../../../../../../../../../.rvm/gems/ruby-2.1.3/gems/bootstrap-sass-3.2.0.2/assets/javascripts),
    frameworks: ['jasmine'],
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'lib/angular-facebook.js',
      'lib/angular-facebook-phonegap.js',
      'test/unit/*.spec.js'
    ],
    exclude: [],
    port: 8080,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    reporters: ['progress', 'dots'],
    browsers: ['Chrome'],
    singleRun: false
  });
};
