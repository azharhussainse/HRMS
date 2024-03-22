import React from 'react';
import dynamic from 'next/dynamic';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import CustomStatusComponent from '../shared-components/CustomStatusComponent';
import type { AttendanceType } from 'types/AttendanceType';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});

export const DoughnutChart = ({
  attendanceData
}: {
  attendanceData?: AttendanceType[];
}) => {
  const doughnutChartStatus = [
    {
      fontSize: '13px',
      color: '#6DD400',
      label: 'Present',
      md: 3
    },
    {
      fontSize: '13px',
      color: '#D50000',
      label: 'Absent',
      md: 2.7
    },
    {
      fontSize: '13px',
      color: '#D35A24',
      label: 'Applied',
      md: 3
    },
    {
      fontSize: '13px',
      color: '#FFD100',
      label: 'Leave',
      md: 2.5
    }
  ];
  // Check if attendanceData is not defined or not an array
  if (!Array.isArray(attendanceData)) {
    return (
      <Card>
        <CardContent>
          <Typography variant="body1">
            No valid attendance data available.
          </Typography>
        </CardContent>
      </Card>
    );
  }
  // Generate series data based on attendance data
  const series = attendanceData
    ? [
        attendanceData.filter(employee => employee.status === 'Present').length,
        attendanceData.filter(employee => employee.status === 'Absent').length,
        attendanceData.filter(
          employee => employee.status === 'Applied for Leave'
        ).length,
        attendanceData.filter(employee => employee.status === 'On Leave').length
      ]
    : [];

  const options = {
    labels: ['Present', 'Absent', 'Applied', 'Leave'],
    colors: ['#6DD400', '#D50000', '#D35A24', '#FFD100'],
    legend: { show: false },
    plotOptions: {
      pie: {
        donut: {
          size: '55%'
        }
      }
    }
  };

  return (
    <Card
      sx={{
        boxShadow: 'unset',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '350px',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div style={{ display: 'flex', gap: '85px' }}>
        <CardHeader
          action={
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: ['0px', '42px', '34px', '158px'] // Responsive gap values
              }}
            >
              <Typography
                variant="h5"
                textAlign="left"
                fontSize={['18px', '20px', '22px']}
              >
                Total Attendence
              </Typography>
              <Typography
                sx={{
                  cursor: 'pointer',
                  fontSize: ['13px', '14px', '18px']
                }}
              >
                {series[0]}
              </Typography>
            </Box>
          }
        />
      </div>
      <CardContent>
        <div id="donut-chart">
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            height={'147%'}
            className="apex-charts"
          />
        </div>
        <CustomStatusComponent items={doughnutChartStatus} />
      </CardContent>
    </Card>
  );
};
