import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/home/Home.jsx'
import Login from './components/login/Login.jsx'
import Register from './components/register/Register.jsx'
import {Provider} from 'react-redux'
import {store} from './app/store.js'
const router=createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children: [
      {
        path:"",
        element:<Home/>
      }
      ,
      {
        path:"login",
        element:<Login/>
      }
      ,
      {
        path:"register",
        element:<Register/>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
)
