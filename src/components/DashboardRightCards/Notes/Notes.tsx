import * as React from 'react';
import { Typography, Box, IconButton, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NoteCard from './NoteCard';
import AddNoteModal from './NotesModals/AddNoteModal';
import ViewNoteModal from './NotesModals/ViewNoteModal';
import { useDialog } from '@/hooks/useDialog';
import { useGetNotes, useDeleteNotes } from '@/hooks/Notes';

export type NoteType = {
  id: string;
  title: string | null;
  description: string | null;
};
function Notes() {
  const { data: notes } = useGetNotes();
  const { mutateAsync: deleteNote } = useDeleteNotes();
  const {
    isDialogOpen: isAddDialogOpen,
    openDialog: openAddDialog,
    closeDialog: closeAddDialog
  } = useDialog(false);
  const {
    isDialogOpen: isViewDialogOpen,
    openDialog: openViewDialog,
    closeDialog: closeViewDialog
  } = useDialog(false);

  const [selectedNote, setSelectedNote] = React.useState<NoteType | null>(null);

  const handleViewNote = (note: NoteType) => {
    setSelectedNote(note);
    openViewDialog();
  };

  return (
    <Box sx={{ bgcolor: 'white', height: '370px', overflow: 'hidden' }}>
      <Box
        mb={1}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '5px'
        }}
      >
        <Typography sx={{ fontSize: '20px' }}>Notes</Typography>
        <IconButton sx={{ color: '#1273EB' }} onClick={openAddDialog}>
          <AddIcon />
        </IconButton>
      </Box>

      {notes && notes.length > 0 ? (
        <Grid
          container
          spacing={2}
          sx={{
            maxHeight: '335px',
            overflowY: 'auto',
            padding: '7px',
            '&::-webkit-scrollbar': {
              width: '8px'
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#1273EB',
              borderRadius: '10px'
            }
          }}
        >
          {notes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onViewNote={handleViewNote}
              onDeleteNote={deleteNote}
            />
          ))}
        </Grid>
      ) : (
        <Typography
          variant="body1"
          sx={{
            height: '140px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          No notes created.
        </Typography>
      )}

      {isAddDialogOpen && (
        <AddNoteModal
          isAddDialogOpen={isAddDialogOpen}
          closeAddDialog={closeAddDialog}
          openAddDialog={openAddDialog}
        />
      )}
      {isViewDialogOpen && (
        <ViewNoteModal
          isOpen={isViewDialogOpen}
          onClose={closeViewDialog}
          note={selectedNote}
          onDeleteNote={deleteNote}
        />
      )}
    </Box>
  );
}

export default Notes;
