import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { makeStyles } from '@material-ui/core';
import MyCalendar from '../shared-components/CustomCalendar/MyCalendar';
import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Typography } from '@mui/material';

const useStyles = makeStyles({
  calendarContainer: {
    border: '2px solid blue',
    borderRadius: '4px',
    padding: '1rem'
  },
  heading: {
    background: 'blue',
    color: 'white',
    textAlign: 'center',
    padding: '0.5rem'
  }
});
const style = {
  position: 'absolute' as 'absolute',
  width: '57.5%',
  height: '80%',
  top: '55%',
  left: '47.1%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 4
};

export default function NewsAndEventsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const localizer = momentLocalizer(moment);
  const [myEvents, setEvents] = React.useState([
    {
      startingAT: new Date(),
      endingAT: new Date(),
      name: 'Sample Event',
      description: ''
    }
  ]);

  return (
    <div>
      <Typography
        onClick={handleOpen}
        sx={{
          color: '#1273EB',
          textDecoration: 'underline',
          cursor: 'pointer',
          fontSize: ['13px', '14px', '15px']
        }}
      >
        Add
      </Typography>
      <Modal open={open} onClose={handleClose} aria-labelledby="add-modal">
        <Box sx={style}>
          <MyCalendar
            myEvents={myEvents}
            setEvents={setEvents}
            localizer={localizer}
          />
        </Box>
      </Modal>
    </div>
  );
}
