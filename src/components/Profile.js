import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const axios = useAxiosPrivate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/user/user-data');
        setUserData(response.data.userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that useEffect runs only once after the initial render

  return (
    <div>
      {userData ? (
        <div>
          <h2>User Profile</h2>
          <p>Name: {userData.name}</p>
          <p>Role: {userData.role}</p>
          <p>Email: {userData.email}</p>
          {/* Add other user profile data fields as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
