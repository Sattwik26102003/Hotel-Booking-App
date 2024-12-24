import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { format } from 'date-fns'
function BookingPage() {
    const {id} =useParams()
    const [booking,setBooking]=useState(null)
    const [showPhotos,setShowPhotos]=useState(false)
    useEffect(()=>{
        if(id){
            axios.get('http://localhost:4000/booking',{ withCredentials: true }).then(response =>{
                console.log(response.data[0].booking_id);
                const foundBooking=response.data.find((book)=>book.booking_id==id)
                console.log(foundBooking);
                
                if (foundBooking) {
                    setBooking(foundBooking)
                }
            })
            
        }
    },[id])
    if(!booking){
        return '';
    }

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
              {booking?.photos?.map((photo) => (
                <div className="mt-8">
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
    <>
    <h1 className="text-3xl">{booking.title}</h1>
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
          href={`https://maps.google.com/?q=${booking.address}`}
          target="_blank"
          rel="noreferrer"
        >
          {booking.address}
        </a>
      </div>
      <div className='bg-gray-200 p-4 mb-4 rounded-2xl'>
        <h2 className='text-xl'>Your booking information</h2>
        <div className='flex'>
        <div className="flex gap-1 items-center mr-3">
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
                      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                    />
                  </svg>
                  {booking.days} nights :
                </div>
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
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                          />
                        </svg>
                        {format(new Date(booking.checkin), 'yyyy-MM-dd')} &rarr;
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
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                          />
                        </svg>
                        {format(new Date(booking.checkout), 'yyyy-MM-dd')}
      </div>
        </div>
        
    <div className="grid gap-2 grid-cols-[2fr_1fr]">
        <div>
          {booking.photos?.[0] && (
            <img
              onClick={() => setShowPhotos(true)}
              src={`http://localhost:4000/uploads/${booking.photos[0]}`}
              alt=""
              className="aspect-square object-cover rounded-l-2xl"
            />
          )}
        </div>
        <div className="grid">
          {booking.photos?.[1] && (
            <img
              onClick={() => setShowPhotos(true)}
              src={`http://localhost:4000/uploads/${booking.photos[1]}`}
              alt=""
              className="aspect-square object-cover rounded-tr-2xl"
            />
          )}
          <div className="overflow-hidden relative">
            {booking.photos?.[2] && (
              <>
                <img
                  onClick={() => setShowPhotos(true)}
                  src={`http://localhost:4000/uploads/${booking.photos[2]}`}
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
    </>
    
  )
}

export default BookingPage