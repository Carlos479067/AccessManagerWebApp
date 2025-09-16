import Logo from "../assets/eagle.png";
import clearSkyNight from "../assets/01n.png";
import {useEffect, useState} from "react";

export default function Header() {

    const [weatherImage, setWeatherImage] = useState("");
    const [weather, setWeather] = useState(null);

    const icons = {
        clearSkyDay: "01d",
        "01n": clearSkyNight,
        fewCloudsDay: "02d",
        fewCloudsNight: "02n",
        scatteredCloudsDay: "03d",
        scatteredCloudsNight: "03n",
        overCastDay: "04d",
        overCastNight: "04n",
        rainShowerDay: "09d",
        rainShowerNight: "09n",
        rainDay: "10d",
        rainNight: "10n",
        thunderstormDay: "11d",
        thunderStormNight: "11n",
        mistFogDay: "50d",
        mistFogNight: "50n"
    }

    function handleWeatherImg(data) {
        // 01n
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
                <div id={"weatherWrapper"}>
                    <div className={"weatherContainer"}>
                        <p>{weather && weather.name}</p>
                        <p>Temperature: {weather && weather.main.temp}</p>
                        <p>Humidity: {weather && weather.main.humidity}</p>
                    </div>
                    <img id={"weatherIcon"} src={icons[weatherImage]}
                         alt={"Weather Image"}/>
                </div>
            </div>
        </header>
    )
}