import axios from 'axios';
import { useState, useEffect} from 'react'
import './login.css'
import {Link} from 'react-router-dom'
const Login = () => {



    const [outputText, setOutputText] = useState('please enter your credentials to log in (use ADMİN and 1 for tests)')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [formVisibility,setFormVisibility] = useState('')
    const [logoutVisibility,setLogoutVisibility] = useState('invisible')

    useEffect(() => {
        if(sessionStorage.getItem('token') !== "undefined" && sessionStorage.getItem('token') !== null) {
            setLogoutVisibility('');
            setFormVisibility('invisible');   
        };
    });

    const updateInputUsername = (e) => {
        setUsername(e.target.value)
    };
    const updateInputPassword = (e) => {
        setPassword(e.target.value)
    };


    // This project was developed with WAMP, an apachi based local server where. the host for the server is 8080 
    const HandleSubmit = (e) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:8080/react-database/src/Components/Backend/Login.php/',
            data: {
                'username': username,
                'password': password
            }
        })
            .then(response => {

                sessionStorage.setItem('token', response.data.token)
                if (sessionStorage.getItem('token') !== "undefined" && sessionStorage.getItem('token') !== null){
                    sessionStorage.setItem('loggedUser', username)
                    setFormVisibility('invisible')
                    setLogoutVisibility('')

                }
                setOutputText(response.data.message)
            })
            .catch(error => console.log("something went wrong ..." + error.data));
    };


    const LoggedIn = () => {
        if (sessionStorage.getItem('token') === "undefined" || sessionStorage.getItem('token') == null) {
            setOutputText("You haven't logged in")
            return;
        }
        axios({
            method: 'get',
            url: 'http://localhost:8080/react-database/src/Components/Backend/authenticate.php/',
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'ConnectTo': 'HasToken.php'
            }

        })
            .then(response => setOutputText(response.data))
            .catch(error => setOutputText('something went wrong: ' + { error })
            )
    }

    const DeleteStorage = () => {
        sessionStorage.removeItem('token')
    }
    const AdminButton = () => {
        if (sessionStorage.getItem('token') === "undefined" || sessionStorage.getItem('token') == null) {
            setOutputText("You haven't logged in")
            return;
        };
        axios({
            method: 'get',
            url: 'http://localhost:8080/react-database/src/Components/Backend/authenticate.php/',
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'ConnectTo': 'IsAdmin.php'
            }

        })
        .then(response => setOutputText(response.data))
        .catch(error => setOutputText('something went wrong: ' + { error })
    )
    }
    const Logout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        setFormVisibility("")
        setLogoutVisibility("invisible")
    }
    const InvalidToken = () => {
        sessionStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImludmFsaWQiLCJwYXNzIjoiaW52YWxpZCIsImlkIjoiaW52YWxpZCJ9.AQY-KURwgq68K1iqqoVcS_uPto5YkdA2lVs0zHIGDTM")
    };

    


    return (
        <>
            <div
            className= {logoutVisibility}>
            <button
            onClick={Logout}
            >log out</button>
            <br />
            <br />
            </div>
            <form
            className= {`${formVisibility} a`}
            onSubmit={(event) => event.preventDefault()}
            >
                <label> Username:
                    <input type="text"
                        onChange={(event) => updateInputUsername(event)}
                        value={username}
                    />
                </label>
            
                <label> Password:
                    <input
                        type="text"
                        onChange={(event) => updateInputPassword(event)}
                        value={password}
                    />
                </label>
                <input
                    type="submit"
                    onClick={(event) => HandleSubmit(event)}
                    value={"Login"}
                />
                <br />
                <br />
    </form>

            <button
                onClick={LoggedIn}
            >
                Do thing that only works if you are logged in (have a valid token)
            </button>
            <button
                onClick={AdminButton}
            >
                do thing that only admin can do (have a token with username 'ADMIN')
            </button>
            <button
                onClick={InvalidToken}>
                    give invalid token (for testing)
            </button>


            <div
                id="tempAlert">
                {outputText}
            </div>
            <button
                onClick={DeleteStorage}>Delete token</button>

            <Link to="/register">go to register hopefully</Link>
        </>
    )
};

export default Login;