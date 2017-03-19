var gulp = require('gulp');
var paths_client = require('../paths_client');
var paths_server = require('../paths_server');
var del = require('del');
var vinylPaths = require('vinyl-paths');

// deletes all files in the output path
gulp.task('clean', ['unbundle'], function() {
  return gulp.src([paths_client.output, paths_client.sourceCopyClean])
    .pipe(vinylPaths(del));
});

gulp.task('clean-server', ['unbundle'], function() {
  return gulp.src([paths_server.output])
    .pipe(vinylPaths(del));
});

gulp.task('clean-all', ['clean', 'clean-server'], function() {
  return;
});