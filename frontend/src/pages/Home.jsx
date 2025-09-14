import {useState} from "react";

export default function Home() {

    const [addressSearch, setAddressSearch] = useState("");
    const [renderSearch, setRenderSearch] = useState("");

    function handleQuery(event) {
        // Gets user input
        setAddressSearch(event.target.value);
    }

    function handleSearchButton(event) {
        // Prevent reloading page when button clicked
        event.preventDefault();
        // AWS backend url
        let getUrl = `${import.meta.env.VITE_API_URL}/api/results`;

        const trimAddress = addressSearch.trim();
        const address = trimAddress.toLowerCase();
        const splitAddress = address.split(" ");

        if(!isNaN(splitAddress[0])) {
            const streetNumber = splitAddress[0];
            const streetName = splitAddress.slice(1).join(" ");
            //Build full url
            getUrl = `${import.meta.env.VITE_API_URL}/api/results?num=${streetNumber}&name=${encodeURIComponent(streetName)}`;
        }
        else if(isNaN(splitAddress[0])) {
            const neighborhood = splitAddress[0];
            getUrl = `${import.meta.env.VITE_API_URL}/api/results?neighborhood=${encodeURIComponent(neighborhood)}`;
        }

        //Create object request
        const requestObj = {
            method: "GET"
        }
        //send request using fetch
        fetch(getUrl, requestObj)
            .then(response => {
                if(!response.ok) {
                    throw new Error(`Network response error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setRenderSearch(data);
            })
            .catch(error => {
                throw new Error(`There was a problem with the fetch request: ${error.status}`);
            })
    }

    const contentToRender =
        <>
            <div>
                <MapAddress address={renderSearch} />
            </div>
        </>

    function MapAddress({address}) {

        return (
            <>
                {address.length > 0 ? (
                    <div>
                        <ul>
                            {address.map((addresses) => (
                                <RenderAddress addressObj={addresses} key={addresses.address_id}/>
                            ))}
                        </ul>
                    </div>

                ) : (<p>No address found</p>)
                }
            </>

        )
    }

    function RenderAddress({addressObj}) {
        return (
            <li>
                <div className={"searchContainer"}>
                    {addressObj.streetNumber ? <h2>{addressObj.streetNumber ? addressObj.streetNumber : ""} {addressObj.streetNumber ? addressObj.streetName : ""} {addressObj.streetNumber ? addressObj.cityName : ""} {addressObj.streetNumber ? addressObj.zipCode : ""}</h2> : ""}
                    <h2>Route: {addressObj.routeNumber}</h2>
                    {addressObj.neighborhood ? <h3>{addressObj.neighborhood ? "Neighborhood: " : ""}{addressObj.neighborhood}</h3> : ""}
                    {addressObj.gateCode ? <h3>{addressObj.gateCode ? "Gate Code: " : ""}{addressObj.gateCode}</h3> : ""}
                    {addressObj.mailRoomCode ? <h3>{addressObj.mailRoomCode ? "Mailroom Code: " : ""}{addressObj.mailRoomCode}</h3> : ""}
                    {addressObj.locker_code ? <h3>{addressObj.locker_code ? "Locker Room Code: " : ""}{addressObj.locker_code}</h3> : ""}
                </div>
            </li>
        )
    }


    return (
        <main>
            <div>
                <form className={"search-bar"} onSubmit={handleSearchButton}>
                    <input className={"search"} type={"text"} placeholder={"Search Address..."}
                           onChange={handleQuery}></input>
                    <button className={"btn-search"} type={"submit"}>Go</button>
                </form>
            </div>
            <div>
                {contentToRender}
            </div>
        </main>
    )
}