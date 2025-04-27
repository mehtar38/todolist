import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

const Tasks = () => {
  const { user, logout } = useContext(AuthContext); // Access current user and logout function
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      console.log("User not logged in");
      window.location.href = "/api/register"; // Redirect to login if no user in context
      return;
    }

    // If there's a user, proceed to fetch tasks
    const fetchTasks = async () => {
      setLoading(true); // Start loading
      console.log("Token sent to API: ", user?.token);
      const response = await fetch("/api/tasks", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${user?.token}` // Get token directly from user state
        }
      });

      const data = await response.json();
      // console.log("Fetched tasks:", data);
      setLoading(false); // Stop loading when data is fetched
    };

    fetchTasks();
  }, [user]); // Only re-run if `user` changes

  // If loading, show loading message or spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Your Tasks</h1>
      {/* Render tasks here */}
    </div>
  );
};

export default Tasks;
