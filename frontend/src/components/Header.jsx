import Logo from "../assets/eagle.png";
import {useEffect, useState} from "react";

export default function Header() {

    const [weatherImage, setWeatherImage] = useState("");
    const [weather, setWeather] = useState(null);

    function handleWeatherImg(data) {
        console.log("Weather icon:", data.weather[0].icon);
        setWeatherImage(data.weather[0].icon);
    }

    function handleWeather() {

        const getUrl = `http://localhost:8080/api/weather`;

        const weatherObj = {
            method: "GET"
        }

        fetch(getUrl, weatherObj)
            .then((response) => {
                if(!response.ok) {
                    throw new Error(`Network response error: ${response.status}`);
                }

                return response.json();
            })
            .then((data) => {
                console.log(data);
                setWeather(data);
                handleWeatherImg(data);
            })
            .catch((error) => {
                throw new Error(`There was a problem with the fetch request: ${error.status}`);
            });
    }

    useEffect(() => {
        handleWeather()
    }, []);

    return (
        <header id={"header"}>
            <div id={"headerContent"}>
                <img id={"headerImage"} src={Logo} alt={"logo"}/>
                <img src={`http://openweathermap.org/img/wn/${weatherImage}@2x.png`} alt={"Weather Image"}/>
                <div className={"weatherContainer"}>
                    <h4>{weather && weather.name}</h4>
                    <h4>Temperature: {weather && weather.main.temp}</h4>
                    <h4>Humidity: {weather && weather.main.humidity}</h4>
                </div>
            </div>
        </header>
    )
}