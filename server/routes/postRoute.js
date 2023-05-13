const { getPosts, createPost } = require('../controllers/postController')

const router = require('express').Router()

router.get('/', getPosts)
router.post('/', createPost)

module.exports = router
