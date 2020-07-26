import React from 'react';
import useStyles from './style';
import Container from '@material-ui/core/Container';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Layout = ({children}) => {

    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <NavBar/>
                <Container component="main" className={classes.main}>
                    {children}
                </Container>
            <Footer />
        </div>
    )
}

export default Layout;