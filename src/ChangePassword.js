import { useContext, useState } from "react";
import AuthContext from "./contexts/AuthContext";
import LoggingContext from "./contexts/LoggingContext";

const initialChangePassword = {
    username: "",
    currentPassword: "",
    newPassword: ""
}

const url = 'http://auth.galvanizelaboratory.com/api/account/passwd'

const ChangePassword = () => {
    const [authState,] = useContext(AuthContext);
    const [, loggingDispatch] = useContext(LoggingContext);
    const [changePasswordDetails, setChangePasswordDetails] = useState(initialChangePassword);

    const processChangePassword = (e) => {
        e.preventDefault();
        const headers = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authState.token,
            },
            body: JSON.stringify(changePasswordDetails),
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
        setChangePasswordDetails({
            ...changePasswordDetails,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div className="ChangePassword">
            <form onSubmit={processChangePassword}>
                {Object.keys(changePasswordDetails).map((key) => {
                    return (
                        <div key={key}>
                            <label htmlFor={key}>{key}</label>
                            <input type={!key.includes('Password') ? 'text' : 'password'}
                                   id={`change_pwd_${key}`}
                                   name={key}
                                   value={changePasswordDetails[key]}
                                   onChange={inputUpdate}
                            ></input>
                        </div>
                    )
                })}
                <button type="submit">Change Password</button>
            </form>
        </div>
    )

}

export default ChangePassword;