import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
function Register() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  function registerUser(ev) {
    ev.preventDefault();
      axios.get('http://localhost:4000');

  }

  return (
    <>
    
    <div className='grow flex items-center justify-around'>
      <div className='mb-64 mx'>
      <h1 className='text-4xl text-center'>Register</h1>
    
    <form className='max-w-md mx-auto' onSubmit={registerUser}>
      <input 
        type="text" 
        placeholder='name'
        value={name}
        onChange={ev=>setName(ev.target.value)}
        />
      <input 
        type="email" 
        placeholder='email address'
        value={email}
        onChange={ev=>setEmail(ev.target.email)}
       />
      <input 
        type="password" 
        placeholder='password'
        value={password}
        onChange={ev=>setPassword(ev.target.password)}
        />
      <button className='login'>submit</button>
      <div className='text-center py-2 text-gray-500'>
        Already a member? <Link to={'/login'} className='underline text-black'> Login now</Link>
      </div>
    </form>
      </div>
    
    </div>
    
    
    
    </>
  )
}

export default Register