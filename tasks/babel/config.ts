import browsersList from '@deepsweet/browserslist-preset'

const babelConfig = {
  babelrc: false,
  presets: [
    '@babel/preset-typescript'
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      polyfill: false
    }],
    '@babel/plugin-syntax-dynamic-import'
  ]
}

export const babelConfigNode = {
  ...babelConfig,
  presets: [
    ...babelConfig.presets,
    [
      '@babel/preset-env',
      {
        targets: {
          node: 6
        },
        modules: false
      }
    ]
  ]
}

export const babelConfigBrowser = {
  ...babelConfig,
  presets: [
    ...babelConfig.presets,
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: browsersList
        },
        modules: false
      }
    ]
  ]
}
