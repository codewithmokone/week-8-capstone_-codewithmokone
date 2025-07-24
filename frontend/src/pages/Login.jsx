import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

import mainImage from '../assets/images/login-image.jpg'
import { UsersContext } from '../context/UserContext';

const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUserProfile } = useContext(UsersContext);

  // Function for changing input values
  const handleChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Function for login in a user
  const handleLogin = async (e) => {
    e.preventDefault();

    // Check data if is valid
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      // Send login data to API
      const res = await axios.post(`${API}/user/login`, formData);

      // Store API response
      const userInfo = res.data.user;

      // Save data to localstorage
      localStorage.setItem('user', JSON.stringify(userInfo));

      // Send user profile to user context
      setUserProfile(userInfo)

      // Show success notification 
      toast.success('Logged in Success.');

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      console.log(err.response?.data?.message);
    }
  };

  return (
    <main className="w-screen h-screen flex">
      <div className="w-[50%] h-full flex items-center justify-center">
        <div className="w-96 h-96 flex flex-col justify-center items-center gap-8 bg-white rounded p-18 shadow-2xl">
          <h1 className="font-bold text-2xl">Sign In</h1>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <form className="w-full h-full flex flex-col gap-1" action="" onSubmit={handleLogin}>
            <label htmlFor="email">Email:</label>
            <input
              className="border border-gray-500 p-1 rounded"
              type="email"
              id='email'
              name='email'
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              aria-required="true"
              autoFocus
            />
            <label className="mt-4" htmlFor="password">Password:</label>
            <input
              className="border border-gray-500 p-1 rounded"
              type="password"
              id='password'
              name='password'
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              aria-required="true"
            />
            <button className="bg-blue-600 text-white rounded py-1 mt-4">Login</button>
          </form>
        </div>
      </div>
      <div className='w-[50%] h-fit object-fill'>
        <img className='w-full h-screen ' src={mainImage} alt="main_image" />
      </div>
    </main>
  )
}