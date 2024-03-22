import React from 'react';
import { SkewLoader } from 'react-spinners';
import { useSession } from 'next-auth/react';
import { useStopwatch } from 'react-timer-hook';
import { Check, Timer, Stop } from '@mui/icons-material';
import { Card, Box, Typography, Button } from '@mui/material';
import { formatTime } from '@/utils/dateFormatter';
import { PSTFormatter } from '@/utils/PSTFormatter';
import CheckoutConfirmation from './CheckOutConfirmationDailog';
import { useDialog } from '@/hooks/useDialog';

import {
  useCheckIn,
  useCheckOut,
  useStartBreak,
  useEndBreak
} from '@/hooks/checkInCheckout';
import { useAttendence } from '@/hooks/attendence/useAttendence';
import type { ButtonOptions } from 'types/ButtonOptionsType';

const employeeAttendanceStatus = {
  absent: 'Absent',
  present: 'Present',
  onLeave: 'On Leave'
};

const styles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '350px'
  },
  timerCard: {
    boxShadow: 'unset',
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '1.2rem',
    height: '350px'
  },
  breakTypography: {
    color: ' #222',
    fontFamily: ' Segoe UI',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 'normal',
    paddingTop: '7px'
  }
};

const HRCheckInCheckOutCard = () => {
  const checkoutConfirmationDialog = useDialog();
  const { data: usersAttendance, isLoading } = useAttendence();
  const { data: session } = useSession();

  const loggedInUser = usersAttendance?.filter(user => {
    return user.name === session?.user.userInfo.fullName;
  });
  const userPresentStatus = loggedInUser?.[0]?.status;
  const shouldEmployeeCheckIn =
    userPresentStatus === employeeAttendanceStatus.absent;

  const { mutateAsync: markCheckIn } = useCheckIn();
  const { mutateAsync: markCheckOut } = useCheckOut();
  const { mutateAsync: startBreak } = useStartBreak();
  const { mutateAsync: endBreak } = useEndBreak();
  const [isCheckedIn, setIsCheckedIn] = React.useState(false);
  const {
    seconds: checkSeconds,
    minutes: checkMinutes,
    hours: checkHours,
    isRunning: checkIsRunning,
    start: checkStart,
    pause: checkPause,
    reset: checkReset
  } = useStopwatch();
  const {
    seconds: breakSeconds,
    minutes: breakMinutes,
    hours: breakHours,
    isRunning: breakIsRunning,
    start: breakStart,
    pause: breakPause,
    reset: breakReset
  } = useStopwatch();

  const handleCheck = () => {
    if (checkIsRunning) {
      const timeOut = PSTFormatter();
      checkReset(undefined, false);
      breakReset(undefined, false);
      setIsCheckedIn(false);
      checkoutConfirmationDialog.closeDialog();
      markCheckOut({
        timeOut
      });
    } else {
      const timeIn = PSTFormatter();
      markCheckIn({
        timeIn
      });
      checkStart();
      setIsCheckedIn(true);
    }
  };

  const handleBreak = () => {
    if (!breakIsRunning) {
      const timeIn = PSTFormatter();
      checkPause();
      breakStart();

      startBreak({
        timeIn
      });
    } else {
      const timeOut = PSTFormatter();
      breakPause();
      checkStart();
      endBreak({
        timeOut
      });
    }
  };

  const renderButton = (options: ButtonOptions) => (
    <Button
      variant="outlined"
      size="small"
      sx={{
        border: '1px solid #E1E1E1',
        height: '2.5rem',
        color: '#1273EB'
      }}
      onClick={options.onClick}
      disabled={options.disabled}
      startIcon={options.icon}
    >
      {options.buttonText}
    </Button>
  );

  return (
    <Box>
      {isLoading ? (
        <Box sx={styles.loadingContainer}>
          <SkewLoader color="#1273EB" size={50} />
        </Box>
      ) : (
        <>
          <Card sx={styles.timerCard}>
            <Box
              sx={{
                display: 'flex',
                padding: '10px',
                justifyContent: 'space-between'
              }}
            >
              <Typography
                sx={{
                  color: ' #222',
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: 'normal'
                }}
              >
                Mark Check-in/Check-out
              </Typography>
              <Typography
                sx={{
                  color: '#1273EB',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Request
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px',
                marginTop: '20px'
              }}
            ></Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                color: '#1273EB',
                paddingTop: '40px',
                paddingBottom: '85px'
              }}
            >
              <Typography
                sx={{
                  color: '#1273EB',
                  fontFamily: 'Segoe UI',
                  fontSize: '48px',
                  fontWeight: 600,
                  lineHeight: 'normal'
                }}
              >
                {`${formatTime(checkHours)}:${formatTime(
                  checkMinutes
                )}:${formatTime(checkSeconds)}`}
              </Typography>
            </Box>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              {renderButton({
                icon: <Check />,
                buttonText: 'Check In',
                onClick: handleCheck,
                disabled: !shouldEmployeeCheckIn
              })}
              {renderButton({
                icon: <Stop />,
                buttonText: 'Check out',
                onClick: checkoutConfirmationDialog.openDialog,
                disabled: breakIsRunning || !isCheckedIn
              })}
              {renderButton({
                icon: <Timer />,
                buttonText: breakIsRunning ? 'End Break' : 'Start Break',
                onClick: handleBreak,
                disabled: !isCheckedIn
              })}
              <Typography sx={styles.breakTypography}>
                {`${formatTime(breakHours)}:${formatTime(
                  breakMinutes
                )}:${formatTime(breakSeconds)}`}
              </Typography>
            </div>
          </Card>
        </>
      )}
      <CheckoutConfirmation
        open={checkoutConfirmationDialog.isDialogOpen}
        onClose={checkoutConfirmationDialog.closeDialog}
        onConfirm={handleCheck}
      />
    </Box>
  );
};

export default HRCheckInCheckOutCard;
