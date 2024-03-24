import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, firebaseSignOut } from './firebase';
import { getAuth } from 'firebase/auth';

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  const auth = getAuth();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('loggedIn', true);
      setLoggedIn(true);
      return (
        <Navigate to="/" />
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth,email, password);
      await handleLogin();
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoggedIn) {
    return (
        <Navigate to="/" />
    );
  }else{
    <Navigate to="/login" />
  }

  return (
    <div>
      <h2>Login/Register</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;