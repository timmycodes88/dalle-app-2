/**
 * @returns {Promise<boolean>} Authenticated or not
 */
export const appLoader = async () => {
  const token = localStorage.getItem('token')

  if (!token || token === 'undefined') return false
  return true
}
