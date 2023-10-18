// src/components/Login.js
import React, { useReducer, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {firebaseApp} from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const auth = getAuth(firebaseApp);
    try {
      await signInWithEmailAndPassword(auth, email, password);

      if (email) {
              // Store user email in sessionStorage
      sessionStorage.setItem('userEmail', email);
      console.log(`User Logged in as ${email}`);
      }

      // Redirect to the dashboard or user profile page
      // You can implement this as needed
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
