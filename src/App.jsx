import axios from 'axios';
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  // display the day
  const day = new Date();
  const dayName = days[day.getDay()];

  // display date
  let month = day.toLocaleString("default", { month: "long" });
  let date = day.getDate();
  let year = day.getFullYear();

  async function fetchWeather() {
    try {
      setLoading(true);
      setError(null); // Reset error state before fetching
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c9d363731c1bc9a2332549cb43d1b2b1`);
      setWeather(response.data);
    } catch (err) {
      setError("Failed to fetch weather data. Please check the city name.");
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    fetchWeather();
  }


  return (
    <>
      <div className="container">
        <div className="wrapper">
          <div className="img_section">
            <div className="default_info">
              <h2 className="default_day">{dayName}</h2>
              <span className="default_date">{date} {month} {year}</span>
              <div className="icons">
                {/* <img src={weather ? `${weather.current.condition.icon}` : " "} alt="Weather Icon" /> */}
                <h2 className="weather_temp">{weather ? `${(weather.main.temp - 273.15).toFixed(2)}°C` : " "}</h2>
                <h3 className="cloudtxt">Overcast Clouds</h3>
              </div>
            </div>
          </div>

          <div className="content_section">
            <form onSubmit={handleSearch} style={{ display: 'flex', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Search Location"
                className="input_field"
                onChange={(e) => setCity(e.target.value)}
              />
              <button type="submit" className="btn_search">Search</button>
            </form>

            {loading && <div className="loading">Loading...</div>} {/* Loading indicator */}

            {error && <div className="error">{error}</div>} {/* Error message */}

            <div className="day_info">
              <div className="content">
                <p className="title">NAME</p>
                <span className="value">{city}</span>
              </div>
              <div className="content">
                <p className="title">TEMP</p>
                <span className="value">{weather ? `${(weather.main.temp - 273.15).toFixed(2)}°C` : "Loading"}</span>
              </div>
              <div className="content">
                <p className="title">HUMIDITY</p>
                <span className="value">{weather ? `${weather.main.humidity}%` : "Loading"}</span>
              </div>
              <div className="content">
                <p className="title">WIND SPEED</p>
                <span className="value">{weather ? `${weather.wind.speed}km/h` : "Loading"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
