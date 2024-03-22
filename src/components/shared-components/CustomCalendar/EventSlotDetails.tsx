import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Dialog,
  Card,
  CardHeader,
  CardContent,
  IconButton
} from '@mui/material';
import type { EventType } from 'types/EventTypes';

type Props = {
  isSelectedEventDialogOpen: boolean;
  closeSelectedEventDialog: () => void;
  selectedEvent: EventType | null;
  handleDeleteEvent: () => void;
};

function EventSlotDialogForm({
  closeSelectedEventDialog,
  isSelectedEventDialogOpen,
  selectedEvent,
  handleDeleteEvent
}: Props) {
  return (
    <Dialog open={isSelectedEventDialogOpen} onClose={closeSelectedEventDialog}>
      <Card>
        <CardHeader
          sx={{ borderBottom: '2px solid black' }}
          title={selectedEvent?.name}
          align="left"
          action={
            <IconButton aria-label="delete" onClick={handleDeleteEvent}>
              <DeleteIcon sx={{ color: '#1273EB' }} />
            </IconButton>
          }
        />
        <CardContent>
          <div>{selectedEvent?.description}</div>
        </CardContent>
      </Card>
    </Dialog>
  );
}

export default EventSlotDialogForm;
