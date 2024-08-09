// src/pages/LocationPage.js
import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';

const LocationPage = () => {
  const navigate = useNavigate();
  const { location, setLocation } = useAuth();
  const axios = useAxiosPrivate();
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(location);

  const handleLocationChange = e => {
    setSelectedLocation(e.target.value);
  };

  const handleSaveLocation = () => {
    setLocation(selectedLocation);
    navigate('/home', { replace: true });
  };

  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = await axios.get('/api/v1/static-data/locations');
        setLocations(response.data.locations);
      } catch (err) {
        console.log(err);
      }
    };
    getLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container mt-5'>
      <h1 className='mb-4'>Select Location</h1>
      <div className='mb-3'>
        <label htmlFor='location' className='form-label'>
          Choose a location:
        </label>
        <select
          id='location'
          name='location'
          value={selectedLocation}
          onChange={handleLocationChange}
          className='form-select'
        >
          <option value=''>Select Location</option>
          {locations.map(loc => (
            <option value={loc}>{loc}</option>
          ))}
        </select>
      </div>
      <button
        onClick={handleSaveLocation}
        className='btn btn-primary'
        disabled={!selectedLocation}
      >
        Save Location
      </button>

      <div className='mt-3'>
        <p>Selected Location: {location}</p>
      </div>
    </div>
  );
};

export default LocationPage;
