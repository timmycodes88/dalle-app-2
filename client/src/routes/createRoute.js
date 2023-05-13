/**
 * @typedef {Object} CreateRequest
 * @property {GENERATE | POST} type
 * @property {string} prompt - The prompt to generate an image from
 * @property {string} [caption] - The caption to post with the image
 * @property {File} [image] - The image to post
 *
 */

import { GENERATE, POST } from '../pages/Create'

export const createAction = async ({ request }) => {
  const formData = await request.formData()
  /**@type {CreateRequest} */
  const { type, prompt, caption, image } = Object.fromEntries(
    formData.entries()
  )

  const a = await {
    [GENERATE]: () => {},
    [POST]: () => {},
  }[type]()

  await new Promise(resolve => setTimeout(resolve, 1000))

  return 'Yay!'
}
