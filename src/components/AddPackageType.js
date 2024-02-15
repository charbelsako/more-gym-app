import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const AddPackageType = () => {
  const axios = useAxiosPrivate();
  const [packageType, setPackageType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [packageTypes, setPackageTypes] = useState([]);
  const [capacity, setCapacity] = useState(0);

  useEffect(() => {
    const getPackageTypes = async () => {
      const response = await axios.get('/api/v1/admin/get-package-types');
      setPackageTypes(response.data);
    };
    getPackageTypes();
  }, [axios]);

  const handlePackageTypeChange = e => {
    setPackageType(e.target.value);
  };

  const handleCapacityChange = e => {
    setCapacity(e.target.value);
  };

  const handleAddPackageType = async e => {
    e.preventDefault();

    try {
      if (!packageType.trim()) {
        setError('Package type cannot be empty.');
        return;
      }

      const response = await axios.post('/api/v1/admin/create-package-type', {
        type: packageType.trim(),
        capacity,
      });

      // Handle successful response
      console.log('Session type added:', response.data);
      setPackageType('');
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
      <form onSubmit={handleAddPackageType}>
        <div className='mb-3 row col-12 col-md-6 mx-auto'>
          <label htmlFor='packageType' className='form-label'>
            Package Type:
          </label>
          <input
            type='text'
            id='packageType'
            className='form-control'
            value={packageType}
            onChange={handlePackageTypeChange}
            required
          />
        </div>
        <div className='mb-3 row col-12 col-md-6 mx-auto'>
          <label htmlFor='packageType' className='form-label'>
            Package Capacity:
          </label>
          <input
            type='number'
            id='packageType'
            className='form-control'
            value={capacity}
            onChange={handleCapacityChange}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Add Package Type
        </button>
      </form>
      <h2 className='mt-4'>Package types available</h2>
      {packageTypes.length === 0 && <p>No package types yet</p>}
      <div className='row'>
        {packageTypes.map(packageType => (
          <div className='col-12'>
            <div className='card m-3 col-6 mx-auto'>
              <div className='card-body'>
                <p>Package name: {packageType.type}</p>
                Capacity: {packageType.capacity}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddPackageType;
