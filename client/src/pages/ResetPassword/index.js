import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Links from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Typography from '@material-ui/core/Typography';
import useStyles from './style';
import Container from '@material-ui/core/Container';
import API from '../../utils/API';
import Alert from '../../components/Alerts';

const ForgotPassword = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const alertCompRef = useRef();

  const [formData, setFormData] = useState({
    token: props.match.params.token,
    password: '',
    confirmPassword: ''
  })

  const [validation, setvalidation] = useState({
    passwordError: null,
    confirmPasswordError: null
  })

  const validationCheck = () => {
    if (formData.password === "") {
      setvalidation({...validation, passwordError: "Password cannot be blank"})
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setvalidation({...validation, confirmPasswordError: "Passwords do not match"})
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
    
    if (valid) {
      API.resetPassword(formData)
      .then( res => {
        history.push({
          pathname: '/login',
          alert: {type: "success", message: "Successfully Changed! Please log in."}
        })
      })
      .catch( err => {
        let data = err.response.data;

        if ( data ) {
          alertCompRef.current.createAlert("error", data.message, true);
        } else {
          alertCompRef.current.createAlert("error", "Oops, something went wrong!", true);
        }
      })
    }
  }

  const resetForms = () => {
    if (validation.passwordError !== null || validation.confirmPasswordError !== null) {
      setvalidation({
        passwordError: null,
        confirmPasswordError: null
      })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VpnKeyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create New Password
        </Typography>
        <Typography component="h1" variant="body2" className={classes.text}>
        Your password must be at least 8 characters long, contain at least one letter and one number.
        </Typography>
        <Alert ref={alertCompRef} />
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            error = {validation.passwordError ? true : false}
            helperText={validation.passwordError}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="New Password"
            name="password"
            type="password"
            autoFocus
            onChange={handleChange}
            value={formData.password}
          />
          <TextField
            error = {validation.confirmPasswordError ? true : false}
            helperText={validation.confirmPasswordError}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            value={formData.confirmPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Set New Password
          </Button>
          <Grid container>
            <Grid item xs>
              <Links component={Link} to="/" variant="body2">
                Back to Home Page 
              </Links>
            </Grid>
            <Grid item>
              <Links component={Link} to="/login" variant="body2">
              Just Remembered? Login
              </Links>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default ForgotPassword;