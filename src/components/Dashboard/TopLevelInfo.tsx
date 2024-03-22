import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

function getGreeting() {
  const currentDate = new Date();
  const curHr = currentDate.getHours();

  if (curHr < 12) {
    return 'Good Morning';
  } else if (curHr < 18) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
}

function TopLevelInfo() {
  const router = useRouter();
  const greeting = getGreeting();

  const currentPath = router.pathname;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography
        sx={{
          color: '#127BEB',
          fontFamily: 'Segoe UI',
          fontSize: '40px',
          fontStyle: 'normal',
          fontWeight: 600,
          lineHeight: 'normal'
        }}
      >
        {greeting}
      </Typography>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Link href="/">
          <Button
            variant={currentPath === '/' ? 'contained' : 'outlined'}
            size="small"
            sx={{
              height: '29px',
              width: '95px',
              color: currentPath === '/' ? '#FFF' : '#000',
              backgroundColor: currentPath === '/' ? '#127BEB' : 'transparent',
              textAlign: 'center',
              fontFamily: 'Inter',
              fontSize: '14.5px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
              marginRight: '15px'
            }}
          >
            HR
          </Button>
        </Link>
        <Link href="/hr-dashboard">
          <Button
            variant={currentPath === '/hr-dashboard' ? 'contained' : 'outlined'}
            size="small"
            sx={{
              width: '95px',
              height: '29px',
              color: currentPath === '/hr-dashboard' ? '#FFF' : '#000',
              backgroundColor:
                currentPath === '/hr-dashboard' ? '#127BEB' : 'transparent',
              textAlign: 'center',
              fontFamily: 'Inter',
              fontSize: '14.5px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal'
            }}
          >
            Personal
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default TopLevelInfo;
