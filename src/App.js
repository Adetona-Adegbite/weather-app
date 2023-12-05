import { useEffect, useState } from "react";
import "./App.css";
import { FaSearch } from "react-icons/fa";
async function fetchFromServer(city) {
  if (city !== "") {
    const response = await fetch(
      `http://weather-app-backend-xv1f.onrender.com/weather?city=${city}`
    );
    const data = await response.json();
    return data;
  }
}
function App() {
  const [weatherData, setData] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setloading] = useState(false);
  async function setWeatherData(location) {
    setloading(true);
    const data = await fetchFromServer(location);
    setData(data);
    setloading(false);
  }
  return (
    <div className="page">
      <h1>Weather App</h1>
      <div className="app">
        <div className="form">
          <input
            onChange={(event) => {
              setCity(event.target.value);
            }}
            placeholder="Search"
          />
          <button onClick={setWeatherData.bind(this, city)}>
            <FaSearch color="white" />
          </button>
        </div>
        <div className="data">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {weatherData.length === 0 ? (
                <p>No weather data available. Search for a location</p>
              ) : (
                <>
                  <p className="city">
                    Weather in {weatherData[0].city}, {weatherData[0].country}
                  </p>
                  <p className="celcius">{weatherData[0].temp_c}°C</p>
                  <div className="image">
                    <img
                      src={"https://" + weatherData[0].icon.substring(2)}
                      alt="Weather Icon"
                    />
                  </div>
                  <p className="text">{weatherData[0].text}</p>
                  <p className="Humidity">
                    Humidity: {weatherData[0].humidity}%
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
