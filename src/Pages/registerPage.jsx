import { useState } from "react";
function RegisterPage() {
    const [name, inputName] = useState("");
    const [phone, inputPhone] = useState("");
    const [email, inputEmail] = useState("");
    const [errorName, inputNameError] = useState("");
     const [errorPhone, inputPhoneError] = useState("");
      const [errorEmail, inputEmailError] = useState("");
    const [outputDisplay, inputDisplay] = useState("");
    async function Submit(e) {
        e.preventDefault(); //it should stay in same page

        const response = await fetch("https://api.elurucoders.online/api/students" , {

        method:'POST',
        headers : {
            'content-Type' : 'application/json'
        },
        body: JSON.stringify({
        name:name,
        phone:phone,
        email:email
        })
        });

        const data =await response.json();
        inputDisplay(data.message)
        console.log(data);
        console.log(name);
        console.log(phone);
        console.log(email);
        inputName("");
        inputPhone("");
        inputEmail("");
    };

    function NameError() {
        name === "" ? inputNameError(true) : inputNameError(false);
    };

    function PhoneError(){
        phone === "" ? inputPhoneError(true) : inputNameError(false);
    };

        function EmailError(){
        email === "" ? inputEmailError(true) : inputEmailError(false);
    };
    
    
    return (
        <div>
            <form onSubmit={Submit}>
                <label>Full Name:    <span style={{ color: name === "" ? "red" : "black" }}>*</span></label>
                <input
                    value={name}
                    type="text"
                    placeholder="Enter your Full Name"
                    onChange={(e) => inputName(e.target.value)} required
                    onBlur={NameError}
                />

                {(errorName && name=="") && (
                    <p style={{ color: "red" }}>
                        {"name is required"}
                    </p>
                )}
                <label>Phone Number: <span style={{ color: phone === "" ? "red" : "black" }}>*</span></label>
                <input
                    value={phone}
                    type="number"
                    placeholder="Enter your Phone Number"
                    onChange={(e) => inputPhone(e.target.value)}
                    onBlur={PhoneError}
                    />

                {(errorPhone && phone == "") && (
                    <p style={{color : "red"}}>
                        {"Number is Required"}
                    </p>
                )}

                <label>Email: <span style={{ color: email === "" ? "red" : "black" }}>*</span></label>
                <input
                    value={email}
                    type="email"
                    placeholder="Enter your Email"
                    onChange={(e) => inputEmail(e.target.value)} 
                          onBlur={EmailError}
                    />

                {(errorEmail && email == "") && (
                    <p style={{color : "red"}}>
                        {"Email is Required"}
                    </p>
                )}
                <div> <button id="btnSubmit" disabled={!name || !phone ||!email}> Submit </button> </div>
                {outputDisplay}
            </form>
        </div>
    )
}
export default RegisterPage;