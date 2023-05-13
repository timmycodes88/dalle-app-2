require('dotenv').config()

const { Configuration, OpenAIApi } = require('openai')
const apiKey = process.env.OPENAI_API_KEY
const openai = new OpenAIApi(new Configuration({ apiKey }))

module.exports.genImage = async (req, res) => {
  const { prompt } = req.body

  try {
    if (!prompt) throw new Error('Prompt is required.')

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    })

    const image = response.data.data[0].b64_json
    if (!image) throw new Error('Failed to generate Timage.')
    res.status(200).json({ image })
  } catch (err) {
    res.status(400).json({
      error: err.message || 'Failed to generate Timage.',
    })
  }
}
