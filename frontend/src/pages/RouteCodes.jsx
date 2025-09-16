import {useState} from "react";
import {useParams} from "react-router-dom";
import {useEffect} from "react";

export default function RouteCodes() {

    const [addresses, setAddresses] = useState([]);
    const {routeNumber} = useParams();

    function handleAddresses() {
        const getUrl = `${import.meta.env.VITE_API_URL}/api/codes/${routeNumber}`;

        const addressObj = {
            method: "GET"
        }

        fetch(getUrl, addressObj)
            .then((response) => {
                if(!response.ok) {
                    throw new Error(`Network response error: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setAddresses(data);
            })
            .catch((error) => {
                throw new Error(`There was a problem with the fetch request: ${error.status}`);
            });
    }

    function RenderAddress({addressObj}) {
        return (
            <li>
                <div className={"container"}>
                    {addressObj.streetNumber ? <p style={{fontWeight: "bold", fontSize: "28px"}}>{addressObj.streetNumber ? addressObj.streetNumber : ""} {addressObj.streetNumber ? addressObj.streetName : ""} {addressObj.streetNumber ? addressObj.cityName : ""} {addressObj.streetNumber ? addressObj.zipCode : ""}</p> : ""}
                    {addressObj.neighborhood ? <h2>{addressObj.neighborhood ? "Neighborhood: " : ""}{addressObj.neighborhood}</h2> : ""}
                    {addressObj.gateCode ? <h3>{addressObj.gateCode ? "Gate Code: " : ""}{addressObj.gateCode}</h3> : ""}
                    {addressObj.mailRoomCode ? <h3>{addressObj.mailRoomCode ? "Mailroom Code: " : ""}{addressObj.mailRoomCode}</h3> : ""}
                    {addressObj.locker_code ? <h3>{addressObj.locker_code ? "Locker Room Code: " : ""}{addressObj.locker_code}</h3> : ""}
                </div>
            </li>
        )
    }


    useEffect(() => {
        handleAddresses()
    }, []);

    return (
        <main>
            <div>
                <h2 id={"mainTitle"}>Route {routeNumber} Codes</h2>
                <ul>
                    {addresses.map((address) => {
                        return <RenderAddress addressObj={address} key={address.address_id}/>
                    })}
                </ul>
            </div>
        </main>
    )
}