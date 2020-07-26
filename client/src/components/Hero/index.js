import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useStyles from './style.js';
import image from './login.png';

const Hero = () => {
    
    const classes = useStyles();

    return (
        <div className={classes.heroContent}>
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    <img src={image} height="100px" alt="monitor"/>
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                A, M.E.R.N. Stack application using passport for authentication. 
                The project is merely boiler plate code to help save time in developing 
                a node/react applications that require a user login system.
                </Typography>
                <div className={classes.heroButtons}>
                    <Grid container spacing={2} justify="center">
                    <Grid item>
                        <Button variant="contained" color="primary" href="https://github.com/yeasir01/mern-stack-passport-auth">
                        Github Repo
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="primary" href="https://github.com/yeasir01/mern-stack-passport-auth/issues">
                        Report an Issue
                        </Button>
                    </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
)}

export default Hero;