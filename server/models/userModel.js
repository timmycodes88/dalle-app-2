const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

userSchema.statics.login = async function (usernameOrEmail, password) {
  //* Checks
  if (!usernameOrEmail || !password) throw new Error('Missing fields')

  //* Find and validate user
  const user = await this.findOne({
    $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
  })

  if (!user) throw new Error('Username or Email does not exist')

  //* Check password
  const match = await bcrypt.compare(password, user.password)
  if (!match) throw new Error('Password is incorrect')
  return user
}

userSchema.statics.signup = async function (username, email, password) {
  //* Checks
  if (!username || !email || !password) throw new Error('Missing fields')
  if (!validator.isEmail(email)) throw new Error('Invalid email')
  if (password.length < 6) throw new Error('Weak password')

  //* Check if username/email exists
  const exists = await this.findOne({ $or: [{ email }, { username }] })
  if (exists) {
    if (exists.email === email) throw new Error('Email already exists')
    throw new Error('Username already exists')
  }

  //* Hash password
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  //* Create user
  const newUser = this.create({ username, email, password: hash })

  return newUser
}

module.exports = model('User', userSchema)
