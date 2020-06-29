import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    progress: {
        display: "flex",
        justifyContent: 'center',
        alignItems:'center',
        height: "100vh"
    },
}));

const Loader = () =>{
    const classes = useStyles();
    return <div className={classes.progress}><CircularProgress color="secondary" /></div>
}

export default Loader;