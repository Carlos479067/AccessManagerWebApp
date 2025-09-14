import {useState} from "react";
import {NavLink} from "react-router-dom";

export default function Navbar({updateState, resetState}) {

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
                    <li><NavLink to={"/"} onClick={resetState}><h3>Home</h3></NavLink></li>
                    <li><NavLink to={"/forms"}><h3>Forms</h3></NavLink></li>
                    {/*<li className={"dropdown"}>*/}
                    {/*    <a><h3>Route Codes & Splits</h3></a>*/}
                    {/*    <ul className={"dropdown-content"}>*/}
                    {/*        <li><a>4925</a></li>*/}
                    {/*        <li><a>4929</a></li>*/}
                    {/*        <li><a>4930</a></li>*/}
                    {/*        <li><a>4933</a></li>*/}
                    {/*        <li><a>4934</a></li>*/}
                    {/*        <li><a>4935</a></li>*/}
                    {/*        <li><a>4937</a></li>*/}
                    {/*        <li><a>4938</a></li>*/}
                    {/*        <li><a>4942</a></li>*/}
                    {/*        <li><a>4948</a></li>*/}
                    {/*        <li><a>4952</a></li>*/}
                    {/*        <li><a>4954</a></li>*/}
                    {/*    </ul>*/}
                    {/*</li>*/}
                </ul>
                <div>
                    <form className={"search-bar"} onSubmit={handleSearchButton}>
                        <input className={"search"} type={"text"} placeholder={"Search Address..."}
                               onChange={handleQuery}></input>
                        <button className={"btn-search"} type={"submit"}>Go</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}