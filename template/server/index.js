'use strict'

const fetch = require('node-fetch')
const moduleAlias = require('module-alias')
const { resolve } = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

moduleAlias.addAlias('#', resolve('./'))
moduleAlias.addAlias('~', resolve('./server'))

require('#/lib/dotenv')

global.fetch = fetch

const router = require('~/lib/router')()

// parse application/json
router.use(bodyParser.json())
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
// session middleware
router.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000, secure: true },
}))
// routes
router.use(require('./routes'))

// Export the server middleware
module.exports = router
