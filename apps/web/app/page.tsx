'use client'
import { useEffect, useState } from 'react';
import { User, useSocket } from '../context/SocketProvider';
import classes from './page.module.css';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { Avatar, Box, Container, Grid, IconButton, Paper, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import useStyles from './styles';


// Import the dark mode theme from Material-UI
import { createTheme, ThemeProvider, darken } from '@mui/material/styles';

const emptyUser: User = {
  socketId: "",
  avatar: {
      name: "",
      icon: "",
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
  const [message, setMessage] = useState("");
  const classes = useStyles();
  const currentSocketId = socket?.id || "";

  useEffect(()=>{
    console.log("users", users);
  }, [users]);

  const getSender = (socketId: string): User => {
    const foundUser: User = users.find(user => user.socketId === socketId) ?? emptyUser;
    return foundUser;
  }
  
  const currentUser = getSender(currentSocketId);

  const sendMsg = () => {
    sendMessage(message);
    setMessage("");
  }
  interface ShowMessageProps {
    socketId: string;
    message: string;
    user: User;
  }

  const ShowMessage: React.FC<ShowMessageProps> = ({ socketId, message, user }) => {
    const messageBlockStyle = {display:'flex', alignItems: 'center'};

    return (
      <div
        key={socketId}
        style={{display: 'flex', justifyContent: currentSocketId == socketId ? 'right' : 'left'}}
      >
        {currentSocketId == socketId ? 
          <div style={messageBlockStyle}>
            <p style={{ marginRight: '10px'}}>{message}</p>
            <Avatar className={classes.mediumAvatar} sx={{ backgroundColor: user?.avatar?.color }}>
              <FontAwesomeIcon icon={solidIcons[user?.avatar?.icon as keyof typeof solidIcons]} />
            </Avatar>
          </div> :
          <div style={messageBlockStyle}>
            <Avatar className={classes.mediumAvatar} sx={{ backgroundColor: user?.avatar?.color }}>
              <FontAwesomeIcon icon={solidIcons[user?.avatar?.icon as keyof typeof solidIcons]} />
            </Avatar>
            <p style={{ marginLeft: '10px'}}>{message}</p>
          </div>
        }
      </div>
    )
  }
  return (
    <ThemeProvider theme={theme}>
        <Paper className={classes.paper} elevation={3}>
          <Grid container sx={{height: '100%'}}>
            <Grid item xs={3} className={classes.usersSection}>
              <h4 style={{}}>Messages</h4>
              {users.map((user) => (
                user.socketId !== currentSocketId && (
                  <div key={user.socketId} className={classes.userDisplay}>
                    <Avatar className={classes.largeAvatar} sx={{ backgroundColor: user?.avatar?.color }}>
                      <FontAwesomeIcon icon={solidIcons[user?.avatar?.icon as keyof typeof solidIcons]} />
                    </Avatar>
                    <p>{user.avatar.name}</p>
                  </div>
                )
              ))}
            </Grid>
            <Grid item xs={9} className={classes.messagesSection}>
              <Box className={classes.messagesContainer}>
                {/* All messages */}
                {messages.map(({socketId, message}) => {
                  const sender: User = currentSocketId === socketId ? currentUser : getSender(socketId) ?? emptyUser;
                  return (
                    <ShowMessage key={socketId} socketId={socketId} message={message} user={sender}/>
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
                    <IconButton
                      type="submit"
                      aria-label="send"
                      onClick={(e) => sendMsg()}
                      sx={{ height: '60px', width: '60px' }}
                    >
                      <SendIcon style={{ fontSize: '28px' }}/>
                    </IconButton>
                  )
                }}
              />
            </Grid>
          </Grid>
        </Paper>
    </ThemeProvider>
  )
};
