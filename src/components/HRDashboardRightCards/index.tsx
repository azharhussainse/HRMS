import React from 'react';
import Grid from '@mui/material/Grid';
import BirthdayCard from '../DashboardRightCards/BirthdayCard';
import HRLeavesCard from './HRLeavesCard';
import HRWorkFromHomeCard from './HRWorkFromHomeCard';
import WeatherInfo from '../DashboardRightCards/WeatherInfo';
const HRDashboardRightCards = () => {
  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: '4%' }}
    >
      <Grid item xs={11.5} md={11.5}>
        <WeatherInfo />
      </Grid>
      <Grid item xs={11.5} md={11.5} sx={{ marginTop: '10px' }}>
        <BirthdayCard />
      </Grid>
      <Grid item xs={11.5} md={11.5} sx={{ marginTop: '16px' }}>
        <HRLeavesCard />
      </Grid>
      <Grid item xs={11.5} md={11.5} sx={{ marginTop: '4px' }}>
        <HRWorkFromHomeCard />
      </Grid>
    </Grid>
  );
};

export default HRDashboardRightCards;
