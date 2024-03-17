import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CitySelection from './components/CitySelection';
import Berlin from './Berlin';
import Tokyo from './Tokyo';
import NewYork from './NewYork';
import Prague from './Prague';
import London from './London';
import CustomLocationWeather from './custom';
import Login from './Login'; // Import the Login component

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Login route: Renders the Login component only if the user is not logged in */}
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />

          {/* Protected routes: User must be logged in to access */}
          <Route
            path="/"
            element={
              loggedIn ? <CitySelection /> : <Navigate to="/login" />
            }
          />

          <Route path="/berlin" element={<Berlin />} />
          <Route path="/tokyo" element={<Tokyo />} />
          <Route path="/newyork" element={<NewYork />} />
          <Route path="/prague" element={<Prague />} />
          <Route path="/london" element={<London />} />

          {/* Custom location weather route */}
          <Route path="/custom" element={<CustomLocationWeather />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;