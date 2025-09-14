import Logo from "../assets/eagle.png";

export default function Header() {

    return (
        <header id={"header"}>
            <div id={"headerContent"}>
                <img id={"headerImage"} src={Logo} alt={"logo"} />
                <h3>Welcome</h3>
            </div>
        </header>
    )
}