// Login component
import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firebaseApp } from "../firebase";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const auth = getAuth(firebaseApp);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setErrorMessage(null);
      navigate('/');
      window.location.reload();
      const userEmail = email;
      sessionStorage.setItem('userEmail', userEmail);
    } catch (error) {
      setErrorMessage(getFirebaseErrorMessage(error));
    }
  };

  const getFirebaseErrorMessage = (error) => {
    console.log(error.code);
    switch (error.code) {
      case "auth/email-already-in-use":
        return "The email address is already in use.";
      case "auth/invalid-email":
        return "Invalid email address format. Please check your Email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/invalid-login-credentials":
        return "Invalid Login Credentials.\n please check your Email & Password";
      case "auth/missing-password":
        return "Missing Credentials: Please enter your Password";
      default:
        return "An error occurred. Please try again.";
    }
  };

  return (
    <div className="authentication-container">
      <h2>Login to WordTrack</h2>
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
        <button onClick={handleLogin} data-cy="btn-login">
          Login
        </button>
        <a href="/signup" style={{ paddingLeft: "200px" }}>Signup</a> {/* Applying padding inline */}
      </div>
      {errorMessage && <p className="error-message" data-cy="txt-login-err">{errorMessage}</p>}
    </div>
  );
};

export default Login;
