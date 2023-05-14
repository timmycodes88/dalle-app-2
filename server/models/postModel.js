const { model, Schema } = require('mongoose')

const postSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = model('Post', postSchema)
