import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isSettingMembership, setMembership] = useState(false);
  const [membershipList, setMembershipList] = useState([]);
  const [selectedMembership, setSelectedMembership] = useState('');
  const [status, setStatus] = useState('');

  const axios = useAxiosPrivate();
  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get('/api/v1/admin/users');
      setUsers(response.data);
    };
    getUsers();
  }, [axios]);

  useEffect(() => {
    const getMemberships = async () => {
      const response = await axios.get('/api/v1/admin/get-memberships');
      setMembershipList(response.data);
    };
    getMemberships();
  }, [axios]);

  const handleSetMembership = userId => {
    setSelectedUserId(userId);
    setMembership(true);
  };

  const handleCancelMembership = () => {
    setSelectedUserId(null);
    setMembership(false);
  };

  const handleSubmitMembership = async () => {
    try {
      await axios.post('/api/v1/admin/add-customer-membership', {
        userId: selectedUserId,
        membership: selectedMembership,
      });
      setStatus('Successfully set user membership');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='container'>
      <p className='text-success'>{status}</p>
      {users.map(user => (
        <div className='card text-left m-4'>
          <div className='card-body'>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
            <p>Role: {user.role}</p>
            <button
              className='btn-primary btn'
              onClick={() => handleSetMembership(user.email)}
            >
              Set membership
            </button>
            {isSettingMembership && selectedUserId === user.email && (
              <>
                <select
                  className='m-3'
                  value={selectedMembership}
                  onChange={e => setSelectedMembership(e.target.value)}
                >
                  <option value='Choose'>Choose membership</option>
                  {membershipList.map(membership => (
                    <option value={membership._id}>
                      {membership.type.type} -{' '}
                      {membership.subType.numberOfSessions} sessions -{' '}
                      {membership.price}$
                    </option>
                  ))}
                </select>
                <button onClick={handleCancelMembership} className='mx-3'>
                  Cancel
                </button>
                <button onClick={handleSubmitMembership}>Submit</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
