import React from 'react';
import { Grid } from '@mui/material';
import HRMFormDialog from '@/components/shared-components/HRMFormDialog';
import HRMFormTextField from '@/components/shared-components/fields/HRMFormTextField/HRMFormTextField';
import { FormikHelpers } from 'formik';
import { useAddNotes } from '@/hooks/Notes';
import { NewNoteType } from 'types/NotesType';

type AddNoteModalProps = {
  isAddDialogOpen: boolean;
  closeAddDialog: () => void;
  openAddDialog: () => void;
};

const initialAddNoteValues = {
  title: '',
  description: ''
};

const AddNoteModal: React.FC<AddNoteModalProps> = ({
  isAddDialogOpen,
  closeAddDialog,
  openAddDialog
}) => {
  const { mutateAsync: addNote } = useAddNotes();

  const handleSave = async (
    values: NewNoteType,
    formikHelpers: FormikHelpers<NewNoteType>
  ) => {
    formikHelpers.setSubmitting(true);

    const newNote = {
      title: values.title,
      description: values.description
    };

    await addNote(newNote).finally(() => {
      formikHelpers.setSubmitting(false);
    });

    closeAddDialog();
  };
  return (
    <HRMFormDialog
      title="Add Note"
      initialValues={initialAddNoteValues}
      enableReinitialize={true}
      onSave={handleSave}
      isOpen={isAddDialogOpen}
      onClose={closeAddDialog}
      maxWidth="xl"
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ position: 'unset', padding: '6%', overflow: 'hidden' }}
      >
        <Grid item xs={12}>
          <HRMFormTextField
            label="Title"
            name="title"
            type="text"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <HRMFormTextField
            label="Description"
            name="description"
            type="text"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </HRMFormDialog>
  );
};

export default AddNoteModal;
