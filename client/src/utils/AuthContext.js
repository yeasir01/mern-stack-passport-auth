import React, { createContext, useState } from 'react';
import API from './API';

export const AuthContext = createContext();

export default ({children}) => {
    
    const [user, setUser] = useState({
        isAuthenticated: false,
        name: null,
        id: null
    });

    const logout = () => {
        API.logout()
        .then( res => {
            resetUserState()
        })
        .catch( err => {
            console.log(err.response);
            resetUserState()
        })
    };

    const resetUserState = () => {
        setUser({
            isAuthenticated: false,
            name: null,
            id: null
          })
    }

    return(
        <AuthContext.Provider value={{user, setUser, logout}}>
            { children }
        </AuthContext.Provider>
    )
}