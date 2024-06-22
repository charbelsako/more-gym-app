import React, { useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const AdminChangePassword = () => {
  const axios = useAxiosPrivate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/v1/admin/reset-user-password', {
        email,
        newPassword,
      });
      setStatus(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response.data.error);
      setStatus('');
    }
  };

  return (
    <div className='container mt-5'>
      <h2>Admin Change Password</h2>
      {status && <div className='alert alert-success'>{status}</div>}
      {error && <div className='alert alert-danger'>{error}</div>}
      <form onSubmit={handleSubmit} className='col-6 mx-auto'>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            className='form-control'
            id='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='newPassword'>New Password</label>
          <input
            type='password'
            className='form-control'
            id='newPassword'
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary mt-3'>
          Change Password
        </button>
      </form>
    </div>
  );
};

export default AdminChangePassword;
