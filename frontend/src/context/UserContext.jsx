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
            setLearners((prev) =>
                prev.map((l) => (l._id === id ? res.data : l))
            );
        } catch (err) {
            console.error('Failed to update user', err);
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

    return (
        <UsersContext.Provider value={{ addUser, userProfile, usersData, updateUser, deleteUser, loading, error }}>
            {children}
        </UsersContext.Provider>
    )
}