import React, { useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import moment from 'moment';
import useAuth from '../hooks/useAuth';
import { useGesture } from 'react-use-gesture';
import { useSpring, animated } from 'react-spring';

const BookAppointment = () => {
  const [{ x }, set] = useSpring(() => ({ x: 0 }));

  const bind = useGesture({
    onDrag: ({ event, movement: [mx, my], delta: [dx, dy] }) => {
      event.preventDefault();
      const container = document.getElementById('days');
      container.scrollLeft -= dx;
      set({ x: dx });
      // console.log('running');
    },
  });

  const { location } = useAuth();
  const axios = useAxiosPrivate();
  const currentDay = moment().date();
  const currentMonth = moment().format('MMMM');
  const daysInMonth = moment().daysInMonth();
  const daysLeft = daysInMonth - currentDay;
  const [selectedDate, setSelectedDate] = useState();
  const [trainerType, setTrainerType] = useState('');

  const [appointments, setAppointments] = useState([]);

  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleTrainerTypeChange = e => {
    setTrainerType(e.target.value);
  };

  const getAvailableAppointments = async e => {
    try {
      e.preventDefault();
      setLoading(true);

      const response = await axios.get(
        `/api/v1/trainer/get-availability?date=${selectedDate}&type=${trainerType}&location=${location}`
      );

      let appointmentLocation = response.data.location;
      let unwindedData = response.data.data.map(
        ({ day, trainer, availableTimes, type, id }) =>
          Object.entries(availableTimes).map(([time, isAvailable]) => ({
            location: appointmentLocation,
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
        date: selectedDate,
        trainerId,
        location,
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

  const handleSelectedDay = day => {
    // @TODO: convert from day to full date?
    // @TODO give button black background
  };

  return (
    <div>
      <h1>Book appointment</h1>
      {status && <p className='text-success'>{status}</p>}
      {error && <p className='text-danger'>{error}</p>}

      <form onSubmit={getAvailableAppointments}>
        <div
          className='mb-4 w-100'
          style={{
            overflow: 'hidden',
            touchAction: 'none',
            // scrollLeft: x.to(x => `translate3d(${x}px, 0, 0)`),
          }}
          {...bind()}
          id='days'
        >
          <label htmlFor='date'>Date:</label>

          <div className='d-flex w-100'>
            {Array.from({ length: daysLeft }, (_, index) => (
              <div className='row m-0 mx-2 p-0 width-50' key={index}>
                <div className='col-12 m-0 p-0'>
                  <button
                    key={index}
                    type='button'
                    onClick={() => handleSelectedDay(currentDay + index)}
                    className='btn rounded-circle dayBtn text-center'
                  >
                    {currentDay + index}
                  </button>
                </div>
                <div className='col-12 m-0 p-0'>
                  <span className='small'>
                    {moment(
                      `${currentMonth} ${currentDay + index}`,
                      'MMMM D'
                    ).format('ddd')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor='trainerType' className='mx-3'>
            Trainer Type:{' '}
          </label>
          <select
            id='trainerType'
            name='trainerType'
            value={trainerType}
            className=''
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
        <div>
          <label htmlFor='location'>Location: </label>
          <p>{location}</p>
        </div>
        <button type='submit' className='btn btn-success'>
          Load
        </button>
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
                  <p>Location: {appointment.location}</p>
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
