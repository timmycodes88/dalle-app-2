import AuthAPI from '../api/AuthAPI'
import { toast } from 'react-toastify'
import { useRouteLoaderData } from 'react-router-dom'

/**
 * @returns {Promise<boolean>} Authenticated or not
 */
export const appLoader = async () => {
  if (!localStorage.getItem('token')) return null

  const { user, error } = await AuthAPI.me()

  if (error) toast.error(error)

  return user || null
}

export const useUser = () => useRouteLoaderData('app')
