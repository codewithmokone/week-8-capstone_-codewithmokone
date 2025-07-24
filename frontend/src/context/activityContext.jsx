import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const API = import.meta.env.VITE_API_URL;

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch activities from db
  const fetchActivities = async () => {
    try {
      const res = await axios.get(`${API}/activities/`);
      const activitiesList = res?.data;
      setActivities(activitiesList); 
    } catch (err) {
      console.error('Failed to fetch activities', err);
    } finally {
      setLoading(false);
    }
  };

  // Function for creating a activity
  const addActivity = async (data) => {

    console.log(data);
    
    try {
      const res = await axios.post(`${API}/activities/`, data);
      const newActivity = res?.data;

      setActivities((prev) => [...prev, newActivity]);
    } catch (err) {
      console.error('Failed to add activity', err);
    }
  };

  // Update
  // const updateActivity = async (id, updatedData) => {
  //   try {
  //     const res = await axios.put(`/activities/${id}`, updatedData);
  //     setActivities((prev) =>
  //       prev.map((l) => (l._id === id ? res.data : l))
  //     );
  //   } catch (err) {
  //     console.error('Failed to update activity', err);
  //   }
  // };

  // Delete
  const deleteActivity = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/activities/${id}`);
      setActivities((prev) => prev.filter((l) => l._id !== id));
    } catch (err) {
      console.error('Failed to delete activity', err);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <ActivityContext.Provider value={{ activities, setActivities, addActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};
