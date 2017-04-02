var gulp = require('gulp');
var paths_client = require('../paths_client');
var paths_server = require('../paths_server');
var paths_shared = require('../paths_shared');

// outputs changes to files to the console
function reportChange(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

// this task wil watch for changes
// to js, html, and css files and call the
// reportChange method. Also, by depending on the
// serve task, it will instantiate a browserSync session
gulp.task('watch', ['build-client', 'build-server'], function() {
  gulp.watch(paths_client.source, ['build-system']).on('change', reportChange);
  gulp.watch(paths_client.html, ['build-html']).on('change', reportChange);
  gulp.watch(paths_client.css, ['build-css']).on('change', reportChange);
  gulp.watch(paths_client.style).on('change', reportChange);
  gulp.watch(paths_server.source, ['build-server']).on('change', reportChange);
  gulp.watch(paths_shared.source, ['build-server', 'build-system']).on('change', reportChange);
});
