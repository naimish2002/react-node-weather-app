import { useToast } from '@chakra-ui/react';
import WeatherDisplay from './components/WeatherDisplay';
import ForeCast from './components/ForeCast';
import Highlights from './components/Highlights';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchForm from './components/SearchForm';
import TemperatureUnitSelector from './components/TemperatureUnitSelector';

function App() {
  const [location, setLocation] = useState('');
  const [unit, setUnit] = useState('metric'); // metric or imperial
  const [weatherData, setWeatherData] = useState({});
  const toast = useToast();

  const BACKEND_URL = 'https://weather-backend-3j1q.onrender.com';

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  // Fetch weather data on initial render and when location or unit changes
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const endpoint = location ? `w/${location}` : 'w/delhi';
        const response = await axios.get(
          `${BACKEND_URL}/${endpoint}?unit=${unit}`
        );
        setWeatherData(response.data.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [location, unit]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location) return;
    try {
      const response = await axios.get(
        `${BACKEND_URL}/w/${location}?unit=${unit}`
      );
      setWeatherData(response.data.data);
      response.data.success &&
        toast({
          title: 'Success',
          description: response.data.success,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Function to handle getting current location
  const handleCurrentLocation = (e) => {
    e.preventDefault();
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await axios.get(
            `${BACKEND_URL}/weather/coord?lat=${latitude}&lon=${longitude}&unit=${unit}`
          );
          setWeatherData(response.data.data);
          response.data.success &&
            toast({
              title: 'Success',
              description: response.data.success,
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Function to determine the background image based on weather condition
  const getBackgroundImage = (condition) => {
    switch (condition) {
      case 'clear sky':
        return '/assets/clear_sky.jpg';
      case 'few clouds':
        return '/assets/few_clouds.jpg';
      case 'scattered clouds':
        return '/assets/scattered_clouds.jpg';
      case 'broken clouds':
        return '/assets/broken_clouds.png';
      case 'shower rain':
        return '/assets/shower_rain.png';
      case 'rain':
        return '/assets/rain.png';
      case 'thunderstorm':
        return '/assets/thunderstorm.png';
      case 'snow':
        return '/assets/snow.png';
      case 'mist':
        return '/assets/mist.png';
      default:
        return '/assets/weather.png';
    }
  };

  return (
    <main
      className='h-full flex items-center justify-center'
      style={{
        backgroundImage: `url(${getBackgroundImage(
          weatherData?.weather?.description
        )})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
      <div className='h-full w-full xl:h-[98%] xl:w-[80%] bg-black bg-opacity-70 backdrop-blur-none overflow-y-auto rounded-none lg:rounded-lg text-white p-3 lg:p-3 flex flex-col gap-y-5'>
        <div className='flex flex-col gap-y-3'>
          {/* Form for searching weather by city name and button for current location */}
          <div className='flex flex-col gap-y-3'>
            <SearchForm
              location={location}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleCurrentLocation={handleCurrentLocation}
            />
            <TemperatureUnitSelector unit={unit} setUnit={setUnit} />
          </div>
        </div>
        <div className='flex flex-col lg:flex-row gap-x-5 h-full'>
          {/* WeatherDisplay component to display current weather data */}
          <div className='w-full xl:w-[30%] h-full'>
            <WeatherDisplay
              unit={unit}
              temp={weatherData?.main?.temp}
              icon={weatherData?.weather?.icon}
              description={weatherData?.weather?.description}
              timestamp={weatherData?.dt}
              location={weatherData?.name}
              country={weatherData?.sys?.country}
              wind={weatherData?.wind?.speed}
              pressure={weatherData?.main?.pressure}
              feelsLike={weatherData?.main?.feels_like}
              visibility={weatherData?.visibility}
            />
          </div>
          <div className='w-full xl:w-[70%] grid lg:grid-rows-3 gap-y-2'>
            <Highlights
              airQuality={weatherData?.airQuality}
              sunrise={weatherData?.sys?.sunrise}
              sunset={weatherData?.sys?.sunset}
            />
            <ForeCast
              unit={unit}
              data={weatherData?.forecast?.hourly}
              type='hourly'
            />
            <ForeCast
              unit={unit}
              data={weatherData?.forecast?.daily}
              type='daily'
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
