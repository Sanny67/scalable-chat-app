import React from 'react';
import classes from '../assets/css/page.module.css';
import { Avatar } from '@mui/material';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ShowMessageProps {
  socketId: string;
  currentSocketId: string;
  message: string;
  user: {
    active: boolean;
    avatar?: {
      color: string;
      icon: string;
    }
  };
}

const ShowMessage: React.FC<ShowMessageProps> = ({ socketId, currentSocketId, message, user }) => {
  const messageBlockStyle: React.CSSProperties = { display: 'flex', margin: '10px 0' };
  const messageStyle: React.CSSProperties = {
    margin: '0 8px',
    textOverflow: 'ellipsis',
    wordBreak: 'break-all',
    textAlign: socketId === currentSocketId ? 'right' : 'left'
  };

  return (
    <div
      style={{ display: 'flex', justifyContent: socketId === currentSocketId ? 'right' : 'left' }}
    >
      {socketId === currentSocketId ? 
        <div style={messageBlockStyle}>
          <p style={messageStyle}>{message}</p>
          <Avatar className={classes.mediumAvatar} sx={{ backgroundColor: user?.avatar?.color, mt: -0.5 }}>
            <FontAwesomeIcon icon={solidIcons[user?.avatar?.icon as keyof typeof solidIcons]} />
          </Avatar>
        </div> :
        <div style={messageBlockStyle}>
          <Avatar className={classes.mediumAvatar} sx={{ backgroundColor: user?.avatar?.color, mt: -0.5 }}>
            <FontAwesomeIcon icon={solidIcons[user?.avatar?.icon as keyof typeof solidIcons]} />
          </Avatar>
          <p style={messageStyle}>{message}</p>
        </div>
      }
    </div>
  );
};

export default ShowMessage;