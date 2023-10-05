import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';


const App = () => {
  return (
    <Router>
      
      <Route path="/" exact component={HomePage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
    </Router>
  );
};

export default App;