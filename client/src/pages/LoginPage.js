import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
    // local state for handling error
    const [error, setError] = useState('');
    // hook to  navigate
    const history = useHistory();
// setting up formik for foorm state management
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '', 
        },
        onSubmit: async (values) => {
            try {
            // api call for login
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                // successfull login lead to dashboard
                if (response.status === 200) {
                    history.push('/dashboard');
                } else {
                    setError('Invalid username or password');
                }
            } catch (error) {
                console.error('Login error:', error);
                setError('There was an error during login');
            }
        },
    });

    //render login form
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password" 
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                </div>

                <button type="submit">Login</button>
            </form>

            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default LoginPage;

