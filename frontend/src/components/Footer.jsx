import copyRightLogo from "../assets/copyRight.png";

export default function Footer () {

    return (
        <footer>
            <div id={"topFooter"}>
                <p style={{color: "black", alignItems: "center"}}>This Weather Sucks</p>
            </div>
            <div id={"lowFooter"}>
                <img style={{width: "20px"}} src={copyRightLogo} alt={"copy right logo"}/>
                <p>Monster Route 4934</p>
            </div>
        </footer>
    )
}