import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Dashboard = () => {

    const { user } = useContext(AuthContext);

    return (
        <div>
            <h1>Welcome, {user.name}</h1>
            <h3>User Id: {user.id}</h3>
            <p>Your now visiting a password protected page.</p>
        </div>
    )
}

export default Dashboard;