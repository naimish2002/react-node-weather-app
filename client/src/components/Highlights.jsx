import React from 'react';
import { Badge, Card } from '@chakra-ui/react';
import { Moon, Sun, Wind } from 'lucide-react';

const Highlights = ({ airQuality, sunrise, sunset }) => {
  // Function to get Air Quality Index text and badge color
  const getAQITextAndStyle = (aqi) => {
    let text = '';
    let style = '';

    switch (aqi) {
      case 1:
        text = 'Good';
        style = 'bg-emerald-500';
        break;
      case 2:
        text = 'Fair';
        style = 'bg-lime-500';
        break;
      case 3:
        text = 'Moderate';
        style = 'bg-yellow-500';
        break;
      case 4:
        text = 'Poor';
        style = 'bg-orange-500';
        break;
      case 5:
        text = 'Very Poor';
        style = 'bg-red-500';
        break;
      default:
        text = 'Good';
        style = 'bg-emerald-500';
    }

    return { text, style };
  };

  // Function to format time from timestamp
  const formatTimeFromTimestamp = (timestamp) => {
    return timestamp
      ? new Date(timestamp * 1000).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
        })
      : '';
  };

  return (
    <Card className='h-auto rounded-xl py-3'>
      <h3 className='text-lg text-zinc-300 mb-2'>Today's Highlights</h3>
      <div className='h-full flex flex-col gap-y-5 lg:flex-row lg:gap-x-5'>
        {/* Air Quality Card */}
        <Card className='bg-[#1a191c] w-full rounded-xl p-3 lg:flex-1 flex flex-col justify-between'>
          <div className='flex items-center justify-between text-sm mb-6   lg:m-0'>
            <p className='text-zinc-400'>Air Quality Index</p>
            <Badge
              className={`${
                getAQITextAndStyle(airQuality?.list[0]?.main?.aqi)?.style
              } px-2 py-0.5 rounded-full`}>
              {getAQITextAndStyle(airQuality?.list[0]?.main?.aqi)?.text}
            </Badge>
          </div>
          {/* Air Quality Details */}
          <div className='w-full flex items-center justify-evenly gap-x-2'>
            <div className='mr-2'>
              <Wind className='w-8 h-8 text-zinc-300' />
            </div>
            {['pm2_5', 'so2', 'no2', 'o3'].map((component) => (
              <div
                key={component}
                className='flex flex-col items-center gap-y-1'>
                <p className='text-xs text-zinc-400'>
                  {component.toUpperCase()}
                </p>
                <p className='text-lg lg:text-xl'>
                  {airQuality?.list[0]?.components[component]}
                </p>
              </div>
            ))}
          </div>
        </Card>
        {/* Sunrise & Sunset Card */}
        <Card className='bg-[#1a191c] rounded-xl p-3 flex-1 flex flex-col justify-between'>
          <div className='text-sm mb-3 lg:m-0'>
            <p className='text-zinc-400'>Sunrise & Sunset</p>
          </div>
          {/* Sunrise & Sunset Details */}
          <div className='w-full flex items-center justify-evenly gap-x-5 mt-4'>
            {['Sunrise', 'Sunset'].map((timeType) => (
              <div key={timeType} className='flex items-center gap-x-3'>
                <div>
                  {timeType === 'Sunrise' ? (
                    <Sun className='w-8 h-8 text-zinc-300' />
                  ) : (
                    <Moon className='w-8 h-8 text-zinc-300' />
                  )}
                </div>
                <div className='flex flex-col items-center gap-y-1'>
                  <p className='text-xs text-zinc-400'>{timeType}</p>
                  <p className='text-xl lg:text-2xl'>
                    {formatTimeFromTimestamp(
                      timeType === 'Sunrise' ? sunrise : sunset
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Card>
  );
};

export default Highlights;
