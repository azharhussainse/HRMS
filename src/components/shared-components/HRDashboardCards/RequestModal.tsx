import React from 'react';
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import { RequestModalType } from 'types/LeavesReport';
import { useGetAllLeaveTypes } from '@/hooks/Leaves/useGetAllLeaveTypes';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid grey',
  borderRadius: '10px',
  boxShadow: 34,
  p: 5
};

type RequestModalProps = {
  title?: string;
  closeDialog: () => void;
  handleSubmit: (values: RequestModalType) => void;
};

function RequestModal({ closeDialog, handleSubmit, title }: RequestModalProps) {
  const { data: leaveTypesData, isLoading } = useGetAllLeaveTypes();
  const [formData, setFormData] = React.useState({
    Subject: '',
    StartAppDate: '',
    EndAppDate: '',
    Description: '',
    LeaveTypeId: ''
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleLeaveTypeChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as string;
    setFormData({ ...formData, LeaveTypeId: value });
  };
  const handleFormSubmit = () => {
    handleSubmit(formData);
    closeDialog();
  };
  React.useEffect(() => {
    if (!isLoading && leaveTypesData && leaveTypesData.length > 0) {
      setFormData({
        ...formData,
        LeaveTypeId: leaveTypesData[0].id
      });
    }
  }, [isLoading, leaveTypesData]);

  return (
    <Modal
      open={true}
      onClose={closeDialog}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {title !== 'Work From Home' && (
          <>
            <Typography variant="h6" component="h2">
              Type
            </Typography>
            <Select
              fullWidth
              id="LeaveTypeId"
              name="LeaveTypeId"
              color="primary"
              value={formData.LeaveTypeId}
              onChange={handleLeaveTypeChange}
            >
              {isLoading ? (
                <MenuItem disabled>Loading...</MenuItem>
              ) : (
                leaveTypesData?.map(item => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </>
        )}

        <Typography variant="h6" component="h2">
          Subject
        </Typography>
        <TextField
          fullWidth
          id="Subject"
          name="Subject"
          color="primary"
          value={formData.Subject}
          onChange={handleInputChange}
        />

        <Typography variant="h6" component="h2">
          Start Date
        </Typography>
        <TextField
          fullWidth
          type="date"
          id="StartDate"
          name="StartAppDate"
          color="primary"
          value={formData.StartAppDate}
          onChange={handleInputChange}
        />

        <Typography variant="h6" component="h2">
          End Date
        </Typography>
        <TextField
          fullWidth
          type="date"
          id="EndDate"
          name="EndAppDate"
          color="primary"
          value={formData.EndAppDate}
          onChange={handleInputChange}
        />

        <Typography variant="h6" component="h2">
          Description
        </Typography>
        <TextField
          fullWidth
          id="Description"
          name="Description"
          color="primary"
          multiline
          rows={4}
          value={formData.Description}
          onChange={handleInputChange}
        />

        <Box mt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
          >
            Request
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default RequestModal;
