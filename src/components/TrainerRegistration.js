/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EMAIL_REGEX } from '../constants';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import TextFieldGroup from './TextFieldGroup';
import Select from 'react-select';

function TrainerRegistration() {
  const axios = useAxiosPrivate();
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validPass, setValidPass] = useState(undefined);

  const [name, setFirstName] = useState('');

  const [status, setStatus] = useState();
  const [error, setError] = useState('');

  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');

  const [trainerType, setTrainerType] = useState('');
  const [location, setLocation] = useState([]);
  const [trainerPackageType, setTrainerPackageType] = useState();

  const [allPackageTypes, setAllPackageTypes] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [allTrainerTypes, setAllTrainerTypes] = useState([]);

  useEffect(() => {
    const getAllClassTypes = async () => {
      const response = await axios.get('/api/v1/static-data/class-types');
      setAllTrainerTypes(response.data.classTypes);
    };
    getAllClassTypes();
  }, []);

  useEffect(() => {
    const getAllTypes = async () => {
      const response = await axios.get('/api/v1/admin/get-package-types');
      setAllPackageTypes(response.data);
    };
    getAllTypes();
  }, []);

  useEffect(() => {
    const getAllLocations = async () => {
      const response = await axios.get('/api/v1/static-data/locations');
      setAllLocations(response.data.locations);
    };
    getAllLocations();
  }, []);

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

      await axios.post('/api/v1/admin/register-trainer', {
        email,
        password,
        name,
        username,
        gender,
        birthday,
        trainerType,
        trainerPackageType,
        location: location.map(loc => loc.value),
      });

      setStatus('Successfully created trainer account');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setBirthday('');
      setGender('');
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
          {validPass !== undefined && !validPass ? (
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

        <div>
          <label htmlFor='birthday'>Birthday:</label>
        </div>
        <div className='mb-3'>
          <TextFieldGroup
            className='form-control'
            placeholder='Enter your birthday'
            type='date'
            id='birthday'
            name='birthday'
            onChange={e => setBirthday(e.target.value)}
            value={birthday}
          />
        </div>

        <div>
          <label htmlFor='gender'>Gender:</label>
        </div>
        <div className='mb-3'>
          <select
            className='form-control'
            id='gender'
            name='gender'
            onChange={e => setGender(e.target.value)}
            value={gender}
          >
            <option value='' disabled>
              Select your gender
            </option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </select>
        </div>

        <div>
          <label htmlFor='trainer-type'>Trainer Type:</label>
        </div>
        <div className='mb-3'>
          <select
            className='form-control'
            id='trainer-type'
            name='trainer-type'
            onChange={e => setTrainerType(e.target.value)}
            value={trainerType}
          >
            <option value='' disabled>
              Select trainer type
            </option>
            {allTrainerTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor='location'>Location:</label>
        </div>

        <div className='mb-3'>
          <Select
            isMulti
            className='basic-multi-select'
            classNamePrefix='select'
            options={allLocations.map(loc => ({ value: loc, label: loc }))}
            value={location}
            onChange={setLocation}
          />
        </div>

        <div>
          <label htmlFor='trainer-package-type'>Trainer Package Type:</label>
        </div>
        <div className='mb-3'>
          <select
            className='form-control'
            id='trainer-package-type'
            name='trainer-package-type'
            onChange={e => setTrainerPackageType(e.target.value)}
            value={trainerPackageType}
          >
            <option value='' disabled>
              Select trainer package type
            </option>
            {allPackageTypes.map(pkg => (
              <option key={pkg._id} value={pkg._id}>
                {pkg.type} {pkg.capacity}
              </option>
            ))}
          </select>
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

export default TrainerRegistration;
