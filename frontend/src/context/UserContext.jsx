import { createContext, useEffect, useState } from "react";
// import axios from '../api/axios';
import axios from 'axios'

export const UsersContext = createContext();

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
                const response = await axios('https://week-8-capstone-codewithmokone.onrender.com/api/user/');
               
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
        // fetchUserProfile();
    }, []);

    // Fetching user profile
    // const fetchUserProfile = async () => {
    //     setLoading(true);
    //     try {
    //         const token = localStorage.getItem("token"); // or from cookies/context
    //         const response = await fetch('http://localhost:4000/api/user/profile', {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //                 'Content-Type': 'application/json'
    //             }
    //         });

    //         if (!response.ok) throw new Error("Failed to fetch user profile");
    //         const profile = await response.json();
    //         setUserProfile(profile);
    //     } catch (error) {
    //         setError(error.message || 'Failed to fetch user profile.');
    //     } finally {
    //         setLoading(false);
    //     }
    // }


    // Create
    const addUser = async (data) => {
        console.log("add User: ", data);

        try {
            const response = await axios.post("https://week-8-capstone-codewithmokone.onrender.com/api/users/register", data);
            // const res = await axios.post('http://localhost:4000/api/learners/register', data);
            setUsers((prev) => [...prev, response.data]);
        } catch (err) {
            console.error('Failed to add user', err);
        }
    };

    // Update
    const updateUser = async (id, updatedData) => {
        try {
            const res = await axios.put(`https://week-8-capstone-codewithmokone.onrender.com/api/users/${id}`, updatedData);
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
            await axios.delete(`https://week-8-capstone-codewithmokone.onrender.com/api/user/${id}`);
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