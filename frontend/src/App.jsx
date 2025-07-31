import { Routes, Route } from 'react-router-dom'
import Login from '../src/pages/Login'
import Dashboard from './pages/Dashboard'
import Learners from './pages/Learners'
import Staff from './pages/Staff'
import Users from './pages/Users'
import DashboardLayout from './layouts/DashboardLayout'
import Activities from './pages/Activities'
import { Calendar } from './pages/Calendar'
import { Toaster } from 'react-hot-toast';
import { Messages } from './pages/Messages'
import UserProfile from './pages/UserProfile'

function App() {

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        {/* Public route */}
        <Route path='/' element={<Login />} />

        {/* Private (dashboard) routes wrapped in DashboardLayout */}
        <Route path='/' element={<DashboardLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/learners' element={<Learners />} />
          <Route path='/users' element={<Users />} />
          <Route path='/staff' element={<Staff />} />
          <Route path='/activities' element={<Activities />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/profile' element={<UserProfile />} />
          {/* <Route path='/messages' element={<Messages />} /> */}
        </Route>
      </Routes>
    </>
  )
}

export default App
