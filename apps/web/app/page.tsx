'use client'
import { useEffect, useState } from 'react';
import { User, useSocket } from '../context/SocketProvider';
import useStyles from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { Avatar, Box, CircularProgress, Grid, IconButton, Paper, TextField, Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


// Import the dark mode theme from Material-UI
import { createTheme, ThemeProvider, darken } from '@mui/material/styles';
// import Loader from './components/Loader';
import ShowMessage from './components/ShowMessage';
import Features from './components/Features';
import AvatarIcon from './components/AvatarIcon';

const emptyUser: User = {
  socketId: "",
  active: false,
  avatar: {
      name: "",
      animal: "",
      color: ""
  }
};

// Customize the dark theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: darken('#121212', 0.2),
      paper: '#121212',
    },
  },
});

export default function Page() {
  const { sendMessage, messages, socket, users } = useSocket();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showFeatures, setShowFeatures] = useState(false);

  const classes = useStyles();
  const currentSocketId = socket?.id || "";

  useEffect(()=>{
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const getSender = (socketId: string): User => {
    const foundUser: User = users.find(user => user.socketId === socketId) ?? emptyUser;
    return foundUser;
  }
  
  const currentUser = getSender(currentSocketId);

  const sendMsg = () => {
    sendMessage(message);
    setMessage("");
  }

  const loaderData = {
    size: 200,
  };

  // <Loader {...loaderData} />
  // <CircularProgress size={150}/>
  
  return (
    <ThemeProvider theme={theme}>
        { loading ? <CircularProgress size={150}/> : 
          <>
            <Paper className={classes.paper} elevation={3}>
              <Grid container sx={{height: '100%'}}>
                <Grid item xs={3} className={classes.usersSection}>
                  <h4>Messages</h4>
                  <div className={classes.activeUsers}>
                    {users.map((user) => (
                      (user.socketId !== currentSocketId && user.active) && (
                        <div key={user.socketId} className={classes.userDisplay}>
                          <Avatar className={classes.largeAvatar} sx={{ backgroundColor: user?.avatar?.color }}>
                            <AvatarIcon key={user?.avatar?.animal} />
                            {/* <FontAwesomeIcon icon={solidIcons[user?.avatar?.icon as keyof typeof solidIcons]} /> */}
                          </Avatar>
                          <p>{user.avatar.name}</p>
                        </div>
                      )
                    ))}
                  </div>
                </Grid>
                <Grid item xs={9} className={classes.messagesSection}>
                  <Box className={classes.navBar}>
                    { currentUser !== null && <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar className={classes.largeAvatar} sx={{ backgroundColor: currentUser?.avatar?.color }}>
                          <AvatarIcon key={currentUser?.avatar?.animal} />
                        </Avatar>
                        <p style={{ marginLeft:"10px" }}>{currentUser.avatar.name} (You)</p>
                    </Box> }
                    <Tooltip
                      title="See App Features"
                      slotProps={{ tooltip: { sx: { fontSize: '1.15rem' } } }}
                    >
                      <IconButton
                        sx={{ height: '60px', width: '60px' }}
                        onClick={() => setShowFeatures(true)}
                      >
                        <InfoOutlinedIcon style={{ fontSize: '28px' }}/>
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Box className={classes.messagesContainer}>
                    {/* All messages */}
                    {messages.map(({socketId, message}) => {
                      const sender: User = currentSocketId === socketId ? currentUser : getSender(socketId) ?? emptyUser;
                      return (
                        <ShowMessage
                          user={sender}
                          key={socketId}
                          message={message}
                          socketId={socketId}
                          currentSocketId={currentSocketId}
                        />
                      )
                    })}
                    {/* All messages */}
                  </Box>
                  <TextField
                    fullWidth
                    // multiline
                    // maxRows={4}
                    value={message}
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Type message here"
                    className={classes.textField}
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{ flexShrink: 0 }}
                    inputProps={{
                      className: classes.scrollContainer,
                    }}
                    InputProps={{
                      endAdornment: (
                        <Tooltip
                          title="Send"
                          slotProps={{ tooltip: { sx: { fontSize: '1.15rem' } } }}
                        >
                          <IconButton
                            type="submit"
                            aria-label="send"
                            onClick={(e) => sendMsg()}
                            sx={{ height: '60px', width: '60px' }}
                          >
                            <SendIcon style={{ fontSize: '28px' }}/>
                          </IconButton>
                        </Tooltip>
                      )
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
            <Features show={showFeatures} setShow={setShowFeatures}/>
          </>
        }
    </ThemeProvider>
  )
};
