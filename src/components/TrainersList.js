import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const TrainersList = () => {
  const [trainers, setTrainers] = useState([]);

  const axios = useAxiosPrivate();
  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get('/api/v1/admin/users');
      setTrainers(response.data);
    };
    getUsers();
  }, [axios]);

  return (
    <div className='container'>
      {trainers.map(user => (
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

export default TrainersList;
