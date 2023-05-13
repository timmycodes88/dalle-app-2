require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

module.exports = async (req, res, next) => {
  //* Verify Authorization Header
  const auth = req.headers.authorization
  if (!auth)
    return res.status(401).json({ error: 'Unauthorized token required.' })

  const token = auth.split(' ')[1]

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    const apple = await User.findOne({ _id: id }).select(['username'])
    req.user = apple
    next()
  } catch (err) {
    return res
      .status(401)
      .json({ error: err.message || 'Unauthorized token required.' })
  }
}
