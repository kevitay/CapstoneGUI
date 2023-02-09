import { useContext, useState } from "react";
import AuthContext from "./AuthContext";
import './Login.css';

const url = 'http://auth.galvanizelaboratory.com/api/auth'

const Login = () => {
    const [authState, authDispatch] = useContext(AuthContext);

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const processLogin = (e) => {
        e.preventDefault();
        const loginRequest = { username: username, password: password }
        const headers = {
            method: 'POST',
            body: JSON.stringify(loginRequest)
        }
        setError('');
        setSuccess('');
        setToken('');
        authDispatch({type: 'saveAuth', payload: {username: '', token: ''}})
        fetch(url, headers).then((response) => {
            if(response.ok) {
                setSuccess(`Success: Response code ${response.status}`);
                const authToken = response.headers.get('Authorization')
                setToken(authToken);
                authDispatch({type: 'saveAuth', payload: {username, token: authToken}})
            } else {
                setError(`Failure: Response Code ${response.status}`);
            }
        })
    }

    const usernameChange = (e) => {
        setUsername(e.target.value);
    }

    const passwordChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div className="Login">
            <form onSubmit={processLogin}>
                <label htmlFor='username'>Username</label>
                <input type="text" name='username' id='username' value={username} onChange={usernameChange}></input>
                <label htmlFor='password'>Password</label>
                <input type="password" name='password' id='password' value={password} onChange={passwordChange}></input>
                <button type="submit">Login</button>
            </form>
            <h2 className="error">{error}</h2>
            <h2 className="success">{success}</h2>
            <pre>{token}</pre>
        </div>
    )
}

export default Login;