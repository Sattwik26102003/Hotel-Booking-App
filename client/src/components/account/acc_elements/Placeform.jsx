import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PlaceForm({ onSave }) {
  const { accomodationId } = useParams();
  const navigate = useNavigate();
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
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (redirect) {
      navigate('/account/accomodation');
    }
  }, [redirect, navigate]);

  useEffect(() => {
    if (accomodationId) {
      async function fetchData() {
        try {
          const response = await axios.get(
            `http://localhost:4000/specific-place?accomodationid=${accomodationId}`,
            { withCredentials: true }
          );
          const data = response.data;
          setTitle(data.title);
          setAddress(data.address);
          setAddedPhotos(data.photos);
          setDescription(data.description);
          setPerks(data.perks);
          setExtraInfo(data.extraInfo);
          setCheckIn(data.checkIn);
          setCheckOut(data.checkOut);
          setMaxGuests(data.maxGuests);
        } catch (error) {
          console.error('Error fetching accomodation details:', error);
        }
      }
      fetchData();
    }
  }, [accomodationId]);

  async function uploadPhotoByLink(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:4000/upload-photo-url',
        { url: photoLink },
        { withCredentials: true }
      );
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
      setAddedPhotos([...addedPhotos, response.data.filename]);
    } catch (error) {
      console.error('Error uploading photo:', error.response?.data || error.message);
    }
  }

  function preInput(header, description) {
    return (
      <>
        <h2 className="text-2xl mt-4">{header}</h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </>
    );
  }

  function handleSave(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };
    if (accomodationId) {
      onEdit(placeData);
    } else {
      onSave(placeData);
    }
  }

  async function onEdit(placeData) {
    await axios.put(
      'http://localhost:4000/update-place',
      { accomodationId, ...placeData },
      { withCredentials: true }
    );
    setRedirect(true);
  }

  async function onSave(placeData) {
    await axios.post('http://localhost:4000/save-place', placeData, { withCredentials: true });
    setRedirect(true);
  }

  return (
    <form onSubmit={handleSave} className="container mx-auto px-4">
      {preInput('Title', 'Title for your place, should be short and catchy as per advertisement')}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title, for example, my lovely apartment"
        className="w-full border rounded p-2"
      />

      {preInput('Address', 'Address to this place')}
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        className="w-full border rounded p-2"
      />

      {preInput('Photos', 'Add as many photos as possible of the property')}
      <div className="flex gap-2">
        <input
          type="text"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
          placeholder="Add using a link ....jpg"
        />
        <button
          onClick={uploadPhotoByLink}
          className="bg-gray-200 grow px-4 rounded-full h-11 mt-1"
        >
          Add Photo
        </button>
      </div>

      <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1">
        {addedPhotos.map((photo, index) => (
          <div
            key={index}
            className="relative group flex justify-center items-center h-44 w-44 m-0 rounded-md overflow-hidden"
          >
            <img
              src={`http://localhost:4000/uploads/${photo}`}
              alt="Uploaded"
              className="h-full w-full object-cover transition-transform group-hover:blur-sm"
            />
            <div className="absolute inset-0 flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity">
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => setAddedPhotos(addedPhotos.filter((p) => p !== photo))}
              >
                Delete
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() =>
                  setAddedPhotos([photo, ...addedPhotos.filter((p) => p !== photo)])
                }
              >
                Make Cover
              </button>
            </div>
          </div>
        ))}
        <label className="border bg-transparent rounded-2xl p-8 text-gray-600 flex justify-center items-center m-0 h-44 w-44 cursor-pointer">
          <input type="file" className="hidden" onChange={uploadPhotoFromDevice} />
          <span>Upload</span>
        </label>
      </div>

      {preInput('Description', 'Description of the place')}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="resize-none w-full border rounded p-2"
      />

      {preInput('Perks', 'Select all the perks of the place')}
      <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {['wifi', 'freeParking', 'swimmingPool', 'gym', 'heating', 'airConditioning'].map((perk) => (
          <label key={perk} className="gap-2 border p-4 flex items-center">
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
        className="resize-none w-full border rounded p-2"
      />

      {preInput('Check in & Check out', 'Add check in and out; Remember to have some time window between guests')}
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <h3>Check in time</h3>
          <input
            type="text"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            placeholder="14:00"
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <h3>Check out time</h3>
          <input
            type="text"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            placeholder="11:00"
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <h3>Max number of guests</h3>
          <input
            type="number"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            min="1"
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div className="mt-4">
        <button type="submit" className="bg-primary text-white py-2 px-6 rounded-full">
          Submit
        </button>
      </div>
    </form>
  );
}

export default PlaceForm;
