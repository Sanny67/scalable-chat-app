'use client'
import { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketProvider';
import classes from './page.module.css';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Paper } from '@mui/material';
import useStyles from './styles';

const theme = createTheme();

export default function Page() {
  const { sendMessage, messages, user } = useSocket();
  const [message, setMessage] = useState("");
  const classes = useStyles();

  useEffect(()=>{
    console.log("user", user);
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.root}>
        <Paper className={classes.paper} elevation={3}>
          {/* Your content inside Paper */}
        </Paper>
      </Container>
    </ThemeProvider>
  )
};