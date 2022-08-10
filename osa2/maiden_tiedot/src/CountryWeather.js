import { useEffect, useState } from "react"
import axios from 'axios'

const CountryWeather = ({ country }) => {
    const [weatherData, setWeatherData] = useState(null);

    const [lat, lon] = country.capitalInfo.latlng
    const api_key = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${api_key}`)
            .then(res => setWeatherData(res.data));
    }, [lat, lon, api_key]);

    return (
        <>
            <h2>Weather in {country.capital.toString()}</h2>
            temperature {weatherData ? weatherData.main.temp : "-"} Celcius<br />
            {weatherData
                ? <img
                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt="weather icon" />
                : ""}
            <br />
            wind {weatherData ? weatherData.wind.speed : "-"} m/s
        </>
    );

}

export default CountryWeather;