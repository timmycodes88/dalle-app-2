const Post = require('../models/postModel')
const User = require('../models/userModel')

require('dotenv').config()

module.exports.getPosts = async (_, res) => {
  try {
    const posts = await Post.find().limit(50).sort({ createdAt: -1 })
    res.status(200).json({ posts: posts || [] })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}
module.exports.post = async (req, res) => {
  const { username } = req.user

  try {
    const { comment } = req.body
    const { images } = await User.findOne({ username })
      .select('images')
      .sort({ createdAt: -1 })
      .limit(1)
    const { name, prompt, image } = images[images.length - 1]
    const post = await Post.create({
      name,
      prompt,
      comment,
      image,
    })
    res.status(201).json({ post })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}
