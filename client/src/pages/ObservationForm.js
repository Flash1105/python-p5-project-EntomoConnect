import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


function ObservationForm() {
    const [content, setContent] = useState('');
    

    const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const observationData = {
          
            content: content,
    }
        try {
            const response = await fetch('/api/observations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ observationData }),
            });

            if (response.status === 201) {
                console.log('observation created successfully');              
                setContent('');
                
            const newObservation = await response.json();
                history.push('/dashboard', { newObservation });
            
            } else {
                console.error('There was an error creating the observation');
            }
        } catch (error) {
            console.error('There was an error', error);
        }
    };

    return (
        <div>
            <h2>Create a New Observation</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Post your observation here!"
                        required
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
            <Link to="/dashboard">Back to Dashboard</Link>
        </div>
    );
}

export default ObservationForm;