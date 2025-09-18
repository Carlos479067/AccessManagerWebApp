import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Login({setLoggedInUser}) {

    const [loginError, setLoginError] = useState("");
    const [loginSuccess, setLoginSuccess] = useState("");
    const [inputEin, setInputEin] = useState("");

    const navigate = useNavigate();

    function handleEin(data) {
        setInputEin(data.target.value);
        setLoginError("");
    }

    function handleLogin(event) {
        event.preventDefault();

        const cleanEin = inputEin.trim();

        const getUrl = `${import.meta.env.VITE_API_URL}/api/login`;

        const loginObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                authorizedEin: cleanEin
            })
        };

        fetch(getUrl, loginObj)
            .then((response) => {
                if(!response.ok) {
                    throw new Error("Unauthorized EIN");
                }
                return response.json();
            })
            .then((data) => {
                setLoggedInUser(data);
                // Saves the user in the browser’s persistent storage
                localStorage.setItem("loggedInUser", JSON.stringify(data));
                setLoginSuccess("Successful Login");
                setTimeout(() => {
                    navigate("/home");
                }, 1000);
            })
            .catch((error) => {
                setLoginError(error.message);
        })
    }



    return (
        <main>
            <div className={"loginContainer"}>
                <form onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <div className={"loginDiv"}>
                        <label className={"loginLabel"}>EIN: </label>
                        <input className={"loginInput"} onChange={handleEin} type={"text"}/>
                    </div>
                    <p className={loginError ? "errorMsg" : "successMsg"}>{loginError ? loginError : loginSuccess}</p>
                    <button className={"loginBtn"} type={"submit"}>Login</button>
                </form>
            </div>
        </main>
    )
}