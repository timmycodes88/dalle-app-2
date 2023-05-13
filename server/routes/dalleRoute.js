const { genImage } = require('../controllers/dalleController')
const requireAuth = require('../middleware/requireAuth')

const router = require('express').Router()

router.use(requireAuth)
router.post('/', genImage)

module.exports = router
