import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Links from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Typography from '@material-ui/core/Typography';
import useStyles from './style';
import Container from '@material-ui/core/Container';
import API from '../../utils/API';
import Alert from '../../components/Alerts';
import { validEmail } from '../../utils/ValidationHelpers';

const ForgotPassword = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const alertCompRef = useRef();

  const [formData, setFormData] = useState({
    email: ''
  })

  const [validation, setvalidation] = useState({
    emailError: null
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
    
    return true
  }
  
  const handleChange = (event) => {
    let {value, name} = event.currentTarget;
    setFormData({...formData, [name]:value})
    clearValidation()
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    
    let valid = validationCheck()
    
    if (valid) {
      API.forgotPassword(formData)
      .then( res => {

        history.push({
          pathname: '/login',
          alert: {
            type: "success", 
            message: res.data.message, 
            show:true
          }
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

  const clearValidation = () => {
    if (validation.emailError !== null){
      setvalidation({
        emailError: null
      })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MailOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password?
        </Typography>
        <Typography component="h1" variant="body2" className={classes.text}>
        No worries! Just enter the email you used to register and we'll send you a reset password link.
        </Typography>
        <Alert ref={alertCompRef}/>
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
              <Links component={Link} to="/" variant="body2">
                Back Home 
              </Links>
            </Grid>
            <Grid item>
              <Links component={Link} to="/login" variant="body2">
              Just rembered? Log In
              </Links>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default ForgotPassword;