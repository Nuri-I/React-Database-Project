import React, { useState } from "react";
import axios from 'axios';
const ChangePass = () => {

    const [email,setEmail] = useState("");
    const [newPass,setNewPass] = useState("");
    const [alert,setAlert] = useState();

    const updateInputPassword = (e) => {
        setNewPass(e.target.value);
    };
    const updateInputEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            
            method: 'post',
            url: 'http://localhost:8080/react-database/src/Components/Backend/ForgotPassword.php/',
            data: {
                'email': email,
                'newPass': newPass
            }
        })
            .then(response => {
                setAlert(response.data)
            })
            .catch(error => console.log("something went wrong ..." + error.data));
    };


    return (
        <>

        <form onSubmit={(event) => event.preventDefault()}>
            <label 
            htmlFor="email">
                Email:
            </label>               
            <input 
            type="text" 
            id="email"
            onChange={updateInputEmail}/>
            <br/>
            <br/>
            <label htmlFor="newpass">
                New Password:
            </label>
            <input 
            type="text" 
            id="newpass"
            onChange={updateInputPassword}/>
            <br/>
            <br/>
            <input 
            type="submit" 
            value="Change Password" 
            onClick={handleSubmit}/>
        </form>
{/* a real progrm would use an entirely different page with an account spesific authorization code sent through the email to change password*/}
        <div>
        {alert}
        </div>
        </>
    )
};

export default ChangePass ;