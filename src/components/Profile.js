import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const axios = useAxiosPrivate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/user/user-data');
        setUserData(response.data.userData);
        setName(response.data.userData.name);
        setEmail(response.data.userData.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [axios]); // The empty dependency array ensures that useEffect runs only once after the initial render

  const updateProfile = async e => {
    try {
      e.preventDefault();
      await axios.put('/api/v1/user/update-user-info', {
        email,
        name,
      });
      setStatus('Updated Successfully');
      setError('');
    } catch (err) {
      console.log(err);
      setError('An error occurred');
      setStatus('');
    }
  };

  return (
    <div>
      {userData ? (
        <div>
          <h2>User Profile</h2>
          {status && <p className='text-success'>{status}</p>}
          {error && <p className='text-danger'>{error}</p>}

          <p>
            Name: <input value={name} onChange={e => setName(e.target.value)} />
          </p>
          <p>
            Email:{' '}
            <input value={email} onChange={e => setEmail(e.target.value)} />
          </p>
          <button onClick={updateProfile} className='btn btn-primary'>
            Update
          </button>
          <p className='m-5 h4'>Role: {userData.role}</p>
          {/* Add other user profile data fields as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
