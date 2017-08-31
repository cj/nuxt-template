const { resolve } = require('path')
const { readFileSync, existsSync } = require('fs')
const dotenv = require('dotenv')

const rootDir = resolve('./')

const envFile = resolve(`${rootDir}/.env.${process.env.NODE_ENV}`)

dotenv.config({ path: `${rootDir}/.env`, silent: true })

if (existsSync(envFile)) {
  const envConfig = dotenv.parse(readFileSync(envFile))

  for (var k in envConfig) {
    process.env[k] = envConfig[k]
  }
}

module.exports = dotenv
