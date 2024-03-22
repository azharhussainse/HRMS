import React from 'react';
import { Grid } from '@mui/material';
import HRMFormDialog from '../shared-components/HRMFormDialog/HRMFormDialog';
import UserProfileInfo from '@/components/shared-components/UserProfile/UserProfileInfo';
import { useSession } from 'next-auth/react';
import EmployeeAttendanceDetail from '../shared-components/EmployeeAttendanceField/EmployeeAttendanceDetail';
import EmployeeAttendanceDetailTable from '../shared-components/EmployeeAttendanceField/EmployeeAttendanceDetailTable';

type Props = {
  isEmployeeFullRecordDialogOpen: boolean;
  closeEmployeeFullRecordDialog: () => void;
  openEmployeeFullRecordDialog: () => void;
};

function EmployeeAttendanceFullRecord({
  isEmployeeFullRecordDialogOpen,
  closeEmployeeFullRecordDialog,
  openEmployeeFullRecordDialog
}: Props) {
  const { data: session, status } = useSession();
  const tableData = {
    rows: [
      {
        date: '2023-06-01',
        status: 'present',
        checkIn: '09:00 AM',
        checkOut: '05:00 PM',
        workTime: '8 hours'
      },
      {
        date: '2023-06-02',
        status: 'absent',
        checkIn: '09:30 AM',
        checkOut: '04:30 PM',
        workTime: '7 hours'
      }
    ]
  };
  return (
    <HRMFormDialog
      title="Abdul Wahab Attendance Record"
      initialValues={{}}
      onSave={closeEmployeeFullRecordDialog}
      isOpen={isEmployeeFullRecordDialogOpen}
      onClose={closeEmployeeFullRecordDialog}
      maxWidth="lg"
    >
      <Grid container>
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
      <Grid container spacing={2} sx={{ paddingLeft: '40px' }}>
        <Grid item xs={12}>
          <EmployeeAttendanceDetail heading="Total Work Time" value="12 hr" />
          <EmployeeAttendanceDetail heading="Total Working Days" value="12" />
          <EmployeeAttendanceDetail heading="Total Holidays" value="12" />
          <EmployeeAttendanceDetail heading="Average Work Time" value="12 hr" />
          <EmployeeAttendanceDetail heading="Total Present" value="12" />
          <EmployeeAttendanceDetail
            heading="Average Check-in Time"
            value="3:00 PM"
          />
          <EmployeeAttendanceDetail
            heading="Average Check-out Time"
            value="12:00 AM"
          />
        </Grid>
        <Grid xs={12}>
          <EmployeeAttendanceDetailTable
            data={tableData}
            Date="Date"
            Status="Status"
            CheckIn="CheckIn"
            CheckOut="CheckOut"
            WorkTime="WorkTime"
          />
        </Grid>
      </Grid>
    </HRMFormDialog>
  );
}

export default EmployeeAttendanceFullRecord;
