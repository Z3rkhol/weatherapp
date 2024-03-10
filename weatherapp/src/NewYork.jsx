import React from 'react';
import Swal from 'sweetalert2';
import './css/NewYork.css'; // Create and customize your New York CSS accordingly

function NewYork({ weatherData }) {
    if (!weatherData) {
        return <div>Loading weather data...</div>;
    }

    const getWeatherIcon = (conditionCode) => {
        // Adjust the path to your weather icons
        return `/path/to/icons/${conditionCode}.png`;
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
    const todayIcon = getWeatherIcon(todayWeather.weather_code);
    const weatherCondition = getWeatherCondition(todayWeather.weather_code);

    const showForecast = () => {
        const forecastHtml = weatherData.daily.time.slice(1).map((day, index) => {
            return `<p>${day}: Max: ${weatherData.daily.temperature_2m_max[index]}°C, Min: ${weatherData.daily.temperature_2m_min[index]}°C, Condition: ${getWeatherCondition(weatherData.daily.weather_code[index])}</p>`;
        }).join('');
        
        Swal.fire({
            title: '<strong>Future Forecast for New York</strong>',
            html: forecastHtml,
            showCloseButton: true,
        });
    };

    return (
        <div className="weather-container">
            <h2 className="city-name">New York</h2>
            <div className="current-weather">
                <div className="weather-icon" style={{ backgroundImage: `url(${todayIcon})` }}></div>
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

export default NewYork;