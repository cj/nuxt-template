import { resolve } from 'path'
import { readFileSync, existsSync } from 'fs'
import Dotenv from 'dotenv'
import { DefinePlugin } from 'webpack'

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

export function dotenv (moduleOptions) {
  const defaultOptions = { envs: [] }
  const options = Object.assign(defaultOptions, this.options.dotenv, moduleOptions)

  this.extendBuild(config => {
    config.plugins.push(webpackProcessEnvs(options.envs))
  })
}

export default dotenv
