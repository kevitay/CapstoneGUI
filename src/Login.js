import { useContext, useState } from "react";
import AuthContext from "./contexts/AuthContext";
import HostContext from "./contexts/HostContext";
import { failedMessage, successMessage } from "./lib";
import './Login.css';

const Login = () => {
    const [, authDispatch] = useContext(AuthContext);
    const host = useContext(HostContext);

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');

    const processLogin = (e) => {
        e.preventDefault();
        const loginRequest = { username: username, password: password }
        const headers = {
            method: 'POST',
            'Content-Type': 'application/json',
            body: JSON.stringify(loginRequest),
        }
        setToken('');
        authDispatch({type: 'saveAuth', payload: {username: '', token: ''}})
        const requestUrl = host.url + '/auth';
        fetch(requestUrl, headers).then((response) => {
            if(response.ok) {
                const authToken = response.headers.get('Authorization')
                setMessage(successMessage)
                setToken(authToken);
                authDispatch({type: 'saveAuth', payload: {username, token: authToken}})
            } else {
                setMessage(failedMessage);
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
            <h1>Login</h1>
            <form onSubmit={processLogin}>
                <label htmlFor='username'>Username</label>
                <input type="text" name='username' id='username' value={username} onChange={usernameChange}></input>
                <label htmlFor='password'>Password</label>
                <input type="password" name='password' id='password' value={password} onChange={passwordChange}></input>
                <button type="submit">Login</button>
                <span>{message}</span>
            </form>
            <pre>{token}</pre>
        </div>
    )
}

export default Login;