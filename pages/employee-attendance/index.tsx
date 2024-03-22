import HrDashboardRightCards from '@/components/DashboardRightCards';
import EmployeeAttendanceStatus from '@/components/Employee/EmployeeAttendanceStatus';
import { Grid } from '@mui/material';
import React from 'react';

function EmployeeAttendance() {
  return (
    <Grid
      container
      columnSpacing={2}
      sx={{
        background: '#F5F6F9'
      }}
    >
      <Grid item xs={7} md={8.5}>
        <EmployeeAttendanceStatus />
      </Grid>
      <Grid item xs={5} md={3.5}>
        <HrDashboardRightCards />
      </Grid>
    </Grid>
  );
}

export default EmployeeAttendance;
