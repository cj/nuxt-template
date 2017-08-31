const router = require('~/lib/router')()
const apiRoutes = require('~/api/foo')

router.use('/api', apiRoutes)

module.exports = router
