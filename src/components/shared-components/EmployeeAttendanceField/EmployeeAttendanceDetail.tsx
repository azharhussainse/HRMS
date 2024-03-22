import React from 'react';
import { Grid, Typography } from '@mui/material';

type HeadingValueProps = {
  heading: string;
  value: string;
};

export default function EmployeeAttendanceDetail({
  heading,
  value
}: HeadingValueProps) {
  return (
    <Grid container sx={{ padding: '20px' }} alignItems="center">
      <Grid item xs={6}>
        <Typography variant="subtitle1">{heading}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">{value}</Typography>
      </Grid>
    </Grid>
  );
}
