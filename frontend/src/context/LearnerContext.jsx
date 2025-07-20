import { createContext, useEffect, useState } from "react";
import axios from '../service/axios';

export const LearnerContext = createContext();

export const LearnerProvider = ({ children }) => {
    const [learners, setLearners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await axios.get('learners/');
                const json = await response.json();

                if (response.ok) {
                    setLearners(json);
                }
            } catch (error) {
                setError(error.message || 'Failed to fetch learners.')
            } finally {
                setLoading(false);
            }
        }

        fetchData()
    }, []);


    // ➕ Create
    const addLearner = async (learnerData) => {
        try {
            const res = await axios.post('/learners', learnerData);
            setLearners((prev) => [...prev, res.data]);
        } catch (err) {
            console.error('Failed to add learner', err);
        }
    };

    // ✏️ Update
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

    // ❌ Delete
    const deleteLearner = async (id) => {
        try {
            await axios.delete(`/learners/${id}`);
            setLearners((prev) => prev.filter((l) => l._id !== id));
        } catch (err) {
            console.error('Failed to delete learner', err);
        }
    };

    console.log("Learner Context: ", learners);

    return (
        <LearnerContext.Provider value={{ learners, loading, error }}>
            {children}
        </LearnerContext.Provider>
    )
}