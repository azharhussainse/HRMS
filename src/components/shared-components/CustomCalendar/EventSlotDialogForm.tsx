import React from 'react';
import HRMFormDialog from '../HRMFormDialog';
import HRMFormTextField from '../fields/HRMFormTextField/HRMFormTextField';
import { Box } from '@mui/material';
import type { EventType } from 'types/EventTypes';

type EventSlotType = {
  title: string;
  description: string;
};

type Props = {
  isSlotDialogOpen: boolean;
  closeSlotDialog: () => void;
  openSlotDialog: () => void;
  setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
  handleSelectSlot: ({ title, description }: EventSlotType) => void;
};

const initialValues = {
  title: '',
  description: '',
  start: new Date(),
  end: new Date()
};

function EventSlotDialogForm({
  openSlotDialog,
  closeSlotDialog,
  isSlotDialogOpen,
  setEvents,
  handleSelectSlot
}: Props) {
  return (
    <HRMFormDialog
      title="Add Event / News"
      initialValues={initialValues}
      onSave={handleSelectSlot}
      isOpen={isSlotDialogOpen}
      onClose={closeSlotDialog}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '4%',
          width: '300px'
        }}
      >
        <HRMFormTextField
          label="Title"
          name="title"
          type={'text'}
          variant="outlined"
        />
        <HRMFormTextField
          label="Description"
          name="description"
          multiline
          variant="outlined"
        />
      </Box>
    </HRMFormDialog>
  );
}

export default EventSlotDialogForm;
