import { redirect, useActionData } from 'react-router-dom'
import AuthAPI from '../api/AuthAPI'
import { LOGIN, SIGNUP } from '../pages/AuthForm'

/**
 * @typedef {Object} AuthRequestData
 * @property {string} [username] - Required on Signup
 * @property {string} [email]  - Required on Signup
 * @property {string} [usernameOrEmail] - Required on Login
 * @property {string} password
 * @property {LOGIN | SIGNUP} type
 */

export const authAction = async ({ request }) => {
  const formData = await request.formData()
  /**@type {AuthRequestData} AuthRequestData */
  const { username, email, usernameOrEmail, password, type } =
    Object.fromEntries(formData.entries())

  //* Checks
  const formError = {
    [LOGIN]: () => !usernameOrEmail || !password,
    [SIGNUP]: () => !username || !email || !password,
  }[type]()
  if (formError) return 'Please fill in all fields'

  /**@type {import("../api/AuthAPI").AuthResponse} */
  const { token, error } = await {
    [LOGIN]: async () => await AuthAPI.login({ usernameOrEmail, password }),
    [SIGNUP]: async () => await AuthAPI.signup({ username, email, password }),
  }[type]()

  if (error) return error

  localStorage.setItem('token', token)

  return redirect('/')
}

/**@returns {null | string} Form error string on submittion*/
export const useAuthError = () => useActionData()
