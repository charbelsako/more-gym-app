import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import ResetPassword from './components/ResetPassword';
import Profile from './components/Profile';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import PersistLogin from './components/PersistLogin';

function App() {
  return (
    <div>
      <Routes>
        {/* Protected route */}
        <Route path='/' element={<Layout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          {/* Routes open to all */}
          <Route
            element={
              <RequireAuth allowedRoles={['customer', 'admin', 'trainer']} />
            }
          ></Route>
          <Route element={<PersistLogin />}>
            <Route
              element={
                <RequireAuth allowedRoles={['customer', 'admin', 'trainer']} />
              }
            >
              {/* This will be the dashboard of all roles */}
              <Route path='/' element={<Home />} />
              <Route path='profile' element={<Profile />} />
              <Route path='/user/reset-password' element={<ResetPassword />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
