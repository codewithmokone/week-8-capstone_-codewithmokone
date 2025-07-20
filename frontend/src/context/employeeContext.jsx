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
      const res = await axios.post('/employees', data);
      setEmployees((prev) => [...prev, res.data]);
    } catch (err) {
      console.error('Failed to add employee', err);
    }
  };

  const updateEmployee = async (id, data) => {
    try {
      const res = await axios.put(`/employees/${id}`, data);
      setEmployees((prev) =>
        prev.map((e) => (e._id === id ? res.data : e))
      );
    } catch (err) {
      console.error('Failed to update employee', err);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`/employees/${id}`);
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