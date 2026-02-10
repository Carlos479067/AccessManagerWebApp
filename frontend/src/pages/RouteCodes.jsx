import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function RouteCodes({searchResults}) {

    const [addresses, setAddresses] = useState([]);
    const [address, setAddress] = useState([]);
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
                    <MapAddress searchAddress={searchResults}/>
                </div>
            </>
    } else {
        contentToRender =
            <div>
                <h2 id={"mainTitle"}>Route {routeNumber} Codes</h2>
                <ul>
                    {addresses.map((mainAddress) => {
                        return <RenderAddress addressMainObj={mainAddress} key={mainAddress.address.id}/>
                    })}
                </ul>
            </div>
    }

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
                setAddresses(data);
            } catch (error) {
                console.error(`There was a problem with fetch request: ${error.message}`);
            }
        }
        //Call function
        handleAddresses();

    }, [routeNumber]);

    // async function SearchAddress(event) {
    //     event.preventDefault();
    //     let getUrl = `${import.meta.env.VITE_API_URL}/api/results`;
    //     // Trim address so no spaces at beginning or end
    //     const trimAddress = streetNumName.trim();
    //     // Make address all lowercase letters
    //     const lowerCaseAddress = trimAddress.toLowerCase();
    //     // Split address by space
    //     const splitAddress = lowerCaseAddress.split(" ");
    //     // If the first word is a number
    //     if (!isNaN(splitAddress[0])) {
    //         const streetNumber = splitAddress[0];
    //         const streetName = splitAddress.slice(1).join(" ");
    //         // Build full URL
    //         getUrl = `${import.meta.env.VITE_API_URL}/api/results?num=${streetNumber}&name=${encodeURIComponent(streetName)}`;
    //         // If the first word is not a number then must be neighborhood
    //     } else if (isNaN(splitAddress[0])) {
    //         const neighborhood = splitAddress[0];
    //         getUrl = `${import.meta.env.VITE_API_URL}/api/results?neighborhood=${encodeURIComponent(neighborhood)}`;
    //     }
    //
    //     const addressObj = {
    //         method: "GET"
    //     }
    //     try {
    //         const response = await fetch(getUrl, addressObj);
    //         if (!response.ok) {
    //             throw new Error(`Network response error: ${response.status}`);
    //         }
    //         const data = await response.json();
    //         console.log("Delete search results: ", data);
    //         setAddress(data);
    //     } catch (error) {
    //         console.error(`There was a problem with fetch request: ${error.message}`);
    //     }
    // }


    // For search feature in navbar. Maps the addresses and renders the results
    function MapAddress({searchAddress}) {
        return (
            <>
                {searchAddress.length > 0 ? (
                    <div>
                        <ul>
                            {searchAddress.map((searchAddresses) => (
                                <RenderSearchAddress addressSearchObj={searchAddresses} key={searchAddresses.id}/>
                            ))}
                        </ul>
                    </div>

                ) : (<p>No address found</p>)
                }
            </>

        )
    }
    // Searches for an address by street number & name and displays all address information
    // function SearchAddressToRemove({searchResult}) {
    //     return (
    //         <>
    //             {searchResult.length > 0 ? (
    //                 <div>
    //                     <ul>
    //                         {searchResult.map((result) => (
    //                             <RenderSearchAddress addressSearchObj={result} key={`${result.streetNumber}-${result.streetName}-${result.routeNumber}`}/>
    //                         ))}
    //                     </ul>
    //                 </div>
    //
    //             ) : (<p>No address found</p>)
    //             }
    //         </>
    //     )
    // }
    

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

    // function AddressForms() {
    //     return (
    //         <>
    //             {buttonAddNewClicked && (
    //                 <form id="addCodeForm" onSubmit={submitAddress}>
    //                     <ul>
    //                         <li><label>Street Number: </label><input type="text" onChange={handleStreetNumber} /></li>
    //                         <li><label>Street Name: </label><input type="text" onChange={handleStreetName} /></li>
    //                         <li><label>City Name: </label><input type="text" onChange={handleCityName} /></li>
    //                         <li><label>Zip Code: </label><input type="text" onChange={handleZipCode} /></li>
    //                         <li><label>Gate Code: </label><input type="text" onChange={handleGateCode} /></li>
    //                         <li><label>Mail Room Code: </label><input type="text" onChange={handleMailRoomCode} /></li>
    //                         <li><label>Locker Code: </label><input type="text" onChange={handleLockerCode} /></li>
    //                         <li><label>Neighborhood Name: </label><input type="text" onChange={handleNeighborhood} /></li>
    //                         <li><button type="submit">Submit</button></li>
    //                     </ul>
    //                 </form>
    //             )}
    //
    //             {/*{buttonRemoveClicked && (*/}
    //             {/*    <form id="removeCodeForm" onSubmit={SearchAddress}>*/}
    //             {/*        <ul>*/}
    //             {/*            <li>*/}
    //             {/*                <label>Type Street Number & Name or neighborhood to delete: </label>*/}
    //             {/*                <input type="text" onChange={handleStreetNumAndName} />*/}
    //             {/*            </li>*/}
    //             {/*            <li><button type="submit">Submit</button></li>*/}
    //             {/*        </ul>*/}
    //             {/*        {address.length > 0 && <SearchAddressToRemove searchResult={address} />}*/}
    //             {/*    </form>*/}
    //             {/*)}*/}
    //         </>
    //     );
    // }

    return (
        <main>
            <div id={"routeCodeButtons"}>
                <button className={"editCodeButton"} onClick={() => setButtonAddNewClicked(!buttonAddNewClicked && !buttonRemoveClicked)}>Add new code</button>
                <button className={"editCodeButton"} onClick={() => setButtonRemoveClicked(!buttonRemoveClicked &&  !buttonAddNewClicked)}>Remove code</button>
            </div>
            {/*{AddressForms()}*/}
            {contentToRender}
        </main>
    )
}
