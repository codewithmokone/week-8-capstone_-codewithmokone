import { createContext, useEffect, useState } from "react";
// import axios from '../api/axios';
import axios from 'axios'

export const LearnerContext = createContext();

export const LearnerProvider = ({ children }) => {
    const [learnersData, setLearnersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                // const res = await axios.get('/learners');
                const response = await fetch('http://localhost:4000/api/learners/');
                const json = await response.json();

                if (response.ok) {
                    setLearnersData(json);
                    localStorage.setItem('numberOfLearners', json.length);
                }
            } catch (error) {
                setError(error.message || 'Failed to fetch learners.')
            } finally {
                setLoading(false);
            }
        }

        fetchData()
    }, []);


    // Create
    const addLearner = async (data) => {
        console.log("add learner: ", data);
        
        try {
            const response = await axios.post("http://localhost:4000/api/learners/register", data);
            // const res = await axios.post('http://localhost:4000/api/learners/register', data);
            setLearners((prev) => [...prev, response.data]);
        } catch (err) {
            console.error('Failed to add learner', err);
        }
    };

    // Update
    const updateLearner = async (id, updatedData) => {
        try {
            const res = await axios.put(`/learners/${id}`, updatedData);
            setLearners((prev) =>
                prev.map((l) => (l._id === id ? res.data : l))
            );
        } catch (err) {
            console.error('Failed to update learner', err);
        }
    };

    // Delete
    const deleteLearner = async (id) => {
        try {
            await axios.delete(`/learners/${id}`);
            setLearners((prev) => prev.filter((l) => l._id !== id));
        } catch (err) {
            console.error('Failed to delete learner', err);
        }
    };

    return (
        <LearnerContext.Provider value={{ learnersData ,addLearner, updateLearner, deleteLearner, loading, error }}>
            {children}
        </LearnerContext.Provider>
    )
}