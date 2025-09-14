import Logo from "../assets/eagle.png";
import {useNavigate} from "react-router-dom";
import logoutImg from "../assets/logout.png";

export default function Header({loggedInUser, setLoggedInUser}) {

    const navigate = useNavigate();

    function logout() {
        // Reset user and navigate back to login page
        localStorage.removeItem("jwtToken");
        setLoggedInUser(null);
        navigate("/login");
    }

    return (
        <header id={"header"}>
            <div id={"headerContent"}>
                <img id={"headerImage"} src={Logo} alt={"logo"} />
                <h3>Welcome {loggedInUser?.firstName}</h3>
                <div id={"logoutContainer"}>
                    <img id={"headerLogout"} src={logoutImg} alt={"logout"} onClick={logout}/>
                    <h4 onClick={logout}>Logout</h4>
                </div>
            </div>
        </header>
    )
}