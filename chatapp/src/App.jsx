import {Routes, Route} from 'react-router-dom';
import ChatApp from './pages/ChatApp';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';

function App() {

    return (
      <>
        <Toaster position="top-center" />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/chatapp' element={<ChatApp />} />
        </Routes>
      </>
    )
}

export default App
