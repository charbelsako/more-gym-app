import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const MembershipRenewal = () => {
  const axios = useAxiosPrivate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get('/api/v1/admin/membership-renewal');
      setUsers(response.data);
    };
    getUsers();
  }, [axios]);

  return (
    <div>
      <h1>Membership Renewal List</h1>
      <p className='text-muted '>
        List of users whose membership will end this week
      </p>
      {users.length === 0 && <p>No users' memberships will end this week</p>}
      {users.map(user => (
        <div className='card text-left m-4'>
          <div className='card-body'>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
            <p>Role: {user.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MembershipRenewal;
