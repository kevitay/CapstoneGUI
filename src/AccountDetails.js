import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "./contexts/AuthContext";
import HostContext from "./contexts/HostContext";
import RoleList from "./Roles/RoleList";

const initialAccountState = { user: {}, roles: []}

const AccountDetails = () => {
    const [authState, ] = useContext(AuthContext);
    const host = useContext(HostContext);

    const [accountDetails, setAccountDetails] = useState(initialAccountState)
    
    const getAccountDetails = useCallback(() => {
        const headers = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authState.token,
            },
        }
        fetch(`${host.url}/account`, headers).then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                return initialAccountState;
            }
        }).then((data) => {
            setAccountDetails(data);
        })
    }, [authState.token, host.url])
    
    useEffect(() => {
        if(authState.username) {
            getAccountDetails()
        } else {
            setAccountDetails(initialAccountState)
        }

    }, [authState, getAccountDetails])
    return (
        <div className="AccountDetails">
            <h1>Account Details</h1>
            <ul>
                {Object.keys(accountDetails.user).map((key) => {
                    return <li key={key}>{key} - {accountDetails.user[key]}</li>;
                })}
            </ul>
            <RoleList roles={accountDetails.roles}></RoleList>
        </div>
    )
}

export default AccountDetails;