import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validateEmail(email)) {
      setMessage('Invalid email format');
      return;
    }

    if (!validatePassword(password)) {
      setMessage(
        'Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/accounts/signup/',
        {
          email,
          password,
        }
      );

      setMessage(response.data.message || 'Signup successful');

      // Optional: 2 sec apram login page ku poidum
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      if (error.response) {
        setMessage(
          error.response.data.error ||
            error.response.data.message ||
            'Signup failed'
        );
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="image-side">
        <img
          src="https://img.freepik.com/premium-vector/breaking-news-design_24877-38230.jpg"
          alt="Signup Background"
          className="background-image"
        />
      </div>

      <div className="form-side">
        <div className="login-box">
          <h2>Signup</h2>
          <form onSubmit={handleSignup} className="signup-form">
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="form-group password-group">
              <label>Password:</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <div className="form-group password-group">
              <label>Confirm Password:</label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="form-input"
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <button type="submit" className="submit-button">
              Signup
            </button>
          </form>

          {message && <p className="message">{message}</p>}

          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;