import AuthAPI from '../api/AuthAPI'

/**
 * @returns {Promise<boolean>} Authenticated or not
 */
export const appLoader = async () => {
  const token = localStorage.getItem('token')

  const user = await AuthAPI.me()

  if (!token || token === 'undefined') return false
  return user
}
