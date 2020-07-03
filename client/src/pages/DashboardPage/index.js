import React, { useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';
import Footer from '../../components/Footer';

const Dashboard = () => {

    const { user, logout } = useContext(AuthContext);

    return (
        <div>
            <h1>Welcome {user.name}!</h1>
            <h1>ID: {user.id}</h1>
            <button style={{marginRight:"10px"}}>Get Data</button>
            <button onClick={logout}>Logout</button>
            <Footer />
        </div>
    )
}

export default Dashboard;