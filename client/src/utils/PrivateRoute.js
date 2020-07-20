import React, { useEffect, useContext, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import Loader from '../components/Loader';
import API from './API';

function PrivateRoute({ component: Component, ...rest }) {

  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.checkAuthState()
    .then(res => {

        setUser({
          isAuthenticated: res.data.isAuthenticated,
          name: res.data.user,
          id: res.data.id
        })

        setIsLoading(false)
    })
    .catch( err => { 
      
      setUser({
        isAuthenticated: false,
        name: null,
        id: null
      })

      setIsLoading(false)
    })
  },[setUser])

  return (
    <>
      { 
      isLoading ? <Loader /> : (
          <Route {...rest} render={ props => (
            user.isAuthenticated ? <Component {...props} /> : 
            <Redirect to={{pathname: '/login', state: {from: props.location}}} />
          )} />
        )
      }
    </>
  );

}

export default PrivateRoute;