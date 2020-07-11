import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../utils/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Typography from '@material-ui/core/Typography';
import useStyles from './style';
import Container from '@material-ui/core/Container';
import Footer from '../../components/Footer';
import AlertComponent from '../../components/AlertComponent';
import API from '../../utils/API';

const ForgotPassword = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const { alert, setAlert, clearAlert } = useContext(AuthContext);

  useEffect(() => {
    if (alert.flash === false) {
      setAlert({
        type: null,
        message: null,
        flash: false
      })
    }
  },[alert.flash, setAlert])

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
    event.preventDefault()
    
    let valid = validationCheck()
    
    if (valid) {
      API.resetPassword(formData)
      .then( res => {
        setAlert({type: "success", msg: res.data.message, flash: true})
        history.push("/login")
      })
      .catch( err => {
        let data = err.response.data;
        
        if ( data ) {
          setAlert({type: "error", msg: data.message, flash: false})
        } else {
          setAlert({type: "error", msg: "Oops, something went wrong!", flash: false})
        }
      })
    }
  }

  const resetForms = () => {
    if (alert.type !== null || alert.msg !== null) {
      clearAlert()
    }

    if (validation !== null){
      setvalidation({
        passwordError: null,
        confirmPasswordError: null
      })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VpnKeyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create New Password
        </Typography>
        <Typography component="h1" variant="body2" className={classes.text}>
        Your password must be at least 6 characters long, contain at least one letter and one number.
        </Typography>
        <AlertComponent />
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
              <Link to="/" variant="body2">
                Back to Home Page 
              </Link>
            </Grid>
            <Grid item>
              <Link to="/login" variant="body2">
              Just Remembered? Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Footer />
      </Box>
    </Container>
  );
}

export default ForgotPassword;