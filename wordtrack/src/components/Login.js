import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { firebaseApp } from '../firebase';
import './login.css';

const Authentication = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate(); // Get the navigate function

  const handleAuthentication = async (isSignup) => {
    const auth = getAuth(firebaseApp);
    try {
      if (isSignup) {
        // Signup
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
      }

      // Clear error message
      setErrorMessage(null);

      // Redirect to the dashboard
      navigate('/'); // Redirect to the dashboard route
      const userEmail = email; // Replace with the actual user's email
      sessionStorage.setItem('userEmail', userEmail);
    } catch (error) {
      // Set error message
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="authentication-container">
      <h2>Welcome to WordTrack</h2>
      <div className="input-container">
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
        <button onClick={() => handleAuthentication(false)}>Login</button>
        <button onClick={() => handleAuthentication(true)}>Signup</button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Authentication;
