import axios from 'axios';

const Login = () => {

    var Username;
    var Password;
    const updateInputUsername = (e) => {
        Username = (e.target.value)
        console.log(Username)
    };
    const updateInputPassword = (e) => {
        Password = (e.target.value)
        console.log(Password)
    };
    
    const HandleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: 'get',
            url: 'http://localhost:8080/react-database/src/Components/Backend/Login.php/'
        })
        .then(response => console.log(response.data))
        .catch(error => console.log(error.data));
        };

// This project was developed with WAMP local server where the host is 8080 instead of 80

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
            <div id="tempAlert" />
        
        </>
    )
};

export default Login ;