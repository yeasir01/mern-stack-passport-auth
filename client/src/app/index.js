import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthProvider from '../context/AuthContext';
import Layout from '../layout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Dashboard from '../pages/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import PrivateRoute from '../utils/PrivateRoute';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#40739e",
    },
    secondary: {
      main: red[500],
    },
  }
});

const App = () => {
  return (
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <BrowserRouter>
              <Layout>
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/login" component={LoginPage} />
                  <Route path="/register" component={RegisterPage} />
                  <Route path="/forgot-password" component={ForgotPassword} />
                  <Route path="/reset-password/:token" component={ResetPassword} />
                  <PrivateRoute path="/dashboard" component={Dashboard} />
                  <Route path="*" component={NotFoundPage} />
                </Switch>
              </Layout>
            </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
  );
};

export default App;