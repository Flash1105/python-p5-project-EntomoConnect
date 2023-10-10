import React from 'react';
import { Link } from 'react-router-dom'

// homepage functional component
const HomePage = () => {
    return(
        // homepage
        <div className="home-page">
            <h1>Welcome to EntomoConnect</h1>
            <div className="navigation-buttons">
                <Link to ="/login">
                    <button>log In</button>
                </Link>
                <Link to="/register">
                    <button>Register</button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage