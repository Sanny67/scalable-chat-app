import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
      width: '90vw',
      height: '80vh',
      fontSize: '1.5rem',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.5)',
      backgroundColor: '#343b4a',
    },
    usersSection: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#242424',
      '& h4': {
        textAlign:'center',
        padding: '0 10px 30px 10px',
        fontSize: '3.5rem',
        letterSpacing: '5px',
        margin: 0,
        marginTop: '1.3rem',
        fontVariant: 'small-caps !important',
        boxShadow: '0 3px 5px rgba(0, 0, 0, 0.5)',
        // borderBottom: '1px solid rgba(255, 255, 255, 0.6)',
        fontFamily: '"Raleway", sans-serif',
      }
    },
    activeUsers:{
      padding: '0 1.8rem',
      overflowY: 'auto',
      '&::-webkit-scrollbar': { width: '10px' },
      '&::-webkit-scrollbar-track': { boxShadow: 'inset 0 0 5px grey', borderRadius: '10px' },
      '&::-webkit-scrollbar-thumb': { backgroundColor: '#343b4a', borderRadius: '10px' },
      '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#1a1d24' },
    },
    userDisplay: {
      display: 'flex',
      alignItems: 'center',
      '& p': { marginLeft: '10px' }
    },
    messagesSection: {
      height: '100%',
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
    },
    navBar: {
      display:'flex',
      justifyContent: 'space-between',
      padding: '10px',
      alignItems: 'center',
      backgroundColor: '#242424',
      boxShadow: '0 3px 5px rgba(0, 0, 0, 0.5)',
      // borderBottom: '1px solid rgba(255, 255, 255, 0.6)',
      // '& .MuiIconButton-root': {
      //   ds
      // }
    },
    messagesContainer: {
      flexGrow: 1,
      padding: '24px',
      overflowY: 'auto',
      maxHeight: 'calc(100% - var(--input-height))',
      '&::-webkit-scrollbar': { width: '10px' },
      '&::-webkit-scrollbar-track': { boxShadow: 'inset 0 0 5px grey', borderRadius: '10px' },
      '&::-webkit-scrollbar-thumb': { backgroundColor: '#343b4a', borderRadius: '10px' },
      '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#1a1d24' },
    },
    textField:{
      marginTop: '16px',
      // position: 'absolute',
      // bottom: 0,
      // left: 0,
      height: 'var(--input-height)',
      '& .MuiInputBase-input': {
        fontSize: '1.5rem', // Adjust the font size as needed
      },
      '& .MuiInputLabel-root': {
        fontSize: '1.5rem', // Adjust the font size as needed
      },
      '& .MuiOutlinedInput-root': {
        padding: '16px', // Adjust the padding as needed
      },
    },
    scrollContainer: {
      overflowY: 'scroll',
      '&::-webkit-scrollbar': { width: '10px' },
      '&::-webkit-scrollbar-track': { boxShadow: 'inset 0 0 5px grey', borderRadius: '10px' },
      '&::-webkit-scrollbar-thumb': { backgroundColor: '#343b4a', borderRadius: '10px' },
      '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#1a1d24' },
    },
    largeAvatar: {
      border: '1px solid black',
      height: '55px',
      width: '55px',
      '& svg':{
        fontSize: '25px'
      }
    },
    mediumAvatar: {
      border: '1px solid black',
      height: '40px',
      width: '40px',
      '& svg':{
        fontSize: '20px'
      }
    },
    modal:{
      color: 'white',
      '& > .MuiBox-root': {
        width: '50vw',
        border: '1px solid black',
        borderRadius: '8px'
      },
      '& .MuiTypography-root': {
        fontSize: '1.15rem !important',
        fontFamily: '"Raleway", sans-serif !important',
      },
      '& .MuiTypography-h6': {
        fontSize: '1.5rem !important',
      }
    }
}));

export default useStyles;