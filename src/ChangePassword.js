import { useContext, useState } from "react";
import AuthContext from "./contexts/AuthContext";
import { apiRequestWithTokenWithData } from "./lib";

const initialChangePassword = {
    username: "",
    currentPassword: "",
    newPassword: ""
}

const ChangePassword = () => {
    const [authState,] = useContext(AuthContext);
    const [changePasswordDetails, setChangePasswordDetails] = useState(initialChangePassword);

    const processChangePassword = (e) => {
        e.preventDefault();
        const data = JSON.stringify(changePasswordDetails);
        apiRequestWithTokenWithData('PATCH', 'account/passwd', authState.token, data);
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