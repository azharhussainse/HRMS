import React from 'react';
import Grid from '@mui/material/Grid';
import Dashboard from '@/components/Dashboard';
import HrDashboardRightCards from '@/components/DashboardRightCards';
import { useSession } from 'next-auth/react';

function AppView() {
  const { data: session } = useSession();
  const userRole = session?.user?.userRoles[0];
  return (
    <Grid
      container
      columnSpacing={2}
      sx={{
        background: '#F5F6F9'
      }}
    >
      <Grid item xs={7} md={8.5}>
        {userRole == 'Admin' ? <Dashboard /> : ''}
      </Grid>
      <Grid item xs={5} md={3.5}>
        {userRole == 'Admin' ? <HrDashboardRightCards /> : ''}
      </Grid>
    </Grid>
  );
}

export default AppView;
