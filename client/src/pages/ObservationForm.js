import React, { useState } from 'react';

const ObservationForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/observations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });

        if (response.status === 201) {
            //observation created 
        } else {            
        
    }
    };

    return ( 
        <div>
            <h2> Create a New Observation</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="content">Content</label>
                    <textarea 
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    />
                </div>            
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ObservationForm;
