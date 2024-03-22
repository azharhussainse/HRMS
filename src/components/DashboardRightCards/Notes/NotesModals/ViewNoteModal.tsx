import React from 'react';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDialog } from '@/hooks/useDialog';
import { NoteType } from '../Notes';
import DeleteNoteModal from './DeleteNoteModal';

type ViewNoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  note: NoteType | null;
  onDeleteNote: (noteId: string) => void;
};

const ViewNoteModal: React.FC<ViewNoteModalProps> = ({
  isOpen,
  onClose,
  note,
  onDeleteNote
}) => {
  const { isDialogOpen, closeDialog, openDialog } = useDialog();

  const handleDeleteNote = () => {
    onDeleteNote(note?.id || '');
    closeDialog();
    onClose();
  };

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'white',
            borderRadius: '8px',
            boxShadow: 24,
            p: 3
          }}
        >
          <IconButton
            sx={{ right: 10, bottom: 15, color: '#1273EB' }}
            onClick={event => {
              event.stopPropagation();
              onClose();
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton
            sx={{ position: 'absolute', top: 8, right: 8, color: '#1273EB' }}
            onClick={event => {
              event.stopPropagation();
              openDialog(); // Open the delete confirmation dialog
            }}
          >
            <DeleteIcon />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Title
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            {note?.title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Description
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {note?.description}
          </Typography>
        </Box>
      </Modal>
      {isDialogOpen && (
        <DeleteNoteModal
          openDeleteDialog={isDialogOpen}
          handleCloseDeleteDialog={closeDialog}
          handleDeleteNote={handleDeleteNote}
        />
      )}
    </>
  );
};

export default ViewNoteModal;
