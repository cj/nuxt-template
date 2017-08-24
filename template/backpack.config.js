const { resolve } = require('path')

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = './server/index.js'
    config.output.path = resolve(__dirname, '.nuxt/server')
    return config
  },
}
