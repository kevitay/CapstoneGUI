import { useState } from "react";
import { failedMessage, successMessage } from "./lib";

const initialRegistrationState = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
}

const url = 'http://auth.galvanizelaboratory.com/api/account/register'

const Registration = () => {
    const [registration, setRegistration] = useState(initialRegistrationState)
    const [message, setMessage] = useState('');

    const processRegistration = (e) => {
        e.preventDefault();
        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registration),
        }
        fetch(url, headers).then((response) => {
            if(response.ok) {
                setMessage(successMessage);
            } else {
                setMessage(failedMessage);
            }
        })
    }

    const inputUpdate = (e) => {
        setRegistration({
            ...registration,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div className="Registration">
            <form onSubmit={processRegistration}>
                {Object.keys(registration).map((key) => {
                    return (
                        <div key={key}>
                            <label htmlFor={key}>{key}</label>
                            <input type={key !== 'password' ? 'text' : 'password'}
                                   id={`registration_${key}`}
                                   name={key}
                                   value={registration[key]}
                                   onChange={inputUpdate}
                            ></input>
                        </div>
                    )
                })}
                <button type="submit">Register</button>
                <span>{message}</span>
            </form>
        </div>
    )
}

export default Registration;