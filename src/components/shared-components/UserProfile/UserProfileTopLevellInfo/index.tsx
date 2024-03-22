import React, { ReactNode } from 'react';
import { Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px'
  },
  buttonCard: {
    display: 'flex',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '15px',
    lineHeight: '18px',
    color: '#1273EB',
    cursor: 'pointer',
    alignItems: 'center'
  }
}));

type UserProfileTopLevelInfoProps = {
  backButtonIcon?: ReactNode;
  backButtonText?: string;
};

export default function UserProfileTopLevellInfo({
  backButtonIcon,
  backButtonText
}: UserProfileTopLevelInfoProps) {
  const classes = useStyles();
  return (
    <div className={classes.buttonContainer}>
      <Typography className={classes.buttonCard} sx={{ fontWeight: 600 }}>
        {' '}
        {backButtonIcon}
        {backButtonText}
      </Typography>
    </div>
  );
}
