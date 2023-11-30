// Signup.js
// SignUp component
import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firebaseApp } from "../firebase";
import "./login.css";
import SignupAspect from "./SignupAspect"; // Import the correct HOC name

const SignUp = ({ validateInput, isValid, errMsg }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const auth = getAuth(firebaseApp);
    try {
      console.log(email, password, confirmPassword);
      if (!isValid) {
        setErrorMessage(errMsg);
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
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
        return "The email address is already registered in our system";
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
      <h2>Register to WordTrack</h2>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          data-cy="input-text-confirm-password"
        />
        <button onClick={handleSignUp} data-cy="btn-signup">
          Signup
        </button>
        <a href="/login" style={{ paddingLeft: "170px" }}>Have an Account?</a>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default SignupAspect(SignUp); // Use the correct HOC name when wrapping the component
