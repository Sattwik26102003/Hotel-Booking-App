import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
function Login() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  function loginUser(ev){
    ev.preventDefault();
    const res=axios.post('http://localhost:4000/login',{
      email,
      password
    },{withCredentials:true});
  }
  return (
    <>
    <div className='grow flex items-center justify-around'>
      <div className='mb-64 mx'>
      <h1 className='text-4xl text-center'>Login</h1>
    <form className='max-w-md mx-auto' onSubmit={loginUser}>
      <input 
        type="email" 
        placeholder='email address' 
        value={email}
        onChange={ev=>setEmail(ev.target.value)}
        />
      <input 
        type="password" 
        placeholder='password' 
        value={password}
        onChange={ev=>setPassword(ev.target.value)}
        />
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