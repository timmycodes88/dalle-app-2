const router = require('express').Router()
const requireAuth = require('../middleware/requireAuth')
const {
  loginUser,
  signUpUser,
  getMe,
} = require('../controllers/authController')

router.post('/login', loginUser)
router.post('/signup', signUpUser)
router.use(requireAuth)
router.get('/', getMe)

module.exports = router
