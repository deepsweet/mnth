const path = require('path')

module.exports = function (config) {
  config.set({
    colors: true,
    files: [
      'test/index.ts'
    ],
    preprocessors: {
      'test/index.ts': 'webpack'
    },
    webpack: {
      mode: 'development',
      node: {
        fs: 'empty'
      },
      resolve: {
        extensions: ['.ts', '.js', '.json']
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: path.resolve('node_modules/'),
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    '@babel/preset-typescript',
                    [
                      '@babel/preset-env',
                      {
                        targets: {
                          browsers: ['>0.5%', 'not op_mini all', 'not dead', 'Firefox ESR']
                        },
                        modules: false
                      }
                    ]
                  ],
                  plugins: [
                    '@babel/plugin-syntax-dynamic-import'
                  ],
                  cacheDirectory: true
                }
              }
            ]
          }
        ]
      }
    },
    webpackMiddleware: {
      noInfo: true,
      quiet: true
    },
    mime: {
      'text/x-typescript': ['ts']
    },
    basePath: './',
    frameworks: ['tap'],
    customLaunchers: {
      Chrome_Travis: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu']
      },
      Firefox_Travis: {
        base: 'Firefox',
        flags: ['-headless']
      }
    },
    browsers: ['Chrome_Travis', 'Firefox_Travis'],
    reporters: ['tap-pretty'],
    tapReporter: {
      prettify: require('tap-diff')
    },
    logLevel: config.LOG_ERROR,
    singleRun: true,
    browserNoActivityTimeout: 60 * 1000, // default 10 * 1000
    browserDisconnectTimeout: 10 * 1000, // default 2 * 1000
    browserDisconnectTolerance: 2, // default 0
    captureTimeout: 2 * 60 * 1000 // default 1 * 60 * 1000
  })
}
