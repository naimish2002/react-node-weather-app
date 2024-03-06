import React from 'react';
import { Card, CardBody, CardHeader } from '@chakra-ui/react';

const ForeCast = ({ unit, data, type }) => {
  // Function to format time or date based on forecast type
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return type === 'hourly'
      ? date.toLocaleTimeString('en-US', { hour: 'numeric' })
      : date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <Card rowGap={5}>
      <CardHeader>
        {type === 'hourly' ? 'Hourly Forecast' : '5 Day Forecast'}
      </CardHeader>
      <CardBody
        className={`h-full flex gap-x-2.5 lg:gap-x-5 overflow-x-auto scroll-smooth pb-2 lg:pb-1 ${
          type === 'daily' && 'lg:justify-center'
        }`}>
        {data?.map((item, index) => (
          <ForecastItem
            key={index}
            unit={unit}
            item={item}
            type={type}
            formatDate={formatDate}
          />
        ))}
      </CardBody>
    </Card>
  );
};

// ForecastItem component to render each forecast item
const ForecastItem = ({ unit, item, type, formatDate }) => {
  return (
    <div className='min-w-44 lg:min-w-36 bg-[#1a191c] rounded-xl flex flex-col p-5 lg:px-10 items-center justify-center'>
      <p className='text-zinc-400 text-sm'>{formatDate(item.dt)}</p>
      <img
        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
        alt='weather icon'
      />
      <p className='text-zinc-300'>
        {item.main.temp}
        <sup>{unit === 'metric' ? '°C' : '°F'}</sup>
      </p>
    </div>
  );
};

export default ForeCast;
