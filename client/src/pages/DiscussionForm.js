import React, { useState } from 'react';

function DiscussionForm() {
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const discussionData = {
            userId: userId,
            content: content,
    }
        try {
            const response = await fetch('/api/discussions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ discussionData }),
            });

            if (response.status === 201) {
                console.log('Discussion created successfully');
              
                setContent('');
            } else {
                console.error('There was an error creating the discussion');
            }
        } catch (error) {
            console.error('There was an error', error);
        }
    };

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
        </div>
    );
}

export default DiscussionForm;