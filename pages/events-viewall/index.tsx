import React from 'react';
import HRPersonalDashboard from '@/components/HRPersonalDashboard';
import HrDashboardRightCards from '@/components/DashboardRightCards';
import { Grid } from '@mui/material';
import { useSession } from 'next-auth/react';
import DashboardRightCards from '@/components/DashboardRightCards';
import NewsAndEventsViewAll from '@/components/NewsAndEventsViewAll';

type Props = {};

function index({}: Props) {
  const { data: session } = useSession();
  const userRole = session?.user?.userRoles[0];
  return (
    <>
      <Grid
        container
        columnSpacing={2}
        sx={{
          background: '#F5F6F9'
        }}
      >
        <Grid item xs={7} md={8.5}>
          {userRole == 'Admin' ? <NewsAndEventsViewAll /> : ''}
        </Grid>
        <Grid item xs={5} md={3.5}>
          {userRole == 'Admin' ? <DashboardRightCards /> : ''}
        </Grid>
      </Grid>
    </>
  );
}

export default index;
