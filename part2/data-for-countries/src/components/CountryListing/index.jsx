import { useState } from "react";
import countriesService from "../../services";
import { CountryDisplay } from "../CountryDisplay";

export const CountryListing = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState();

  const handleShow = (name) => {
    countriesService
      .getByName(name)
      .then((res) => setSelectedCountry(res.data));
  };

  return (
    <div>
      {countries?.map((country) => (
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={() => handleShow(country.name.common)}>show</button>
        </div>
      ))}
      {selectedCountry && <CountryDisplay country={selectedCountry} />}
    </div>
  );
};
