import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import PickerWithButtonField from '../shared-components/DatePikckers';
import EventCard from '../shared-components/EventCard';
import EventsButton from '../shared-components/buttons/EventsButton';
import { useGetEvents } from '@/hooks/newsAndEvents';
import { Grid } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: '50%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 0, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}));

export default function PrimarySearchAppBar() {
  const { data: newsAndEvents } = useGetEvents();
  console.log('useGetEvents :', newsAndEvents);
  return (
    <>
      <Grid item xs={6} md={12.2}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ backgroundColor: 'white' }}>
            <Toolbar sx={{ backgroundColor: 'white' }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block', color: '#1E90FF' } }}
              >
                Events
              </Typography>
              <Search
                sx={{
                  color: '#696969',
                  backgroundColor: '#F5F5F5',
                  width: '5rem',
                  height: '2.1rem'
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
              <PickerWithButtonField />
              <EventsButton title={'All Events'} />
              <EventsButton title={'In Progress'} />
              <EventsButton title={'Upcoming'} />
              <EventsButton title={'Completed'} />
            </Toolbar>
            <Box sx={{ marginTop: '1.5rem', marginLeft: '1.5rem' }}>
              <Typography
                sx={{
                  color: '#1E90FF',
                  fontWeight: 'bolder',
                  marginBottom: '1rem'
                }}
              >
                Today
              </Typography>
              <Typography sx={{ color: 'black', fontWeight: 'bolder' }}>
                May 2023
              </Typography>
            </Box>
            {newsAndEvents?.map(cardData => (
              <EventCard content={cardData} />
            ))}

            {/* <EventCard />
          <EventCard />
          <EventCard /> */}
          </AppBar>
        </Box>
      </Grid>
    </>
  );
}
