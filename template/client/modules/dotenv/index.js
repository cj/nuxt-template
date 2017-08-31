const { resolve } = require('path')
const { readFileSync, existsSync } = require('fs')
const Dotenv = require('../../../lib/dotenv')
const { DefinePlugin } = require('webpack')

const rootDir = resolve('./')

const webpackProcessEnvs = selectedEnvs => {
  return new DefinePlugin(
    selectedEnvs.reduce((envs, name) => {
      envs[`process.env.${name}`] = JSON.stringify(process.env[name])
      return envs
    }, {}),
  )
}

const envFile = resolve(`${rootDir}/.env.${process.env.NODE_ENV}`)

Dotenv.config({ path: `${rootDir}/.env`, silent: true })

if (existsSync(envFile)) {
  const envConfig = Dotenv.parse(readFileSync(envFile))

  for (var k in envConfig) {
    process.env[k] = envConfig[k]
  }
}

module.exports = function dotenv (moduleOptions) {
  const defaultOptions = { envs: [] }
  const options = Object.assign(defaultOptions, this.options.dotenv, moduleOptions)

  this.extendBuild(config => {
    config.plugins.push(webpackProcessEnvs(options.envs))
  })
}
