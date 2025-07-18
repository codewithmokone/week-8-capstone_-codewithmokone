import { useState } from 'react';
import mainImage from '../assets/images/login-image.jpg'
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('');

            const user = res.data

            if(!user.role === 'admin'){
                navigate('admindashboard')
            }else{
                navigate('dashboard')
            }
            
        } catch (error) {
            console.log(error.response?.data || error.message);
            setError(error.response?.data || error.message)
        }
    }

    return (
        <main className="w-screen h-screen flex">
            <div className="w-[50%] h-full flex items-center justify-center">
                <div className="w-96 h-96 flex flex-col justify-center items-center gap-8 bg-white rounded p-18 shadow-2xl">
                    <h1 className="font-bold text-2xl">Sign Up</h1>
                    <form className="w-full h-full flex flex-col gap-1" action="">
                        <label htmlFor="fullname">Full Name:</label>
                        <input className="border p-1 rounded" type="text" placeholder="Enter fullname..." />
                        <label htmlFor="email">Email:</label>
                        <input className="border p-1 rounded" type="email" placeholder="Enter email..." />
                        <label className="mt-4" htmlFor="password">Password:</label>
                        <input className="border p-1 rounded" type="password" placeholder="Enter password..." />
                        <button className="bg-blue-600 text-white rounded py-1 mt-4">Register</button>
                    </form>
                </div>
            </div>
            <div className='w-[50%] h-fit'>
                <img className='h-screen ' src={mainImage} alt="main_image" />
            </div>
        </main>
    )
}