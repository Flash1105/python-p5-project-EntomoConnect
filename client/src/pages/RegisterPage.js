import React from 'react'
import { useFormik } from 'formik'

const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Required';
    }
    if (!values.email) {
        errors.email = 'Required';
    }
    if (!values.password) {
        errors.password = 'Required';
    }
    if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Password must match"
    }
    return errors;
};

const RegisterPage = () => {
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword:''
        },
        validate,
        onSubmit: values => {
            console.log(values);
        },
});

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

            <button type="submit">Submit</button>
        </form>
    );
    };

    export default RegisterPage