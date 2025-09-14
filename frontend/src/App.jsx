import './App.css'
import Header from "./components/Header.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import RouteCodes from "./pages/RouteCodes.jsx";
import Forms from "./pages/Forms.jsx";
import RouteSplits from "./pages/RouteSplits.jsx";
import {useState} from "react";
import {Route, Routes} from "react-router-dom";

function App() {

    const [searchResults, setSearchResults] = useState("");
    function updateState(data) {
        setSearchResults(data);
    }

    function resetState() {
        setSearchResults([]);
    }

    return (
        <div className={"pageContainer"}>
            <Header searchResults={searchResults}/>
            <Navbar updateState={updateState} resetState={resetState}/>
            <main className={"appMain"}>
                <Routes>
                    <Route path={"/"} element={<Home searchResults={searchResults}/>}/>
                    <Route path={"/forms"} element={<Forms />}/>
                    <Route path={"/codes/:routeNumber"} element={<RouteCodes/>}/>
                    <Route path={"/splits/:routeNumber"} element={<RouteSplits/>}/>
                </Routes>
            </main>
            <Footer/>
        </div>
    )
}

export default App
