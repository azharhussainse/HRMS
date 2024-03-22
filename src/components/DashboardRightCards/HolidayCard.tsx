import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardHeader } from '@mui/material';
import ViewAllModal from '../ViewAllModal';
import type { LeaveType } from 'types/LeaveType';
import { formatDateRange } from '@/utils/dateFormatter';

type HolidayPropsType = {
  title: string;
  holidays: LeaveType[];
};

const HolidayCard = ({ title, holidays }: HolidayPropsType) => {
  const firstTwoHolidays = holidays.slice(0, 2);
  return (
    <Card
      sx={{
        width: '100%',
        height: 'auto',
        boxShadow: 'unset'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: ['0px', '0px', '0px', '40px']
        }}
      >
        <Typography
          variant="h6"
          fontSize={['0px', '12px', '15px', '21px']}
          sx={{ paddingLeft: '6px' }}
        >
          {title}
        </Typography>
        <ViewAllModal title="All Holidays" holidays={holidays} />
      </Box>
      <CardContent>
        {firstTwoHolidays.map((holiday, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottom: '1px solid #F5F6F9',
              marginTop: index === 0 ? '0' : '15px'
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                marginBottom: '15px'
              }}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{ fontSize: '14px' }}
              >
                {holiday.applicantName}
              </Typography>
            </Box>
            <Box sx={{ justifyContent: 'center', marginBottom: '15px' }}>
              <Typography
                component="div"
                color="error"
                sx={{ fontSize: '14px' }}
              >
                {formatDateRange(
                  holiday.applicationStartDate,
                  holiday.applicationEndDate
                )}
              </Typography>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default HolidayCard;
