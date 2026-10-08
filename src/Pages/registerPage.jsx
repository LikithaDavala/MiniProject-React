import { useEffect, useState } from "react";
function RegisterPage() {
    const [name, inputName] = useState("");
    const [phone, inputPhone] = useState("");
    const [email, inputEmail] = useState("");
    const [errorName, inputNameError] = useState("");
    const [errorPhone, inputPhoneError] = useState("");
    const [errorEmail, inputEmailError] = useState("");
    const [studentData, setStudentData] = useState([]);
    const [studentCount, setStudentCount] = useState(0);
    const [editClicked, setEditButton] = useState(false);
    const [updateId, setUpdateId] = useState("");
    const [finalMassage, setFinalMassage] = useState("");



    //Save the Call:
    async function Submit(e) {
        e.preventDefault(); //it should stay in same page

        const response = await fetch("https://api.elurucoders.online/api/students", {

            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                phone: phone,
                email: email
            })
        });

        const data = await response.json();
        setFinalMassage(data.message)
        console.log(data);
        console.log(name);
        console.log(phone);
        console.log(email);
        inputName(""); //After Saving the data the input box get empty
        inputPhone("");
        inputEmail("");
    };

    //Get api call for the all Student data
    const getData = async () => {
        const response = await fetch("https://api.elurucoders.online/api/students");
        const result = await response?.json();
        setStudentData(result?.data);
        setStudentCount(result?.count);
        console.log(result?.data);
    };

    useEffect(() => {
        getData();
    }, []);

    //get api call for the student individual data

    const handleEdit = async (studentId) => {
        console.log("studentID :", studentId);
        try {
            const response = await fetch(`https://api.elurucoders.online/api/students/${studentId}`);
            const jsonResult = await response.json();
            console.log("Result :", jsonResult.data);
            setEditButton(true);
            inputName(jsonResult.data.name);
            inputPhone(jsonResult.data.phone);
            inputEmail(jsonResult.data.email);
            setUpdateId(jsonResult.data._id);
        } catch (error) {
            console.log("Error fetching single student:", error);
        }
    };


    const Delete = async (studentId) => {
        try {
            const response = await fetch(`https://api.elurucoders.online/api/students/${studentId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },

            });
            const result = await response.json();
            getData();
            setFinalMassage(result.message)
        } catch (error) {
            console.log("Error fetching single student:", error);
        }
    }

    async function Update() {
        const response = await fetch(`https://api.elurucoders.online/api/students/${updateId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                phone: phone,
                email: email,
            }),
        });
        const data = await response.json();
        setStudentCount(data.message)
         setFinalMassage(data.message)
        getData();
    };



    function NameError() {
        name === "" ? inputNameError(true) : inputNameError(false);
    };

    function PhoneError() {
        phone === "" ? inputPhoneError(true) : inputNameError(false);
    };

    function EmailError() {
        email === "" ? inputEmailError(true) : inputEmailError(false);
    };


    return (
        <div>
            {finalMassage}
            <form onSubmit={Submit}>
                <h1>Registration Form:</h1>
                <label>Full Name:    <span style={{ color: name === "" ? "red" : "black" }}>*</span></label>
                <input
                    value={name}
                    type="text"
                    placeholder="Enter your Full Name"
                    onChange={(e) => inputName(e.target.value)} required
                    onBlur={NameError}
                />

                {(errorName && name == "") && (
                    <p style={{ color: "red" }}>
                        {"name is required"}
                    </p>
                )}
                <label>Phone Number: <span style={{ color: phone === "" ? "red" : "black" }}>*</span></label>
                <input
                    value={phone}
                    type="number"
                    placeholder="Enter your Phone Number"
                    onChange={(e) => inputPhone(e.target.value)} required
                    onBlur={PhoneError}
                />

                {(errorPhone && phone == "") && (
                    <p style={{ color: "red" }}>
                        {"Number is Required"}
                    </p>
                )}

                <label>Email: <span style={{ color: email === "" ? "red" : "black" }}>*</span></label>
                <input
                    value={email}
                    type="email"
                    placeholder="Enter your Email"
                    onChange={(e) => inputEmail(e.target.value)} required
                    onBlur={EmailError}
                />

                {(errorEmail && email == "") && (
                    <p style={{ color: "red" }}>
                        {"Email is Required"}
                    </p>
                )}
                <div>
                    {editClicked ?
                        <button type='button' onClick={Update} disabled={!name || !phone || !email}>Update</button>
                        :
                        <button id="btnSubmit" type="submit" disabled={!name || !phone || !email}>Submit</button>
                    }
                </div>

                
                <p>List of Students Data Count is {studentCount}</p>
            </form>

            <h1>Student Data:</h1>
            <table border={2}>
                <thead>
                    <tr>
                        <th>S.NO</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {studentData?.map((student, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.phone}</td>
                            <td>{student.email}</td>
                            <td>
                                <button onClick={() => handleEdit(student?._id)}>Edit</button>
                                <button onClick={() => Delete(student?._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}
export default RegisterPage;