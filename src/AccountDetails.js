import { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import RoleList from "./RoleList";

const url = 'http://auth.galvanizelaboratory.com/api/account'
const initialAccountState = { user: {}, roles: []}

const AccountDetails = () => {
    const [authState, authDispatch] = useContext(AuthContext);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [accountDetails, setAccountDetails] = useState(initialAccountState)
    
    const getAccountDetails = () => {
        const headers = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authState.token,
            },
        }
        setError('');
        setSuccess('');
        fetch(url, headers).then((response) => {
            if(response.ok) {
                setSuccess(`Success: Response code ${response.status}`);
                return response.json();
            } else {
                setError(`Failure: Response Code ${response.status}`);
                return initialAccountState;
            }
        }).then((data) => {
            setAccountDetails(data);
        })
    }
    
    useEffect(() => {
        if(authState.username) {
            getAccountDetails()
        } else {
            setAccountDetails(initialAccountState)
        }

    }, [authState])
    return (
        <div className="AccountDetails">
            <h1>Account Details</h1>
            <ul>
                {Object.keys(accountDetails.user).map((key) => {
                    return <li key={key}>{key} - {accountDetails.user[key]}</li>;
                })}
            </ul>
            <RoleList roles={accountDetails.roles}></RoleList>
            <h2 className="error">{error}</h2>
            <h2 className="success">{success}</h2>
        </div>
    )
}

export default AccountDetails;