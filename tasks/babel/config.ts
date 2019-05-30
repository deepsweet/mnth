import browsersList from '@deepsweet/browserslist-preset'

export const babelConfigNode = {
  babelrc: false,
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          node: '8.6.0'
        }
      }
    ]
  ]
}

export const babelConfigBrowser = {
  babelrc: false,
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: browsersList
        },
        modules: false
      }
    ]
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ]
}
