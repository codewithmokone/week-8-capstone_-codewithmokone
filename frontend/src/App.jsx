import { Routes, Route } from 'react-router-dom'
// import Login from '../src/pages/Login'
import Dashboard from './pages/Dashboard'
import Learners from './pages/Learners'
import Staff from './pages/Staff'
import Aside from './components/Aside'
import DashboardLayout from './layouts/DashboardLayout'
// import Register from './pages/Register'

function App() {

  return (
    <DashboardLayout>
      <Routes>
        {/* <Route path='/' element={<Login />}/> */}
        {/* <Route path='register' element={<Register />}/> */}
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/learners' element={<Learners />} />
        <Route path='/staff' element={<Staff />} />
      </Routes>
    </DashboardLayout>
  )
}

export default App
