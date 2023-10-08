import React, { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

const DashboardPage = () => {
  const [observations, setObservations] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const[isLoggedIn, setIsLoggedIn] = useState(true);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    fetchObservations();
    fetchDiscussions();
    setIsLoggedIn(location.state?.isLoggedIn || true);
  }, [location.state]);

  const handleLogout = () => {
      
    setIsLoggedIn(false);
    history.push('/');
  };

  const fetchObservations = async () => {
    try {
      const response = await fetch('/api/observations');
      if (response.ok) {
        const data = await response.json();
        setObservations(data);
      } else {
        
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
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <h1>Welcome </h1>
      {isLoggedIn && (
        <Link to ="/">
          <button onClick={handleLogout}>Logout</button>
        </Link>
        
      )}
      </div>
      <div>
        <h2>Observations.  this is where observations will be present</h2>
        <Link to="/">
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
        <Link to="/discussions-form">
          <button>Add New Discussion</button>
        </Link>
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
