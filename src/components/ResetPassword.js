import React, { useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const ResetPassword = () => {
  const axios = useAxiosPrivate();
  const [newPass, setNewPass] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const updatePassword = async e => {
    try {
      await axios.post('/api/v1/user/reset-password', {
        newPassword: newPass,
        oldPassword: oldPass,
      });
      setStatus('Updated password successfully');
      setError('');
    } catch (err) {
      if (err?.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred');
      }
      setStatus('');
    }
  };

  return (
    <div className='container'>
      <h1>Reset Password</h1>
      {status && <p className='text-success'>{status}</p>}
      {error && <p className='text-danger'>{error}</p>}

      <div className='m-1'>
        <label htmlFor='' className='mr-2'>
          Old password:{' '}
        </label>
        <input
          type='password'
          value={oldPass}
          onChange={e => setOldPass(e.target.value)}
          placeholder='Enter old pass'
        />
      </div>
      <div className='m-1'>
        <label htmlFor='' className='mr-2'>
          New password:{' '}
        </label>
        <input
          type='password'
          value={newPass}
          onChange={e => setNewPass(e.target.value)}
          placeholder='Enter new pass'
        />
      </div>
      <input
        type='submit'
        className='btn btn-primary'
        value='Update password'
        onClick={updatePassword}
      />
    </div>
  );
};

export default ResetPassword;
