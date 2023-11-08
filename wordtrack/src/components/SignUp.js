// SignUp component
import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firebaseApp } from "../firebase";
import "./login.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const auth = getAuth(firebaseApp);
    try {
        console.log(validateEmailPassword(email, password, confirmPassword));
      if (!validateEmailPassword(email, password, confirmPassword)) {
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

  const validateEmailPassword = (email, password, confirmPassword) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid Email. Please enter a valid Email");
      return false;
    } else if (!passwordRegex.test(password)) {
      setErrorMessage("Invalid Password. Password must contain at least 8 characters with one uppercase letter, one lowercase letter, and one digit.");
      return false;
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please ensure both passwords are the same.");
      return false;
    }
    
    return true; // Return true if all validations pass
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
          placeholder="Confirm Password" // Confirm password input field
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          data-cy="input-text-confirm-password"
        />
        <button onClick={handleSignUp} data-cy="btn-signup">
          Signup
        </button>
        <a href="/login" style={{ paddingLeft: "170px" }}>Have an Account?</a> {/* Applying padding inline */}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default SignUp;
