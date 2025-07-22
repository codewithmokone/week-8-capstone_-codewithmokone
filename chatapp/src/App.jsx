import {Routes, Route} from 'react-router-dom';
import Messages from './pages/Messages';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';

function App() {

    return (
      <>
        <Toaster position="top-center" />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/messages' element={<Messages />} />
        </Routes>
      </>
    )
}

export default App
