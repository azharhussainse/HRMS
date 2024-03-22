import React from 'react';
import { useQuery } from 'react-query';
const API_KEY = '1fa9ff4126d95b8db54f3897a208e91c';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
interface WeatherData {
  main: {
    temp: number;
  };
  weather: {
    main: string;
  }[];
}

export function useWeather() {
  return useQuery<WeatherData, Error>('weather', async () => {
    const response = await fetch(
      `${BASE_URL}/weather?q=Lahore&appid=${API_KEY}&units=metric`
    );
    return response.json();
  });
}
