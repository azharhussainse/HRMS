import React from 'react';
import Grid from '@mui/material/Grid';
import BirthdayCard from './BirthdayCard';
import HolidayCard from './HolidayCard';
import Notes from './Notes/Notes';
import WeatherInfo from './WeatherInfo';
import { useGetLeaves } from '@/hooks/Leaves/useGetLeaves';

const HrDashboardRightCards = () => {
  const { data: leaves } = useGetLeaves();

  const filteredHolidays =
    leaves?.filter(value => {
      return (
        value.leaveStatus === 'Approved' && {
          applicantId: value.applicantId,
          // duration: new Date(),
          description: value.description
        }
      );
    }) || [];

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
      <Grid item xs={11.5} md={11.5} sx={{ marginTop: '17px' }}>
        <HolidayCard title="Employees on Leave" holidays={filteredHolidays} />
      </Grid>
      <Grid item xs={11.5} md={11.5} sx={{ marginTop: '15px' }}>
        <Notes />
      </Grid>
    </Grid>
  );
};

export default HrDashboardRightCards;
