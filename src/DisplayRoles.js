import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import RoleList from "./RoleList";
import RoleListContext from "./RoleListContext";

const url = 'http://auth.galvanizelaboratory.com/api/admin/roles'

const initialRoles = [];

const DisplayRoles = () => {
    const [authState, ] = useContext(AuthContext);
    const [, roleListDispatch] = useContext(RoleListContext);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [roles, setRoles] = useState(initialRoles);

    const getRoles = useCallback(() => {
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
            roleListDispatch({type: 'setRoleList', payload: data})
        })
    }, [authState.token, roleListDispatch])
    
    useEffect(() => {
        if(authState.username) {
            getRoles()
        } else {
            setRoles(initialRoles)
        }

    }, [authState, getRoles])

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