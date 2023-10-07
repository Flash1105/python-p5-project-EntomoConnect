import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
    const [error, setError] = useState('');
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '', 
        },
        onSubmit: async (values) => {
            try {
            
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

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

