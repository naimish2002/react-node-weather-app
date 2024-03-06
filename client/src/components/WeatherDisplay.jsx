import React from 'react';
import { Card, CardHeader, CardBody, Divider } from '@chakra-ui/react';
import { CalendarDays, Eye, Gauge, MapPin, SunSnow, Wind } from 'lucide-react';

const WeatherDisplay = ({
  unit,
  temp,
  icon,
  description,
  timestamp,
  location,
  country,
  wind,
  pressure,
  feelsLike,
  visibility,
}) => {
  // Format timestamp to a readable date
  const formattedDate = new Date(timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  });

  // Function to get the weather icon URL
  const getWeatherIconUrl = () =>
    `https://openweathermap.org/img/wn/${icon}.png`;

  return (
    <section className='text-zinc-200 h-full'>
      <Card className='h-full text-white flex items-center lg:justify-between gap-y-5 lg:gap-y-0'>
        <CardHeader className='lg:flex-1 w-full md:w-[70%] mx-auto lg:w-full flex flex-col justify-center gap-y-3 px-6 lg:py-4'>
          <div className='w-[80%] mx-auto flex flex-col gap-y-2 items-center justify-center'>
            <p className='w-full text-zinc-300'>Now</p>
            <h1 className='text-6xl'>
              {temp}
              <sup>{unit === 'metric' ? '°C' : '°F'}</sup>
            </h1>
            <p className='flex items-center gap-x-2'>
              <img
                src={getWeatherIconUrl()}
                alt='weather icon'
                className='h-10 w-10'
              />
              <span className='text-zinc-300 capitalize'>{description}</span>
            </p>
          </div>
          <Divider className='h-0.5 bg-[#2e2e30] w-[50%] mx-auto lg:w-full' />
          <div className='flex flex-col gap-y-5 items-center'>
            <div className='flex items-center gap-x-2'>
              <CalendarDays className='w-5 h-5 text-zinc-300' />
              <p className='text-zinc-400'>{formattedDate}</p>
            </div>
            <div className='flex items-center justify-center gap-x-2'>
              <MapPin className='w-5 h-5 text-zinc-300' />
              <p className='text-zinc-400'>
                {location}, {country}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardBody className='lg:flex-1 w-full flex '>
          <div className='w-full grid sm:grid-cols-4 grid-cols-2 md:grid-cols-2 repeat(2, 1fr)'>
            <div className='px-3 py-5 flex flex-col items-center gap-y-3 lg:justify-between'>
              <div className='text-zinc-400 text-sm'>Wind</div>
              <div className='w-full flex flex-col items-center gap-y-1'>
                <Wind className='w-6 h-6 text-zinc-300' />
                <p className='text-lg'>
                  {wind}
                  {unit === 'metric' ? ' m/s' : ' mph'}
                </p>
              </div>
            </div>
            <div className='px-3 py-5 flex flex-col items-center gap-y-3 lg:justify-between'>
              <div className='text-zinc-400 text-sm'>Air pressure</div>
              <div className='w-full flex flex-col items-center gap-y-1'>
                <Gauge className='w-6 h-6 text-zinc-300' />
                <p className='text-lg'>
                  {pressure}
                  {unit === 'metric' ? ' hPa' : ' inHg'}
                </p>
              </div>
            </div>
            <div className='px-3 py-5 flex flex-col items-center gap-y-3 lg:justify-between'>
              <div className='text-zinc-400 text-sm'>Feels like</div>
              <div className='w-full flex flex-col items-center gap-y-1'>
                <SunSnow className='w-6 h-6 text-zinc-300' />
                <p className='text-lg'>
                  {feelsLike}
                  <sup>{unit === 'metric' ? '°C' : '°F'}</sup>
                </p>
              </div>
            </div>
            <div className='px-3 py-5 flex flex-col items-center gap-y-3 lg:justify-between'>
              <div className='text-zinc-400 text-sm'>Visibility</div>
              <div className='w-full flex flex-col items-center gap-y-1'>
                <Eye className='w-6 h-6 text-zinc-300' />
                <p className='text-lg'>
                  {visibility}
                  {unit === 'metric' ? ' m' : ' mi'}
                </p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </section>
  );
};

export default WeatherDisplay;
