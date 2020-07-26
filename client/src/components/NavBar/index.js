import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './style';
import { AuthContext } from '../../context/AuthContext';

const NavBar = () => {
  const classes = useStyles();

  const { user, logout } = useContext(AuthContext);

  const button = (
      user.isAuthenticated ? 
      <Button onClick={logout} color="inherit">Sign Out</Button> :
      <div>
        <Button component={Link} to="/register" color="inherit">Sign up</Button>
        <Button component={Link} to="/login" color="inherit">Login</Button>
      </div>
    )

  return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            MERN AUTH
          </Typography>
          { button }
        </Toolbar>
      </AppBar>
  );
}

export default NavBar;