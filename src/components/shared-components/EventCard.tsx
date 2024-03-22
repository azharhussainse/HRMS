import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import type { EventType } from 'types/EventTypes';

const EventCard = ({ content }: { content: EventType }) => {
  const { name, description, startingAT } = content;
  return (
    <>
      <Grid>
        <Card
          sx={{
            border: '2px solid #D3D3D3',
            margin: '1rem',
            boxShadow: 'unset',
            gap: ['0px', '42px', '34px', '158px']
          }}
        >
          <CardContent sx={{ display: 'flex' }}>
            <Box
              sx={{
                backgroundColor: 'red',
                padding: '3px',
                borderRadius: '3px',
                marginTop: '40px',
                width: '180px',
                height: '30px',
                textAlign: 'center'
              }}
            >
              {name}
            </Box>
            <Box sx={{ marginLeft: '12rem' }}>
              <Typography sx={{ display: 'inline-block', color: '#1E90FF' }}>
                {startingAT}
              </Typography>
              <Typography sx={{ fontWeight: 'bolder' }}>{name}</Typography>
              <Typography>
                {'Meeting link : '}
                <Typography
                  sx={{
                    display: 'inline-block',
                    textDecoration: 'underline',
                    color: '#1E90FF'
                  }}
                >
                  {'www.googlemeet.com'}
                </Typography>
              </Typography>
              <Typography>{description || '- -'}</Typography>
            </Box>
            <Box>
              <NotificationsIcon sx={{ color: '#1E90FF' }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default EventCard;
