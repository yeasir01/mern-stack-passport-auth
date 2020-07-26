import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    },
    main: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    }
}));

export default useStyles;