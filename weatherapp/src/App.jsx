import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import fetchWeatherData from './api';
import CitySelection from './components/CitySelection';

function App() {

  fetchWeatherData();

  return (
    <CitySelection />
  )
}

export default App
