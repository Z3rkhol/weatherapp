import axios from 'axios';

const fetchWeatherData = async (latitude, longitude) => {
    const API_URL = 'https://api.open-meteo.com/v1/forecast';
    try {
        const response = await axios.get(API_URL, {
            params: {
                latitude: latitude,
                longitude: longitude,
                current: 'temperature_2m,relative_humidity_2m,rain,weather_code,wind_speed_10m',
                timezone: 'auto',
                daily: 'weather_code,temperature_2m_max,temperature_2m_min',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};

export default fetchWeatherData;