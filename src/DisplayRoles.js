import { useCallback, useContext, useEffect } from "react";
import AuthContext from "./contexts/AuthContext";
import RoleList from "./RoleList";
import RoleListContext from "./contexts/RoleListContext";
import { apiRequestWithToken } from "./IdentityLib";
import AddRole from "./AddRole";

const initialRoles = [];

const DisplayRoles = () => {
    const [authState, ] = useContext(AuthContext);
    const [roleListState, roleListDispatch] = useContext(RoleListContext);

    const getRoles = useCallback(() => {
        apiRequestWithToken('GET', 'admin/roles', authState.token, initialRoles, (data) => {
            roleListDispatch({type: 'setRoleList', payload: data})
        })
    }, [authState.token, roleListDispatch])
    
    useEffect(() => {
        if(authState.username) {
            getRoles()
        } else {
            roleListDispatch({type: 'setRoleList', payload: initialRoles})
        }

    }, [authState, getRoles, roleListDispatch])

    return (
        <div className="DisplayRoles">
            <AddRole></AddRole>
            <h1>Display Roles</h1>
            <RoleList roles={roleListState}></RoleList>
        </div>
    )
}

export default DisplayRoles;