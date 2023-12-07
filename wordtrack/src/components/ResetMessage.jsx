import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";  // Updated import statements

const ResetMessage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();  // Use getAuth directly
      await sendPasswordResetEmail(auth, email);  // Use sendPasswordResetEmail from firebase/auth
      setMessage('Password reset email sent. Check your inbox.');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="authentication-container">
      <h5>A password reset link was just sent to your Email.</h5>
      <form onSubmit={handleReset}>
      </form>
      <a href="/login" style={{ paddingLeft: "200px" }}>Back to Login</a>
    </div>
  );
};

export default ResetMessage;
