import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export default function RouteData() {

    const [routeData, setRouteData] = useState(null);
    const {routeNumber} = useParams();

    function handleData() {

        const getUrl = `${import.meta.env.VITE_API_URL}/api/data/${routeNumber}`;

        const routeObj = {
            method: "GET"
        }

        fetch(getUrl, routeObj)
            .then((response) => {
                if(!response.ok) {
                    throw new Error(`Network response error: ${response.status}`);
                }

                return response.json();
            })
            .then((data) => {
                setRouteData(data);
            })
            .catch((error) => {
            throw new Error(`There was a problem with the fetch request: ${error.message}`);
        });
    }

    function RenderData({routeDataObj}) {
        return (
            <div>
                <h3>{routeDataObj.clockInTime}</h3>
            </div>
        )
    }

    useEffect(() => {
        handleData()
    }, []);

    return (
        <main>
            {routeData && <RenderData routeDataObj={routeData}/>}
        </main>
    )
}