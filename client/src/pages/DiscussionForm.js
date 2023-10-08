import React, { useState } from 'react';


function DiscussionForm () {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/discussions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        });

        if (response.ok) {

        } else {
        }
    };

    return (
        <div>
            <h2> Create a New Discussion</h2>
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
    )
}

export default DiscussionForm;