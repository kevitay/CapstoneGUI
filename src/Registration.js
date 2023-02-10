import { useContext, useState } from "react";
import LoggingContext from "./contexts/LoggingContext";

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
    const [, loggingDispatch] = useContext(LoggingContext);

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
            const log = {
                type: response.ok ? 'success' : 'error',
                message: `${headers.method} ${url} - ${response.status}`
            }
            loggingDispatch({ type: 'log', payload: log })
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
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Registration;