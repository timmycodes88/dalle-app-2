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

import { redirect, useActionData } from 'react-router-dom'
import { GENERATE, POST } from '../pages/Create'
import { toast } from 'react-toastify'
import PostAPI from '../api/PostAPI'
import DalleAPI from '../api/DalleAPI'

export const createAction = async ({ request }) => {
  const formData = await request.formData()
  /**@type {CreateRequest} */
  const { type, prompt, comment } = Object.fromEntries(formData.entries())

  //* Checks
  if (!prompt) {
    toast.error('Prompt is required lol')
    return null
  }

  const { post, image, error } = await {
    [GENERATE]: async () => DalleAPI.post(prompt),
    [POST]: async () => PostAPI.post(comment),
  }[type]()
  if (post) return redirect('/')

  if (error) {
    toast.error(error)
    return null
  }

  return image
}

export const useCreateData = () => useActionData()
