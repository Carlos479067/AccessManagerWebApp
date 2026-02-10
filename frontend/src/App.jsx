import './App.css'
import Header from "./components/Header.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import RouteCodes from "./pages/RouteCodes.jsx";
import Forms from "./pages/Forms.jsx";
import RouteSplits from "./pages/RouteSplits.jsx";
import {useState} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import RouteData from "./pages/RouteData.jsx";

function App() {

    const [searchResults, setSearchResults] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(() => {
        // Looks in the browser’s storage.
        const savedUser = localStorage.getItem("loggedInUser");
        return savedUser ? JSON.parse(savedUser) : null;
    })

    function updateState(data) {
        setSearchResults(data);
    }

    function resetState() {
        setSearchResults([]);
    }

    function updateLoggedInUser(data) {
        setLoggedInUser(data);
    }

    return (
        <div className={"pageContainer"}>
            <Header searchResults={searchResults} setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser}/>
            <Navbar updateState={updateState} resetState={resetState} loggedInUser={loggedInUser}/>
            <div className={"appMain"}>
                <Routes>
                    <Route path={"/*"} element={loggedInUser ? <Navigate to={"/home"} replace={true} /> : <Login setLoggedInUser={updateLoggedInUser} />}/>
                    <Route path={"/home"} element={loggedInUser ? <Home searchResults={searchResults} loggedInUser={loggedInUser} /> : <Login setLoggedInUser={updateLoggedInUser} />}
                    />
                    <Route path={"/forms"} element={<Forms />}/>
                    <Route path={"/data/:routeNumber"} element={<RouteData />}/>
                    <Route path={"/codes/:routeNumber"} element={<RouteCodes searchResults={searchResults}/>}/>
                    <Route path={"/splits/:routeNumber"} element={<RouteSplits/>}/>
                </Routes>
            </div>
            <Footer/>
        </div>
    )
}

export default App
