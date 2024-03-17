import React, { useState } from 'react';
import { mockUsers } from './mockUsers';
import { Navigate } from 'react-router-dom';

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  const handleLogin = () => {
    const user = mockUsers.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('loggedIn', true);
      setLoggedIn(true);
    } else {
      setError('Invalid username or password');
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/CitySelection" />;
  }

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;