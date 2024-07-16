export const CountryDisplay = ({ country }) => {
  console.log(country);
  return (
    <div>
      <h1>{country?.name?.official}</h1>
      <p>capital {country?.capital[0]}</p>
      <p>area {country?.area}</p>
      <h2>languages:</h2>
      <ul>
        {Object.values(country?.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country?.flags.png} alt={country?.flags.alt} />
    </div>
  );
};
