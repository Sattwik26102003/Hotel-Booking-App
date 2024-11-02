import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/home/Home.jsx'
import Login from './components/login/Login.jsx'
import Register from './components/register/Register.jsx'

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
    <RouterProvider router={router}/>
)
