import React from 'react'
import { Link } from 'react-router-dom'

function Accomodation() {
  return (
    <div>
      <div className='text-center'>
      

        <Link to={'/account/accomodation/new'} className='bg-primary text-white py-2 px-6 rounded-full inline-flex'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
           <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
        Add new place
        </Link>
      </div>
      My places
    </div>
  )
}

export default Accomodation