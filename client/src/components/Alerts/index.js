import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useLocation } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import useStyles from './style';

const Alerts = forwardRef((props, ref) => {
  const classes = useStyles();
  const location = useLocation();
  const animateTime = 250; // in miliseconds
  
  const [alert, setAlert] = useState({
    type: '',
    message: '',
    show: false
  })

  useEffect(()=>{
    let history = location.alert;

    if ( history ) {
      setAlert({
        type: history.type,
        message: history.message,
        show: true
      })
    }
  },[location.alert])

  const createAlert = (type, message, show) => {
    clearAlert();
    
    setTimeout(() => {
      setAlert({
        type: type,
        message: message,
        show: show
      })

      clearTimeout(this)
    }, animateTime);

  }

  const clearAlert = () => {
    setAlert({
      type: '',
      message: '',
      show: false
    })
  }

  useImperativeHandle(ref, ()=> {
    return {
      createAlert: createAlert,
      clearAlert: clearAlert
    }
  })

  //severity options ["error","info","success","warning"]
  return (
    <div className={classes.root} onClick={clearAlert}>
      <Collapse in={alert.show} timeout={animateTime}>
        <Alert className={classes.paper} severity={alert.type || "info"}>{alert.message || ""}</Alert>
      </Collapse>
    </div>
  );
})

export default Alerts;