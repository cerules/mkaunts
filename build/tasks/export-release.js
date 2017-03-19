'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');
const vinylPaths = require('vinyl-paths');
const jspm = require('jspm');
const paths_client = require('../paths_client');
const bundles = require('../bundles.js');
const resources = require('../export.js');

function getBundles() {
  let bl = [];
  for (let b in bundles.bundles) {
    bl.push(b + '*.js');
  }
  return bl;
}

function getExportList() {
  return resources.list.concat(getBundles());
}

function normalizeExportPaths() {
  const pathsToNormalize = resources.normalize;

  let promises =  pathsToNormalize.map(pathSet => {
    const packageName = pathSet[ 0 ];
    const fileList = pathSet[ 1 ];

    return jspm.normalize(packageName).then((normalized) => {
      const packagePath = normalized.substring(normalized.indexOf('jspm_packages'), normalized.lastIndexOf('.js'));
      return fileList.map(file => packagePath + file);
    });
  });

  return Promise.all(promises)
    .then((normalizedPaths) => {
      return normalizedPaths.reduce((prev, curr) => prev.concat(curr), []);
    });
}

// deletes all files in the output path
gulp.task('clean-export', function() {
  return gulp.src([ paths_client.exportOutput ])
    .pipe(vinylPaths(del));
});

gulp.task('export-copy', function() {
  return gulp.src(getExportList(), { base: '.', cwd: paths_client.exportCWD })
    .pipe(gulp.dest(paths_client.exportOutput));
});

gulp.task('export-normalized-resources', function() {
  return normalizeExportPaths().then(normalizedPaths => {
    return gulp.src(normalizedPaths, { base: '.', cwd: paths_client.exportCWD })
      .pipe(gulp.dest(paths_client.exportOutput));
  });
});

// use after prepare-release
gulp.task('export', function(callback) {
  return runSequence(
    'bundle',
    'clean-export',
    'export-normalized-resources',
    'export-copy',
    callback
  );
});
