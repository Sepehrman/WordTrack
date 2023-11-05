import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firebaseApp } from "../firebase";
import "./login.css";

const Authentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleAuthentication = async (isSignup) => {
    const auth = getAuth(firebaseApp);
    try {
      

      if (isSignup) {
        if (!validateEmail(email) || !validatePassword(password)) {
        setErrorMessage("Invalid email or password format.");
        return;
      }
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      setErrorMessage(null);
      navigate('/');
      const userEmail = email;
      sessionStorage.setItem('userEmail', userEmail);
    } catch (error) {
      setErrorMessage(getFirebaseErrorMessage(error));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const getFirebaseErrorMessage = (error) => {
    console.log(error.code);
    switch (error.code) {
      case "auth/email-already-in-use":
        return "The email address is already in use.";
      case "auth/invalid-email":
        return "Invalid email address format.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/invalid-login-credentials":
        return "Invalid Login Credentials.\n please check your Email & Password";
      // Add more cases for other Firebase error codes as needed
      default:
        return "An error occurred. Please try again.";
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
          data-cy="input-text-email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-cy="input-text-password"
        />
        <button onClick={() => handleAuthentication(false)} data-cy="btn-login">
          Login
        </button>
        <button onClick={() => handleAuthentication(true)} data-cy="btn-signup">
          Signup
        </button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Authentication;
