const router = require('express').Router()

const { loginUser, signUpUser } = require('../controllers/authController')

router.post('/login', loginUser)
router.post('/signup', signUpUser)

module.exports = router
