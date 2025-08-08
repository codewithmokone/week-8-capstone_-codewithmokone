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
  const [loading, setLoading] = useState(false);
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

    setLoading(true); // Start loading
    setError('');

    try {
      // Send login data to API
      const res = await axios.post(`${API}/user/login`, formData);

      // Store API response
      const userInfo = res.data.user;

      // Save data to localstorage
      localStorage.setItem('user', JSON.stringify(userInfo));

      // Send user profile to user context
      setUserProfile(userInfo);

      // Show success notification 
      toast.success('Logged in Success.');

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
      console.log(err.response?.data?.message);
    } finally {
      setLoading(false);
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
            <button className={`bg-blue-600 text-white rounded py-1 mt-4 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading && (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 010 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                  ></path>
                </svg>
              )}
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
      <div className='w-[50%] h-fit object-fill'>
        <img className='w-full h-screen ' src={mainImage} alt="main_image" />
      </div>
    </main>
  )
}