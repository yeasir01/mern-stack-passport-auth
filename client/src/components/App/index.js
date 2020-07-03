import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import Dashboard from '../../pages/DashboardPage';
import NotFoundPage from '../../pages/NotFoundPage';
import PrivateRoute from '../../utils/PrivateRoute';
import './global.css';

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
    </BrowserRouter>
  );
};

export default App;
