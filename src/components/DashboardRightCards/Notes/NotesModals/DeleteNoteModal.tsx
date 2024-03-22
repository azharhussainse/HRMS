import React from 'react';
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';

type DeleteNoteModalProps = {
  openDeleteDialog: boolean;
  handleCloseDeleteDialog: () => void;
  handleDeleteNote: () => void;
};
export default function DeleteNoteModal({
  openDeleteDialog,
  handleCloseDeleteDialog,
  handleDeleteNote
}: DeleteNoteModalProps) {
  return (
    <div>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to delete this note?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteDialog}
            color="primary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteNote}
            autoFocus
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
