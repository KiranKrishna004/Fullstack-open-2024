import { useState, useEffect } from "react";
import countryService from "./services";
import { CountryDisplay } from "./components/CountryDisplay";
import { CountryListing } from "./components/CountryListing";

const App = () => {
  const [countries, setCountries] = useState();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    countryService
      .getAll()
      .then((res) => setCountries(res.data))
      .catch((e) => console.log(e));
  }, []);

  const filteredCoutries = countries?.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div>
        find countries{" "}
        <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      {filteredCoutries?.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCoutries?.length === 1 ? (
        <CountryDisplay
          key={filteredCoutries[0].name.official}
          country={filteredCoutries[0]}
        />
      ) : (
        <CountryListing countries={filteredCoutries} />
      )}
    </div>
  );
};

export default App;
