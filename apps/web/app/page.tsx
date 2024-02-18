'use client'
import { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketProvider';
import classes from './page.module.css';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';

export default function Page() {
  const { sendMessage, messages, user } = useSocket();
  const [message, setMessage] = useState("");

  useEffect(()=>{
    console.log("user", user);
  }, [user]);

  return (
    <div className={classes['container']}>
      
      <div className={classes['contacts-container']}>
        contacts
      </div>

      <div className={classes['messages-container']}>

        <div className={classes['messages']}>
          {/* <FontAwesomeIcon icon={solidIcons['faKiwiBird']} /> */}
          <h1>{messages.map(({socketId, message}) => (
            <li key={socketId} style={{textAlign: socketId == user.socketId ? 'right' : 'left'}}>{message}</li>
          ))}</h1>
        </div>

        <div className={classes['input-container']}>
          <input
            placeholder="Message..." 
            className={classes['chat-input']}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="button"
            className={classes['button']}
            onClick={(e) => sendMessage(message)}
          >Send</button>
        </div>

      </div>
      
    </div>
  )
}