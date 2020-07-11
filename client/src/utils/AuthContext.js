import React, { createContext, useState } from 'react';
import API from './API';

export const AuthContext = createContext();

export default ({children}) => {
    
    const [user, setUser] = useState({
        isAuthenticated: false,
        name: null,
        id: null
    });

    const [alert, setAlert] = useState({
        type: null,
        msg: null,
        flash: false
    })

    const logout = () => {
        API.logout()
        .then( res => {
            initialUserState()
        })
        .catch( err => {
            console.log(err.response);
            initialUserState()
        })
    };

    const initialUserState = () => {
        setUser({
            isAuthenticated: false,
            name: null,
            id: null
        })
    }

    const clearAlert = () => {
        setAlert({
            type: null,
            message: null,
            flash: false
        })
    }

    return(
        <AuthContext.Provider value={{user, setUser, logout, alert, setAlert, clearAlert}}>
            { children }
        </AuthContext.Provider>
    )
}