import sequence from '@start/plugin-sequence'
import parallel from '@start/plugin-parallel'
import find from '@start/plugin-find'
import remove from '@start/plugin-remove'
import read from '@start/plugin-read'
import rename from '@start/plugin-rename'
import write from '@start/plugin-write'
import overwrite from '@start/plugin-overwrite'
import babel from '@start/plugin-lib-babel'
import typescriptGenerate from '@start/plugin-lib-typescript-generate'
import typescriptCheck from '@start/plugin-lib-typescript-check'
import watch from '@start/plugin-watch'
import eslint from '@start/plugin-lib-eslint'
import {
  istanbulInstrument,
  istanbulReport,
  istanbulThresholds
} from '@start/plugin-lib-istanbul'
import tape from '@start/plugin-lib-tape'
import tapDiff from 'tap-diff'
import codecov from '@start/plugin-lib-codecov'
import npmVersion from '@start/plugin-lib-npm-version'
import npmPublish from '@start/plugin-lib-npm-publish'

export const buildNode = async () => {
  const { babelConfigNode } = await import('./babel/config')

  return sequence(
    find('src/*.ts'),
    read,
    babel(babelConfigNode),
    rename((file) => file.replace(/\.ts$/, '.js')),
    write('build/node/')
  )
}

export const buildBrowser = async () => {
  const { babelConfigBrowser } = await import('./babel/config')

  return sequence(
    find('src/*.ts'),
    read,
    babel(babelConfigBrowser),
    rename((file) => file.replace(/\.ts$/, '.js')),
    write('build/browser/')
  )
}

export const build = parallel(['buildNode', 'buildBrowser'])

export const dts = () =>
  sequence(
    find('src/*.ts'),
    typescriptGenerate('build/')
  )

export const pack = () =>
  sequence(
    find('build/'),
    remove,
    parallel(['build', 'dts'])()
  )

export const dev = () => watch('src/*.ts')(pack())

export const lint = () =>
  sequence(
    find('{src,test,tasks}/*.ts'),
    read,
    eslint(),
    typescriptCheck()
  )

export const fix = () =>
  sequence(
    find('{src,test,tasks}/*.ts'),
    read,
    eslint({ fix: true }),
    overwrite
  )

export const test = () =>
  sequence(
    find(`coverage/`),
    remove,
    find('src/*.ts'),
    istanbulInstrument({ esModules: true, extensions: ['.ts'] }),
    find('test/*.ts'),
    tape(tapDiff),
    istanbulReport(['lcovonly', 'html', 'text-summary']),
    istanbulThresholds({
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    })
  )

export const ci = () =>
  sequence(
    lint(),
    test(),
    find('coverage/lcov.info'),
    read,
    codecov
  )

export const publish = (version, otp) =>
  sequence(
    pack(),
    npmVersion(version),
    npmPublish('./', { otp })
  )
