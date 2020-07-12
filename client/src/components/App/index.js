import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import Dashboard from '../../pages/DashboardPage';
import NotFoundPage from '../../pages/NotFoundPage';
import PrivateRoute from '../../utils/PrivateRoute';
import ForgotPassword from '../../pages/ForgotPassword'
import ResetPassword from '../../pages/ResetPassword'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import './global.css';

toast.configure()

function App() {
  return (
    <>
    <ToastContainer 
      position={"bottom-center"} 
      autoClose={5000}
      limit={1}
      hideProgressBar={true} 
      transition={Slide}
      draggable={false}
      closeButton={false}
    />
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/forgot" component={ForgotPassword} />
          <Route path="/reset/:token" component={ResetPassword} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
    </BrowserRouter>
    </>
  );
};

export default App;
