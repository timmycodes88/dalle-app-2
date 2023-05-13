const { genImage } = require('../controllers/dalleController')

const router = require('express').Router()

router.post('/', genImage)

module.exports = router
