import {useState} from "react";
import {NavLink} from "react-router-dom";

export default function Navbar({updateState, resetState, loggedInUser}) {

    const [addressSearch, setAddressSearch] = useState("");

    function handleQuery(event) {
        // Gets user input for address search
        setAddressSearch(event.target.value);
    }

    async function handleSearchButton(event) {
        event.preventDefault();
        let getUrl = `http://localhost:8080/api/results`;
        // Trim address so no spaces at beginning or end
        const trimAddress = addressSearch.trim();
        // Make address all lowercase letters
        const lowerCaseAddress = trimAddress.toLowerCase();
        // Split address by space
        const splitAddress = lowerCaseAddress.split(" ");
        // If the first word is a number
        if (!isNaN(splitAddress[0])) {
            const streetNumber = splitAddress[0];
            const streetName = splitAddress.slice(1).join(" ");
            // Build full URL
            getUrl = `http://localhost:8080/api/results?num=${streetNumber}&name=${encodeURIComponent(streetName)}`;
            // If the first word is not a number then must be neighborhood
        } else if (isNaN(splitAddress[0])) {
            const neighborhood = splitAddress[0];
            getUrl = `http://localhost:8080/api/results?neighborhood=${encodeURIComponent(neighborhood)}`;
        }
        const addressObj = {
            method: "GET"
        }
        try{
            const response = await fetch(getUrl, addressObj);

            if(!response.ok) {
                throw new Error(`Network response error: ${response.status}`);
            }
            const data = await response.json();
            // Method that sets the search results in App.JSX
            updateState(data);
        } catch(error) {
            throw new Error(`There was a problem with fetch request: ${error.message}`);
        }
    }

    return (
        <nav className={"navbar"}>
            <div className={"navContainer"}>
                <ul>
                    {loggedInUser ? <li><NavLink to={"/home"} onClick={resetState}><h3>Home</h3></NavLink></li> : ""}
                    {loggedInUser ? <li id={"formLink"}><NavLink to={"/forms"}><h3>Forms</h3></NavLink></li> : ""}
                    {loggedInUser ? <li><NavLink id={"renderDataNavLink"} to={`/data/${loggedInUser.routeNumber}`}><h3>Route Data</h3></NavLink></li>: ""}
                </ul>
                <div>
                    <form className={"search-bar"} onSubmit={handleSearchButton}>
                        {loggedInUser ? <input className={"search"} type={"text"} placeholder={"Search Address/Neighborhood..."}
                               onChange={handleQuery}></input> : ""}
                        {loggedInUser ? <button className={"btn-search"} type={"submit"}>Go</button> : ""}
                    </form>
                </div>
            </div>
        </nav>
    )
}