import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const AddSessionType = () => {
  const axios = useAxiosPrivate();
  const [sessionType, setSessionType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [sessionTypes, setSessionTypes] = useState([]);

  useEffect(() => {
    const getSessionTypes = async () => {
      const response = await axios.get('/api/v1/admin/get-session-types');
      setSessionTypes(response.data);
    };
    getSessionTypes();
  }, [axios]);

  const handleSessionTypeChange = e => {
    setSessionType(e.target.value);
  };

  const handleAddSessionType = async e => {
    e.preventDefault();

    try {
      if (!sessionType.trim()) {
        setError('Session type cannot be empty.');
        return;
      }

      const response = await axios.post('/api/v1/admin/create-session-type', {
        sessionNumber: sessionType.trim(),
      });

      // Handle successful response
      console.log('Session type added:', response.data);
      setSessionType('');
      setError('');
      setSuccess(response.data.message);
    } catch (err) {
      console.error('Error adding session type:', err);
      setError('Something went wrong while adding session type.');
      setSuccess('');
    }
  };

  return (
    <div className='container mt-5'>
      <h2>Add Session Type</h2>
      {error && <p className='text-danger'>{error}</p>}
      {success && <p className='text-success'>{success}</p>}
      <form onSubmit={handleAddSessionType}>
        <div className='mb-3 row col-12 col-md-6 mx-auto'>
          <label htmlFor='sessionType' className='form-label'>
            Session Type:
          </label>
          <input
            type='text'
            id='sessionType'
            className='form-control'
            value={sessionType}
            onChange={handleSessionTypeChange}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Add Session Type
        </button>
      </form>
      <h2 className='mt-4'>Session types available</h2>
      {sessionTypes.length === 0 && <p>No session types yet</p>}
      <div className='row'>
        {sessionTypes.map(sessionType => (
          <div className='col-12'>
            <div className='card m-3 col-6 mx-auto'>
              <div className='card-body'>
                Number of Sessions: {sessionType.numberOfSessions}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddSessionType;
