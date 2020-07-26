import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Links from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import useStyles from './style';

const Footer = () => {
    const classes = useStyles();
  
    return (
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Typography variant="body2" color="textSecondary" align="center">
              {` ${new Date().getFullYear()} © Copyright `}
              <Links component={Link} to="/">Mern Auth Template</Links>
            </Typography>
          </Container>
        </footer>
    );
}

export default Footer;