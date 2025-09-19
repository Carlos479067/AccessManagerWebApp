import {useState} from "react";
import {useParams} from "react-router-dom";
import {useEffect} from "react";

export default function RouteCodes({searchResults}) {

    const [addresses, setAddresses] = useState([]);
    const {routeNumber} = useParams();

    let contentToRender = <></>;

    if(searchResults.length === 0) {
        contentToRender =
            <div>
                <h2 id={"mainTitle"}>Route {routeNumber} Codes</h2>
                <ul>
                    {addresses.map((mainAddress) => {
                        return <RenderAddress addressMainObj={mainAddress} key={mainAddress.address_id}/>
                    })}
                </ul>
            </div>
    } else {
        contentToRender =
            <>
                <div className={"main"}>
                    <MapAddress searchAddress={searchResults}/>
                </div>
            </>
    }

    function handleAddresses() {
        const getUrl = `${import.meta.env.VITE_API_URL}/api/codes/${routeNumber}`;

        const addressObj = {
            method: "GET"
        }

        fetch(getUrl, addressObj)
            .then((response) => {
                if (!response.ok) {
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

    function MapAddress({searchAddress}) {

        return (
            <>
                {searchAddress.length > 0 ? (
                    <div>
                        <ul>
                            {searchAddress.map((searchAddresses) => (
                                <RenderSearchAddress addressSearchObj={searchAddresses} key={searchAddresses.address_id}/>
                            ))}
                        </ul>
                    </div>

                ) : (<p>No address found</p>)
                }
            </>

        )
    }

    function RenderAddress({addressMainObj}) {
        return (
            <li>
                <div className={"container"}>
                    {addressMainObj.streetNumber ? <h2>{addressMainObj.streetNumber ? addressMainObj.streetNumber : ""} {addressMainObj.streetNumber ? addressMainObj.streetName : ""}, {addressMainObj.streetNumber ? addressMainObj.cityName : ""}, {addressMainObj.streetNumber ? addressMainObj.zipCode : ""}</h2> : ""}
                    {addressMainObj.neighborhood ? <h2>{addressMainObj.neighborhood ? "Neighborhood: " : ""}{addressMainObj.neighborhood}</h2> : ""}
                    {addressMainObj.gateCode ? ( addressMainObj.gateCode.startsWith("https") ? ( <h3>Gate Code: <a href={addressMainObj.gateCode} target={"_blank"} rel="noopener noreferrer">Link to open gate</a></h3>) : <h3>{addressMainObj.gateCode ? "Gate Code: " : ""}{addressMainObj.gateCode}</h3>) : ""}
                    {addressMainObj.mailRoomCode ? <h3>{addressMainObj.mailRoomCode ? "Mailroom Code: " : ""}{addressMainObj.mailRoomCode}</h3> : ""}
                    {addressMainObj.locker_code ? <h3>{addressMainObj.locker_code ? "Locker Room Code: " : ""}{addressMainObj.locker_code}</h3> : ""}
                </div>
            </li>
        )
    }

    function RenderSearchAddress({addressSearchObj}) {
        return (
            <li>
                <div className={"searchContainer"}>
                    {addressSearchObj.streetNumber ? <h2>{addressSearchObj.streetNumber ? addressSearchObj.streetNumber : ""} {addressSearchObj.streetNumber ? addressSearchObj.streetName : ""}, {addressSearchObj.streetNumber ? addressSearchObj.cityName : ""}, {addressSearchObj.streetNumber ? addressSearchObj.zipCode : ""}</h2> : ""}
                    <h2>Route: {addressSearchObj.routeNumber}</h2>
                    {addressSearchObj.neighborhood ? <h3>{addressSearchObj.neighborhood ? "Neighborhood: " : ""}{addressSearchObj.neighborhood}</h3> : ""}
                    {addressSearchObj.gateCode ? ( addressSearchObj.gateCode.startsWith("https") ? ( <h3>Gate Code: <a href={addressSearchObj.gateCode} target={"_blank"} rel="noopener noreferrer">Link to open gate</a></h3>) : <h3>{addressSearchObj.gateCode ? "Gate Code: " : ""}{addressSearchObj.gateCode}</h3>) : ""}
                    {addressSearchObj.mailRoomCode ? <h3>{addressSearchObj.mailRoomCode ? "Mailroom Code: " : ""}{addressSearchObj.mailRoomCode}</h3> : ""}
                    {addressSearchObj.locker_code ? <h3>{addressSearchObj.locker_code ? "Locker Room Code: " : ""}{addressSearchObj.locker_code}</h3> : ""}
                </div>
            </li>
        )
    }


    useEffect(() => {
        handleAddresses()
    }, []);

    return (
        <main>
            {contentToRender}
        </main>
    )
}