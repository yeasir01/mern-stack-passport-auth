import React from 'react';
import Alert from '@material-ui/lab/Alert';
import useStyles from './style';

const AlertComponent= (props) => {
  
  const {type, message} = props;
  const classes = useStyles();

  //severity options: error, warning, success, info
  return (
    <div className={classes.root}>
      <Alert severity={type.toString()}>{message.toString()}</Alert>
    </div>
  );
}

export default AlertComponent;