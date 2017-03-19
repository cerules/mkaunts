var appRoot = 'src/aurelia/';
var outputRoot = 'app/public/dist/';


module.exports = {
  root: appRoot,
  source: appRoot + '**/*.ts',
  html: appRoot + '**/*.html',
  css: appRoot + '**/*.css',
  output: outputRoot,
  exportCWD: 'app/public/',
  exportOutput: 'export/',
  doc: './doc',
  dtsSrc: [
    './typings/**/*.d.ts',
    './custom_typings/**/*.d.ts'
  ],
  sourceCopy: 'app/public/src/aurelia/',
  sourceCopyClean: 'app/public/src/'
}
