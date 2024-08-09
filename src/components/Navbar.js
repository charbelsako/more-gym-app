import React from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';

const Navbar = () => {
  const { auth, location } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate('/');
  };
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container'>
        <Link to='/home' className='navbar-brand'>
          MORE gym
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ml-auto'>
            {auth.email && (
              <>
                <li>
                  <Link to='/home' className='nav-link'>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to='/contact' className='nav-link'>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to='/memberships' className='nav-link'>
                    Memberships
                  </Link>
                </li>
                {auth.role === 'trainer' ? (
                  <>
                    <li>
                      <Link to='/trainer/appointments/all' className='nav-link'>
                        All Appointments
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/trainer/appointments/today'
                        className='nav-link'
                      >
                        Today's Appointments
                      </Link>
                    </li>
                  </>
                ) : null}
                {auth.role === 'customer' && location ? (
                  <>
                    <li>
                      <Link to='/appointments/book' className='nav-link'>
                        Book Appointment
                      </Link>
                    </li>
                    <li>
                      <Link to='/appointments/my' className='nav-link'>
                        My Appointments
                      </Link>
                    </li>
                  </>
                ) : null}
                {auth.role === 'admin' ? (
                  <li>
                    <Link to='/user/reset-password' className='nav-link'>
                      Reset pass
                    </Link>
                  </li>
                ) : null}

                <li>
                  <Link to='/profile' className='nav-link'>
                    My profile
                  </Link>
                </li>
                <li>
                  <Link to='/choose-location' className='nav-link'>
                    Change Location
                  </Link>
                </li>
                <li>
                  <button
                    onClick={signOut}
                    className='nav-link btn btn-outline-danger d-inline p-1 m-1'
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {!auth.email && (
              <>
                <li>
                  <Link to='/login' className='nav-link'>
                    Login{' '}
                  </Link>
                </li>
                <li>
                  <Link to='/signup' className='nav-link'>
                    Sign up{' '}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
