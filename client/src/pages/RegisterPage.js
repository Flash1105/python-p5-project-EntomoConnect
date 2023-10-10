import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom';


const validate = values => {
    const errors = {};
    //username validation
    if (!values.username) {
        errors.username = 'Required';
    } else if(typeof values.username !== 'string') {
        errors.username = 'Must be a string'
    }
    //email validation
    if (!values.email) {
        errors.email = 'Required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }
    // password validation
    if (!values.password) {
        errors.password = 'Required';
    }
    if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Password must match"
    }
    return errors;
};

const RegisterPage = () => {
    const history = useHistory();
    const [message, setMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword:''
        },
        // assiging the above validation function

        validate,
        onSubmit: async values => {
            try {
                const response = await fetch('http://localhost:5555/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                });
                const data = await response.json();

                // check respose status
                if(response.ok) {
                    console.log(data.message);
                    setMessage("User created successfully");
                    history.push('/dashboard');
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error('There was an error', error);
                setMessage("There was an error creating the user");
            }

            
        }
});

// navigate back to home
const goBack = () => {
    history.push('/')
};

// render 
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                {formik.errors.username ? <div>{formik.errors.username}</div> : null}

                <label htmlFor="email">Email</label> 
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.errors.email ? <div>{formik.errors.email}</div> : null}

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.errors.password ? <div>{formik.errors.password}</div> :null}

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
            />
                {formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}
            
                <button type="button" onClick={goBack}>Back</button>
                <button type="submit">Submit</button>
            </form>
    
            {message && <div className="message">{message}</div>}
        </div>
        );
    };

    export default RegisterPage