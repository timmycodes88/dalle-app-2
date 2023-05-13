import AuthAPI from '../api/AuthAPI'
import { toast } from 'react-toastify'

/**
 * @returns {Promise<boolean>} Authenticated or not
 */
export const appLoader = async () => {
  const { user, error } = await AuthAPI.me()

  if (error) toast.error(error)

  return user || null
}
