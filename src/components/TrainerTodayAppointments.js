import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import moment from 'moment';

const TrainerTodayAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const axios = useAxiosPrivate();
  // const [error, setError] = useState('');
  // const [status, setStatus] = useState('');
  // const currDate = moment();

  useEffect(() => {
    const getAllAppointments = async () => {
      const response = await axios.get('/api/v1/trainer/appointments/all');
      setAppointments(response.data);
    };
    getAllAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const cancelAppointment = async id => {
  //   try {
  //     await axios.patch(`/api/v1/trainer/${id}/cancel-appointment`);

  //     setError('');
  //     setStatus('Successfully Cancelled appointment');
  //   } catch (err) {
  //     setStatus('');
  //     console.log(err.response);
  //     if (err.response) {
  //       setError(err.response.data.message);
  //     } else setError(err.message);
  //   }
  // };

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-12'>
          <h2>My Appointments</h2>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          {/* {error && <p className='text-danger'>{error}</p>} */}
          {/* {status && <p className='text-success'>{status}</p>} */}
        </div>
      </div>
      <div className='row'>
        {appointments.map(appointment => (
          <div key={appointment._id} className='col-12'>
            <div className='card m-2'>
              <div className='card-body'>
                <h5 className='card-title'>{appointment.trainer}</h5>
                <p className='card-text'>
                  <strong>Day:</strong>{' '}
                  {moment(appointment.date).format('YYYY MMMM DD')}
                  <br />
                  <strong>Time:</strong> {appointment.time}{' '}
                  {appointment.time > 12 ? 'pm' : 'am'}
                  <br />
                  <strong>Status:</strong> {appointment.status}
                  <br />
                  <strong>Location: </strong> {appointment.location}
                </p>
                {/* <button
                  className='btn btn-primary'
                  onClick={() => cancelAppointment(appointment._id)}
                  disabled={
                    appointment.status === 'Cancelled' ||
                    moment(
                      `${moment(appointment.date).format('YYYY-MM-DD')} ${
                        appointment.time
                      }`,
                      'YYYY-MM-DD HH'
                    ).isBefore(moment())
                  }
                >
                  Cancel Appointment
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerTodayAppointments;
