/**
 * @typedef {Object} CreateRequest
 * @property {GENERATE | POST} type
 * @property {string} prompt - The prompt to generate an image from
 * @property {string} [caption] - The caption to post with the image
 * @property {File} [image] - The image to post
 *
 *
 * @typedef {Object} CreateResponse
 * @property {string} [image] - The generated image in base 64
 */

import { useActionData } from 'react-router-dom'
import DalleAPI from '../api/DalleAPI'
import { GENERATE, POST } from '../pages/Create'
import { toast } from 'react-toastify'
import { toastOptions } from '../utils/request'

export const createAction = async ({ request }) => {
  const formData = await request.formData()
  /**@type {CreateRequest} */
  const { type, prompt, comment, image } = Object.fromEntries(
    formData.entries()
  )

  const { image: b64Image, error } = await {
    [GENERATE]: async () => DalleAPI.post(prompt),
    [POST]: () => {},
  }[type]()

  if (error) {
    toast.error(error, toastOptions)
    return null
  }

  return `data:image/jpeg;base64,${b64Image}`
}

export const useCreateData = () => useActionData()
