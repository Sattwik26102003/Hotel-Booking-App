import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
function Accomodation() {
  const location = useLocation();
  const activeSubpage = location.pathname.split('/').length === 4 ? location.pathname.split('/')[3] : 'accomodation';
  const { userid } = useSelector((state) => state.auth);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [photoLink, setPhotoLink] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  async function uploadPhotoByLink(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:4000/upload-photo-url',
        { url: photoLink },
        { withCredentials: true }
      );
      console.log(response.data.filename);
      setAddedPhotos([...addedPhotos, response.data.filename]);
      setPhotoLink('');
    } catch (error) {
      console.error('Error uploading photo:', error.response?.data || error.message);
    }
  }

  async function uploadPhotoFromDevice(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await axios.post(
        'http://localhost:4000/upload-photo-device',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      console.log(response.data.filename);

      setAddedPhotos([...addedPhotos, response.data.filename]);
    } catch (error) {
      console.error('Error uploading photo:', error.response?.data || error.message);
    }
  }

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

      async function savePlace(ev) {
        console.log("hello");
        
        ev.preventDefault();
        const placeData = {
          title, address, addedPhotos,
          description, perks, extraInfo,
          checkIn, checkOut, maxGuests
        };
          // new place
        await axios.post('http://localhost:4000/save-place', placeData ,{withCredentials:true});
      }

      return (
        <div className="container mx-auto px-4">
          <form onSubmit={savePlace}>
            {preInput('Title', 'Title for your place, should be short and catchy as per advertisement')}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Title, for example, my lovely apartment'
              className="w-full border rounded p-2"
            />

            {preInput('Address', 'Address to this place')}
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder='Address'
              className="w-full border rounded p-2"
            />

            {preInput('Photos', 'Add as many photos as possible of the property')}
            <div className='flex gap-2'>
              <input
                type="text"
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
                placeholder='Add using a link ....jpg'
              />
              <button onClick={uploadPhotoByLink} className='bg-gray-200 grow px-4 rounded-full h-11 mt-1'>
                Add Photo
              </button>
            </div>

            <div className='mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1'>
              {addedPhotos.map((photo, index) => (
                <div key={index} className='flex justify-center'>
                  <img src={`http://localhost:4000/uploads/${photo}`} alt="Uploaded" className='h-44 w-44 m-0 flex rounded-md' />
                </div>
              ))}

              <label className='border bg-transparent rounded-2xl p-8 text-gray-600 flex justify-center items-center m-0 h-44 w-44 cursor-pointer'>
                <input type="file" className='hidden' onChange={uploadPhotoFromDevice} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3m6 6H6" />
                </svg>
                <p>Upload</p>
              </label>
            </div>

            {preInput('Description', 'Description of the place')}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='resize-none w-full border rounded p-2'
            />

            {preInput('Perks', 'Select all the perks of the place')}
            <div className='grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
              {['wifi', 'freeParking', 'swimmingPool', 'gym', 'heating', 'airConditioning'].map((perk) => (
                <label key={perk} className='gap-2 border p-4 flex items-center'>
                  <input
                    type="checkbox"
                    value={perk}
                    checked={perks.includes(perk)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPerks([...perks, perk]);
                      } else {
                        setPerks(perks.filter((p) => p !== perk));
                      }
                    }}
                  />
                  <span>{perk}</span>
                </label>
              ))}
            </div>

            {preInput('Extra info', 'House rules, etc.')}
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
              className='resize-none w-full border rounded p-2'
            />

            {preInput('Check in & Check out', 'Add check in and out; Remember to have some time window between guests')}
            <div className='grid sm:grid-cols-3 gap-4'>
              <div>
                <h3>Check in time</h3>
                <input
                  type="text"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  placeholder='14:00'
                  className='w-full border rounded p-2'
                />
              </div>
              <div>
                <h3>Check out time</h3>
                <input
                  type="text"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  placeholder='11:00'
                  className='w-full border rounded p-2'
                />
              </div>
              <div>
                <h3>Max number of guests</h3>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  min="1"
                  className='w-full border rounded p-2'
                />
              </div>
            </div>

            <div className='mt-4'>
              <button
                type="submit"
                className="bg-primary text-white py-2 px-6 rounded-full"
                onClick={() => {
                  console.log({ title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests });
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      );
    }
  }

  return (
    <div>{choice()}</div>
  );
}

export default Accomodation;
