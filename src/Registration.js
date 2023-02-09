import { useState } from "react";

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
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const processRegistration = (e) => {
        e.preventDefault();
        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registration),
        }
        setError('');
        setSuccess('');
        fetch(url, headers).then((response) => {
            if(response.ok) {
                setSuccess(`Success: Response code ${response.status}`);
            } else {
                setError(`Failure: Response Code ${response.status}`);
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
                <button type="submit">Login</button>
            </form>
            <h2 className="error">{error}</h2>
            <h2 className="success">{success}</h2>
        </div>
    )
}

export default Registration;