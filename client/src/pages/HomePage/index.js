import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div style={{textAlign:"center"}}>
            <h1>
                MERN STACK PASSPORT AUTH BOILER PLATE
            </h1>
            <Link to="/login">REGISTER</Link> TO CREATE ACCOUNT.
            <br/>
            <Link to="/login">CLICK HERE</Link> TO LOGIN.
            <br/>
            <Link to="/dashboard">CLICK HERE</Link> TO TEST A PROTECTED ROUTE.
        </div>
    )
}

export default HomePage;