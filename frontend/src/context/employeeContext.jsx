import { createContext, useEffect, useState } from "react";

export const EmployeeContext = createContext();

export const EmployeeProvider = ({children}) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch('http://localhost:4000/api/employees/');
                const json = await response.json();
               
                if(response.ok) {
                    setEmployees(json);
                }
            } catch (error) {
                setError(error.message || 'Failed to fetch employees.')
            }finally{
                setLoading(false);
            }
        }

        fetchData()
    }, []);

    console.log("Employee Context: ", employees);
    
    return (
        <EmployeeContext.Provider value={{employees, loading, error}}>
            {children}
        </EmployeeContext.Provider>
    )
}