import { useContext, useState } from 'react';
import mainImage from '../assets/images/login-image.jpg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      if (!formData.email || !formData.password) {
        setError("Please enter both email and password");
        return;
      }

      const res = await axios.post('https://week-8-capstone-codewithmokone.onrender.com/api/user/login', formData);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      toast.success('Logged in successfully!');
      navigate('/dashboard'); // redirect on success
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
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
      <div className='w-[50%] h-fit'>
        <img className='h-screen ' src={mainImage} alt="main_image" />
      </div>
    </main>
  )
}