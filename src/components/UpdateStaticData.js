import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const UpdateStaticData = () => {
  const [locations, setLocations] = useState([]);
  const [cancelTime, setCancelTime] = useState('');
  const [classTypes, setClassTypes] = useState([]);
  const [maxAppointments, setMaxAppointments] = useState(0);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const axios = useAxiosPrivate();

  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        const response = await axios.get('/api/v1/admin/static-data');
        const data = response.data;
        console.log(data);
        setLocations(data.locations);
        setCancelTime(data.cancelTime);
        setClassTypes(data.classTypes);
        setMaxAppointments(data.maxAppointments);
      } catch (error) {
        console.error('Error fetching static data:', error);
      }
    };

    fetchStaticData();
  }, [axios]);

  const handleLocationChange = (index, event) => {
    const newLocations = [...locations];
    newLocations[index] = event.target.value;
    setLocations(newLocations);
  };

  const handleClassTypeChange = (index, event) => {
    const newClassTypes = [...classTypes];
    newClassTypes[index] = event.target.value;
    setClassTypes(newClassTypes);
  };

  const handleAddLocation = () => {
    setLocations([...locations, '']);
  };

  const handleAddClassType = () => {
    setClassTypes([...classTypes, '']);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await axios.put('/api/v1/admin/update-static-data', {
        locations,
        cancelTime,
        classTypes,
        maxAppointments,
      });
      setStatus('Static data updated successfully');
      setError('');
    } catch (error) {
      console.error('Error updating static data:', error);
      setError('An error occurred while updating static data');
      setStatus('');
    }
  };

  return (
    <div>
      <h2>Update Static Data</h2>
      {status && <p className='text-success'>{status}</p>}
      {error && <p className='text-danger'>{error}</p>}
      <form onSubmit={handleSubmit} className='w-50 mx-auto'>
        <div>
          <h3>Locations</h3>
          {locations.map((location, index) => (
            <div key={index}>
              <input
                type='text'
                className='form-control mb-3'
                value={location}
                onChange={event => handleLocationChange(index, event)}
              />
            </div>
          ))}
          <button
            type='button'
            className='btn btn-success'
            onClick={handleAddLocation}
          >
            Add Location
          </button>
        </div>
        <div>
          <h3 className='m-2'>Cancel Time (hours)</h3>
          <input
            type='number'
            value={cancelTime}
            className='form-control'
            onChange={event => setCancelTime(event.target.value)}
          />
        </div>
        <div>
          <h3 className='m-2'>Class Types</h3>
          {classTypes.map((classType, index) => (
            <div key={index}>
              <input
                type='text'
                value={classType}
                className='form-control mb-3'
                onChange={event => handleClassTypeChange(index, event)}
              />
            </div>
          ))}
          <div className='mb-3'>
            <h3>Max Appointments</h3>
            <input
              type='number'
              className='form-control'
              value={maxAppointments}
              onChange={event => setMaxAppointments(event.target.value)}
            />
          </div>
          <button
            type='button'
            className='btn btn-success m-2'
            onClick={handleAddClassType}
          >
            Add Class Type
          </button>
        </div>
        <button type='submit' className='btn btn-primary'>
          Update Static Data
        </button>
      </form>
    </div>
  );
};

export default UpdateStaticData;
