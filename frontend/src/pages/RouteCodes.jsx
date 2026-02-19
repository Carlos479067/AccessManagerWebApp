import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function RouteCodes({searchResults}) {

    const [addresses, setAddresses] = useState([]);
    const [searchedAddress, setSearchedAddress] = useState(null); // Single Object
    const [buttonAddNewClicked, setButtonAddNewClicked] = useState(false);
    const [buttonRemoveClicked, setButtonRemoveClicked] = useState(false);
    const [streetNumName, setStreetNumName] = useState("");
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

    function handleStreetNumber(data) {
        setStreetNumber(data.target.value);
    }
    function handleStreetName(data) {
        setStreetName(data.target.value);
    }
    function handleCityName(data) {
        setCityName(data.target.value);
    }
    function handleZipCode(data) {
        setZipCode(data.target.value);
    }
    function handleGateCode(data) {
        setGateCode(data.target.value);
    }
    function handleMailRoomCode(data) {
        setMailRoomCode(data.target.value);
    }
    function handleLockerCode(data) {
        setLockerCode(data.target.value);
    }
    function handleNeighborhood(data) {
        setNeighborhood(data.target.value);
    }

    function handleStreetNumAndName(data) {
        setStreetNumName(data.target.value);
    }

    let contentToRender = <></>;

    if(searchResults.length > 0) {
        contentToRender =
            <>
                <div className={"main"}>
                    <NavBarSearch searchAddress={searchResults}/>
                </div>
            </>
    } else {
        contentToRender =
            <div>
                <h2 id={"mainTitle"}>Route {routeNumber} Codes</h2>
                <div id={"routeCodeButtons"}>
                    <button className={"editCodeButton"} onClick={() => setButtonAddNewClicked(!buttonAddNewClicked && !buttonRemoveClicked)}>Add new code</button>
                    <button className={"editCodeButton"} onClick={() => setButtonRemoveClicked(!buttonRemoveClicked && !buttonAddNewClicked)}>Remove code</button>
                </div>
                {AddressForms()}
                <ul>
                    {addresses.map((mainAddress) => {
                        return <RenderAddress addressMainObj={mainAddress} key={mainAddress.id}/>
                    })}
                </ul>
            </div>
    }

    // Handle delete button to remove address from database
    async function handleDelete(address) {

        const getUrl = `${import.meta.env.VITE_API_URL}/api/deleteAddress`;
        const addressObj = {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                streetNumber: address.streetNumber,
                streetName: address.streetName,
                neighborhood: address.neighborhood
            })
        }

        try {
            const response = await fetch(getUrl, addressObj);

            if (!response.ok) {
                throw new Error(`Network response error: ${response.status}`);
            }

            const deletedAddress = await response.json();
            console.log("Deleted:", deletedAddress);
            setSearchedAddress(null); // Remove from UI
            // Use filter() to remove only the deletedAddress and keep all other addresses

        } catch(error) {
            console.error(`There was a problem with fetch request: ${error.message}`);
        }
    }

    // Add new code button to submit new address to database
    async function submitAddress(e) {
        e.preventDefault();
        const getUrl = `${import.meta.env.VITE_API_URL}/api/addAddress`;

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

            if (!response.ok) {
                throw new Error(`Network response error: ${response.status}`);
            }
            const savedAddress = await response.json();
            setAddresses([...addresses, savedAddress]);
        } catch (error) {
            console.error(`There was a problem with fetch request: ${error.message}`);
        }

    }

    // Call to backend to retrieve addresses in database to render on codes page
    useEffect(() => {

        async function handleAddresses() {

            const getUrl = `${import.meta.env.VITE_API_URL}/api/codes/${routeNumber}`;

            const addressObj = {
                method: "GET"
            }

            try {
                const response = await fetch(getUrl, addressObj);

                if (!response.ok) {
                    throw new Error(`Network response error: ${response.status}`);
                }
                const data = await response.json();
                console.log("Data: ", data);
                setAddresses(data);
            } catch (error) {
                console.error(`There was a problem with fetch request: ${error.message}`);
            }
        }
        //Call function
        handleAddresses();

    }, [routeNumber]);

    // Call to backend to search an address in the database
    async function SearchAddress(event) {
        event.preventDefault();
        let getUrl = `${import.meta.env.VITE_API_URL}/api/results`;
        // Trim address so no spaces at beginning or end
        const trimAddress = streetNumName.trim();
        // Make address all lowercase letters
        const lowerCaseAddress = trimAddress.toLowerCase();
        // Split address by space
        const splitAddress = lowerCaseAddress.split(" ");
        // If the first word is a number
        if (!isNaN(splitAddress[0])) {
            const streetNumber = splitAddress[0];
            const streetName = splitAddress.slice(1).join(" ");
            // Build full URL
            getUrl = `${import.meta.env.VITE_API_URL}/api/results?num=${streetNumber}&name=${encodeURIComponent(streetName)}`;
            // If the first word is not a number then must be neighborhood
        } else if (isNaN(splitAddress[0])) {
            const neighborhood = splitAddress[0];
            getUrl = `${import.meta.env.VITE_API_URL}/api/results?neighborhood=${encodeURIComponent(neighborhood)}`;
        }

        const addressObj = {
            method: "GET"
        }
        try {
            const response = await fetch(getUrl, addressObj);
            if (!response.ok) {
                throw new Error(`Network response error: ${response.status}`);
            }
            const data = await response.json();
            console.log("Delete search results: ", data);
            setSearchedAddress(data.length ? data[0] : null);
        } catch (error) {
            console.error(`There was a problem with fetch request: ${error.message}`);
        }
    }


    // For search feature in navbar. Maps the addresses and renders the results
    function NavBarSearch({searchAddress}) {
        return (
            <>
                {searchAddress.length > 0 ? (
                    <div>
                        <ul>
                            {searchAddress.map((searchAddresses) => (
                                <RenderAddress addressSearchObj={searchAddresses} key={searchAddresses.id}/>
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

    function RenderDeleteAddress({address, onDelete}) {
        if (!address) return null;

        return (
                <div className={"searchContainer"}>
                    {address.streetNumber ? <h2>{address.streetNumber ? address.streetNumber : ""} {address.streetNumber ? address.streetName : ""}</h2> : ""}
                    <h2>Route: {address.routeNumber}</h2>
                    {address.neighborhood ? <h3>{address.neighborhood ? "Neighborhood: " : ""}{address.neighborhood}</h3> : ""}
                    {address.gateCode ? ( address.gateCode.startsWith("https") ? ( <h3>Gate Code: <a href={address.gateCode} target={"_blank"} rel="noopener noreferrer">Link to open gate</a></h3>) : <h3>{address.gateCode ? "Gate Code: " : ""}{address.gateCode}</h3>) : ""}
                    {address.mailRoomCode ? <h3>{address.mailRoomCode ? "Mailroom Code: " : ""}{address.mailRoomCode}</h3> : ""}
                    {address.locker_code ? <h3>{address.locker_code ? "Locker Room Code: " : ""}{address.locker_code}</h3> : ""}

                    <button className={"removeSubmitBtn"} onClick={() => onDelete(address)}>Delete</button>
                </div>
        )
    }

    function AddressForms() {

        return (
            <>
                {buttonAddNewClicked && (
                    <form id="addCodeForm" onSubmit={submitAddress}>
                        <ul>
                            <li><label>Street Number: </label><input type="text" onChange={handleStreetNumber} /></li>
                            <li><label>Street Name: </label><input type="text" onChange={handleStreetName} /></li>
                            <li><label>City Name: </label><input type="text" onChange={handleCityName} /></li>
                            <li><label>Zip Code: </label><input type="text" onChange={handleZipCode} /></li>
                            <li><label>Gate Code: </label><input type="text" onChange={handleGateCode} /></li>
                            <li><label>Mail Room Code: </label><input type="text" onChange={handleMailRoomCode} /></li>
                            <li><label>Locker Code: </label><input type="text" onChange={handleLockerCode} /></li>
                            <li><label>Neighborhood Name: </label><input type="text" onChange={handleNeighborhood} /></li>
                            <li><button className={"addSubmitBtn"} type="submit">Submit</button></li>
                        </ul>
                    </form>
                )}
                {buttonRemoveClicked && (
                    <form id={"deleteCodeForm"} onSubmit={SearchAddress}>
                        <ul>
                            <li>
                                <label>Type Street Number & Name or neighborhood to delete: </label>
                                <input type={"text"} onChange={handleStreetNumAndName} placeholder={"Address..."} />
                            </li>
                            <li><button className={"removeSubmitBtn"} type={"submit"}>Submit</button></li>
                            {/*Show searched address*/}
                            <li>
                                {searchedAddress && (
                                    <>
                                        <h2 style={{color: "red"}}>Are you sure you want to delete this address?</h2>
                                        <RenderDeleteAddress address={searchedAddress} onDelete={handleDelete} />
                                    </>
                                )}
                            </li>
                        </ul>
                    </form>
                )}
            </>
        );
    }

    return (
        <main>
            {contentToRender}
        </main>
    )
}
