import React from 'react';
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';

type CheckoutConfirmationProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function CheckoutConfirmation({
  open,
  onClose,
  onConfirm
}: CheckoutConfirmationProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle id="confirmation-dialog-title">Confirm Checkout</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Are you sure you want to proceed with the checkout?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
