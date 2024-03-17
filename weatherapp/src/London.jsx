import React from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './css/London.css';

function London() {
    const location = useLocation();
    const weatherData = location.state.weatherData;
    const loggedIn = localStorage.getItem('loggedIn');

    if (!loggedIn) {
      return <Navigate to="/" />;
    }

    if (!weatherData) {
        return <div>Loading weather data...</div>;
    }
    const MySwal = withReactContent(Swal);

    const getWeatherIcon = (conditionCode) => {
        if (conditionCode === 0) {
            return 'https://media.licdn.com/dms/image/C4D1BAQFSyWG3qZ_v5Q/company-background_10000/0/1633341702716/cleveland_clinic_london_cover?e=2147483647&v=beta&t=QvZjC7iMOlGxJ8K9FIcdiXfaM8holKewuXRXQA-_nCU';
        } else if (conditionCode === 1 || conditionCode === 2 || conditionCode === 3) {
            return 'https://wallpaperaccess.com/full/1420445.jpg';
        } else if (conditionCode === 45 || conditionCode === 48) {
            return 'https://wallpapercave.com/wp/wp8437348.jpg';
        } else if (conditionCode === 51 || conditionCode === 53 || conditionCode === 56 || conditionCode === 57) {
            return 'https://wallpaperaccess.com/full/1125784.jpg'; //change
        } else if (conditionCode === 61 || conditionCode === 63 || conditionCode === 65 || conditionCode === 66 || conditionCode === 67) {
            return 'https://wallpaperaccess.com/full/1125784.jpg';
        } else if (conditionCode === 71 || conditionCode === 73 || conditionCode === 75 || conditionCode === 77) {
            return 'https://wallpaperaccess.com/full/1726766.jpg';
        } else if (conditionCode === 80 || conditionCode === 81 || conditionCode === 82 || conditionCode === 85 || conditionCode === 86) {
            return 'https://wallpaperaccess.com/full/1125784.jpg'; //change
        } else if (conditionCode === 95 || conditionCode === 96 || conditionCode === 99) {
            return 'https://th.bing.com/th/id/R.a9f07db700cc7ee042ff6c95d1082408?rik=lHhw7e%2b4IVrDzQ&riu=http%3a%2f%2fwww.thelondoneconomic.com%2fwp-content%2fuploads%2f2017%2f07%2fstunning-photo-13557.jpg&ehk=Zr5BnYYy3UC3T7N0fBV6i4RL%2bqO6sXsqZ6U8EhjLcQ0%3d&risl=&pid=ImgRaw&r=0';
        }
    };    

    const getWeatherCondition = (conditionCode) => {
        const conditions = {
            0: "Clear sky",
            1: "Mainly clear",
            2: "Partly cloudy",
            3: "Overcast",
            45: "Fog",
            48: "Depositing rime fog",
            51: "Light drizzle",
            53: "Moderate drizzle",
            55: "Dense drizzle",
            56: "Light freezing drizzle",
            57: "Dense freezing drizzle",
            61: "Slight rain",
            63: "Moderate rain",
            65: "Heavy rain",
            66: "Light freezing rain",
            67: "Heavy freezing rain",
            71: "Slight snowfall",
            73: "Moderate snowfall",
            75: "Heavy snowfall",
            77: "Snow grains",
            80: "Slight rain showers",
            81: "Moderate rain showers",
            82: "Violent rain showers",
            85: "Slight snow showers",
            86: "Heavy snow showers",
            95: "Thunderstorm: Slight or moderate",
            96: "Thunderstorm with light hail",
            99: "Thunderstorm with heavy hail"
        };

        return conditions[conditionCode] || "Unknown condition";
    };

    const todayWeather = weatherData.current;
    const backgroundImage = getWeatherIcon(todayWeather.weather_code);
    const weatherCondition = getWeatherCondition(todayWeather.weather_code);

    const showForecast = () => {
        const forecastHtml = weatherData.daily.time.slice(1).map((day, index) => {
            return `<p>${day}: Max: ${weatherData.daily.temperature_2m_max[index]}°C, Min: ${weatherData.daily.temperature_2m_min[index]}°C, Condition: ${getWeatherCondition(weatherData.daily.weather_code[index])}</p>`;
        }).join('');
        
        MySwal.fire({
            title: '<strong>Future Forecast for London</strong>',
            html: forecastHtml,
            showCloseButton: true,
        });
    };

    return (
        <div className="weather-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h2 className="city-name">London</h2>
            <div className="current-weather">
                <div className="weather-icon" style={{ backgroundImage: `url(${todayWeather.weather_icon})` }}></div>
                <div className="current-temperature">Temperature: {todayWeather.temperature_2m}°C</div>
                <div className="current-weather-condition">Condition: {weatherCondition}</div>
                <div className="other-details">
                    Wind Speed: {todayWeather.wind_speed_10m} km/h<br/>
                    Humidity: {todayWeather.relative_humidity_2m}%<br/>
                    Rain: {todayWeather.rain} mm
                </div>
                <button className="forecast-button" onClick={showForecast}>Show Future Forecast</button>
            </div>
        </div>
    );
}

export default London;
