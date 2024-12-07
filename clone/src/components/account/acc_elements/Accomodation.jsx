import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Accomodation() {
  const location = useLocation();
  const activeSubpage = location.pathname.split('/').length === 4 ? location.pathname.split('/')[3] : 'accomodation';

  function choice() {
    if (activeSubpage === 'accomodation') {
      return (
        <div className="container mx-auto px-4"> {/* Centered and constrained width */}
          <div className='text-center'>
            <Link to={'/account/accomodation/new'} className='bg-primary text-white py-2 px-6 rounded-full inline-flex'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add new place
            </Link>
          </div>
          My places
        </div>
      );
    } else {
      function inputHeader(text) {
        return (
          <h2 className="text-2xl mt-4">{text}</h2>
        );
      }
      function inputDescription(text) {
        return (
          <p className="text-gray-500 text-sm">{text}</p>
        );
      }
      function preInput(header,description) {
        return (
          <>
            {inputHeader(header)}
            {inputDescription(description)}
          </>
        );
      }
      return (
        <div className="container mx-auto px-4"> {/* Centered and constrained width */}
        <form action="">
        <h2 className='text-2xl mt-4'>Title</h2>
          <p>Title for your place, should be short and catchy as per advertisement</p>
          <input type="text" placeholder='title, for example, my lovely apartment' className="w-full border rounded p-2" />
          <h2 className='text-2xl mt-4'>Address</h2>
          <p>Address to this place</p>
          <input type="text" placeholder='address' className="w-full border rounded p-2" />
          <h2 className='text-2xl mt-4'>Photos</h2>
          <p className='text-gray-500 text-sm'>Add as much photos as possible of the property</p>
            <div className='flex gap-2'>
              <input type="text" placeholder='Add using a link ....jpg' />
              <button className='bg-gray-200 grow px-4 rounded-full h-11 mt-1'>Add&nbsp;photo</button>
            </div>
            <div className='mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
              <button className='border bg-transparent rounded-2xl p-8 text-gray-600 flex justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
              </svg>
                Upload
              </button>
            </div>
            <h2 className='text-2xl mt-4'>Description</h2>
            <p className='text-gray-500 text-sm'>Description of the place</p>
            <textarea className='resize-none'/>
            <h2 className='text-2xl mt-4'>Perks</h2>
            <p className='text-gray-500 text-sm'>select all the perks of the place</p>
            <div className='grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
              <label className='gap-2 border p-4' >
                <input type="checkbox" />
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
</svg>
<span>Wifi</span>
              </label>
              <label className='gap-2 border p-4' >
                <input type="checkbox" />
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
</svg>
<span>Free parking spot</span>
              </label>
              <label className='gap-2 border p-4' >
                <input type="checkbox" />
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
</svg>
<span>TV</span>
              </label>
              <label className='gap-2 border p-4' >
                <input type="checkbox" />
                
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M180-475q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180-160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm240 0q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180 160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM266-75q-45 0-75.5-34.5T160-191q0-52 35.5-91t70.5-77q29-31 50-67.5t50-68.5q22-26 51-43t63-17q34 0 63 16t51 42q28 32 49.5 69t50.5 69q35 38 70.5 77t35.5 91q0 47-30.5 81.5T694-75q-54 0-107-9t-107-9q-54 0-107 9t-107 9Z"/></svg>
                <span>Pets</span>
              </label>
              <label className='gap-2 border p-4' >
                <input type="checkbox" />
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
</svg>
<span>Private entrance</span>
              </label>
            </div>
            <h2 className='text-2xl mt-4'>Extra info</h2>
            <p className='text-gray-500 text-sm'>house rules, etc</p>
            <textarea />
            <h2 className='text-2xl mt-4'>Check in & Check out</h2>
            <p className='text-gray-500 text-sm'>add check in and out; Remember to have some time window between guests </p>
            <div className='grid sm:grid-cols-3'>
              <div className='mr-2'>
                <h3>Check in time</h3>
                <input type="text" placeholder='14:00' />
              </div>
              <div className='mr-2'>
              <h3>Check out time</h3>
              <input type="text" placeholder='14:00' />
              </div>
              <div>
                <h3>Max number of guests</h3>
                <input type="text" />
              </div>
            </div>
        </form>
          
            
        </div>
      );
    }
  }

  return (
    <>{choice()}</>
  );
}

export default Accomodation;
