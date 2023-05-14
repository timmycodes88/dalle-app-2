const { getPosts, post } = require('../controllers/postController')
const requireAuth = require('../middleware/requireAuth')

const router = require('express').Router()

router.get('/', getPosts)
router.use(requireAuth)
router.post('/', post)

module.exports = router
