import React, { useState } from 'react';
import fetchWeatherData from '../api';
import Berlin from '../Berlin';
import Tokyo from '../Tokyo';
import NewYork from '../NewYork';
import Prague from '../Prague';
import London from '../London';
import './Selection.css';

const cities = [
  { name: 'Berlin', latitude: 52.52, longitude: 13.41, image: 'src/assets/berlin.png' },
  { name: 'Tokyo', latitude: 35.6895, longitude: 139.6917, image: 'src/assets/tokyo.png' },
  { name: 'New York', latitude: 40.7128, longitude: -74.0060, image: 'src/assets/newyork.png' },
  { name: 'Prague', latitude: 50.0755, longitude: 14.4378, image: 'src/assets/prague.png' },
  { name: 'London', latitude: 51.5074, longitude: -0.1278, image: 'src/assets/london.png' }
];

const CitySelection = () => {
  const [selectedCityWeather, setSelectedCityWeather] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');

  const handleCityClick = (city) => {
    setSelectedCity(city.name);

    if (city.latitude && city.longitude) {
      fetchWeatherData(city.latitude, city.longitude).then(data => {
        console.log(`Weather Data for ${city.name}:`, data);
        setSelectedCityWeather({ name: city.name, data: data });
      }).catch(error => {
        console.error('Error fetching weather data:', error);
      });
    } else {
      console.log(`You selected ${city.name}. No coordinates provided for weather data.`);
    }
  };

  return (
    <>
      {selectedCity === 'Berlin' ? (
        <Berlin weatherData={selectedCityWeather?.data} />
      ) : selectedCity === 'Tokyo' ? (
        <Tokyo weatherData={selectedCityWeather?.data} />
      ) : selectedCity === 'New York' ? (
        <NewYork weatherData={selectedCityWeather?.data} />
      ) : selectedCity === 'Prague' ? (
        <Prague weatherData={selectedCityWeather?.data} />
      ) : selectedCity === 'London' ? (
        <London weatherData={selectedCityWeather?.data} />
      ) : (
        <div className="container text-center my-5">
          <div className="row justify-content-center">
            {cities.map((city, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card city-card" onClick={() => handleCityClick(city)}>
                  <div className="city-image" style={{ backgroundImage: `url(${city.image})` }}></div>
                  <div className="card-body">
                    <h5 className="card-title">{city.name}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CitySelection;