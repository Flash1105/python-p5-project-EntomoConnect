import React, { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

const DashboardPage = () => {
  // Hooks
  const [observations, setObservations] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const location = useLocation();
  const history = useHistory();

  // fetch for component mount
  useEffect(() => {
    fetchObservations();
    fetchDiscussions();
    setIsLoggedIn(location.state?.isLoggedIn || true);
  }, [history, location.state?.isLoggedIn]);

  // checks URL for flags and updates when needed
  const searchParams = new URLSearchParams(location.search);
  if (searchParams.get('newObservation') === 'true' || searchParams.get('newDiscussion') === 'true') {
    history.replace('/dashboard');
  }

  // logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    history.push('/');
  };

  // fetch obsevations from backend
  const fetchObservations = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/api/observations`);
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

  // fetch discussions from backend
  const fetchDiscussions = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/api/discussions`);
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

  // delete specific observations
  const handleDeleteObservation = async (observationId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/api/observations/${observationId}`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        
        // remove deleted observation from list
        setObservations((prevObservations) =>
          prevObservations.filter((observation) => observation.id !== observationId)
        );
      } else {
        console.error('Error deleting observation:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting observation:', error);
    }
  };

  // render dashboard
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Welcome</h1>
        {isLoggedIn && (
          <Link to="/">
            <button onClick={handleLogout}>Logout</button>
          </Link>
        )}
      </div>
      <div>
        <h2>Observations. this is where observations will be submitted</h2>
        <Link to="/observations-form">
          <button>Add New Observation</button>
        </Link>
        {observations.map((observation) => (
          <div key={observation.id}>
            <h3>{observation.title}</h3>
            <p>{observation.content}</p>
            {isLoggedIn && (
              <div>
                <Link to={`/edit-observation/${observation.id}`}>
                  <button>Edit Observation</button>
                </Link>
                <button onClick={() => handleDeleteObservation(observation.id)}>Delete Observation</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <h2>Discussions. this is where you can write comments</h2>
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
