import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function DiscussionForm() {
    const [content, setContent] = useState('');
    const [userId] = useState(1);

    // handle form submissions
    const handleSubmit = async (e) => {
        // prevent default form behavior 
        e.preventDefault();

        // construct discussion data
        const discussionData = {
            userId: userId,
            content: content,
        };
         // post discussion to backend 
        try {
            const response = await fetch('http://127.0.0.1:5555/api/discussions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(discussionData),
            });

            if (response.status === 201) {
                // clear text area after successful submit  
                console.log('Discussion created successfully');
                setContent('');
            } else {
                console.error('There was an error creating the discussion');
            }
        } catch (error) {
            console.error('There was an error', error);
        }
    };

    // render 
    return (
        <div>
            <h2>Create a New Discussion</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your discussion here"
                        required
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
            <Link to="/dashboard">Back to Dashboard</Link>
        </div>
    );
}

export default DiscussionForm;
