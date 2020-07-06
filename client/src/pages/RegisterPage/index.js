import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Footer from '../../components/Footer';
import useStyles from './style'
import AlertComponent from '../../components/AlertComponent'
import API from '../../utils/API';

const Register = () => {
  const classes = useStyles();

  const [alert, setAlert] = useState({
    type: null,
    msg: null
  })

  const [validation, setvalidation] = useState({
    firstNameError: null,
    lastNameError: null,
    emailError: null,
    usernameError: null,
    passwordError: null
  })
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: ''
  })

  const validationCheck = () => {
    if (formData.firstName === "") {
      setvalidation({...validation, firstNameError: "First Name cannot be blank"})
      return false
    }
    
    if (formData.lastName === "") {
      setvalidation({...validation, lastNameError: "Last Name cannot be blank"})
      return false
    }

    if (formData.email === "") {
      setvalidation({...validation, emailError: "Email cannot be blank"})
      return false
    }

    if (formData.username === "") {
      setvalidation({...validation, usernameError: "Username cannot be blank"})
      return false
    }

    if (formData.password === "") {
      setvalidation({...validation, passwordError: "Password cannot be blank"})
      return false
    }

    if (formData.password.length < 6) {
      setvalidation({...validation, passwordError: "Password must be 6 characters or longer"})
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
      API.register(formData)
      .then(res => {
        setAlert({type:"success", msg: res.data.message})
        clearForm()
      })
      .catch(err => {
        setAlert({type:"error", msg: err.response.data.message})
      })
    }
  }

  const clearForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: ''
    })
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
        firstNameError: null,
        lastNameError: null,
        emailError: null,
        usernameError: null,
        passwordError: null
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
          Sign up
        </Typography>
        {alert.type && <AlertComponent type={alert.type} message={alert.msg}/>}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error = {validation.firstNameError}
                helperText={validation.firstNameError}
                autoComplete="fname"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoFocus
                onChange={handleChange}
                value={formData.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error = {validation.lastNameError}
                helperText={validation.lastNameError}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
                value={formData.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error = {validation.emailError}
                helperText={validation.emailError}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={formData.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error = {validation.usernameError}
                helperText={validation.usernameError}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                onChange={handleChange}
                value={formData.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error = {validation.passwordError}
                helperText={validation.passwordError}
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Footer />
      </Box>
    </Container>
  );
}

export default Register;