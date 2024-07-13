import React, { useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import moment from 'moment';
import { useEffect } from 'react';

const SalesReport = () => {
  const [data, setData] = useState(null);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  const axios = useAxiosPrivate();

  useEffect(() => {
    // Initialize the year state to the current year
    const currentYear = moment().year();
    setYear(currentYear.toString());
  }, []);

  const months = [
    { value: 'January', label: 'January' },
    { value: 'February', label: 'February' },
    { value: 'March', label: 'March' },
    { value: 'April', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'June', label: 'June' },
    { value: 'July', label: 'July' },
    { value: 'August', label: 'August' },
    { value: 'September', label: 'September' },
    { value: 'October', label: 'October' },
    { value: 'November', label: 'November' },
    { value: 'December', label: 'December' },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/v1/admin/sales-report', {
        params: { month, year },
      });
      console.log(response.data);
      setData(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching sales report:', err);
      setError('Failed to fetch sales report');
    }
  };

  const years = [];
  const currentYear = moment().year();
  for (let y = 2023; y <= currentYear; y++) {
    years.push(y.toString());
  }

  return (
    <div className='container mt-5'>
      <h1 className='text-center mb-4'>Sales Report</h1>
      <div className='mb-2'>
        <label htmlFor='month' className='form-label'>
          Month:{' '}
        </label>
        <select
          id='month'
          className='custom-select custom-select-lg'
          value={month}
          onChange={e => setMonth(e.target.value)}
        >
          <option value=''>Select Month</option>
          {months.map(m => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor='year' className='form-label'>
          Year:
        </label>
        <select
          id='year'
          className='custom-select custom-select-lg'
          value={year}
          onChange={e => setYear(e.target.value)}
        >
          <option value=''>Select Year</option>
          {years.map(y => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={fetchData} className='btn btn-primary mt-2'>
          Fetch Report
        </button>
      </div>
      {error && <p className='text-danger'>{error}</p>}
      {data && (
        <div>
          <h2 className='mt-4'>
            Number of Memberships: {data.numberOfMemberships}
          </h2>

          <h2 className='mt-4'>Trainer Appointments</h2>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Trainer Name</th>
                <th>Trainer Email</th>
                <th>Total Appointments</th>
              </tr>
            </thead>
            <tbody>
              {data.appointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{appointment.trainer.name}</td>
                  <td>{appointment.trainer.email}</td>
                  <td>{appointment.totalAppointments}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className='mt-4'>Monthly Membership Sales</h2>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Session Type</th>
                <th>Price</th>
                <th>Total</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {data.membershipHistoryAggregation.map((history, index) => (
                <tr key={index}>
                  <td>{history.membershipDetails.sessionType}</td>
                  <td>{history.membershipDetails.price}</td>
                  <td>{history.total}</td>
                  <td>
                    {new Date(
                      history.membershipDetails.createdAt
                    ).toLocaleDateString()}
                  </td>
                  <td>
                    {new Date(
                      history.membershipDetails.updatedAt
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalesReport;
