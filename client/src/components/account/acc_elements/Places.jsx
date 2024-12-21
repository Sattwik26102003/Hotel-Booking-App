import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

function Places() {
  const [place, setPlace] = useState([]);
  const state = useSelector((state) => state.auth.user.userid);

  useEffect(() => {
    axios
      .get('http://localhost:4000/places', { withCredentials: true })
      .then(({ data }) => {
        setPlace(data);
      });
  }, []);

  console.log(place);
  console.log(state);
  const userid=3
  console.log(place);
  return (
    <div className="mt-4 text-center flex flex-col justify-center items-center gap-5">
      {place.length > 0 &&
        place.map((placeItem) => (
          <Link
            key={uuidv4()} // Generate a unique key for each mapped item
            to={`${placeItem.accomodation_id}`}
            className="flex justify-center gap-4 bg-gray-200 p-4 rounded-2xl w-10/12"
          >
            <div className="w-44 h-40 bg-gray-300 shrink-0 relative rounded-2xl">
  {placeItem.photos?.length > 0 && (
    <img
      src={`http://localhost:4000/uploads/${placeItem.photos[0]}`}
      alt=""
      className="absolute inset-0 h-full w-full object-cover rounded-2xl"
    />
  )}
</div>

<div className="grow-0 shrink">
  <h2 className="text-xl text-left">{placeItem.title}</h2>
  <p
    className="text-sm mt-2 text-left line-clamp-6 overflow-hidden text-ellipsis"
    style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical' }}
  >
    {placeItem.description}
  </p>
</div>
          </Link>
        ))}
    </div>
  );
}

export default Places;
