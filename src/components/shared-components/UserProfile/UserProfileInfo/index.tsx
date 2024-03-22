import React, { useState } from 'react';
import { Box, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';

type UserProfileInfoProps = {
  EmployeeName?: String;
  EmployeeInfo?: String;
  EmployeeParagrapgh?: String;
  alt?: string;
  src?: string;
  sx?: object;
  EmployeeNameStyles?: object;
  EmployeeInfoStyle?: object;
  EmployeeParagrapghStyle?: object;
};

export default function UserProfileInfo({
  EmployeeName,
  EmployeeInfo,
  EmployeeParagrapgh,
  alt,
  src,
  sx,
  EmployeeNameStyles,
  EmployeeInfoStyle,
  EmployeeParagrapghStyle
}: UserProfileInfoProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '50px',
        paddingTop: '10px',
        paddingLeft: '60px',
        paddingBottom: '60px'
      }}
    >
      <Avatar alt={alt} src={src} sx={sx} />
      <div>
        <h3 style={EmployeeNameStyles}>{EmployeeName}</h3>
        <p style={EmployeeInfoStyle}>{EmployeeInfo}</p>
        <p style={EmployeeParagrapghStyle}>{EmployeeParagrapgh}</p>
      </div>
    </Box>
  );
}
