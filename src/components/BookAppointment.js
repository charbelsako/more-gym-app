import React, { useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import moment from 'moment';

const BookAppointment = () => {
  const axios = useAxiosPrivate();
  const [date, setDate] = useState('');
  const [trainerType, setTrainerType] = useState('');

  const [appointments, setAppointments] = useState([]);

  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleDateChange = e => {
    setDate(e.target.value);
  };

  const handleTrainerTypeChange = e => {
    setTrainerType(e.target.value);
  };

  const getAvailableAppointments = async e => {
    try {
      e.preventDefault();
      setLoading(true);

      const response = await axios.get(
        `/api/v1/trainer/get-availability?date=${date}&type=${trainerType}`
      );

      let unwindedData = response.data.data.map(
        ({ day, trainer, availableTimes, type, id }) =>
          Object.entries(availableTimes).map(([time, isAvailable]) => ({
            day,
            trainer,
            availableTime: time,
            isAvailable,
            type,
            id,
          }))
      );
      let availability = [];
      // eslint-disable-next-line no-unused-vars
      unwindedData = unwindedData.map(el => availability.push(...el));
      availability.sort((a, b) => a.availableTime - b.availableTime);

      setAppointments(availability);
      setError('');
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError('Something went wrong while fetching appointments');
      setStatus('');
      setLoading(false);
    }
  };

  const bookAppointment = async (time, trainerId) => {
    try {
      await axios.post('/api/v1/user/register-appointment', {
        time,
        date,
        trainerId,
      });
      setStatus('Successfully booked an appointment');
      setError('');
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong while booking appointment');
      }
      setStatus('');
    }
  };

  return (
    <div>
      <h1>Book appointment</h1>
      {status && <p className='text-success'>{status}</p>}
      {error && <p className='text-danger'>{error}</p>}

      <form onSubmit={getAvailableAppointments}>
        <div>
          <label htmlFor='date'>Date:</label>
          <input
            type='date'
            id='date'
            name='date'
            value={date}
            onChange={handleDateChange}
            required
          />
        </div>
        <div>
          <label htmlFor='trainerType'>Trainer Type:</label>
          <select
            id='trainerType'
            name='trainerType'
            value={trainerType}
            onChange={handleTrainerTypeChange}
            required
          >
            <option value=''>Select Trainer Type</option>
            <option value='Boxing'>Boxing</option>
            <option value='PT'>PT</option>
            <option value='Physio'>Physio</option>
            <option value='Pilates'>Pilates</option>
          </select>
        </div>
        <button type='submit'>Submit</button>
      </form>
      <div>
        <h2 className='my-3'>Appointment</h2>
        {isLoading && <p>Loading...</p>}
        {appointments.map((appointment, index) => {
          const name = appointment.trainer;
          const type = appointment.type;
          const trainerId = appointment.trainerId; // @NOTE: trainer id
          const availableTime = appointment.availableTime;
          return (
            <div className='card m-5 text-left' key={`${trainerId}${index}`}>
              <div className='card-body row d-flex'>
                <div className='col-10'>
                  <h5 className='card-title'>{type}</h5>
                  <p>Trainer name: {name}</p>
                  <p>Time: {moment({ hour: availableTime }).format('h a')}</p>
                </div>
                <div className='col-2 my-auto'>
                  <button
                    className='btn btn-primary'
                    onClick={e => bookAppointment(availableTime, trainerId)}
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookAppointment;
