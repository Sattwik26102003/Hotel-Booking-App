import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/home/Home.jsx'
import Login from './components/login/Login.jsx'
import Register from './components/register/Register.jsx'
import Account from './components/account/Account.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import Booking from './components/account/acc_elements/Booking.jsx'
import Accomodation from './components/account/acc_elements/Accomodation.jsx'
import Profile from './components/account/acc_elements/Profile.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: "",
        element: <Home/>
      },
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "register",
        element: <Register/>
      },
      {
        path: 'account', 
        element: <Account/>,
        children: [
          {
            path: '',  // default route
            element: <Profile/>
          },
          {
            path: 'profile',
            element: <Profile/>
          },
          {
            path: 'booking',
            element: <Booking/>
          },
          {
            path: 'accomodation',
            element: <Accomodation/>
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)