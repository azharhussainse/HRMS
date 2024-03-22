import React from 'react';
import dynamic from 'next/dynamic';
import { Card, Typography } from '@mui/material';
import { useGetAttendanceReport } from '@/hooks/attendence/useGetAttendanceReport';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});

const initialAttendance = {
  monday: 0,
  tuesday: 0,
  wednesday: 0,
  thursday: 0,
  friday: 0
};

export const BarChart = () => {
  const { data: attendanceReport } = useGetAttendanceReport();

  const finalAttendance = attendanceReport?.reduce<typeof initialAttendance>(
    (acc, value) => {
      const { timeInDay: day, workingHours } = value;
      return {
        ...acc,
        [day.toLowerCase()]: workingHours
      };
    },
    initialAttendance
  );

  const barChartData = [
    { day: 'Monday', hours: finalAttendance?.monday ?? 0 },
    { day: 'Tuesday', hours: finalAttendance?.tuesday ?? 0 },
    { day: 'Wednesday', hours: finalAttendance?.wednesday ?? 0 },
    { day: 'Thursday', hours: finalAttendance?.thursday ?? 0 },
    { day: 'Friday', hours: finalAttendance?.friday ?? 0 }
  ];

  const options = {
    chart: {
      type: 'bar',
      height: 'full',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%'
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: barChartData.map(item => item.day)
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return `${val} hr`;
        }
      }
    },
    fill: {
      colors: ['#1273EB']
    },
    legend: {
      show: false
    }
  } as ApexCharts.ApexOptions;
  return (
    <Card id="bar-chart" style={{ boxShadow: 'unset', marginBottom: '10px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px'
        }}
      >
        <Typography
          sx={{
            color: ' #222',
            fontFamily: ' Segoe UI',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal'
          }}
        >
          Attendance
        </Typography>
        <Typography
          sx={{
            color: '#1273EB',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: ['13px', '14px', '15px']
          }}
        >
          View All
        </Typography>
      </div>
      <ReactApexChart
        options={options}
        series={[
          {
            name: 'Hours',
            data: barChartData?.map(item => item.hours)
          }
        ]}
        type="bar"
        height={'135%'}
        className="apex-charts"
      />
    </Card>
  );
};
