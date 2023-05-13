const { getPosts, createPost } = require('../controllers/postController')
const requireAuth = require('../middleware/requireAuth')

const router = require('express').Router()

router.use(requireAuth)
router.get('/', getPosts)
router.post('/', createPost)

module.exports = router
