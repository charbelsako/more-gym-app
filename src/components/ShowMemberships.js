import { useState, useEffect } from 'react';
import axios from '../api/axios';

const ShowMemberships = () => {
  const [memberships, setMemberships] = useState([]);

  const getMembershipPrice = (type, subtype) => {
    for (let i = 0; i < memberships.length; i++) {
      if (
        memberships[i].type.type === type &&
        memberships[i].subType.numberOfSessions === subtype
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
      <h1 className='mb-4'>Available Memberships</h1>
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
            <td>{getMembershipPrice('Solo', 4)}</td>
            <td>{getMembershipPrice('Solo', 8)}</td>
            <td>{getMembershipPrice('Solo', 12)}</td>
          </tr>
          <tr>
            <td>Duo</td>
            <td>{getMembershipPrice('Duo', 4)}</td>
            <td>{getMembershipPrice('Duo', 8)}</td>
            <td>{getMembershipPrice('Duo', 12)}</td>
          </tr>
          <tr>
            <td>Trio</td>
            <td>{getMembershipPrice('Trio', 4)}</td>
            <td>{getMembershipPrice('Trio', 8)}</td>
            <td>{getMembershipPrice('Trio', 12)}</td>
          </tr>
          <tr>
            <td>Group</td>
            <td>{getMembershipPrice('Group', 4)}</td>
            <td>{getMembershipPrice('Group', 8)}</td>
            <td>{getMembershipPrice('Group', 12)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShowMemberships;
