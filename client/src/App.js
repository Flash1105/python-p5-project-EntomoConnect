import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DiscussionForm from './pages/DiscussionForm';
import ObservationForm from './pages/ObservationForm';

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={HomePage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/discussions-form" component={DiscussionForm} />
      <Route path="/observations-form" component={ObservationForm} />
    </Router>
  );
};

export default App;