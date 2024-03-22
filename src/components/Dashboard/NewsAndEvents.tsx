import React from 'react';
import {
  Card,
  CardContent,
  Box,
  CardHeader,
  Typography,
  CardActions
} from '@mui/material';
import { useGetEvents } from '@/hooks/newsAndEvents';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import NewsAndEventsModal from './NewsAndEventsModal';
// import { useAddEvent } from '@/hooks/newsAndEvents';
// import { NewEventType } from 'types/EventTypes';
import Link from 'next/link';

export default function NewsAndEvents() {
  const { data: newsAndEvents } = useGetEvents();
  const newsItems = [
    'Bassam is promoted as Associate Software Engineer, Congratulation bassam on your promotion.',
    'Another news item, ',
    'Yet another news item'
  ];

  const news = newsAndEvents?.map(value => {
    return value.description;
  });

  const newsDivs = news?.map((item, index) => (
    <div
      key={index}
      style={{
        height: '180px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Segoe UI',
          fontWeight: 600,
          fontSize: '18px',
          padding: '5%',
          overflow: 'hidden'
        }}
      >
        {item}
      </Typography>
    </div>
  ));
  // // Use the custom hook
  // const addEventMutation = useAddEvent();
  // const handleAddEvent = () => {
  //   // Define your new event data here, based on your requirements
  //   const newEvent: NewEventType = {
  //     title: 'New Event Title',
  //     description: 'New Event Description',
  //     startingAT: new Date(),
  //     endingAT: new Date()
  //   };

  //   // Call the mutation to add the event
  //   addEventMutation.mutate(newEvent);
  // };

  return (
    <Card
      sx={{
        boxShadow: 'unset',
        width: '100%',
        height: '350px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
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
            fontWeight: 600,
            lineHeight: 'normal'
          }}
        >
          News And Events
        </Typography>
        <Typography>
          <NewsAndEventsModal />
        </Typography>
      </div>

      <CardContent
        sx={{
          height: '209px',
          padding: '0px'
        }}
      >
        <Carousel
          className="custom-carousel"
          infiniteLoop
          autoPlay
          stopOnHover
          swipeable
          transitionTime={500}
          interval={3000}
          showArrows={false}
          showStatus={false}
          showThumbs={false}
        >
          {newsDivs}
        </Carousel>
      </CardContent>

      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '20px'
        }}
      >
        <div
          style={{
            width: '114px',
            height: '40px',
            background: '#FFFFFF',
            border: '2px solid #E1E1E1',
            borderRadius: '2px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <Typography
            sx={{
              color: '#222',
              fontFamily: 'Segoe UI',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal'
            }}
            onClick={() => {}}
          >
      
          </Typography>

          <Link href="events-viewall">View All</Link>
        </div>
      </CardActions>
    </Card>
  );
}
