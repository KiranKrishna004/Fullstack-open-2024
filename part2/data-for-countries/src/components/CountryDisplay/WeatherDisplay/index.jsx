export const WeatherDisplay = ({ weather }) => {
  return (
    <>
      <p>temperature {weather?.main.temp} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`}
        alt={"icon missing"}
      />
      <p>wind {weather?.wind.speed} m/s</p>
    </>
  );
};
