import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Navigate ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { logout } from '../../../authSlice'
function Profile() {
  const {isAuthenticated,user}=useSelector(state=> state.auth)
  if(!isAuthenticated){
    return <Navigate to={'/login'}/>
  }
  const navigate = useNavigate();
  const dispatch=useDispatch();
  async function handleLogout() {
    try {
      await axios.post('http://localhost:4000/logout', {}, {
        withCredentials: true  // Important for cookies
      });
      dispatch(logout());  // Update Redux state
      navigate('/');   // Redirect to home page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
  return (
    <div className='text-center max-w-lg mx-auto mt-20'>
      logged in as {user.name} ({user.email}) <br />
      <button className="primary max-w-sm mt-2" onClick={handleLogout} >logout</button>
    </div>
  )
}

export default Profile