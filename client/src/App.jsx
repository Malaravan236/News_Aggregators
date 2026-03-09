import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import News from './Components/News';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import Tamilnews from './Components/Tamilnews';
import Country from './Components/CountryWiseNewsAggregator';
import SportsNews from './Components/SportsNews';
import FunNews from './Components/FunNews';
import WeatherApp from './Components/WeatherApp';
import ScientificNews from './Components/ScientificNews';
import StateNews from './Components/IndianNewsAggregator';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
 
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home count={count} setCount={setCount} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/news" element={<News />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/tamilnews" element={<Tamilnews />} />
            <Route path="/country" element={<Country />} />
            <Route path="/sports" element={<SportsNews />} />
            <Route path="/fun" element={<FunNews />} />
            <Route path="/weather" element={<WeatherApp />} />
            <Route path="/science" element={<ScientificNews />} />
            <Route path="/state" element={<StateNews />} />
           
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
