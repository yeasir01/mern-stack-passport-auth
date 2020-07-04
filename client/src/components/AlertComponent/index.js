import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Grow from '@material-ui/core/Grow';
import useStyles from './style';

const AlertComponent= ({message, type}) => {

  const classes = useStyles();

  //severity options: error, warning, success, info
  return (
    <Grow in={true} timeout="auto">
      <div className={classes.root}>
        <Alert severity={type.toString()}>{message.toString()}</Alert>
      </div>
    </Grow>
  );
}

export default AlertComponent;