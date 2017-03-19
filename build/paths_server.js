var appRoot = 'src/node/';
var outputRoot = 'app/node/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.ts',
  output: outputRoot,
  dtsSrc: [
    './typings/**/*.d.ts',
    './custom_typings/**/*.d.ts'
  ]
}
