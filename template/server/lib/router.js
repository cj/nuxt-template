const express = require('express')
const { Router } = require('express')
const { request, response } = express()

exports.asyncRoute = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

exports = module.exports = function () {
  const router = Router()
  // Transform req & res to have the same API as express
  // So we can use res.status() & res.json()
  router.use((req, res, next) => {
    Object.setPrototypeOf(req, request)
    Object.setPrototypeOf(res, response)

    req.res = res
    res.req = req

    next()
  })

  return router
}
