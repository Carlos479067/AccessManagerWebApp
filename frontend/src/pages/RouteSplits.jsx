import {useState} from "react";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import gif from "../../../../../deployExample/frontend/src/assets/under-construction-pikachu.gif";

export default function RouteSplits() {

    const [addresses, setAddresses] = useState([]);
    const {routeNumber} = useParams();

    function handleAddresses() {
        const getUrl = `${import.meta.env.VITE_API_URL}/api/splits/${routeNumber}`;

        const addressObject = {
            method: "GET"
        }

        fetch(getUrl, addressObject)
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

    function RenderAddresses({address}) {
        return (
            <li>
                <div className={"container"}>
                    {address.streetNumber ? <h2>{address.streetNumber ? address.streetNumber : ""} {address.streetNumber ? address.streetName : ""} {address.streetNumber ? address.cityName : ""} {address.streetNumber ? address.zipCode : ""}</h2> : ""}
                    {address.neighborhood ? <h2>{address.neighborhood ? "Neighborhood: " : ""}{address.neighborhood}</h2> : ""}
                    {address.gateCode ? <h2>{address.gateCode ? "Gate Code: " : ""}{address.gateCode}</h2> : ""}
                    {address.mailRoomCode ? <h2>{address.mailRoomCode ? "Mailroom Code: " : ""}{address.mailRoomCode}</h2> : ""}
                    {address.locker_code ? <h2>{address.locker_code ? "Locker Room Code: " : ""}{address.locker_code}</h2> : ""}
                </div>
            </li>
        )
    }


    useEffect(() => {
        handleAddresses()
    }, []);

    return (
        <main>
            <div className={"routeSplitsTitle"}>
                <img src={gif} alt={"Under Construction"} style={{paddingRight: "25px"}}/>
                <h2 id={"mainTitle"}>Route {routeNumber} Splits</h2>
                <img src={gif} alt={"Under Construction"} style={{paddingLeft: "25px"}}/>
                <ul>
                    {addresses.map((address) => {
                        return <RenderAddresses address={address} key={address.address_id}/>
                    })}
                </ul>
            </div>
        </main>
    )
}