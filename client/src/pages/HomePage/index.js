import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            Welcome to the home page <Link to="/login">Click Here</Link> to Login.
            <br/>
            already loged in? go to <Link to="/dashboard">Dashbord</Link>
        </div>
    )
}

export default HomePage;