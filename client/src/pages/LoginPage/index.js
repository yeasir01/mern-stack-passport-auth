import React, { useState, useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';
import { Link, useHistory } from 'react-router-dom';
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
import useStyles from './style';
import Container from '@material-ui/core/Container';
import Footer from '../../components/Footer';
import AlertComponent from '../../components/AlertComponent';
import API from '../../utils/API';

const SignIn = () => {
  const classes = useStyles();
  const history = useHistory();
  
  const { setUser } = useContext(AuthContext);

  const [message, setMessage] = useState({
    type: null,
    msg: null
  })
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  
  const handleChange = (event) => {
    let {value, name} = event.currentTarget;
    setFormData({...formData, [name]:value})
    clearMsg()
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    
    API.login(formData)
    .then(res => {

      let { user, id, isAuthenticated } = res.data;
      
      setUser({
        isAuthenticated: isAuthenticated,
        name: user,
        id: id
      })

      history.push("/dashboard")
    })
    .catch(err => {
      if (err.response.status === 401){
        setMessage({type: "error", msg: "Incorrect username or password!"})
      } else if (err.response.status === 500) {
        setMessage({type: "error", msg: "Internal server issue!"})
      } else {
        setMessage({type: "error", msg: "Oops, somthing went wrong!"})
      }
    })
  }

  const clearMsg = () => {
    if (message.type !== null || message.msg !== null) {
      setMessage({
        type: null,
        msg: null
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
          Sign in
        </Typography>
        {message.type ? <AlertComponent type={message.type} message={message.msg}/> : null}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleChange}
            value={formData.username}
          />
          <TextField
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
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
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
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