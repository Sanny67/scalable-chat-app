import React from 'react';
import classes from '../assets/css/page.module.css';
import { Avatar } from '@mui/material';
import AvatarIcon from './AvatarIcon';

interface ShowMessageProps {
  socketId: string;
  currentSocketId: string;
  message: string;
  user: {
    active: boolean;
    avatar?: {
      name: string;
      animal: string;
      color: string;
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
            <AvatarIcon key={user?.avatar?.animal || ""} />
          </Avatar>
        </div> :
        <div style={messageBlockStyle}>
          <Avatar className={classes.mediumAvatar} sx={{ backgroundColor: user?.avatar?.color, mt: -0.5 }}>
            <AvatarIcon key={user?.avatar?.animal || ""} />
          </Avatar>
          <p style={messageStyle}>{message}</p>
        </div>
      }
    </div>
  );
};

export default ShowMessage;