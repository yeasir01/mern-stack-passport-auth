import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useStyles from './style';
import Container from '@material-ui/core/Container';
import Footer from '../../components/Footer';
import AlertComponent from '../../components/AlertComponent';
import API from '../../utils/API';

const SignIn = () => {
  const classes = useStyles();

  const [alert, setAlert] = useState({
    type: null,
    msg: null
  })

  const [formData, setFormData] = useState({
    email: ''
  })

  const [validation, setvalidation] = useState({
    emailError: null
  })

  const checkEmail = email => {
    let regex = /^\S+@\S+\.\S+$/;
    return regex.test(email)
  }

  const validationCheck = () => {
    if (formData.email === "") {
      setvalidation({...validation, emailError: "Email cannot be blank"})
      return false
    }

    if (!checkEmail(formData.email)) {
      setvalidation({...validation, emailError: "Please enter a valid email address"})
      return false
    }
    
    return true
  }
  
  const handleChange = (event) => {
    let {value, name} = event.currentTarget;
    setFormData({...formData, [name]:value})
    clearAlert()
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    
    let valid = validationCheck()
    
    if (valid) {
      API.forgotPassword(formData)
      .then( res => {
        setAlert({type: "success", msg: res.data.message})
        setFormData({email: ''})
      })
      .catch( err => {
        let data = err.response.data;
        
        if ( data ) {
          setAlert({type: "error", msg: data.message})
        } else {
          setAlert({type: "error", msg: "Oops, something went wrong!"})
        }
      })
    }
  }

  const clearAlert = () => {
    if (alert.type !== null || alert.msg !== null) {
      setAlert({
        type: null,
        msg: null
      })
    }

    if (validation !== null){
      setvalidation({
        emailError: null
      })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Password Reset
        </Typography>
        <Typography component="h1" variant="body2" className={classes.text}>
        Enter your email that you used to register. We'll send you an email with a link to reset your password.
        </Typography>
        {alert.type && <AlertComponent type={alert.type} message={alert.msg}/>}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            error = {validation.emailError}
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
              <Link to="/" variant="body2">
                Back Home 
              </Link>
            </Grid>
            <Grid item>
              <Link to="/login" variant="body2">
              Remember your password?
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

export default SignIn;