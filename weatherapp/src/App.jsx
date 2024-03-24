import React, { useState, useEffect } from 'react';
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
import Login from './Login';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("User:", user);
      if (user) {
        setLoggedIn(true);
        console.log("Logged In:", loggedIn);
      } else if(user == null){
        setLoggedIn(false);
        console.log("Logged In:", loggedIn);
      } else {
        setLoggedIn(false);
        console.log("Logged In:", loggedIn);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />

          <Route
            path="/"
            element={
              loggedIn ? <CitySelection /> : <Navigate to="/login" replace />
            }
          />


          <Route path="/berlin" element={<Berlin />} />
          <Route path="/tokyo" element={<Tokyo />} />
          <Route path="/newyork" element={<NewYork />} />
          <Route path="/prague" element={<Prague />} />
          <Route path="/london" element={<London />} />

          <Route path="/custom" element={<CustomLocationWeather />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;