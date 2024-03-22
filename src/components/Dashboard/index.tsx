import React from 'react';
import Grid from '@mui/material/Grid';
import TopLevelInfo from './TopLevelInfo';
import NewsAndEvents from './NewsAndEvents';
import EmployeeTable from './EmployeeAttendanceDataGrid';
import { DoughnutChart } from '@/components/Charts/DoughnutChart';
import { useAttendence } from '@/hooks/attendence/useAttendence';

const chartInfo = [{ title: 'Absent' }, { title: 'Present' }];

function Dashboard() {
  const { data: employees, isLoading, isError } = useAttendence();
  return (
    <>
      <Grid
        container
        style={{
          width: '100%',
          marginTop: '5%'
        }}
      >
        <Grid item xs={12} md={12}>
          <TopLevelInfo />
        </Grid>
        <Grid item xs={12} md={12}>
          <Grid
            container
            spacing={2}
            style={{ display: 'flex', marginTop: '16px' }}
          >
            <Grid item xs={12} md={6}>
              <DoughnutChart attendanceData={employees} />
            </Grid>
            <Grid item xs={12} md={6}>
              <NewsAndEvents />
            </Grid>
            <Grid item xs={12} md={12}>
              <EmployeeTable />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
