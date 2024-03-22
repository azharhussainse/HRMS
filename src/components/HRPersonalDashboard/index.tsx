import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TopLevelInfo from '../Dashboard/TopLevelInfo';
import NewsAndEvents from '../Dashboard/NewsAndEvents';
import HRCheckInCheckOutCard from './HRCheckInCheckOutCard';
import { BarChart } from '../Charts/BarChart';

const chartInfo = [{ title: 'Absent' }, { title: 'Present' }];

function HRPersonalDashboard() {
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
              <HRCheckInCheckOutCard />
            </Grid>
            <Grid item xs={12} md={6}>
              <NewsAndEvents />
            </Grid>
            <Grid item xs={12} md={12}>
              <BarChart />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default HRPersonalDashboard;
