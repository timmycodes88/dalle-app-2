export default async function request(url, body) {
  const modifiedOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    method: body ? 'POST' : 'GET',
  }

  if (process.env.REACT_APP_IS_DEBUG)
    console.log('%cRequest', 'color: #00aaff', modifiedOptions)

  const response = await fetch(url, modifiedOptions)
  const data = response.json()

  if (process.env.REACT_APP_IS_DEBUG)
    console.log('%cResponse', 'color: #114488', data)

  return data
}
