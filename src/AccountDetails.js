import { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const url = 'http://auth.galvanizelaboratory.com/api/account'

const AccountDetails = () => {
    const [authState, authDispatch] = useContext(AuthContext);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [accountDetails, setAccountDetails] = useState({})
    
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
                return {};
            }
        }).then((data) => {
            setAccountDetails(data);
        })
    }
    
    useEffect(() => {
        if(authState.username) {
            getAccountDetails()
        }
    }, [authState])
    return (
        <div class="AccountDetails">
            <h1>Account Details</h1>
            {JSON.stringify(accountDetails)}
            <h2 className="error">{error}</h2>
            <h2 className="success">{success}</h2>
        </div>
    )
}

export default AccountDetails;