import { Routes, Route } from 'react-router-dom'
import Login from '../src/pages/Login'
import Dashboard from './pages/Dashboard'
import Learners from './pages/Learners'
import Staff from './pages/Staff'
import Users from './pages/Users'
import DashboardLayout from './layouts/DashboardLayout'

function App() {

  return (
    <Routes>
      {/* Public route */}
      <Route path='/' element={<Login />}/>

      {/* Private (dashboard) routes wrapped in DashboardLayout */}
      <Route path='/' element={<DashboardLayout />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/learners' element={<Learners />} />
        <Route path='/users' element={<Users />} />
        <Route path='/staff' element={<Staff />} />
      </Route>
    </Routes>
  )
}

export default App
