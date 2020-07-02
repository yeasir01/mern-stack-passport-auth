import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userContext } from '../context/user';
import Loader from '../components/Loader';
import API from './API';

function PrivateRoute({ component: Component, ...rest }) {

  const { userState, setUserState } = React.useContext(userContext);
  const [loading, setLoading] = React.useState(true)

  React.useEffect(()=>{
    API.authenticate()
    .then(res => {
        let { user, id } = res.data;

        setUserState({
        authenticated: true,
        userId: id,
        name: user
        })

        setLoading(false)
    })
    .catch(err => {
        console.log(err)
        
        setUserState({
          authenticated: false,
          userId: null,
          name: null
        })

        setLoading(false)
    })
  },[])
  console.log(userState)
  return (
    <>
      { 
      loading ? <Loader /> : (
          <Route {...rest} render={ props => (
            userState.authenticated ? <Component {...props} /> : 
            <Redirect to={{pathname: '/login', state: {from: props.location}}} />
          )} />
        )
      }
    </>
  );

}

export default PrivateRoute;