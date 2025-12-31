import {NavLink} from "react-router-dom";

export default function Home ({searchResults}) {

    let contentToRender = <></>;

    if(searchResults.length === 0) {
        contentToRender =
            // Grid layout
                <div id={"main"}>
                    <h1>Route Codes</h1>
                    <div>
                        <h2 style={{textDecoration: "underline"}}>Route Codes</h2>
                        <h2>78249</h2>
                        <ul>
                            <li><NavLink to={"/codes/4925"}>Route 4925</NavLink></li>
                            <li><NavLink to={"/codes/4929"}>Route 4929</NavLink></li>
                            <li><NavLink to={"/codes/4930"}>Route 4930</NavLink></li>
                            <li><NavLink to={"/codes/4933"}>Route 4933</NavLink></li>
                            <li><NavLink to={"/codes/4934"}>Route 4934</NavLink></li>
                            <li><NavLink to={"/codes/4935"}>Route 4935</NavLink></li>
                            <li><NavLink to={"/codes/4937"}>Route 4937</NavLink></li>
                            <li><NavLink to={"/codes/4938"}>Route 4938</NavLink></li>
                            <li><NavLink to={"/codes/4942"}>Route 4942</NavLink></li>
                            <li><NavLink to={"/codes/4948"}>Route 4948</NavLink></li>
                            <li><NavLink to={"/codes/4949"}>Route 4949</NavLink></li>
                            <li><NavLink to={"/codes/4952"}>Route 4952</NavLink></li>
                            <li><NavLink to={"/codes/4954"}>Route 4954</NavLink></li>
                        </ul>
                    </div>
                    <div>
                    <h2 style={{textDecoration: "underline"}}>Route Codes</h2>
                        <h2>78240</h2>
                        <ul>
                            <li><NavLink to={"/codes/4017"}>Route 4017</NavLink></li>
                            <li><NavLink to={"/codes/4019"}>Route 4019</NavLink></li>
                            <li><NavLink to={"/codes/4020"}>Route 4020</NavLink></li>
                            <li><NavLink to={"/codes/4021"}>Route 4021</NavLink></li>
                            <li><NavLink to={"/codes/4022"}>Route 4022</NavLink></li>
                            <li><NavLink to={"/codes/4023"}>Route 4023</NavLink></li>
                            <li><NavLink to={"/codes/4024"}>Route 4024</NavLink></li>
                            <li><NavLink to={"/codes/4025"}>Route 4025</NavLink></li>
                            <li><NavLink to={"/codes/4026"}>Route 4026</NavLink></li>
                            <li><NavLink to={"/codes/4027"}>Route 4027</NavLink></li>
                            <li><NavLink to={"/codes/4029"}>Route 4029</NavLink></li>
                            <li><NavLink to={"/codes/4030"}>Route 4030</NavLink></li>
                            <li><NavLink to={"/codes/4031"}>Route 4031</NavLink></li>
                            <li><NavLink to={"/codes/4032"}>Route 4032</NavLink></li>
                            <li><NavLink to={"/codes/4033"}>Route 4033</NavLink></li>
                            <li><NavLink to={"/codes/4034"}>Route 4034</NavLink></li>
                            <li><NavLink to={"/codes/4037"}>Route 4037</NavLink></li>
                            <li><NavLink to={"/codes/4038"}>Route 4038</NavLink></li>
                            <li><NavLink to={"/codes/4040"}>Route 4040</NavLink></li>
                        </ul>
                    </div>
                </div>
    } else {
        contentToRender =
            <>
                <div className={"main"}>
                    <MapAddress address={searchResults}/>
                </div>
            </>
    }

    function MapAddress({address}) {

        return (
            <div>
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
            </div>

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
            {contentToRender}
        </main>
    )
}