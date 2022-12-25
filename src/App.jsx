import { useEffect, useState } from "react";
import './App.css';

import { getCountries } from "./assets/services/countries";
import { getCities } from "./assets/services/cities";
import { getCityWeather } from "./assets/services/weather";

const App = () => {
  const [loading, setLoading] = useState(false);


  useEffect (() => {
    setLoading(true)
    setTimeout (() => {
      setLoading(false) 
}, 8000)
}, [])

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    (async () => {
      setCountries(await getCountries());
    })();
  }, []);

  const countryHandler = async e => {
    e.currentTarget.value && setCities(await getCities(e.currentTarget.value));
    setWeather(null);
  }

  const cityHandler = async e => e.currentTarget.value && setWeather(await getCityWeather(e.currentTarget.value));

  return (
    <>
      <div className="App">
        <label className="title">Elige un país:</label>
        <select className="elegir" onChange={countryHandler}>
          <option value="">Selecciona</option>
          {countries.map(country => <option key={country.cca2} value={country.cca2}>{country.name.common}</option>)}
        </select>
      </div>
      {cities.length > 0 && (
        <div className="App">
          <label className="title">Elige una ciudad:</label>
          <select className="elegir" onChange={cityHandler}>
            <option value="">Selecciona</option>
            {cities.map(city => <option key={city.id}>{city.name}</option>)}
          </select>
        </div>
      )}

      <hr />

      {weather && (
        <div className="App">
          <div className="container">
            <div className="top"></div>
              <div className="location">
                <h1 className="bold">Ciudad: {weather.name }</h1>
              </div>
              <h2>Temperatura Actual: {weather.main.temp}º</h2>
              <p>Min: {weather.main.temp_min.toFixed()}°</p>
              <p>Max: {weather.main.temp_max.toFixed()}°</p>
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
              <div className="description">
                <p>{weather.weather[0].main }</p>
              </div>
              <div className="bottom">
                <div className="feels">
                  <h3>{weather.main.feels_like}°</h3>
                  <p>Sensación Térmica</p>
                </div>
                <div className="humidity">
                  <h3>{weather.main.humidity}%</h3>
                  <p>Humedad</p>
                </div>
                <div className="wind">
                  <h3>{weather.wind.speed} MPH</h3>
                  <p>Viento</p>
                </div>
          </div>
            </div>
        </div>
      )}
    </>
  );
}

export default App;