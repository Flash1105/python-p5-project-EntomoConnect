import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function EditObservationPage() {
  const { id } = useParams();
  const history = useHistory();

  const [observation, setObservation] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/api/observations/${id}`)
      .then((response) => response.json())
      .then((data) => setObservation(data))
      .catch((error) => console.error('Error fetching observation:', error));
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:5555/api/observations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(observation),
      });

      if (response.status === 200) {
        history.push('/dashboard');
      } else {
        console.error('Error updating observation:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating observation:', error);
    }
  };

  return (
    <div>
      <h2>Edit Observation</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={observation.title}
            onChange={(e) =>
              setObservation({ ...observation, title: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={observation.content}
            onChange={(e) =>
              setObservation({ ...observation, content: e.target.value })
            }
            required
          ></textarea>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditObservationPage;
