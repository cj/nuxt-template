// This is directly from https://github.com/jprichardson/node-fs-extra/blob/master/lib/copy-sync/copy-file-sync.js
// vue-cli doesn't run npm install in the downloaded template folder, so you can't
// use any npm packages https://github.com/vuejs/vue-cli/issues/312
// once this changes, we'll use fs-extra directly
'use strict'

const fs = require('fs')

const BUF_LENGTH = 64 * 1024

const _buff = (function (size) {
  if (typeof Buffer.allocUnsafe === 'function') {
    try {
      return Buffer.allocUnsafe(size)
    } catch (e) {
      return Buffer.alloc(size)
    }
  }
  return Buffer.alloc(size)
})(BUF_LENGTH)

function copyFileSync (srcFile, destFile, options = {}) {
  const overwrite = options.overwrite
  const errorOnExist = options.errorOnExist
  const preserveTimestamps = options.preserveTimestamps

  if (fs.existsSync(destFile)) {
    if (overwrite) {
      fs.unlinkSync(destFile)
    } else if (errorOnExist) {
      throw new Error(`${destFile} already exists`)
    } else return
  }

  const fdr = fs.openSync(srcFile, 'r')
  const stat = fs.fstatSync(fdr)
  const fdw = fs.openSync(destFile, 'w', stat.mode)
  let bytesRead = 1
  let pos = 0

  while (bytesRead > 0) {
    bytesRead = fs.readSync(fdr, _buff, 0, BUF_LENGTH, pos)
    fs.writeSync(fdw, _buff, 0, bytesRead)
    pos += bytesRead
  }

  if (preserveTimestamps) {
    fs.futimesSync(fdw, stat.atime, stat.mtime)
  }

  fs.closeSync(fdr)
  fs.closeSync(fdw)
}

module.exports = copyFileSync