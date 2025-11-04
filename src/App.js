import React, { useState } from "react";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=d2017d90d0a74a18be1152652252910&aqi=yes&q=${encodeURIComponent(city)}`);
      if (!response.ok) {
        throw new Error("City not found or API error");
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>🌦 Weather Forecast</h2>
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        />
        <button onClick={fetchWeather} style={styles.button}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={styles.resultBox}>
          <h3>{weather.location.name || city}</h3>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
          <p>Humidity: {weather.current.humidity}%</p>
        </div>
      )}
    </div>
  );
};

// Inline styles (for quick setup)
const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  searchBox: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "70%",
    marginRight: "8px",
  },
  button: {
    padding: "10px 16px",
    fontSize: "16px",
    cursor: "pointer",
  },
  resultBox: {
    marginTop: "20px",
    background: "#f9f9f9",
    padding: "15px",
    borderRadius: "6px",
  },
};

export default WeatherApp;
