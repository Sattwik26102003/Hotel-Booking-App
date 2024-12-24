import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { differenceInDays } from 'date-fns';
import {useSelector } from 'react-redux';

function Place() {
  const { placeId } = useParams();
  const [place, setPlace] = useState({});
  const [showPhotos, setShowPhotos] = useState(false);
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(1);
  const {isAuthenticated,user}=useSelector(state=> state.auth)

  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);
  const days = differenceInDays(checkoutDate, checkinDate);

  function doBooking(e) {
    e.preventDefault();
  
    // Check if the user is authenticated
    if (!isAuthenticated) {
      alert("You must be logged in to make a booking.");
      return; // Stop the function if the user is not authenticated
    }
  
    // Proceed with the booking if authenticated
    axios
      .post(
        `http://localhost:4000/booking`,
        {
          userid: user.userid,
          placeid: placeId,
          checkin,
          checkout,
          guests,
          name,
          phone,
          days,
        },
        { withCredentials: true }
      )
      .then(() => alert('Booking successful'));
  }
  
  useEffect(() => {
    axios
      .get(`http://localhost:4000/place/${placeId}`, { withCredentials: true })
      .then(({ data }) => setPlace(data));
  }, [placeId]);

  if (showPhotos) {
    return (
      <div className="absolute inset-0 bg-black min-h-max">
        <div className="p-8 grid gap-4">
          <button
            onClick={() => setShowPhotos(false)}
            className="fixed bg-gray-400 rounded-2xl flex gap-1 px-4 py-2 top-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
            Close Photos
          </button>
          {place?.photos?.map((photo, index) => (
            <div key={index} className="mt-8">
              <img
                className="object-cover min-w-full max-h-fit"
                src={`http://localhost:4000/uploads/${photo}`}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-100 mx-8 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <div className="flex mb-4">
        <div className="flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
        </div>
        <a
          className="my-2 block font-semibold underline"
          href={`https://maps.google.com/?q=${place.address}`}
          target="_blank"
          rel="noreferrer"
        >
          {place.address}
        </a>
      </div>
      <div className="grid gap-2 grid-cols-[2fr_1fr]">
        <div>
          {place.photos?.[0] && (
            <img
              onClick={() => setShowPhotos(true)}
              src={`http://localhost:4000/uploads/${place.photos[0]}`}
              alt=""
              className="aspect-square object-cover rounded-l-2xl"
            />
          )}
        </div>
        <div className="grid">
          {place.photos?.[1] && (
            <img
              onClick={() => setShowPhotos(true)}
              src={`http://localhost:4000/uploads/${place.photos[1]}`}
              alt=""
              className="aspect-square object-cover rounded-tr-2xl"
            />
          )}
          <div className="overflow-hidden relative">
            {place.photos?.[2] && (
              <>
                <img
                  onClick={() => setShowPhotos(true)}
                  src={`http://localhost:4000/uploads/${place.photos[2]}`}
                  alt=""
                  className="aspect-square relative top-1 object-cover rounded-br-2xl"
                />
                <div className="absolute bottom-4 right-2 flex">
                  <button
                    style={{ flexShrink: 3 }}
                    onClick={() => setShowPhotos(true)}
                    className="bg-white px-2 py-2 rounded-lg flex gap-1 shrink"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Show more photos
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="my-4">
        <h2 className="font-semibold text-2xl">Description</h2>
        <p className="mt-2">{place.description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          Check-in: {place.checkin}:00 <br />
          Check-out: {place.checkout}:00 <br />
          Max guests: {place.maxguests} <br />
          <p>
            IMPORTANT NOTICE <br />
            {place.extrainfo}
          </p>
        </div>
        <div className="bg-white shadow p-4 rounded-2xl">
          <div className="text-2xl text-center">
            Price: ₹{place.price} / per night
          </div>
          <form onSubmit={doBooking}>
            <div className="border rounded-2xl mt-4 flex flex-col md:flex-row">
              <div className="py-4 border-r-2 px-4">
                <label>Check-in:</label>
                <input
                  type="date"
                  value={checkin}
                  onChange={(e) => setCheckin(e.target.value)}
                />
              </div>
              <div className="py-4 px-4">
                <label>Check-out:</label>
                <input
                  type="date"
                  value={checkout}
                  onChange={(e) => setCheckout(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-4">
              <label>Number of guests:</label>
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full mt-2 p-2 border rounded-lg"
              />
            </div>

            {checkin && checkout && days > 0 && (
              <>
                <div className="mt-4">
                  <label>Name</label>
                  <input
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-2 p-2 border rounded-lg"
                  />
                </div>
                <div className="mt-4">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full mt-2 p-2 border rounded-lg"
                  />
                </div>
              </>
            )}

            <button className="primary mt-4" type="submit">
              Book this place
            </button>
          </form>
        </div>
      </div>
      <div className="bg-white -mx-8 mt-2 px-8 py-8">
        <div>
          <h2 className="font-semibold text-2xl">Extra Info</h2>
        </div>
        <div>{place.extrainfo}</div>
      </div>
    </div>
  );
}

export default Place;
