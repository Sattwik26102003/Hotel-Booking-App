import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    console.log('fetching places');
    axios.get('http://localhost:4000/get-all-places', { withCredentials: true })
      .then((response) => {
        setPlaces([...response.data, ...response.data, ...response.data, ...response.data]);
      });
  }, []);

  return (
    <div className="mt-4 grid gap-6 gap-y-8 gap-x-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {places.length > 0 && places.map((place, index) => (
        <div key={index}>
          <div className="bg-gray-500 rounded-2xl overflow-hidden">
            {place.photos?.[0] && (
              <img
                src={`http://localhost:4000/uploads/${place.photos[0]}`}
                alt={place.title}
                className="rounded-2xl object-cover w-full h-64"
              />
            )}
          </div>
          <div className="mt-2  font-medium">{place.title}</div>
          <div className=' truncate text-gray-500'>{place.address}</div>
          <div className=' truncate'>₹{place.price} per night</div>
        </div>
      ))}
    </div>
  );
}

export default Home;
