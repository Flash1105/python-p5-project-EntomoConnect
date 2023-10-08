import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DiscussionForm from './pages/DiscussionForm';
import ObservationForm from './pages/ObservationForm';
import LogoutPage from './pages/LogoutPage';

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={HomePage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/dashboard/:newObservation/:newDiscussion" component={Dashboard} />
      <Route path="/discussions-form" component={DiscussionForm} />
      <Route path="/observations-form" component={ObservationForm} />
      <Route path="/logout" component={LogoutPage} />
    </Router>
  );
};

export default App;
