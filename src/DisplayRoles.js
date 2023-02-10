import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "./contexts/AuthContext";
import LoggingContext from "./contexts/LoggingContext";
import RoleList from "./RoleList";
import RoleListContext from "./contexts/RoleListContext";

const url = 'http://auth.galvanizelaboratory.com/api/admin/roles'

const initialRoles = [];

const DisplayRoles = () => {
    const [authState, ] = useContext(AuthContext);
    const [, loggingDispatch] = useContext(LoggingContext);
    const [, roleListDispatch] = useContext(RoleListContext);

    const [roles, setRoles] = useState(initialRoles);

    const getRoles = useCallback(() => {
        const headers = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authState.token,
            },
        }
        fetch(url, headers).then((response) => {
            const log = {
                type: response.ok ? 'success' : 'error',
                message: `${headers.method} ${url} - ${response.status}`
            }
            loggingDispatch({ type: 'log', payload: log })
            if(response.ok) {
                return response.json();
            } else {
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
        </div>
    )
}

export default DisplayRoles;