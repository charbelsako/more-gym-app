import React from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Home = () => {
  const { auth } = useAuth();
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <h1>Home</h1>
        </div>
        {auth.role === 'trainer' ? (
          <div className='col-12 text-left'>
            <p>Trainer links</p>
          </div>
        ) : null}
        {auth.role === 'admin' ? (
          <div className='col-12 text-left'>
            <p>Admin links</p>
          </div>
        ) : null}
        <ul>
          {' '}
          {auth.role === 'admin' ? (
            <div className='text-left'>
              <li className='link'>
                <Link to='/admin/create-session-type'>Create session type</Link>
              </li>
              <li className='link'>
                <Link to='/admin/create-package-type'>Create package type</Link>
              </li>
              <li className='link'>
                <Link to='/admin/create-membership'>Create membership</Link>
              </li>
              <li className='link'>
                <Link to='/admin/users-list'>View Users List</Link>
              </li>
              <li className='link'>
                <Link to='/admin/trainers-list'>View Trainers List</Link>
              </li>
              <li className='link'>
                <Link to='/admin/update-static-data'>Update static data</Link>
              </li>
              <li className='link'>
                <Link to='/admin/membership-renewal'>Membership Renewal</Link>
              </li>
              <li className='link'>
                <Link to='/admin/reset-user-password'>Reset User Password</Link>
              </li>
              <li className='link'>
                <Link to='/admin/register-trainer'>Register Trainer</Link>
              </li>
            </div>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default Home;
