import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Accomodation() {
  const location = useLocation();
  const activeSubpage = location.pathname.split('/').length === 4 ? location.pathname.split('/')[3] : 'accomodation';

  function choice() {
    if (activeSubpage === 'accomodation') {
      return (
        <div className="container mx-auto px-4"> 
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

      function preInput(header, description) {
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
            {preInput('Title', 'Title for your place, should be short and catchy as per advertisement')}
            <input type="text" name="title" placeholder='title, for example, my lovely apartment' className="w-full border rounded p-2" />
            {preInput('Address', 'Address to this place')}
            <input type="text" name="address" placeholder='address' className="w-full border rounded p-2" />
            {preInput('Photos', 'Add as much photos as possible of the property')}
            <div className='flex gap-2'>
              <input type="text" name="photoUrl" placeholder='Add using a link ....jpg' />
              <button className='bg-gray-200 grow px-4 rounded-full h-11 mt-1'>Add&nbsp;photo</button>
            </div>
            <div className='mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
              <button className='border bg-transparent rounded-2xl p-8 text-gray-600 flex justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                </svg>
                Upload
              </button>
            </div>
            {preInput('Description', 'Description of the place')}
            <textarea name="description" className='resize-none' />
            {preInput('Perks', 'Select all the perks of the place')}
            <div className='grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
              <label className='gap-2 border p-4'>
                <input type="checkbox" name="perks" value="wifi" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                </svg>
                <span>Wifi</span>
              </label>
              <label className='gap-2 border p-4'>
                <input type="checkbox" name="perks" value="freeParking" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
                <span>Free parking spot</span>
              </label>
              <label className='gap-2 border p-4'>
                <input type="checkbox" name="perks" value="swimmingPool" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12h-3m-5 0h-3m10-3h-3m-7 0H6m12 6h-3m-6 0H9" />
                </svg>
                <span>Swimming Pool</span>
              </label>
              <label className='gap-2 border p-4'>
                <input type="checkbox" name="perks" value="gym" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5.5 7.5l7 7 7-7" />
                </svg>
                <span>Gym</span>
              </label>
              <label className='gap-2 border p-4'>
                <input type="checkbox" name="perks" value="heating" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 12.75h18" />
                </svg>
                <span>Heating</span>
              </label>
              <label className='gap-2 border p-4'>
                <input type="checkbox" name="perks" value="airConditioning" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                </svg>
                <span>Air Conditioning</span>
              </label>
            </div>
            {preInput('Extra info', 'House rules, etc.')}
            <textarea />
            {preInput('Check in & Check out', 'Add check in and out; Remember to have some time window between guests')}
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
            <div className='mt-4'>
              <button className="bg-primary text-white py-2 px-6 rounded-full">Submit</button>
            </div>
            
          </form>
        </div>
      );
    }
  }

  return (
    <div className=''>{choice()}</div>
  );
}

export default Accomodation;
