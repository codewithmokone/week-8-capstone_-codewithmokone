import { createContext, useEffect, useState } from "react";
// import axios from '../api/axios';
import axios from 'axios'

const API = import.meta.env.VITE_API_URL;

export const LearnerContext = createContext();

export const LearnerProvider = ({ children }) => {
    const [learnersData, setLearnersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await axios(`${API}/learners/`);

                const learners = response.data;

                setLearnersData(learners);
                
                localStorage.setItem('numberOfLearners', learners.length);

            } catch (error) {
                setError(error.message || 'Failed to fetch learners.')
            } finally {
                setLoading(false);
            }
        }

        fetchData()
    }, []);


    // Function for creating a new learner
    const addLearner = async (data) => {

        console.log(data);
        

        try {
            const response = await axios.post(`${API}/learners/register`, data);
            const newLearner = response.data;

            setLearnersData((prev) => [...prev, newLearner]);
        } catch (err) {
            console.error('Failed to add learner', err);
        }
    };

    // Function for updating a learner
    const updateLearner = async (id, updatedData) => {

        try {
            const res = await axios.put(`${API}/learners/${id}`, updatedData);
            const updatedLearner = res.data;
            
            setLearnersData((prev) =>
                prev.map((l) => (l._id === id ? res.data : l))
            );
        } catch (err) {
            console.error('Failed to update learner', err);
        }
    };

    // Function for delete a learner
    const deleteLearner = async (id) => {
        try {
            await axios.delete(`${API}/learners/${id}`);
            setLearnersData((prev) => prev.filter((l) => l._id !== id));
        } catch (err) {
            console.error('Failed to delete learner', err);
        }
    };

    return (
        <LearnerContext.Provider value={{ learnersData, addLearner, updateLearner, deleteLearner, loading, error }}>
            {children}
        </LearnerContext.Provider>
    )
}