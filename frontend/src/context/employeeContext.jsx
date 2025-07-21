import axios from "axios";
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
                const response = await fetch('https://week-8-capstone-codewithmokone.onrender.com/api/employees/');
                const json = await response.json();
               
                if(response.ok) {
                    setEmployees(json);
                    localStorage.setItem('numberOfEmployees', json.length);
                }
            } catch (error) {
                setError(error.message || 'Failed to fetch employees.')
            }finally{
                setLoading(false);
            }
        }

        fetchData()
    }, []);

    const addEmployee = async (data) => {
    try {
      const res = await axios.post('https://week-8-capstone-codewithmokone.onrender.com/api/employees/', data);
      setEmployees((prev) => [...prev, res.data]);
    } catch (err) {
      console.error('Failed to add employee', err);
    }
  };

  const updateEmployee = async (id, data) => {
    try {
      const res = await axios.put(`https://week-8-capstone-codewithmokone.onrender.com/api/employees/${id}`, data);
      setEmployees((prev) =>
        prev.map((e) => (e._id === id ? res.data : e))
      );
    } catch (err) {
      console.error('Failed to update employee', err);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`https://week-8-capstone-codewithmokone.onrender.com/api/employees/${id}`);
      setEmployees((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error('Failed to delete employee', err);
    }
  };
    
    return (
        <EmployeeContext.Provider value={{employees, addEmployee, updateEmployee, deleteEmployee, loading, error, setEmployees}}>
            {children}
        </EmployeeContext.Provider>
    )
}