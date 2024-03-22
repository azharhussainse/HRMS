import React from 'react';
import { Card, Box, Typography, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteNoteModal from './NotesModals/DeleteNoteModal';
import { DateTimeConverter } from '@/utils/dateFormatter';
import { truncateContent } from '@/utils/NotesCard';
import { useDialog } from '@/hooks/useDialog';
import { NoteType } from './Notes';

type NoteCardProps = {
  note: {
    id: string;
    title: string | null;
    description: string | null;
    notesCreated: string | null;
  };
  onViewNote: (note: NoteType) => void;
  onDeleteNote: (noteId: string) => void;
};
const styles = {
  cardStyles: {
    marginBottom: '5px',
    display: 'flex',
    flexDirection: 'column',
    height: '85px',
    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.2)',
    border: '0.5px solid #ccc',
    borderRadius: '4px',
    background: 'white',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s',
    '&:hover': {
      boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)'
    }
  },
  turnncateStyles: {
    fontSize: '13px',
    fontWeight: '400',
    height: '23px',
    flexGrow: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  dateTimeStyles: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: '12px',
    color: '#1273EB',
    paddingRight: '10px'
  },
  boxStyles: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  noteStyles: {
    fontWeight: '700',
    fontSize: '13px',
    height: '19px',
    paddingLeft: '10px'
  }
};
const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onViewNote,
  onDeleteNote
}) => {
  const { isDialogOpen, closeDialog, openDialog } = useDialog();

  const handleDeleteNote = () => {
    onDeleteNote(note.id);
    closeDialog(); // Close the delete confirmation dialog
  };

  return (
    <Grid item xs={12}>
      <Card sx={styles.cardStyles} onClick={() => onViewNote(note)}>
        <Box sx={styles.boxStyles}>
          <Typography sx={styles.noteStyles}>{note.title}</Typography>
          <IconButton
            sx={{ color: '#1273EB' }}
            onClick={event => {
              event.stopPropagation();
              openDialog(); // Open the delete confirmation dialog
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1, paddingLeft: '10px' }}>
          <Typography sx={styles.turnncateStyles}>
            {truncateContent(note.description || '', 60)}
          </Typography>
        </Box>
        <Box sx={styles.dateTimeStyles}>
          {DateTimeConverter(note.notesCreated || '')}
        </Box>
      </Card>
      {isDialogOpen && (
        <DeleteNoteModal
          openDeleteDialog={isDialogOpen}
          handleCloseDeleteDialog={closeDialog}
          handleDeleteNote={handleDeleteNote}
        />
      )}
    </Grid>
  );
};

export default NoteCard;
