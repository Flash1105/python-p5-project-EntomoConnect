import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const [observations, setObservations] = useState([]);
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    fetchObservations();
    fetchDiscussions();
  }, []);

  const fetchObservations = async () => {
    try {
      const response = await fetch('/api/observations');
      if (response.ok) {
        const data = await response.json();
        setObservations(data);
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error fetching observations:', error);
    }
  };

  const fetchDiscussions = async () => {
    try {
      const response = await fetch('/api/discussions');
      if (response.ok) {
        const data = await response.json();
        setDiscussions(data);
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error fetching discussions:', error);
    }
  };

  return (
    <div>
      <h1>Welcome </h1>
      <div>
        <h2>Observations.  this is where observations will be present</h2>
        <Link to="/observations-form">
          <button>Add New Observation</button>
        </Link>
        {observations.map((observation) => (
          <div key={observation.id}>
            <h3>{observation.title}</h3>
            <p>{observation.content}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Discussions.  this is where you can see comments</h2>
        {discussions.map((discussion) => (
          <div key={discussion.id}>
            <p>{discussion.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
