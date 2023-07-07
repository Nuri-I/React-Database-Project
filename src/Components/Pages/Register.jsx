import axios from 'axios';
import {useState} from 'react';
const Register = () => {
const [username,setUsername] = useState("")
const [password,setPassword] = useState("")
const [email,setEmail] = useState("")
const [alert, setAlert] = useState("")

const updateInputUsername = (e) => {
    setUsername(e.target.value);
}

const updateInputEmail = (e) => {
    setEmail(e.target.value);
}

const updateInputPassword = (e) => {
    setPassword(e.target.value);
}

    const HandleSubmit = (e) => {
        if (!/\S+@\S+\.\S+/.test(email)){
            setAlert("the email is invalid")
            return;
        }
        e.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:8080/react-database/src/Components/Backend/register.php/',
            data: {
                'email' : email,
                'username': username,
                'password': password
            }
        })
            .then(response => {
                setAlert(response.data);
                })
            .catch(error => console.log("something went wrong ..." + error.data));
    };
    return (
        <>
    <form>
        Register: 
            <br />
        <label 
        htmlFor='username'>
            username: 
        </label>
            <input 
            type="text" 
            id='username' 
            onChange={updateInputUsername}/>

            <br />
            <br />
        <label 
        htmlFor='email'>
            email:
        </label>
            <input 
            type="text" 
            id='email' 
            onChange={updateInputEmail}/>
        
            <br />
            <br />
        <label 
        htmlFor='password'>
            password: 
        </label>
            <input 
            type="text" 
            id='password' 
            onChange={updateInputPassword}/>

    </form>
        <br />
        <button
        onClick={HandleSubmit}>
            Register
        </button>
        <br />
        <br />
        <span>{alert}</span>
        </>
    )
};

export default Register ;