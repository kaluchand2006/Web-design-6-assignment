import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('London');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nepalTime, setNepalTime] = useState('');

  // Available locations
  const locations = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney', 'Kathmandu'];

  // Function to get Nepal time
  const getNepalTime = () => {
    const options = {
      timeZone: 'Asia/Kathmandu',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return new Date().toLocaleTimeString('en-US', options);
  };

  // Function to fetch weather data
  const fetchWeather = async (city) => {
    try {
      setLoading(true);

      // Simulated API call — real one can be added later
      // const response = await axios.get('https://your-api-url.com');

      const mockWeather = {
        city: city,
        temperature: Math.floor(Math.random() * 30) + 10,
        condition: ['Sunny', 'Cloudy', 'Rainy', 'Stormy'][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 50) + 30,
      };

      setWeather(mockWeather);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Function to handle location change
  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setLocation(newLocation);
    fetchWeather(newLocation);
  };

  // Load saved location from localStorage and set up time interval
  useEffect(() => {
    const savedLocation = localStorage.getItem('weatherLocation');
    if (savedLocation) {
      setLocation(savedLocation);
    }
    fetchWeather(savedLocation || 'London');

    // Update Nepal time every second
    const timer = setInterval(() => {
      setNepalTime(getNepalTime());
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Save location to localStorage when changed
  useEffect(() => {
    localStorage.setItem('weatherLocation', location);
  }, [location]);

  if (loading) return <div className="loading">Loading weather data...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="home">
      <h2>Weather in {weather.city}</h2>

      {/* Nepal Time Display */}
      <div className="time-display">
        <p>Current Time in Nepal: {nepalTime}</p>
      </div>

      <div className="weather-controls">
        <select value={location} onChange={handleLocationChange}>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className="weather-card">
        <div className="weather-main">
          <span className="temperature">{weather.temperature}°C</span>
          <span className="condition">{weather.condition}</span>
        </div>
        <div className="weather-details">
          <p>Humidity: {weather.humidity}%</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
