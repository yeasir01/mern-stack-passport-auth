import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Typography from '@material-ui/core/Typography';
import useStyles from './style';
import Container from '@material-ui/core/Container';
import Footer from '../../components/Footer';
import API from '../../utils/API';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const classes = useStyles();
  const history = useHistory();

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
    resetForms()
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    
    let valid = validationCheck()
    
    if (valid) {
      API.forgotPassword(formData)
      .then( res => {
        toast.success(res.data.message)
        history.push("/login")
      })
      .catch( err => {
        let data = err.response.data;

        if ( data ) {
          toast.error(data.message)
        } else {
          toast.error('Oops, something went wrong!')
        }
      })
    }
  }

  const resetForms = () => {
    if (validation.emailError !== null){
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
          <MailOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password?
        </Typography>
        <Typography component="h1" variant="body2" className={classes.text}>
        No worries! Just enter your email and we'll send you a reset password link.
        </Typography>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send Email
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/" variant="body2">
                Back Home 
              </Link>
            </Grid>
            <Grid item>
              <Link to="/login" variant="body2">
              Just rembered? Log In
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