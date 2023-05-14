import { toast } from 'react-toastify'
import PostAPI from '../api/PostAPI'
import { useLoaderData } from 'react-router-dom'

/**
 * @typedef {Object} Post
 * @property {string} _id
 * @property {string} image
 * @property {string} prompt
 * @property {string} username
 * @property {string} [comment]
 */

export const homeLoader = async () => {
  const { posts, error } = await PostAPI.get()

  if (error) {
    toast.error(error)
    return []
  }

  return posts
}

/**@return {Post[]} */
export const useHomeData = () => useLoaderData()
