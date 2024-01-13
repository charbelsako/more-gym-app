import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
// import ResetPassword from './components/ResetPassword';
// import Profile from './components/Profile';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';

function App() {
  return (
    <div>
      <Routes>
        {/* Protected route */}
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          {/* Routes open to all */}
          <Route
            element={
              <RequireAuth allowedRoles={['customer', 'admin', 'trainer']} />
            }
          ></Route>
        </Route>
        {/* Protected route */}
        {/* <Route path='/reset-password' element={<ResetPassword />} /> */}
        {/* <Route path='/profile' element={<Profile />} /> */}
      </Routes>
    </div>
  );
}

export default App;
