import React, { useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';
import Alert from '@material-ui/lab/Alert';
import useStyles from './style';

const AlertComponent= () => {

  const classes = useStyles();
  const { alert } = useContext(AuthContext);

  return (
    alert.type && alert.msg &&
      <div className={classes.root}>
        <Alert severity={alert.type}>{alert.msg}</Alert>
      </div>
  );
}

export default AlertComponent;