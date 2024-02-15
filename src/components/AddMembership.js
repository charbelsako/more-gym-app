import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const AddMembership = () => {
  const axios = useAxiosPrivate();
  const [packageTypes, setPackageTypes] = useState([]);
  const [sessionTypes, setSessionTypes] = useState([]);
  const [selectedPackageSubType, setSelectedPackageSubType] = useState('');
  const [selectedSessionType, setSelectedSessionType] = useState('');
  const [selectedPackageType, setSelectedPackageType] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [memberships, setMemberships] = useState([]);

  const handleSessionTypeChange = e => {
    setSelectedSessionType(e.target.value);
  };

  const handlePackageSubTypeChange = e => {
    setSelectedPackageSubType(e.target.value);
  };

  const handlePackageTypeChange = e => {
    setSelectedPackageType(e.target.value);
  };

  const handlePriceChange = e => {
    setPrice(e.target.value);
  };

  const handleCreateMembership = async e => {
    e.preventDefault();

    try {
      // Validate inputs
      if (!selectedSessionType || !selectedPackageType || !price.trim()) {
        setError('All fields are required.');
        return;
      }

      // Make API request to create membership
      const response = await axios.post('/api/v1/admin/create-membership', {
        subType: selectedPackageSubType,
        type: selectedPackageType,
        sessionType: selectedSessionType,
        price: parseFloat(price.trim()), // Assuming price is a numeric value
      });

      // Handle successful response
      console.log('Membership created:', response.data);
      setError('');
      setSuccess('Membership created');
    } catch (err) {
      console.error('Error creating membership:', err);
      setError('Something went wrong while creating membership.');
      setSuccess('');
    }
  };

  useEffect(() => {
    const getPackageTypes = async () => {
      const response = await axios.get('/api/v1/admin/get-package-types');
      setPackageTypes(response.data);
    };
    getPackageTypes();
  }, [axios]);

  useEffect(() => {
    const getSessionTypes = async () => {
      const response = await axios.get('/api/v1/admin/get-package-subtypes');
      setSessionTypes(response.data);
    };
    getSessionTypes();
  }, [axios]);

  useEffect(() => {
    const getMemberships = async () => {
      const response = await axios.get('/api/v1/admin/get-memberships');
      setMemberships(response.data);
    };
    getMemberships();
  }, [axios]);

  return (
    <div className='container mt-5'>
      <h2 className='mb-4'>Create Membership</h2>
      {error && <p className='text-danger'>{error}</p>}
      {success && <p className='text-success'>{success}</p>}
      <form onSubmit={handleCreateMembership}>
        <div className='mb-3'>
          <label htmlFor='sessionType' className='form-label'>
            Session Type:
          </label>{' '}
          <select
            id='sessionType'
            className='form-select'
            value={selectedSessionType}
            onChange={handleSessionTypeChange}
            required
          >
            <option value='' disabled>
              Select Session Type
            </option>
            <option value='PT'>PT</option>
            <option value='Pilates'>Pilates</option>
            <option value='Physio'>Physio</option>
            <option value='Boxing'>Boxing</option>
          </select>
        </div>
        <div className='mb-3'>
          <label htmlFor='sessionType' className='form-label'>
            Session Number:
          </label>{' '}
          <select
            id='sessionType'
            className='form-select'
            value={selectedPackageSubType}
            onChange={handlePackageSubTypeChange}
            required
          >
            <option value='' disabled>
              Select Session Number
            </option>
            {sessionTypes.map(sessionType => (
              <option key={sessionType._id} value={sessionType._id}>
                {sessionType.numberOfSessions}
              </option>
            ))}
          </select>
        </div>
        <div className='mb-3'>
          <label htmlFor='packageType' className='form-label'>
            Package Type:
          </label>{' '}
          <select
            id='packageType'
            className='form-select'
            value={selectedPackageType}
            onChange={handlePackageTypeChange}
            required
          >
            <option value='' disabled>
              Select Package Type
            </option>
            {packageTypes.map(packageType => (
              <option key={packageType._id} value={packageType._id}>
                {packageType.type}
              </option>
            ))}
          </select>
        </div>
        <div className='mb-3 col-6 mx-auto'>
          <label htmlFor='price' className='form-label'>
            Price:
          </label>
          <input
            type='text'
            id='price'
            className='form-control'
            value={price}
            onChange={handlePriceChange}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Create Membership
        </button>
      </form>

      <div className='mt-5'>
        <h2>Memberships available</h2>
        {memberships.map(membership => (
          <div className='card m-4'>
            {/* <div className='card-body'>{membership.type}</div> */}
            <div className='card-body'>
              <p>Package type: {membership.type.type} </p>
              <p>Number of Sessions: {membership.subType.numberOfSessions}</p>
              <p>Session Type: {membership.sessionType}</p>
              <p>Price {membership.price}$</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddMembership;
