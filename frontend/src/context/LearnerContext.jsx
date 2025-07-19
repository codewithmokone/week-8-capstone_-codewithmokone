import { createContext, useEffect, useState } from "react";

export const LearnerContext = createContext();

export const LearnerProvider = ({children}) => {
    const [learners, setLearners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch('http://localhost:4000/api/learners/');
                const json = await response.json();
               
                if(response.ok) {
                    setLearners(json);
                }
            } catch (error) {
                setError(error.message || 'Failed to fetch learners.')
            }finally{
                setLoading(false);
            }
        }

        fetchData()
    }, []);

    console.log("Learner Context: ", learners);
    
    return (
        <LearnerContext.Provider value={{learners, loading, error}}>
            {children}
        </LearnerContext.Provider>
    )
}