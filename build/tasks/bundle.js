var gulp = require('gulp');
var bundler = require('aurelia-bundler');
var bundles = require('../bundles.js');
const paths_client = require('../paths_client');

var config = {
  force: true,
  baseURL: paths_client.cwd,
  configPath: paths_client.cwd + 'config.js',
  bundles: bundles.bundles
};

gulp.task('bundle', ['build-client'], function() {
  return bundler.bundle(config);
});

gulp.task('unbundle', function() {
  return bundler.unbundle(config);
});
