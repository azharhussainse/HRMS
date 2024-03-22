import React from 'react';
import { Grid } from '@mui/material';
import {
  WbCloudyOutlined,
  WbSunnyOutlined,
  Opacity,
  CloudQueue,
  ThunderstormOutlined,
  CloudQueueOutlined
} from '@mui/icons-material';
import CloudIcon from '@mui/icons-material/Cloud';
import { useWeather } from '@/hooks/weather/useWeather';
const styles = {
  mainDiv: {
    height: '81px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '10px'
  },
  timeDiv: {
    color: '#1273EB',
    fontSize: '18px',
    letterSpacing: '0.98px',
    paddingBottom: '10px'
  },
  dateDiv: {
    color: '#222',
    fontFamily: 'Segoe UI',
    fontSize: '13px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    letterSpacing: '1.08px'
  },
  tempDiv: {
    color: ' #1273EB',
    fontFamily: 'Segoe UI',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    letterSpacing: '0.84px',
    paddingBottom: '10px'
  },
  conditionDiv: {
    color: '#222',
    fontFamily: 'Segoe UI',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    letterSpacing: '1.08px'
  },
  iconDiv: {
    display: 'flex',
    justifyContent: 'end'
  }
};

const weatherIcon = (condition?: string) => {
  switch (condition) {
    case 'Clear':
      return <WbSunnyOutlined sx={{ color: '#ffeb3b' }} />;
    case 'Clouds':
      return <WbCloudyOutlined sx={{ color: '#1273EB' }} />;
    case 'Rain':
      return <CloudIcon sx={{ color: '#1273EB' }} />;
    case 'Drizzle':
      return <Opacity sx={{ color: '#ff9100' }} />;
    case 'Thunderstorm':
      return <ThunderstormOutlined sx={{ color: '#1273EB' }} />;
    case 'Mist':
      return <CloudQueue />;
    case 'Smoke':
    case 'Haze':
    case 'Dust':
    case 'Fog':
      return <CloudQueueOutlined sx={{ color: '#9e9e9e' }} />;
    default:
      return <WbSunnyOutlined />;
  }
};
const Weather = () => {
  const { data: weatherData } = useWeather();
  const [currentDateTime, setCurrentDateTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [currentDateTime]);

  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  const formattedTime = currentDateTime.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    // second: 'numeric',
    hour12: true
  });
  return (
    <Grid container spacing={2} sx={styles.mainDiv}>
      <Grid item xs={5} textAlign="left">
        <div style={styles.timeDiv}>{formattedTime}</div>
        <div style={styles.dateDiv}>{formattedDate}</div>
      </Grid>
      <Grid item xs={3} textAlign="left">
        <div style={styles.tempDiv}>
          {weatherData ? <p>{weatherData.main.temp.toFixed()}°C</p> : <p>..</p>}
        </div>
        <div style={styles.conditionDiv}>
          {weatherData ? <p>{weatherData.weather[0].main}</p> : <p>..</p>}
        </div>
      </Grid>
      <Grid item xs={3.5} textAlign="left" sx={styles.iconDiv}>
        {weatherIcon(weatherData?.weather[0].main)}
      </Grid>
    </Grid>
  );
};

export default Weather;
