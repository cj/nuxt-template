const chokidar = require('chokidar')
const { resolve } = require('path')
const touch = require('touch')
const purgeCache = require('./purge-cache')

module.exports = chokidar.watch(['./server/**/*'], { ignoreInitial: true })
  .on('all', path => {
    purgeCache(resolve('./server/index.js'))
    touch(resolve('./nuxt.config.js'))
  })
