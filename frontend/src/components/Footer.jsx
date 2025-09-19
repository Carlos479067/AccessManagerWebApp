import copyRightLogo from "../assets/copyRight.png";

export default function Footer () {

    return (
        <footer>
            <div id={"topFooter"}>
                <p style={{color: "black", alignItems: "center"}}>This Weather Sucks</p>
            </div>
            <div id={"lowFooter"}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <img style={{width: "20px"}} src={copyRightLogo} alt={"copy right logo"}/>
                    <p style={{color: "white"}}> Monster Route 4934</p>
                </div>
            </div>
        </footer>
    )
}