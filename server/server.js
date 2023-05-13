//* 3rd Party
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//* Imports
const authRoute = require('./routes/authRoute')

//* Express
const app = express()

//* CONSTANTS
const PORT = process.env.PORT || 5000
const URI = process.env.MONGODB_URI

//* Middleware
app.use(cors())
app.use(express.json())

//* Routes
app.use('/api/auth', authRoute)

//* Start Up Server
const startUp = async () => {
  try {
    await mongoose.connect(URI)
    console.log('\nMongoDB connected')
    app.listen(PORT, () => console.log(`Server started on port ${PORT}\n`))
  } catch (e) {
    console.log(e)
  }
}

//* Eskgetit
startUp()
