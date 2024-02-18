import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    paper: {
      width: '80vw',
      height: '80vh',
      background: 'red',
      boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.5)',
    },
}));

export default useStyles;