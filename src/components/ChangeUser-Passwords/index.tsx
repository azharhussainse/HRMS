import React from 'react';
import { Grid } from '@mui/material';
import HRMFormDialog from '../shared-components/HRMFormDialog/HRMFormDialog';
import HRMFormTextField from '../shared-components/fields/HRMFormTextField/HRMFormTextField';
import UserProfileTopLevellInfo from '@/components/shared-components/UserProfile/UserProfileTopLevellInfo';
import UserProfileInfo from '@/components/shared-components/UserProfile/UserProfileInfo';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useSession } from 'next-auth/react';

type Props = {
  isChangeUserPasswordsDialogOpen: boolean;
  closeChangeUserPasswordsDialog: () => void;
  openChangeUserPasswordsDialog: () => void;
};

function ChangeUserPasswords({
  isChangeUserPasswordsDialogOpen,
  closeChangeUserPasswordsDialog,
  openChangeUserPasswordsDialog
}: Props) {
  const { data: session, status } = useSession();
  return (
    <HRMFormDialog
      title="Change User Passwords"
      initialValues={{}}
      onSave={closeChangeUserPasswordsDialog}
      isOpen={isChangeUserPasswordsDialogOpen}
      onClose={closeChangeUserPasswordsDialog}
      maxWidth="md"
    >
      <Grid container>
        <Grid item xs={10} onClick={closeChangeUserPasswordsDialog}>
          <UserProfileTopLevellInfo
            backButtonIcon={<ChevronLeftIcon />}
            backButtonText="Back"
          />
        </Grid>
        <Grid item xs={12}>
          <UserProfileInfo
            EmployeeName="Abdul Wahab"
            // EmployeeName = {session?.user?.userInfo?.firstName}
            EmployeeInfo="Front-end Developer"
            EmployeeParagrapgh="Lahore | Starting on Fab 02, 2022  (1.2     years ago)"
            alt="User Info"
            src={`${session?.user?.userInfo?.profilePicture}`}
            sx={{ width: 156, height: 156, position: 'unset' }}
            EmployeeNameStyles={{
              color: '#1273EB',
              fontSize: '32px',
              fontWeight: 700,
              padding: '5px'
            }}
            EmployeeInfoStyle={{
              fontFamily: 'Segoe UI',
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '20px',
              lineHeight: '27px',
              color: '#222222',
              padding: '5px'
            }}
            EmployeeParagrapghStyle={{
              fontFamily: 'Segoe UI',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '20px',
              lineHeight: '27px',
              color: '#5C5C5C',
              padding: '5px'
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ paddingLeft: '80px' }}>
        <Grid item xs={7}>
          <HRMFormTextField
            label="Old password"
            name="oldPassword"
            placeholder="Type Old Password"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={7}>
          <HRMFormTextField
            label="New Password"
            name="newPassword"
            variant="outlined"
            placeholder="Type New Password"
          />
        </Grid>
        <Grid item xs={7}>
          <HRMFormTextField
            label="Re-Type Password*"
            name="reTypePassword*"
            variant="outlined"
            placeholder="Type New Password Again"
          />
        </Grid>
      </Grid>
    </HRMFormDialog>
  );
}

export default ChangeUserPasswords;
