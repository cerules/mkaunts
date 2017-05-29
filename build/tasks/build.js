var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var sourcemaps = require('gulp-sourcemaps');
var paths_client = require('../paths_client');
var paths_server = require('../paths_server');
var paths_shared = require('../paths_shared');
var typescript = require('gulp-typescript');
var htmlmin = require('gulp-htmlmin');

// transpiles changed es6 files to SystemJS format
var typescriptCompiler_client = typescriptCompiler_client || null;
var typescriptCompiler_server = typescriptCompiler_server || null;
gulp.task('build-system', function() {
  if(!typescriptCompiler_client) {
    typescriptCompiler_client = typescript.createProject('tsconfig.json', {
      "typescript": require('typescript'),
      "rootDir": paths_shared.rootDir,
      "outDir": paths_client.output
    });
  }

  return gulp.src(paths_client.dtsSrc.concat(paths_client.source))
    .pipe(changed(paths_client.output, {extension: '.ts'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(typescriptCompiler_client())
    .pipe(sourcemaps.write('.', {includeContent: true}))
    .pipe(gulp.dest(paths_client.output));
});

// copies changed html files to the output directory
gulp.task('build-html', function() {
  return gulp.src(paths_client.html)
    .pipe(changed(paths_client.output, {extension: '.html'}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths_client.output));
});

// copies changed css files to the output directory
gulp.task('build-css', function() {
  return gulp.src(paths_client.css)
    .pipe(changed(paths_client.output, {extension: '.css'}))
    .pipe(gulp.dest(paths_client.output))
});

// this task calls the clean-client task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build-client', function(callback) {
  return runSequence(
    'clean-client',
    ['build-system', 'build-html', 'build-css'],
    callback
  );
});

gulp.task('build-server', function() {
  if(!typescriptCompiler_server) {
    typescriptCompiler_server = typescript.createProject('tsconfig.json', {
      "typescript": require('typescript'),
      "rootDir": paths_shared.rootDir,
      "outDir": paths_server.outDir,
      "target": "es6"
    });
  }

  return gulp.src(paths_server.dtsSrc.concat(paths_server.source))
    .pipe(changed(paths_server.output, {extension: '.ts'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(typescriptCompiler_server())
    .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: ""}))
    .pipe(gulp.dest(paths_server.output));
});

gulp.task('build', ['build-server', 'build-client']);
