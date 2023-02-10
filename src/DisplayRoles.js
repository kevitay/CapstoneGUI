import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "./contexts/AuthContext";
import RoleList from "./RoleList";
import RoleListContext from "./contexts/RoleListContext";
import { apiRequestWithToken } from "./lib";

const initialRoles = [];

const DisplayRoles = () => {
    const [authState, ] = useContext(AuthContext);
    const [, roleListDispatch] = useContext(RoleListContext);

    const [roles, setRoles] = useState(initialRoles);

    const getRoles = useCallback(() => {
        apiRequestWithToken('GET', 'admin/roles', authState.token, initialRoles, (data) => {
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