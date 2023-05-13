const API_URL = process.env.REACT_APP_API_URL

export default async function request(endpoint, body) {
  const modifiedOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(body),
    method: body ? 'POST' : 'GET',
  }

  if (process.env.REACT_APP_IS_DEBUG)
    console.log('%cRequest', 'color: #114488', modifiedOptions)

  const response = await fetch(API_URL + endpoint, modifiedOptions)
  const data = await response.json()

  if (process.env.REACT_APP_IS_DEBUG)
    console.log('%cResponse', 'color: #00aaff', data)

  return data
}

export const toastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
}

//TODO: JWT Headers
//TODO: Auth JWT and get me in AuthAPI
//TODO: AuthAPI.me() in appLoader
//TODO: User Context
//TODO: add Post Routes
//TODO: SEND POSTS TO DB and Cloundinary
//TODO: DISPLAY POSTS on Home
