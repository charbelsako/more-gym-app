import React from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';

const Navbar = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate('/login');
  };
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          Your App Name
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
                  <Link to='/' className='nav-link'>
                    Home
                  </Link>
                </li>
                {auth.role === 'customer' ? (
                  <li>
                    <Link to='/documents/my' className='nav-link'>
                      My Documents
                    </Link>
                  </li>
                ) : null}
                {auth.role === 'admin' ? (
                  <li>
                    <Link to='/foehfo' className='nav-link'>
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
                  <button
                    onClick={signOut}
                    className='nav-link btn btn-outline-danger'
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
