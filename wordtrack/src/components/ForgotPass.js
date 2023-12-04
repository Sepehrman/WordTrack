import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";  // Updated import statements
import { useNavigate } from "react-router-dom";

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();  // Use getAuth directly
      await sendPasswordResetEmail(auth, email);  // Use sendPasswordResetEmail from firebase/auth
      setMessage('Password reset email sent. Check your inbox.');
      navigate('/resetmessage');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="authentication-container">
      <h2>Enter your Email</h2>
      <form action='resetmessage' onSubmit={handleReset}>
        <div className="input-container">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPass;
