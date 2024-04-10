import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import moment from 'moment';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [membershipHistory, setMembershipHistory] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState([]);
  const [schedule, setSchedule] = useState([]);

  const axios = useAxiosPrivate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/user/user-data');
        setUserData(response.data.userData);
        setName(response.data.userData.name);
        setEmail(response.data.userData.email);
        setSchedule(response.data.userData.schedule);
        setSelectedSchedule(response.data.userData.schedule);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [axios]); // The empty dependency array ensures that useEffect runs only once after the initial render

  useEffect(() => {
    const getHistory = async () => {
      const response = await axios.get('/api/v1/user/history');
      setMembershipHistory(response.data);
    };
    getHistory();
  }, [axios]);

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

  const handleCheckboxChange = (location, day, time) => {
    const updatedSchedule = schedule.map(locationData => {
      if (locationData.location === location) {
        // console.log(locationData, location);
        const updatedAvailability = locationData.availability.map(dayData => {
          // Find the day in the location's availability
          // console.log(dayData.day, day);
          if (dayData.day === day) {
            // console.log('found day');
            // Toggle the availability for the selected time
            const updatedTimes = {
              ...dayData.availableTimes,
              [time]: !dayData.availableTimes[time],
            };
            return { ...dayData, availableTimes: updatedTimes };
          }
          return dayData;
        });
        return { ...locationData, availability: updatedAvailability };
      }
      return locationData;
    });
    console.log(updatedSchedule);
    setSchedule(updatedSchedule);
  };

  const addAvailability = async () => {
    try {
      await axios.post('/api/v1/trainer/add-time', {
        schedule,
      });
      setStatus('Availability added successfully');
      setError('');
    } catch (err) {
      console.error(err);
      setError('An error occurred while adding availability');
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
          {userData.membership ? (
            <>
              <p>
                Membership type: {userData.membership.type.type} -{' '}
                {userData.membership.subType.numberOfSessions} Sessions
              </p>
              <p>
                Membership end date:{' '}
                {moment(userData.membershipEndDate).format('YYYY MMMM DD')}
              </p>
              <p>Total Sessions taken: {userData.totalSessions || 0}</p>
              <p>Remaining Sessions: {userData.numberOfSessions} </p>
              <p>
                <h3>Membership History:</h3>
                {membershipHistory.length === 0 && <p>No data</p>}
                {membershipHistory.map(history => (
                  <>
                    <div className='card w-50 mx-auto m-3'>
                      <div className='card-body'>
                        Type: {history.membership.type.type} -{' '}
                        {history.membership.subType.numberOfSessions} sessions -{' '}
                        {history.membership.price}$
                        <p>
                          Start Date: {history.membershipStartDate} -- End Date:{' '}
                          {history.membershipEndDate}
                        </p>
                      </div>
                    </div>
                  </>
                ))}
              </p>
            </>
          ) : null}
          <h3>Availability</h3>
          <div>
            {schedule.map(s => (
              <div key={s}>
                <h3>{s.location}</h3>
                {s.availability.map(data => (
                  <div>
                    <h3>{data.day}</h3>
                    {Object.keys(data.availableTimes).map(times => (
                      <div>
                        <label>
                          <input
                            type='checkbox'
                            value={schedule}
                            onChange={() =>
                              handleCheckboxChange(s.location, data.day, times)
                            }
                            checked={data.availableTimes[times]}
                          />{' '}
                          {data.day} {times}
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button onClick={addAvailability} className='btn btn-primary'>
            Add Availability
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
