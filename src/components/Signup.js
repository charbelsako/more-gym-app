import { useState, useEffect } from 'react';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EMAIL_REGEX } from '../constants';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import TextFieldGroup from './TextFieldGroup';

function SignUp() {
  const axios = useAxiosPrivate();
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validPass, setValidPass] = useState(undefined);

  const [name, setFirstName] = useState();

  const [status, setStatus] = useState();
  const [error, setError] = useState('');

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    if (password.length === 0) return;
    if (password === confirmPassword) {
      setValidPass(true);
    } else {
      setValidPass(false);
    }
  }, [password, confirmPassword]);

  const registerUser = async e => {
    try {
      e.preventDefault();
      const v1 = EMAIL_REGEX.test(email);
      if (!v1) {
        setError('Invalid Entry');
        return;
      }
      if (!validPass) {
        setError('Passwords do not match');
        return;
      }

      await axios.post('/api/v1/user/signup', {
        email,
        password,
        name,
        username,
      });

      setStatus('Successfully created your account');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
    } catch (registerUserError) {
      setStatus('');
      if (registerUserError.response) {
        if (registerUserError.response.data.message) {
          setError(registerUserError.response.data.message);
        } else {
          setError(Object.values(registerUserError.response.data)[0]);
        }
      } else {
        setError('Something went wrong');
      }
    }
  };

  // const handleCheckboxChange = () => {
  //   setIsTrainer(!isTrainer); // You can choose to update isTrainer state directly here or in the submit function
  // };

  return (
    <div className='container mt-5'>
      <h1 className='text-center mb-4'> Sign up</h1>
      {status && <p className='text-success'>{status}</p>}
      {error && <p className='text-danger'>{error}</p>}
      <form onSubmit={registerUser} className='col-md-6 col-12 mx-auto'>
        <div>
          <label htmlFor='email' className='form-label'>
            Email:{' '}
            <FontAwesomeIcon
              icon={faCheck}
              className={validEmail ? 'visible' : 'd-none'}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validEmail || !email ? 'd-none' : 'visible'}
            />
          </label>
        </div>
        <div className='mb-3'>
          <TextFieldGroup
            type='text'
            name='email'
            className='input'
            placeholder='Enter your email'
            id='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password*:</label>
        </div>
        <div className='mb-3'>
          <TextFieldGroup
            type='password'
            className='input'
            placeholder='Enter a password'
            name='password'
            id='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='password'>Confirm Password*:</label>
        </div>
        <div className='mb-3'>
          <TextFieldGroup
            type='password'
            className='input'
            placeholder='Confirm your password'
            name='confirm-password'
            id='confirm-password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          {!validPass ? (
            <p className='text-danger'>Passwords do not match</p>
          ) : null}
          {validPass ? <p className='text-success'>Passwords match</p> : null}
        </div>
        <div>
          <label htmlFor='first-name'>Name*:</label>
        </div>
        <div className='mb-3'>
          <TextFieldGroup
            className='input'
            placeholder='Enter name'
            type='text'
            id='first-name'
            name='first-name'
            onChange={e => setFirstName(e.target.value)}
            value={name}
          />
        </div>

        <div>
          <label htmlFor='first-name'>Username*:</label>
        </div>
        <div className='mb-3'>
          <TextFieldGroup
            className='input'
            placeholder='Enter username'
            type='text'
            id='first-name'
            name='first-name'
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
        </div>

        <hr />
        <button
          disabled={!validEmail || !validPass ? true : false}
          className='btn btn-primary'
        >
          Create User
        </button>
      </form>
    </div>
  );
}

export default SignUp;
