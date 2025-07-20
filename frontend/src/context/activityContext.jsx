import { createContext, useContext, useState } from 'react';

const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch learners
  const fetchActivities = async () => {
    try {
      const res = await axios.get('/activities');
      setActivities(res.data);
    } catch (err) {
      console.error('Failed to fetch activities', err);
    } finally {
      setLoading(false);
    }
  };

  // Create
  const addActivity = async (learnerData) => {
    try {
      const res = await axios.post('/activities', learnerData);
      setLearners((prev) => [...prev, res.data]);
    } catch (err) {
      console.error('Failed to add activity', err);
    }
  };

  // Update
  const updateActivity = async (id, updatedData) => {
    try {
      const res = await axios.put(`/activities/${id}`, updatedData);
      setActivities((prev) =>
        prev.map((l) => (l._id === id ? res.data : l))
      );
    } catch (err) {
      console.error('Failed to update activity', err);
    }
  };

  // Delete
  const deleteActivity = async (id) => {
    try {
      await axios.delete(`/learners/${id}`);
      setLearners((prev) => prev.filter((l) => l._id !== id));
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
