import { useState, useEffect } from 'react';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EMAIL_REGEX } from '../constants';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function SignUp() {
  const axios = useAxiosPrivate();
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const [name, setFirstName] = useState();

  const [isTrainer, setIsTrainer] = useState(false);
  const [trainerType, setTrainerType] = useState(false);
  const [defaultLocation, setDefaultLocation] = useState('');

  const [status, setStatus] = useState();
  const [error, setError] = useState('');

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  const registerUser = async e => {
    try {
      e.preventDefault();
      const v1 = EMAIL_REGEX.test(email);
      if (!v1) {
        setError('Invalid Entry');
        return;
      }

      await axios.post('/api/v1/user/signup', {
        email,
        password,
        name,
        username,
        isTrainer,
        trainerType,
      });

      setStatus('Successfully created your account');
      setEmail('');
      setPassword('');
      setError('');
    } catch (registerUserError) {
      setStatus('');
      if (registerUserError.response) {
        if (registerUserError.response.data.message) {
          setError(registerUserError.response.data.message);
        } else {
          setError(registerUserError.response.data.error);
        }
      } else {
        setError('something went wrong');
      }
    }
  };

  const handleCheckboxChange = () => {
    setIsTrainer(!isTrainer); // You can choose to update isTrainer state directly here or in the submit function
  };

  return (
    <div className='container mt-5'>
      <h1 className='text-center mb-4'> Sign up</h1>
      {status && <p className='text-success'>{status}</p>}
      {error && <p className='text-danger'>{error}</p>}
      <form onSubmit={registerUser} className='col-md-6 col-12 mx-auto'>
        <div>
          <label htmlFor='email' className='form-label'>
            Email:
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
          <input
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
          <label htmlFor='password'>Password:</label>
        </div>
        <div className='mb-3'>
          <input
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
          <label htmlFor='first-name'>Name:</label>
        </div>
        <div className='mb-3'>
          <input
            className='input'
            placeholder='Enter name'
            type='text'
            id='first-name'
            name='first-name'
            onChange={e => setFirstName(e.target.value)}
            value={name}
            // required
          />
        </div>

        <div>
          <label htmlFor='first-name'>Username:</label>
        </div>
        <div className='mb-3'>
          <input
            className='input'
            placeholder='Enter name'
            type='text'
            id='first-name'
            name='first-name'
            onChange={e => setUsername(e.target.value)}
            value={username}
            // required
          />
        </div>
        <div className='mb-3 form-check'>
          <input
            type='checkbox'
            className='form-check-input'
            id='isTrainerCheckbox'
            checked={isTrainer}
            onChange={handleCheckboxChange}
          />
          <label className='form-check-label' htmlFor='isTrainerCheckbox'>
            Are you a trainer?
          </label>
        </div>

        {isTrainer && (
          <div className='mb-3'>
            <label htmlFor='trainerType' className='mx-3'>
              Trainer Type:
            </label>
            <select
              className='form-select'
              id='trainerType'
              value={trainerType}
              onChange={e => setTrainerType(e.target.value)}
            >
              <option value=''>Select Trainer Type</option>
              <option value='Boxing'>Boxing</option>
              <option value='PT'>PT (Personal Trainer)</option>
              <option value='Physio'>Physio</option>
            </select>
          </div>
        )}

        <hr />
        <button
          // disable={!validEmail || !validPassword || !isMatch ? true : false}
          className='btn btn-primary'
        >
          Create Citizen
        </button>
      </form>
    </div>
  );
}

export default SignUp;
