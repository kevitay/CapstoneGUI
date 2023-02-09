import { useContext, useState } from "react";
import AuthContext from "./AuthContext";

const initialChangePassword = {
    username: "",
    currentPassword: "",
    newPassword: ""
}

const url = 'http://auth.galvanizelaboratory.com/api/account/passwd'

const ChangePassword = () => {
    const [authState, authDispatch] = useContext(AuthContext);
    const [changePasswordDetails, setChangePasswordDetails] = useState(initialChangePassword);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
            <h2 className="error">{error}</h2>
            <h2 className="success">{success}</h2>
        </div>
    )

}

export default ChangePassword;