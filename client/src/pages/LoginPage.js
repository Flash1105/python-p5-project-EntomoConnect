
import React from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Required';
    }
    if (!values.email) {
        errors.email = 'Required';
    }
    return errors;
};

const LoginPage = () => { 
    const formik = useFormik({
        initialValues: {
            username: '',
            email: ''
        },
        validate, 
        onSubmit: values => {
            console.log(values);
        },
    });

    const history = useHistory();

    const goBack = () => {
        history.push('/');
    };

    return (
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

            <button type="button" onClick={goBack}>Back</button>
            <button type="submit">Submit</button>
        </form>
    );
};

export default LoginPage;