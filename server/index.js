const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Middleware for handling errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Default route to test server
app.get('/', (req, res) => {
  res.send('Welcome to the weather app!');
});

// Function to fetch weather data by city name
async function getWeatherDataByCity({ location, unit }) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${
      unit || 'metric'
    }`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching weather data');
  }
}

// Function to fetch weather data by coordinates
async function getWeatherDataByCoord({ lat, lon, unit }) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${
      unit || 'metric'
    }`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching weather data');
  }
}

// Function to fetch weather forecast
async function getWeatherForecast({ lat, lon, unit }) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${
      unit || 'metric'
    }`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching weather forecast');
  }
}

// Function to fetch air quality data
async function getAirQualityData({ lat, lon }) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching air quality data');
  }
}

// Function to filter and format forecast data

function filterForecastData(forecastData) {
  if (!forecastData || !forecastData.list) {
    console.error('Invalid forecast data');
    return;
  }

  const currentDateTime = new Date();
  const currentDay = currentDateTime.getDate();
  const currentHour = currentDateTime.getHours();

  // Hourly forecast from the current time to the next day's current time
  let hourlyForecast = forecastData.list.filter((item) => {
    const itemDateTime = new Date(item.dt_txt);
    const itemDay = itemDateTime.getDate();
    const itemHour = itemDateTime.getHours();
    return (
      (itemDay === currentDay && itemDateTime >= currentDateTime) ||
      (itemDay === currentDay + 1 && itemHour <= currentHour)
    );
  });

  // Daily forecast for the next 5 days at 12:00 PM
  const dailyForecast = forecastData.list
    .filter((item) => {
      const itemDateTime = new Date(item.dt_txt);
      const itemTime = itemDateTime.getHours();
      return itemTime === 12 && itemDateTime > currentDateTime;
    })
    .slice(0, 5);

  return {
    hourly: hourlyForecast,
    daily: dailyForecast,
  };
}

// Route to get weather data for a specific location
app.get('/w/:location', async (req, res, next) => {
  try {
    const { location } = req.params;
    const { unit } = req.query;

    if (!location) {
      return res.status(400).json({ error: 'Location is required' });
    }

    let data = await getWeatherDataByCity({ location, unit });
    const { coord } = data;

    if (!coord) {
      return res.status(404).json({ error: 'Coordinates not found' });
    }

    let forecast = await getWeatherForecast({
      lat: coord.lat,
      lon: coord.lon,
      unit,
    });

    forecast
      ? (forecast = filterForecastData(forecast))
      : res.status(404).json({ error: 'Forecast not found' });

    const airQuality = await getAirQualityData({
      lat: coord.lat,
      lon: coord.lon,
    });

    data = {
      ...data,
      weather: data.weather[0],
      forecast,
      airQuality,
    };

    res.status(200).json({
      success: 'Weather data fetched successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
});

// Route to get weather data by coordinates
app.get('/weather/coord', async (req, res, next) => {
  try {
    const { lat, lon, unit } = req.query;

    if (!lat || !lon) {
      return res
        .status(400)
        .json({ error: 'Latitude and longitude are required' });
    }

    let data = await getWeatherDataByCoord({ lat, lon, unit });
    let forecast = await getWeatherForecast({ lat, lon, unit });

    forecast
      ? (forecast = filterForecastData(forecast))
      : res.status(404).json({ error: 'Forecast not found' });

    const airQuality = await getAirQualityData({ lat, lon });

    data = {
      ...data,
      weather: data.weather[0],
      forecast,
      airQuality,
    };

    res.status(200).json({
      success: 'Weather data fetched successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
