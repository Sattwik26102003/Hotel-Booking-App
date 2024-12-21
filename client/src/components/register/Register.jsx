import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Register() {
  const navigate = useNavigate();
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false); // Add redirect state
  function registerUser(ev) {
    ev.preventDefault();
      axios.post('http://localhost:4000/register',{
        name,
        email,
        password
      }).then(response=>{
        console.log(response.data);
        navigate('/') // Set redirect to true
      })

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
        Already a member? <Link to={'/login'} className='underline text-black'> Login now</Link>
      </div>
    </form>
      </div>
    
    </div>
    
    
    
    </>
  )
}

export default Register