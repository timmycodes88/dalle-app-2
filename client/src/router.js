import { createBrowserRouter, redirect } from 'react-router-dom'
import App from './App'
import AuthForm from './pages/AuthForm'
import { authAction } from './routes/authRoute'
import Home from './pages/Home'
import { appLoader } from './routes/appRoute'
import Create from './pages/Create'
import { createAction } from './routes/createRoute'

const router = createBrowserRouter([
  {
    path: '/',
    loader: appLoader,
    shouldRevalidate: ({ currentUrl, nextUrl }) =>
      currentUrl.pathname !== nextUrl.pathname,
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'get-in', action: authAction, element: <AuthForm /> },
      { path: 'create', action: createAction, element: <Create /> },
      {
        path: 'logout',

        loader: async () => {
          localStorage.removeItem('token')
          return redirect('/get-in')
        },
      },
    ],
  },
  { path: '*', loader: () => redirect('/') },
])

export default router
