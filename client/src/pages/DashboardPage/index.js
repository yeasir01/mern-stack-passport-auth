import React from 'react';
import Footer from '../../components/Footer';
import { userContext } from '../../context/user';

const Dashboard = () => {

    const { userState, logout } = React.useContext(userContext);

    return(
        <div>
            <h1>Welcome {userState.name}!</h1>
            <h1>ID: {userState.userId}</h1>
            <button style={{marginRight:"10px"}}>Get Data</button>
            <button onClick={logout}>Logout</button>
            <Footer />
        </div>
    )
}

export default Dashboard;