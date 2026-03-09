import React, { useState } from 'react';
import axios from 'axios';
import './ResetPassword.css'; // Import the CSS file for styling

const ResetPassword = ({ match }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/reset-password/${match.params.token}`, { password });
      setMessage(response.data.message); // Success message
      setLoading(false);
    } catch (error) {
      setLoading(false); // Stop loading spinner
      if (error.response) {
        setMessage(error.response.data.message || 'An error occurred. Please try again.');
      } else if (error.request) {
        setMessage('No response received from the server. Please try again later.');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <h2>Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="input-group">
            <label>New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-input"
            />
          </div><br />
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
