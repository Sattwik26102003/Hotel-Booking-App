import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/header/Header.jsx'
import useAuth from './custom_hooks/useAuth.js'
function Layout() {
  useAuth();
  return (
    <div className='p-4 flex flex-col min-h-screen'>
    <Header/>
    <Outlet/>
    </div>
  )
}

export default Layout