import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/logout">Logout</Link>
      <Link to="/">Home</Link>
      <Link to ="/discussions-form">Discussions</Link>
      <Link to ="/observations-form">Observations</Link>
      <Link to ="/edit-observation">Edit Observation</Link>
    </nav>
  );
};

export default NavBar;