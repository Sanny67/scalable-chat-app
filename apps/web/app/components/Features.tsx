import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useStyles from '../styles';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface FeaturesProps {
    show: boolean;
    setShow: Function;
}

const Features: React.FC<FeaturesProps> = ({ show, setShow }) => {
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  const classes = useStyles();

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.modal}
      >
        <Box sx={style}>
          <IconButton
            style={{ position: 'absolute', top: '10px', right: '10px' }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginTop: '10px'}}>
            Features of this app
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'left' }}>
            <ul>
                <li>
                    <b>Real-time Messaging: </b>
                    Users can send and receive messages instantly without the need to refresh the page, thanks to WebSocket technology.
                </li>
                <li>
                    <b>Scalability: </b>
                    The architecture allows for horizontal scaling to handle a large number of concurrent users by utilizing Node.js for its event-driven, non-blocking nature and Redis for its high-performance data storage and pub/sub capabilities.
                </li>
                <li>
                    <b>WebSocket Integration: </b>
                    Utilizing WebSocket technology allows for bi-directional communication between the server and clients, enabling real-time message delivery.
                </li>
                <li>
                    <b>Next.js for Frontend: </b>
                    Next.js provides server-side rendering, automatic code splitting, and simple client-side routing, making it ideal for building efficient and SEO-friendly React applications. It also supports TypeScript out of the box, providing strong typing and better code organization.
                </li>
                <li>
                    <b>Randomly Assigned Interesting Names: </b>
                    Upon establishing a new socket connection, users are automatically assigned randomly generated interesting names, adding a playful touch to the chat experience.
                </li>
            </ul>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Features;
