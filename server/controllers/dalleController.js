require('dotenv').config()
const cloudinary = require('cloudinary').v2
const { Configuration, OpenAIApi } = require('openai')
const User = require('../models/userModel')
const apiKey = process.env.OPENAI_API_KEY
const openai = new OpenAIApi(new Configuration({ apiKey }))

cloudinary.config({
  cloud_name: 'dtlza8yr8',
  api_key: '399734587551784',
  api_secret: 'wuSkqjYLOD9YIO9jFK9B0vztDhs',
})

module.exports.genImage = async (req, res) => {
  const { prompt } = req.body
  const { username } = req.user

  try {
    if (!prompt) throw new Error('Prompt is required.')

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
    })

    const image = response.data.data[0].url
    if (!image) throw new Error('Failed to generate Timage.')

    const public_id = `${username}-${Date.now()}`
    await cloudinary.uploader.upload(image, {
      public_id,
    })

    const url = cloudinary.url(public_id, {
      width: 1024,
      height: 1024,
      crop: 'fill',
    })

    const post = {
      name: username,
      image: url,
      prompt,
    }

    await User.findOneAndUpdate(
      { username },
      { $push: { images: post } },
      { new: true }
    )

    res.status(200).json({ image: url })
  } catch (err) {
    res.status(400).json({
      error: err.message || 'Failed to generate Timage.',
    })
  }
}
