

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherApp.css';

const districts = [
  { name: 'Ariyalur', lat: 11.1385, lon: 79.0756 },
  { name: 'Chengalpattu', lat: 12.6929, lon: 79.9764 },
  { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
  { name: 'Coimbatore', lat: 11.0168, lon: 76.9558 },
  { name: 'Cuddalore', lat: 11.7480, lon: 79.7714 },
  { name: 'Dharmapuri', lat: 12.1357, lon: 78.1602 },
  { name: 'Dindigul', lat: 10.3673, lon: 77.9803 },
  { name: 'Erode', lat: 11.3410, lon: 77.7172 },
  { name: 'Kallakurichi', lat: 11.7383, lon: 78.9605 },
  { name: 'Kancheepuram', lat: 12.8342, lon: 79.7036 },
  { name: 'Karur', lat: 10.9601, lon: 78.0766 },
  { name: 'Krishnagiri', lat: 12.5186, lon: 78.2137 },
  { name: 'Madurai', lat: 9.9252, lon: 78.1198 },
  { name: 'Nagapattinam', lat: 10.7657, lon: 79.8430 },
  { name: 'Namakkal', lat: 11.2189, lon: 78.1677 },
  { name: 'Nilgiris', lat: 11.4916, lon: 76.7337 },
  { name: 'Perambalur', lat: 11.2337, lon: 78.8835 },
  { name: 'Pudukkottai', lat: 10.3813, lon: 78.8215 },
  { name: 'Ramanathapuram', lat: 9.4071, lon: 78.7050 },
  { name: 'Ranipet', lat: 12.9213, lon: 79.2338 },
  { name: 'Salem', lat: 11.6643, lon: 78.1460 },
  { name: 'Sivaganga', lat: 9.8457, lon: 78.4836 },
  { name: 'Tenkasi', lat: 8.9591, lon: 77.3152 },
  { name: 'Thanjavur', lat: 10.7870, lon: 79.1378 },
  { name: 'Theni', lat: 10.0104, lon: 77.4777 },
  { name: 'Thoothukudi', lat: 8.7642, lon: 78.1348 },
  { name: 'Tiruchirappalli', lat: 10.7905, lon: 78.7047 },
  { name: 'Tirunelveli', lat: 8.7139, lon: 77.7567 },
  { name: 'Tirupathur', lat: 12.4935, lon: 78.2130 },
  { name: 'Tiruppur', lat: 11.1085, lon: 77.3411 },
  { name: 'Tiruvallur', lat: 13.1437, lon: 79.9082 },
  { name: 'Tiruvannamalai', lat: 12.2253, lon: 79.0747 },
  { name: 'Tiruvarur', lat: 10.7723, lon: 79.6365 },
  { name: 'Vellore', lat: 12.9165, lon: 79.1325 },
  { name: 'Viluppuram', lat: 11.9397, lon: 79.4924 },
  { name: 'Virudhunagar', lat: 9.5680, lon: 77.9624 },
];


const WeatherApp = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [pastWeekWeather, setPastWeekWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiKey = 'c56e8d7eaf07684d3b35d79cf2b8a724';

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!selectedDistrict) return;

      setLoading(true);
      const { lat, lon } = selectedDistrict;

      try {
        // Fetch current weather
        const { data: currentData } = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        setCurrentWeather(currentData);

        // Fetch past week's weather
        const pastWeekData = [];
        for (let i = 1; i <= 7; i++) {
          const timestamp = Math.floor((Date.now() - i * 24 * 60 * 60 * 1000) / 1000);
          const { data: historicalData } = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${timestamp}&appid=${apiKey}`
          );
          pastWeekData.push({
            date: new Date(timestamp * 1000).toLocaleDateString(),
            data: historicalData,
          });
        }
        setPastWeekWeather(pastWeekData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [selectedDistrict]);

  return (
    <div className="weather">
      <div className="weather-app">
        <header className="weather-header">
          <h1 className="weather-title">Weather by District</h1>
          <select
            className="district-select"
            onChange={(e) => {
              const district = districts.find(d => d.name === e.target.value);
              setSelectedDistrict(district);
              setCurrentWeather(null);
              setPastWeekWeather([]);
            }}
          >
            <option value="">Select a district</option>
            {districts.map((district) => (
              <option key={district.name} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
        </header>



        {loading ? (
          <p className="loading-message">Loading weather data...</p>
        ) : (
          <>
            {currentWeather && (
              <div className="weather-card">
                <h2>Current Weather in {selectedDistrict.name}</h2>
                <p>
                  <i className="fas fa-thermometer-half weather-icon"></i>
                  Temperature: {(currentWeather.main.temp - 273.15).toFixed(2)}°C
                </p>
                <p>
                  <i className="fas fa-cloud weather-icon"></i>
                  Weather: {currentWeather.weather[0].description}
                </p>
                <p>
                  <i className="fas fa-tint weather-icon"></i>
                  Humidity: {currentWeather.main.humidity}%
                </p>
              </div>
            )}

            {pastWeekWeather.length > 0 && (
              <div className="past-weather-container">
                <h2>Past Week Weather in {selectedDistrict.name}</h2>
                {pastWeekWeather.map((day) => (
                  <div key={day.date} className="weather-card">
                    <h3>{day.date}</h3>
                    <p>
                      <i className="fas fa-thermometer-half weather-icon"></i>
                      Temperature: {(day.data.current.temp - 273.15).toFixed(2)}°C
                    </p>
                    <p>
                      <i className="fas fa-cloud weather-icon"></i>
                      Weather: {day.data.current.weather[0].description}
                    </p>
                    <p>
                      <i className="fas fa-tint weather-icon"></i>
                      Humidity: {day.data.current.humidity}%
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}


        {/* Google Maps Container */}
        {selectedDistrict && (
          <div className="map-container">
            <iframe
              title="Google Map"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${selectedDistrict.lat},${selectedDistrict.lon}&z=10&output=embed`}
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
