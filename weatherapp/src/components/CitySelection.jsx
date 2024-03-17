import React, { useState } from 'react';
import fetchWeatherData from '../api';
import Berlin from '../Berlin';
import Tokyo from '../Tokyo';
import NewYork from '../NewYork';
import Prague from '../Prague';
import London from '../London';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './Selection.css';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);

const cities = [
  { name: 'Berlin', latitude: 52.52, longitude: 13.41, image: 'src/assets/berlin.png' },
  { name: 'Tokyo', latitude: 35.6895, longitude: 139.6917, image: 'src/assets/tokyo.png' },
  { name: 'NewYork', latitude: 40.7128, longitude: -74.0060, image: 'src/assets/newyork.png' },
  { name: 'Prague', latitude: 50.0755, longitude: 14.4378, image: 'src/assets/prague.png' },
  { name: 'London', latitude: 51.5074, longitude: -0.1278, image: 'src/assets/london.png' }
];

const CitySelection = () => {
  const [selectedCityWeather, setSelectedCityWeather] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');

  const navigate = useNavigate();

  const showLocationPicker = () => {
    let marker;
    MySwal.fire({
      title: 'Select Your Location',
      html: '<div id="map" style="height: 250px;"></div>',
      didOpen: () => {
        const map = L.map('map', {
          center: [51.505, -0.09],
          zoom: 13
        });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        marker = L.marker([51.505, -0.09], { draggable: true }).addTo(map); // Initialize marker without const
        marker.on('dragend', function (event) {
          const position = marker.getLatLng();
          marker.setLatLng(new L.LatLng(position.lat, position.lng), { draggable: 'true' });
        });

        setTimeout(() => map.invalidateSize(), 100);
      },
      preConfirm: () => {
        if (marker) {
          const markerPos = marker.getLatLng();
          return { lat: markerPos.lat, lon: markerPos.lng };
        }
      }
    }).then((result) => {
      if (result.value) {
        handleCityClick({ name: 'Custom', latitude: result.value.lat, longitude: result.value.lon });
      }
    });
  };

  const handleCityClick = (city) => {
    setSelectedCity(city.name);
  
    if (city.latitude && city.longitude) {
      fetchWeatherData(city.latitude, city.longitude)
        .then(data => {
          console.log(`Weather Data for ${city.name}:`, data);
          setSelectedCityWeather({ name: city.name, data: data });
          navigate(`/${city.name.toLowerCase()}`, { state: { weatherData: data } }); // Pass weatherData as state
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    } else {
      console.log(`You selected ${city.name}. No coordinates provided for weather data.`);
    }
  };

  return (
    <>
      <div className="container text-center my-5">
        <button onClick={showLocationPicker} className="btn btn-primary mb-4">Pick Your Own Location</button>
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
      {selectedCityWeather && (
        selectedCity === 'Berlin' ? <Berlin weatherData={selectedCityWeather.data} /> :
        selectedCity === 'Tokyo' ? <Tokyo weatherData={selectedCityWeather.data} /> :
        selectedCity === 'NewYork' ? <NewYork weatherData={selectedCityWeather.data} /> :
        selectedCity === 'Prague' ? <Prague weatherData={selectedCityWeather.data} /> :
        selectedCity === 'London' ? <London weatherData={selectedCityWeather.data} /> :
        <div>No weather data available</div>
      )}
    </>
  );
};

export default CitySelection;