import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import Dashboard from '../../pages/DashboardPage';
import NotFoundPage from '../../pages/NotFoundPage';
import { userContext } from '../../context/user';
import PrivateRoute from '../../utils/PrivateRoute';
import API from  '../../utils/API';
import './global.css';

function App() {

  const [userState, setUserState] = useState({
    authenticated: false,
    userId: null,
    name: null
  });

  const logout = () => {
    API.logout()
    .then(res => {
      setUserState({
        authenticated: false,
        userId: null,
        name: null
      })
    })
    .catch(err => {
      console.log(err);
      setUserState({
        authenticated: false,
        userId: null,
        name: null
      })
    })
  };

  return (
      <userContext.Provider value={{userState, setUserState, logout}}>
        <userContext.Consumer>
          {(props) => (
            <BrowserRouter>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </BrowserRouter>
          )}
        </userContext.Consumer>
      </userContext.Provider>
  );
};

export default App;
