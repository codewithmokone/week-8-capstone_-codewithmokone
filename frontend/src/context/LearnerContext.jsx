import { createContext, useEffect, useState } from "react";
// import axios from '../api/axios';
import axios from 'axios'

// const API = import.meta.env.API_URL

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
                const response = await axios('https://week-8-capstone-codewithmokone.onrender.com/api/learners/');
                const learners = response.data;

                if (learners.ok) {
                    setLearnersData(learners);
                    localStorage.setItem('numberOfLearners', learners.length);
                }
            } catch (error) {
                setError(error.message || 'Failed to fetch learners.')
            } finally {
                setLoading(false);
            }
        }

        fetchData()
    }, []);

    console.log("Learner Context: ",learnersData );


    // Create
    const addLearner = async (data) => {
        console.log("add learner: ", data);
        
        try {
            const response = await axios.post('https://week-8-capstone-codewithmokone.onrender.com/api/learners/register', data);
            // const res = await axios.post('http://localhost:4000/api/learners/register', data);
            setLearnersData((prev) => [...prev, response.data]);
        } catch (err) {
            console.error('Failed to add learner', err);
        }
    };

    // Update
    const updateLearner = async (id, updatedData) => {
        try {
            const res = await axios.put(`${API}/learners/${id}`, updatedData);
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
            await axios.delete(`${API}/learners/${id}`);
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