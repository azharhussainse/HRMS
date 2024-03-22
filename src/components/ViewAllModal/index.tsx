import React from 'react';
import { Box, Button, DialogTitle, Modal, Typography } from '@mui/material';
import type { LeaveType } from 'types/LeaveType';
import { formatDateRange } from '@/utils/dateFormatter';

type ViewAllModalPropsType = {
  title: string;
  holidays: LeaveType[];
};

const ViewAllModal = ({ title, holidays }: ViewAllModalPropsType) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          color: 'blue',
          textDecoration: 'underline',
          cursor: 'pointer',
          fontSize: ['8px', '8px', '8px', '12px']
        }}
      >
        View all
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="view-all-modal">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4
          }}
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{ padding: '0', margin: '0 2px 20px 0px' }}
          >
            <Typography variant="h4" component="div" id="view-all-modal">
              {title}
            </Typography>
          </DialogTitle>

          {holidays.map((holiday, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #F5F6F9',
                marginTop: index === 0 ? '0' : '15px'
              }}
            >
              <Box
                sx={{
                  textAlign: 'left',
                  flexGrow: 1,
                  marginBottom: '15px'
                }}
              >
                <Typography variant="h6" component="div">
                  {holiday.applicantName}
                </Typography>
                <Typography component="div">{holiday.description}</Typography>
              </Box>
              <Box sx={{ justifyContent: 'center', marginBottom: '15px' }}>
                <Typography component="div" color="error">
                  {formatDateRange(
                    holiday.applicationStartDate,
                    holiday.applicationEndDate
                  )}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Modal>
    </div>
  );
};

export default ViewAllModal;
