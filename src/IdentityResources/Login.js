import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import HostContext from "../contexts/HostContext";
import { failedMessage, successMessage } from "./IdentityLib";
import './Login.css';

const Login = () => {
    const [, authDispatch] = useContext(AuthContext);
    const host = useContext(HostContext);

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('');

    const processLogin = (e) => {
        e.preventDefault();
        const loginRequest = { username: username, password: password }
        const headers = {
            method: 'POST',
            'Content-Type': 'application/json',
            body: JSON.stringify(loginRequest),
        }
        authDispatch({type: 'saveAuth', payload: {username: '', token: ''}})
        const requestUrl = host.url + '/auth';
        fetch(requestUrl, headers).then((response) => {
            if(response.ok) {
                const authToken = response.headers.get('Authorization')
                setMessage(successMessage);
                authDispatch({type: 'saveAuth', payload: {username, token: authToken}});
                setUsername('');
                setPassword('');
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
                <label>Username
                    <input type="text" name='username' id='username' value={username} onChange={usernameChange}></input>
                </label>
                <label>Password
                    <input type="password" name='password' id='password' value={password} onChange={passwordChange}></input>
                </label>
                <button type="submit">Login</button>
                <span>{message}</span>
            </form>
        </div>
    )
}

export default Login;