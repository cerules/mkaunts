module.exports = function (config) {
    config.set({
        basePath: './',
        frameworks: ['systemjs', 'mocha', 'chai', 'sinon'],
        systemjs: {
            configFile: 'app/public/config.js',
            config: {
                paths: {
                    "*": "*",
                    "github:*": "app/public/jspm_packages/github/*",
                    "npm:*": "app/public/jspm_packages/npm/*",
                    "typescript": "node_modules/typescript/lib/typescript.js",
                    "systemjs": "node_modules/systemjs/dist/system.js",
                    'es6-module-loader': 'node_modules/es6-module-loader/dist/es6-module-loader.js'
                },
                packages: {
                    'test': {
                        defaultExtension: 'ts'
                    },
                    'src': {
                        defaultExtension: 'ts'
                    }
                },
                transpiler: 'typescript',
                typescriptOptions: {
                    "module": "amd",
                    "emitDecoratorMetadata": true,
                    "experimentalDecorators": true
                }
            },
            serveFiles: [
                'src/aurelia/**/*.*',
                'app/public/jspm_packages/**/*'
            ]
        },
        files: [
            'test/unit/aurelia/setup.ts',
            'test/unit/aurelia/*.ts'
        ],
        exclude: [],
        preprocessors: {},
         reporters: ['spec'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: true
    });
};
