var appRoot = 'src/aurelia/';
var cwd = 'app/public/';
var outputRoot = cwd + 'dist/';


module.exports = {
  root: appRoot,
  source: appRoot + '**/*.ts',
  html: appRoot + '**/*.html',
  css: appRoot + '**/*.css',
  output: outputRoot,
  cwd: cwd,
  exportCWD: cwd,
  exportOutput: 'export/',
  doc: './doc',
  dtsSrc: [
    './typings/**/*.d.ts',
    './custom_typings/**/*.d.ts'
  ],
  sourceCopy: cwd + 'src/aurelia/',
  sourceCopyClean: cwd + 'src/'
}
