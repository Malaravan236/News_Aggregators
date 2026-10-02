import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './Signup.css';
import { UserContext } from '../context/UserContext';

// ITHA MELA ADD PANNU DA - MUKKIYAM DA!
const API_BASE = "https://news-aggregator-backend-zwjl.onrender.com/api";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!name.trim()) { setMessage('Please enter your name'); return; }
    if (!validateEmail(email)) { setMessage('Invalid email format'); return; }
    if (!validatePassword(password)) { setMessage('Password must be 8 chars with upper, lower, number, special char'); return; }
    if (password !== confirmPassword) { setMessage('Passwords do not match'); return; }

    try {
      const response = await axios.post(
        `${API_BASE}/accounts/signup/`, // IDHA MAATHINEN DA! 🔥
        { name, email, password }
      );
      
      if (response.status === 201) {
        login(response.data.name || name, response.data.email || email);
        navigate('/news');
      }
    } catch (error) {
      setMessage(error.response?.data?.error || error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    // ... same JSX da - maatha vendaam da
    <div className="signup-page">
      <div className="image-side">
        <img src="https://img.freepik.com/premium-vector/breaking-news-design_24877-38230.jpg" alt="Signup Background" className="background-image" />
      </div>
      <div className="form-side">
        <div className="login-box">
          <h2>Signup</h2>
          <form onSubmit={handleSignup} className="signup-form">
            <div className="form-group"><label>Name:</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="form-input" placeholder="Enter your name" /></div>  
            <div className='form-group'><label>Email:</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input" /></div>
            <div className="form-group password-group"><label>Password:</label><input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required className="form-input" /><span className="password-toggle-icon" onClick={() => setShowPassword((prev) => !prev)}>{showPassword ? <FiEyeOff /> : <FiEye />}</span></div>
            <div className="form-group password-group"><label>Confirm Password:</label><input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="form-input" /><span className="password-toggle-icon" onClick={() => setShowConfirmPassword((prev) => !prev)}>{showConfirmPassword ? <FiEyeOff /> : <FiEye />}</span></div>
            <button type="submit" className="submit-button">Signup</button>
          </form>
          {message && <p className="message">{message}</p>}
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;