import { useContext, useEffect, useState } from "react";
import AuthContext from "./contexts/AuthContext";
import RoleList from "./RoleList";

const url = 'http://auth.galvanizelaboratory.com/api/account'
const initialAccountState = { user: {}, roles: []}

const AccountDetails = () => {
    const [authState, authDispatch] = useContext(AuthContext);

    const [accountDetails, setAccountDetails] = useState(initialAccountState)
    
    const getAccountDetails = () => {
        const headers = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authState.token,
            },
        }
        fetch(url, headers).then((response) => {
            if(response.ok) {
                return response.json();
            } else {
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
        </div>
    )
}

export default AccountDetails;