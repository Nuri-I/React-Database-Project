import axios from 'axios';
import {useState} from 'react'
const Login = () => {
    const [outputText, setOutputText] = useState('test') 
    const [username, setUsername] = useState('test') 
    const [password, setPassword] = useState('test') 
    // var username,password

    const updateInputUsername = (e) => {
        setUsername(e.target.value)
        console.log(username)
    };
    const updateInputPassword = (e) => {
        setPassword(e.target.value)
        console.log(password)
    };
    

    // This project was developed with WAMP, an apachi based local server where. the host for the server is 8080 
    const HandleSubmit = () => {

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
            console.log(response.data.message)
            setOutputText(response.data.message)
        })
        .catch(error => console.log("something went wrong ..." + error.data));
        };


    const LoggedIn = () => {
        if (!sessionStorage.getItem('token')){
            //TODO not logged in message
            return;
        }
        axios({
            method: 'get',
            url: 'http://localhost:8080/react-database/src/Components/Backend/authenticate.php/',
            headers : {
                'Authorization': sessionStorage.getItem('token'),
                'ConnectTo': 'HasToken.php'
            }
            
        })
        .then(response => this.setState({response})
        .catch(error => this.setState('something went wrong: ' + {error}))
        )
    }

    
    const AdminButton = () => {
        if (!sessionStorage.getItem('token')){
            //TODO not logged in message
            return;
        }
        axios({
            method: 'get',
            url: 'http://localhost:8080/react-database/src/Components/Backend/authenticate.php/',
            headers : {
                'Authorization': sessionStorage.getItem('token'),
                'ConnectTo': 'IsAdmin.php'
            }
            
        })
        // .then(response => setAlert({response})
        // .catch(error => setAlert('something went wrong: ' + {error}))
        // )
    }

    return (
        <>
        <button
        onClick={HandleSubmit}>
            "oh god please work"
        </button>
            <form>
                <label> Username:
                    <input type="text" 
                    onChange={(event) => updateInputUsername(event)}
                    />
                </label>
                
                <label> Password:
                    <input 
                    type="text" 
                    onChange={(event) => updateInputPassword(event)}
                    />
                </label>
                    <input type="Submit" 
                    onSubmit={HandleSubmit}
                    />

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
        
            <div 
            id="tempAlert">
                {outputText}
            </div>
        </>
    )
};

export default Login ;