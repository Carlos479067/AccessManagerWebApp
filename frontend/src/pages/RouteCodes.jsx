import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function RouteCodes({searchResults}) {

    const [addresses, setAddresses] = useState([]);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [streetNumber, setStreetNumber] = useState("");
    const [streetName, setStreetName] = useState("");
    const [cityName, setCityName] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [gateCode, setGateCode] = useState("");
    const [mailRoomCode, setMailRoomCode] = useState("");
    const [lockerCode, setLockerCode] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    // gets dynamic values from the URL
    const {routeNumber} = useParams();

    function handleInput(data) {
        setStreetNumber(data.target.value);
        setStreetName(data.target.value);
    }

    let contentToRender = <></>;

    if(searchResults.length === 0) {
        contentToRender =
            <div>
                <div id={"routeCodeButtons"}>
                    <button className={"editCodeButton"} onClick={() => setButtonClicked(!buttonClicked)}>Add new code</button>
                    <button className={"editCodeButton"}>Remove code</button>
                </div>
                    <form id={"addCodeForm"} onSubmit={submitAddress}>
                        {buttonClicked &&
                            <ul>
                                <li><label>Street Number: </label><input type={"text"} onChange={handleInput}></input></li>
                                <li><label>Street Name: </label><input type={"text"} onChange={handleInput}></input></li>
                                <li><label>City Name: </label><input type={"text"} onChange={handleInput}></input></li>
                                <li><button className={"editCodeButton"} type={"submit"}>Submit</button></li>
                            </ul>
                        }
                    </form>

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

    async function submitAddress() {

        const getUrl = `http://localhost:8080/api/addAddress`;

        const addressObj = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                streetNumber: streetNumber,
                streetName: streetName,
                cityName: cityName,
                zipCode: zipCode,
                gateCode: gateCode,
                mailRoomCode: mailRoomCode,
                lockerCode: lockerCode,
                routeNumber: routeNumber,
                neighborhood: neighborhood
            })
        }
        try {
            const response = await fetch(getUrl, addressObj);

            if(!response.ok) {
                throw new Error(`Network response error: ${response.status}`);
            }
            const savedAddress = await response.json();
            setAddresses([...addresses, savedAddress]);
        } catch (error) {
            console.error(`There was a problem with fetch request: ${error.message}`);
        }

    }

    useEffect(() => {

        async function handleAddresses() {

            const getUrl = `http://localhost:8080/api/codes/${routeNumber}`;

            const addressObj = {
                method: "GET"
            }

            try {
                const response = await fetch(getUrl, addressObj);

                if (!response.ok) {
                    throw new Error(`Network response error: ${response.status}`);
                }
                const data = await response.json();
                setAddresses(data);
            } catch (error) {
                console.error(`There was a problem with fetch request: ${error.message}`);
            }
        }
        //Call function
        handleAddresses();

    }, []);

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
                    {addressSearchObj.streetNumber ? <h2>{addressSearchObj.streetNumber ? addressSearchObj.streetNumber : ""} {addressSearchObj.streetNumber ? addressSearchObj.streetName : ""}</h2> : ""}
                    <h2>Route: {addressSearchObj.routeNumber}</h2>
                    {addressSearchObj.neighborhood ? <h3>{addressSearchObj.neighborhood ? "Neighborhood: " : ""}{addressSearchObj.neighborhood}</h3> : ""}
                    {addressSearchObj.gateCode ? ( addressSearchObj.gateCode.startsWith("https") ? ( <h3>Gate Code: <a href={addressSearchObj.gateCode} target={"_blank"} rel="noopener noreferrer">Link to open gate</a></h3>) : <h3>{addressSearchObj.gateCode ? "Gate Code: " : ""}{addressSearchObj.gateCode}</h3>) : ""}
                    {addressSearchObj.mailRoomCode ? <h3>{addressSearchObj.mailRoomCode ? "Mailroom Code: " : ""}{addressSearchObj.mailRoomCode}</h3> : ""}
                    {addressSearchObj.locker_code ? <h3>{addressSearchObj.locker_code ? "Locker Room Code: " : ""}{addressSearchObj.locker_code}</h3> : ""}
                </div>
            </li>
        )
    }

    return (
        <main>
            {contentToRender}
        </main>
    )
}