import React, { useState, useContext, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Links from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useStyles from './style';
import Container from '@material-ui/core/Container';
import API from '../../utils/API';
import Alert from '../../components/Alerts';
import { validEmail, validPassword } from '../../utils/ValidationHelpers';

const SignIn = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const alertCompRef = useRef();
  
  const { setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [validation, setvalidation] = useState({
    emailError: null,
    passwordError: null
  })

  const validationCheck = () => {
    if (formData.email === "") {
      setvalidation({...validation, emailError: "Email cannot be blank"})
      return false
    }

    if (!validEmail(formData.email)) {
      setvalidation({...validation, emailError: "Please enter a valid email address"})
      return false
    }

    if (formData.password === "") {
      setvalidation({...validation, passwordError: "Password cannot be blank"})
      return false
    }

    if (!validPassword(formData.password)) {
      setvalidation({...validation, passwordError: "Invalid password! Should be eight characters in length, at least one letter & one number."})
      return false
    }

    return true
  }
  
  const handleChange = (event) => {
    let {value, name} = event.currentTarget;
    setFormData({...formData, [name]:value})
    resetForms()
  }
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    let valid = validationCheck();
    let { from } = location.state || { from: {pathname: "/dashboard"}};
    
    if (valid) {
      API.login(formData)
      .then(res => {
  
        setUser({
          isAuthenticated: res.data.isAuthenticated,
          name: res.data.user,
          id: res.data.id
        });
  
        history.replace(from)
      })
      .catch(err => {
        let status = err.response.status;

        if ( status === 401 ) {
          alertCompRef.current.createAlert("error", "Incorrect username or password.", true);
        } else {
          alertCompRef.current.createAlert("error", "Oops, something went wrong.", true);
        }
      })
    }
  }

  const resetForms = () => {
    if (validation.emailError !== null || validation.passwordError !== null) {
      setvalidation({
        emailError: null,
        passwordError: null
      })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Alert ref={alertCompRef} />
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            error = {validation.emailError ? true : false}
            helperText={validation.emailError}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            value={formData.email}
          />
          <TextField
            error = {validation.passwordError ? true : false}
            helperText={validation.passwordError}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={formData.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Links component={Link} to="/forgot-password" variant="body2">
                Forgot password?
              </Links>
            </Grid>
            <Grid item>
              <Links component={Link} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Links>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignIn;