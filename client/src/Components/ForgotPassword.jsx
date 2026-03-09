import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css'; // Import the CSS file for styling

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    try {
      const response = await axios.post('http://localhost:5000/forgot-password', { email });
      setMessage(response.data.message); // Show success message
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message); // Show error message
      } else if (error.request) {
        setMessage('No response received from the server. Please try again later.');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div><br />
          <button type="submit" className="submit-button">Reset Password</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
