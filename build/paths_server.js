var appRoot = 'src/node/';
var outputRoot = 'app/node/';
var outDir = "./node";

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.ts',
  output: outputRoot,
  outDir: outDir,
  dtsSrc: [
    './typings/**/*.d.ts',
    './custom_typings/**/*.d.ts'
  ]
}
