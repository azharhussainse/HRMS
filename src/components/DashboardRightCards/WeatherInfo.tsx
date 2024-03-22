import React from 'react';
import { Card } from '@mui/material';
import Weather from '../WeatherInformation/Weather';

export default function WeatherInfo() {
  return (
    <Card
      sx={{
        width: '100%',
        height: '81px',
        boxShadow: 'unset',
        display: 'flex'
      }}
    >
      <Weather />
    </Card>
  );
}
