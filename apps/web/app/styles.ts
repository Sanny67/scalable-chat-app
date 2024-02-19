import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
      width: '90vw',
      height: '80vh',
      fontSize: '2rem',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.5)',
    },
    usersSection: {
      backgroundColor: 'grey',
      height: '100%',
      padding: '24px',
      '& h4': {
        textAlign:'center',
        paddingBottom: '30px',
        fontSize: '3.5rem',
        letterSpacing: '5px',
        margin: '1.3rem 0',
        fontVariant: 'small-caps !important',
        borderBottom: '1px solid white',
        fontFamily: '"Raleway", sans-serif',
      }
    },
    userDisplay: {
      display: 'flex',
      alignItems: 'center',
      '& p': { marginLeft: '10px' }
    },
    messagesSection: {
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    messagesContainer: {
      padding: '24px',
      flexGrow: 1,
      overflowY: 'auto',
      maxHeight: 'calc(100% - var(--input-height))',
      '&::-webkit-scrollbar': { width: '10px' },
      '&::-webkit-scrollbar-track': { boxShadow: 'inset 0 0 5px grey', borderRadius: '10px' },
      '&::-webkit-scrollbar-thumb': { backgroundColor: '#acacac', borderRadius: '10px' },
      '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#858585' },
    },
    textField:{
      marginTop: '16px',
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: 'var(--input-height)',
      '& .MuiInputBase-input': {
        fontSize: '2rem', // Adjust the font size as needed
      },
      '& .MuiInputLabel-root': {
        fontSize: '2rem', // Adjust the font size as needed
      },
      '& .MuiOutlinedInput-root': {
        padding: '16px', // Adjust the padding as needed
      },
    },
    scrollContainer: {
      '&::-webkit-scrollbar': { width: '10px' },
      '&::-webkit-scrollbar-track': { boxShadow: 'inset 0 0 5px grey', borderRadius: '10px' },
      '&::-webkit-scrollbar-thumb': { backgroundColor: '#acacac', borderRadius: '10px' },
      '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#858585' },
    },
    largeAvatar: {
      height: '70px',
      width: '70px',
      '& svg':{
        fontSize: '30px'
      }
    },
    mediumAvatar: {
      height: '60px',
      width: '60px',
      '& svg':{
        fontSize: '28px'
      }
    }
}));

export default useStyles;