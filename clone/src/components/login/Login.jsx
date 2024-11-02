import React from 'react'
import { Link } from 'react-router-dom'
function Login() {
  return (
    <>
    <div className='grow flex items-center justify-around'>
      <div className='mb-64 mx'>
      <h1 className='text-4xl text-center'>Login</h1>
    <form className='max-w-md mx-auto'>
      <input type="email" placeholder='email address' />
      <input type="password" placeholder='password' />
      <button className='login'>submit</button>
      <div className='text-center py-2 text-gray-500'>
        don't have an account yet? <Link to={'/register'} className='underline text-black'> Register now</Link>
      </div>
    </form>
      </div>
    
    </div>
    
    
    </>
  )
}

export default Login