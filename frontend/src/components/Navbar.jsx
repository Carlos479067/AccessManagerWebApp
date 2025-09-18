import {useState} from "react";
import {NavLink} from "react-router-dom";

export default function Navbar({updateState, resetState, loggedInUser}) {

    const [addressSearch, setAddressSearch] = useState("");


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
                updateState(data);
            })
            .catch(error => {
                throw new Error(`There was a problem with the fetch request: ${error.status}`);
            })
    }

    return (
        <nav className={"navbar"}>
            <div className={"navContainer"}>
                <ul>
                    {loggedInUser ? <li><NavLink to={"/home"} onClick={resetState}><h3>Home</h3></NavLink></li> : ""}
                    {loggedInUser ? <li id={"formLink"}><NavLink to={"/forms"}><h3>Forms</h3></NavLink></li> : ""}
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