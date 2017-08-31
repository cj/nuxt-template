const router = require('~/lib/router')()

// Add POST - /api/login
router.get('/foo', (req, res) => {
  res.json({ bar: 'baz' })
})

module.exports = router
