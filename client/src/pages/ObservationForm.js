import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function ObservationForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const location = useLocation();
    const history = useHistory();

    const queryParams = new URLSearchParams(location.search);
    const observationIdParam = queryParams.get('id') || '';
    const contentParam = queryParams.get('content');

    useEffect(() => {
        if (observationIdParam) {
            setTitle(`Edit Observation ${observationIdParam}`);
            setContent(contentParam || '');
        } else {
            setTitle('');
            setContent('');
        }
    }, [observationIdParam, contentParam]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage('');
        setSuccessMessage('');

        if (title === '') {
            setErrorMessage('Title is required');
            return;
        }
        if (content === '') {
            setErrorMessage('Content is required');
            return;
        }

        const observationData = {
            title: title,
            content: content,
        };

        try {
            let response;

            if (observationIdParam) {
                response = await fetch(`http://127.0.0.1:5555/api/observations/${observationIdParam}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(observationData),
                });
            } else {
                response = await fetch('http://127.0.0.1:5555/api/observations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(observationData),
                });
            }
           
            if (response.status === 200 || response.status === 201) {
                const message = observationIdParam ? 'Observation updated successfully' : 'Observation created successfully';
                console.log(message);
                setTitle('');
                setContent('');

                const newObservation = await response.json();
                history.push('/dashboard', { newObservation });
                setSuccessMessage(message);
            } else {
                console.error('There was an error creating the observation');
                setErrorMessage('There was an error creating the observation');
            }
        } catch (error) {
            console.error('There was an error', error);
            setErrorMessage('There was an error. Please try again later.');
        }
    };

    return (
        <div>
            <h2>{observationIdParam ? 'Edit Observation' : 'Create a New Observation'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title of observation"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Post your observation here!"
                        required
                    ></textarea>
                </div>
                <button type="submit">{observationIdParam ? 'Update' : 'Submit'}</button>
            </form>
            {errorMessage && <p className="error">{errorMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            <Link to="/dashboard">Back to Dashboard</Link>
        </div>
    );
}

export default ObservationForm;
