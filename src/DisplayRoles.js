import { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import RoleList from "./RoleList";

const url = 'http://auth.galvanizelaboratory.com/api/admin/roles'

const initialRoles = [];

const DisplayRoles = () => {
    const [authState, authDispatch] = useContext(AuthContext);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [roles, setRoles] = useState(initialRoles);

    const getRoles = () => {
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
                return initialRoles;
            }
        }).then((data) => {
            setRoles(data);
        })
    }
    
    useEffect(() => {
        if(authState.username) {
            getRoles()
        } else {
            setRoles(initialRoles)
        }

    }, [authState])

    return (
        <div className="DisplayRoles">
            <h1>Display Roles</h1>
            <RoleList roles={roles}></RoleList>

            <h2 className="error">{error}</h2>
            <h2 className="success">{success}</h2>
        </div>
    )
}

export default DisplayRoles;