import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import {Link} from 'react-router-dom';

// const API = import.meta.env.VITE_API_URL;

export default function Register() {
  const [formData, setFormData] = useState({ fullname: "",email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function for changing value
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Function for login in
  const handleRegister = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      if (!formData.email || !formData.password) {
        setError("Please enter both email and password");
        return;
      }

      const res = await axios.post('http://localhost:4000/api/user/register',{
         ...formData,
         role:'user',
        });
      //const res = await axios.post(`${API}/user/register', formData);

      const user = res.data;

      toast.success('Registration successfully!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      console.log(err);
      
      toast.error('Registration failed!');
    }
  };

  return (
    <main className="w-screen h-screen flex">
      <div className="w-screen h-full border flex items-center justify-center m-auto">
        <div className="w-96 h-[450px] flex flex-col justify-center items-center gap-8 bg-white rounded p-18 shadow-2xl">
          <h1 className="font-bold text-2xl">Sign Up</h1>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <form className="w-full h-full flex flex-col gap-1" action="" onSubmit={handleRegister}>
            <label htmlFor="fullname">Full Name:</label>
            <input
              className="border border-gray-500 p-1 rounded"
              type="text"
              id='fullname'
              name='fullname'
              placeholder="Enter fullname"
              value={formData.fullname}
              onChange={handleChange}
              aria-required="true"
              autoFocus
            />
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
            <button className="bg-blue-600 text-white rounded py-1 mt-4">Register</button>
            <p className='mt-2'>Already have an account? <Link to={'/'} className='font-medium text-blue-700'>Sign In</Link> </p>
          </form>
        </div>
      </div>
    </main>
  )
}