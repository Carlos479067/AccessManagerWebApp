import Logo from "../assets/eagle.png";
import clearSkyDay from "../assets/01d.png";
import clearSkyNight from "../assets/01n.png";
import fewCloudsDay from "../assets/02d.png";
import scatteredCloudsDay from "../assets/02d.png";
import fewCloudsNight from "../assets/02n.png";
import scatteredCloudsNight from "../assets/02n.png";
import overCastDay from "../assets/04d.png";
import overCastNight from "../assets/04d.png";
import rainShowerDay from "../assets/09d.png";
import rainShowerNight from "../assets/09n.png";
import rainDay from "../assets/09d.png";
import rainNight from "../assets/09n.png";
import thunderstormDay from "../assets/11d.png";
import thunderStormNight from "../assets/11n.png";
import mistFogDay from "../assets/50d.png";
import mistFogNight from "../assets/50d.png";
import logoutImg from "../assets/logout.png";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Header({setLoggedInUser, loggedInUser}) {

    const [weatherImage, setWeatherImage] = useState("");
    const [weather, setWeather] = useState(null);

    const navigate = useNavigate();

    const icons = {
        "01d": clearSkyDay,
        "01n": clearSkyNight,
        "02d": fewCloudsDay,
        "02n": fewCloudsNight,
        "03d": scatteredCloudsDay,
        "03n": scatteredCloudsNight,
        "04d": overCastDay,
        "04n": overCastNight,
        "09d": rainShowerDay,
        "09n": rainShowerNight,
        "10d": rainDay,
        "10n": rainNight,
        "11d": thunderstormDay,
        "11n": thunderStormNight,
        "50d": mistFogDay,
        "50n": mistFogNight
    }

    function DesktopLogout() {
        setLoggedInUser(null);
        localStorage.removeItem("loggedInUser");
        navigate("/");
    }

    function handleWeatherImg(data) {
        // 01n
        setWeatherImage(data.weather[0].icon);
    }

    function handleWeather() {

        const getUrl = `${import.meta.env.VITE_API_URL}/api/weather`;

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
                {loggedInUser ? <h3 id={"welcomeText"} style={{margin: "25px"}}>Welcome {loggedInUser.firstName}</h3> : ""}
                <div id={"weatherWrapper"}>
                    <div className={"weatherContainer"}>
                        <p>{weather && weather.name}</p>
                        <p>Temperature: {weather && weather.main.temp}</p>
                        <p>Humidity: {weather && weather.main.humidity}</p>
                    </div>
                    <div id={"weatherLogoutContainer"}>
                        <img id={"weatherIcon"} src={icons[weatherImage]}
                             alt={"Weather Image"}/>
                        <div id={"logoutContainer"}>
                            {loggedInUser ? <img id={"mobileHeaderLogout"} src={logoutImg} alt={"logout"} onClick={DesktopLogout}/> : ""}
                            {loggedInUser ? <img id={"DesktopLogoutImage"} src={logoutImg} alt={"logout"} onClick={DesktopLogout}/> : ""}
                            {loggedInUser ? <p id={"desktopLogoutText"} onClick={DesktopLogout}>Logout</p> : ""}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}