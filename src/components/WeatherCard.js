import React from 'react';

const WeatherCard = ({ data }) => {
  const weather = data.weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  return (
    <div className="weather-card">
      <h3>{data.name}, {data.sys.country}</h3>
      <div className="weather-main">
        <img src={iconUrl} alt={weather.description} />
        <span className="temp">{Math.round(data.main.temp)}°C</span>
      </div>
      <p className="weather-desc">{weather.description}</p>
      <div className="weather-details">
        <p>Humidity: {data.main.humidity}%</p>
        <p>Wind: {data.wind.speed} m/s</p>
        <p>Pressure: {data.main.pressure} hPa</p>
      </div>
    </div>
  );
};

export default WeatherCard;