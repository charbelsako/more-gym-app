import { useState, useEffect } from 'react';
import axios from '../api/axios';

const ShowMemberships = () => {
  const [memberships, setMemberships] = useState([]);

  const getMembershipPrice = (type, subtype, trainerType) => {
    for (let i = 0; i < memberships.length; i++) {
      if (
        memberships[i].type.type === type &&
        memberships[i].subType.numberOfSessions === subtype &&
        memberships[i].sessionType === trainerType
      ) {
        return `${memberships[i].price} $`;
      }
    }
    return 'None';
  };

  useEffect(() => {
    const fetchMemberships = async () => {
      const response = await axios.get('/api/v1/admin/get-memberships');
      setMemberships(response.data);
    };
    fetchMemberships();
  }, []);

  return (
    <div className='container'>
      <h1 className='mb-4'>Available Memberships for PT</h1>
      <table className='mx-auto table table-hover'>
        <caption>Table of membership types and prices</caption>
        <thead>
          <tr>
            <th></th>
            <th>4 Sessions</th>
            <th>8 Sessions</th>
            <th>12 Sessions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Solo</td>
            <td>{getMembershipPrice('Solo', 4, 'PT')}</td>
            <td>{getMembershipPrice('Solo', 8, 'PT')}</td>
            <td>{getMembershipPrice('Solo', 12, 'PT')}</td>
          </tr>
          <tr>
            <td>Duo</td>
            <td>{getMembershipPrice('Duo', 4, 'PT')}</td>
            <td>{getMembershipPrice('Duo', 8, 'PT')}</td>
            <td>{getMembershipPrice('Duo', 12, 'PT')}</td>
          </tr>
          <tr>
            <td>Trio</td>
            <td>{getMembershipPrice('Trio', 4, 'PT')}</td>
            <td>{getMembershipPrice('Trio', 8, 'PT')}</td>
            <td>{getMembershipPrice('Trio', 12, 'PT')}</td>
          </tr>
          <tr>
            <td>Group</td>
            <td>{getMembershipPrice('Group', 4, 'PT')}</td>
            <td>{getMembershipPrice('Group', 8, 'PT')}</td>
            <td>{getMembershipPrice('Group', 12, 'PT')}</td>
          </tr>
        </tbody>
      </table>

      <h1 className='mb-4'>Available Memberships for Judo</h1>
      <table className='mx-auto table table-hover'>
        <caption>Table of membership types and prices</caption>
        <thead>
          <tr>
            <th></th>
            <th>8 Sessions</th>
            <th>12 Sessions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Judo</td>
            <td>{getMembershipPrice('Judo', 8, 'Judo')}</td>
            <td>{getMembershipPrice('Judo', 12, 'Judo')}</td>
          </tr>
        </tbody>
      </table>

      <h1 className='mb-4'>Available Memberships for Physio</h1>
      <table className='mx-auto table table-hover'>
        <caption>Table of membership types and prices</caption>
        <thead>
          <tr>
            <th></th>
            <th>1 Session</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Solo</td>
            <td>{getMembershipPrice('Solo', 1, 'Physiotherapy')}</td>
          </tr>
        </tbody>
      </table>

      <h1 className='mb-4'>Available Memberships for Presotherapie</h1>
      <p>20$ for a session of 30 minutes</p>
      <h1 className='mb-4'>Available Memberships for ice bath</h1>
      <p>20$ for a session of 30 minutes</p>
    </div>
  );
};

export default ShowMemberships;
