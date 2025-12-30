import copyRightLogo from "../assets/copyRight.png";

export default function Footer () {

    return (
        <footer>
            <div id={"topFooter"}></div>
            <div id={"lowFooter"} style={{}}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <img style={{width: "20px", paddingTop: "1px"}} src={copyRightLogo} alt={"copy right logo"}/>
                    <p style={{color: "white", paddingLeft: "6px", fontSize: "15px"}}>C.H.M</p>
                </div>
            </div>
        </footer>
    )
}