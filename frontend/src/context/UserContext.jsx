import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const UsersContext = createContext();

const API = import.meta.env.VITE_API_URL;

export const UsersProvider = ({ children }) => {
    const [usersData, setUsersData] = useState([]);
    const [userProfile, setUserProfile] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetching users data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await axios(`${API}/user/`);

                const userList = response.data;

                setUsersData(userList);

                localStorage.setItem('numberOfUsers', userList.length);

            } catch (error) {
                setError(error.message || 'Failed to fetch users.')
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    // Create
    const addUser = async (data) => {
        console.log("add User: ", data);

        try {
            const response = await axios.post(`${API}/user/register`, data);

            setUsers((prev) => [...prev, response.data]);
        } catch (err) {
            console.error('Failed to add user', err);
        }
    };

    // Update
    const updateUser = async (id, updatedData) => {
        try {
            const res = await axios.put(`${API}/users/${id}`, updatedData);
            setUserProfile(res.data);
        } catch (err) {
            console.error('Failed to update user.', err);
            alert('Failed to update user.')
        }
    };

    // Delete
    const deleteUser = async (id) => {
        try {
            await axios.delete(`${API}/user/${id}`);
            setUsersData((prev) => prev.filter((l) => l._id !== id));
        } catch (err) {
            console.error('Failed to delete user', err);
        }
    };

    // Function for login in user
    const loginUser = async (data) => {

        console.log("User context: ", data);

        try {
            const res = await axios.post('https://week-8-capstone-codewithmokone.onrender.com/api/user/login', formData);

              const userInfo = res.data;
            //   setUserProfile(userInfo);
              console.log(userInfo);

            //   localStorage.setItem('token', res.data.token);
            //   localStorage.setItem('user', JSON.stringify(res.data.user));

            toast.success('Logged in successfully!');

            navigate('/dashboard'); // redirect on success
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <UsersContext.Provider value={{ addUser, userProfile, setUserProfile,usersData, updateUser, deleteUser, loginUser, loading, error }}>
            {children}
        </UsersContext.Provider>
    )
}