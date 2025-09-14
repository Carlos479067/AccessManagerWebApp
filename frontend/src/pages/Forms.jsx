import vacationHold from '../assets/vacationHold.jpg';
import {useState} from "react";
import checkMark from "../src/assets/check.png";

export default function Forms() {

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        email: "",
        phoneNumber: "",
        startDate: "",
        endDate: "",
        checkBoxOne: false,
        checkBoxTwo: false,
    });

    function printForm() {
        return window.print();
    }

    function renderForm() {
        return (
            <div className={"formContainer"}>
                <h2>Forms</h2>
                <div className="formTemplate">
                    <img id="vacationFormImg" src={vacationHold} alt="Vacation Form"/>
                    {/* Overlaid text */}
                    <div className="fieldName">{formData.name}</div>
                    <div className="fieldAddress">{formData.address}</div>
                    <div className="fieldEmail">{formData.email}</div>
                    <div className="fieldPhoneNumber">{formData.phoneNumber}</div>
                    <div className="fieldStartDate">{formData.startDate}</div>
                    <div className="fieldEndDate">{formData.endDate}</div>
                    {formData.checkBoxOne ?
                        <div className="fieldCheckOne"><img style={{width: "25px"}} src={checkMark} alt={"checkmark"}/>
                        </div> : ""}
                    {formData.checkBoxTwo ?
                        <div className="fieldCheckTwo"><img style={{width: "25px"}} src={checkMark} alt={"checkmark"}/>
                        </div> : ""}
                </div>
                {/* Input for the user to type */}
                <input className="nameInput" type="text" value={formData.name}
                       onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                <input className="emailInput" type="text" value={formData.email}
                       onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                <input className="phoneNumberInput" type="text" value={formData.phoneNumber}
                       onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}/>
                <input className="addressInput" type="text" value={formData.address}
                       onChange={(e) => setFormData({...formData, address: e.target.value})}/>
                <input className="startDateInput" type="text" value={formData.startDate}
                       onChange={(e) => setFormData({...formData, startDate: e.target.value})}/>
                <input className="endDateInput" type="text" value={formData.endDate}
                       onChange={(e) => setFormData({...formData, endDate: e.target.value})}/>
                <input className="checkBoxOneInput" type="checkbox" checked={formData.checkBoxOne}
                       onChange={(e) => setFormData({...formData, checkBoxOne: e.target.checked})}/>
                <input className="checkBoxTwoInput" type="checkbox" checked={formData.checkBoxTwo}
                       onChange={(e) => setFormData({...formData, checkBoxTwo: e.target.checked})}/>
                <button onClick={printForm}>Print</button>
                <div className={"formText"}>
                    <h5>Name: </h5>
                    <h5>Address: </h5>
                    <h5>Phone Number: </h5>
                    <h5>Email: </h5>
                    <h5>Start Date: </h5>
                    <h5>End Date: </h5>
                    <h5>I will pick up all accumulated mail from my local post office: </h5>
                    <h5>Please deliver all accumulated mail and resume normal delivery: </h5>
                </div>
            </div>
        )
    }


    return (
        <main>
            {renderForm()}
        </main>
    )
}