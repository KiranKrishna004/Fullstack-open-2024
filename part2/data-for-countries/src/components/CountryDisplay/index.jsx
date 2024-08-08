import { useEffect, useState } from "react";
import countryService from "../../services";
import { WeatherDisplay } from "./WeatherDisplay";

export const CountryDisplay = ({ country }) => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    countryService
      .getWeatherByLoc(country.latlng[0], country.latlng[1])
      .then((res) => setWeather(res.data))
      .catch((e) => console.log(e));
  }, [country]);

  return (
    <div>
      <h1>{country?.name.official}</h1>
      <p>capital {country?.capital[0]}</p>
      <p>area {country?.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country?.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country?.flags.png} alt={country?.flags.alt} />
      <h2>Weather in {country.capital[0]}</h2>
      <WeatherDisplay weather={weather} />
    </div>
  );
};
