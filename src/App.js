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
import BookAppointment from './components/BookAppointment';
import ChooseLocation from './components/ChooseLocation';
import AddSessionType from './components/AddSessionType';
import AddPackageType from './components/AddPackageType';
import AddMembership from './components/AddMembership';
import UsersList from './components/UsersList';
import TrainersList from './components/TrainersList';
import MyAppointments from './components/MyAppointments';
import ShowMemberships from './components/ShowMemberships';
import TrainerAppointments from './components/TrainerAppointments';
import TrainerTodayAppointments from './components/TrainerTodayAppointments';
import TodaysAppointments from './components/TodayAppointments';
import UpdateStaticData from './components/UpdateStaticData';
import MembershipRenewal from './components/MembershipRenewal';
import AdminChangePassword from './components/AdminChangePassword';
import ContactUs from './components/Contact';

function App() {
  return (
    <div>
      <Routes>
        {/* Protected route */}
        <Route path='/' element={<Layout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/memberships' element={<ShowMemberships />} />
          <Route path='/contact' element={<ContactUs />} />
          {/* Routes open to all */}
          {/* <Route
            element={
              <RequireAuth allowedRoles={['customer', 'admin', 'trainer']} />
            }
          ></Route> */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={['admin']} />}>
              <Route
                path='/admin/create-session-type'
                element={<AddSessionType />}
              />
              <Route
                path='/admin/create-package-type'
                element={<AddPackageType />}
              />
              <Route
                path='/admin/create-membership'
                element={<AddMembership />}
              />
              <Route path='/admin/users-list' element={<UsersList />} />
              <Route path='/admin/trainers-list' element={<TrainersList />} />
              <Route
                path='/admin/update-static-data'
                element={<UpdateStaticData />}
              />
              <Route
                path='/admin/membership-renewal'
                element={<MembershipRenewal />}
              />
              <Route
                path='/admin/reset-user-password'
                element={<AdminChangePassword />}
              />
            </Route>
            <Route
              element={
                <RequireAuth allowedRoles={['customer', 'admin', 'trainer']} />
              }
            >
              {/* This will be the dashboard of all roles */}
              <Route path='/' element={<Home />} />
              <Route path='profile' element={<Profile />} />
              <Route path='/user/reset-password' element={<ResetPassword />} />
              <Route path='/choose-location' element={<ChooseLocation />} />
            </Route>
            <Route
              element={<RequireAuth allowedRoles={['customer', 'admin']} />}
            >
              <Route path='/appointments/book' element={<BookAppointment />} />
              <Route path='/choose-location' element={<ChooseLocation />} />
              <Route path='/appointments/my' element={<MyAppointments />} />
              <Route
                path='/appointments/today'
                element={<TodaysAppointments />}
              />
            </Route>

            <Route element={<RequireAuth allowedRoles={['trainer']} />}>
              <Route
                path='/trainer/appointments/all'
                element={<TrainerAppointments />}
              />
              <Route
                path='/trainer/appointments/today'
                element={<TrainerTodayAppointments />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
