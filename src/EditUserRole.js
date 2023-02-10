import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "./contexts/AuthContext";
import RoleListContext from "./contexts/RoleListContext";
import UserListContext from "./contexts/UserListContext";
import { apiRequestWithToken } from "./IdentityLib";

const initialUserDetailsState = { roles: [] };

const EditUserRole = () => {
    const [authState,] = useContext(AuthContext);

    const [userListState, ] = useContext(UserListContext);
    const [roleListState, ] = useContext(RoleListContext);
    const [currentUser, setCurrentUser] = useState('');
    const [userDetails, setUserDetails] = useState(initialUserDetailsState)

    const [selectedRoles, setSelectedRoles] = useState([])

    const selectUser = (e) => {
        setCurrentUser(e.target.value);
    }

    const selectOption = (e) => {
        const newState = []
        for(let index = 0; index < e.target.length; index++) {
            if(e.target[index].selected) {
                newState.push(e.target[index].value);
            }
        }
        setSelectedRoles(newState);
    }

    const getUser = useCallback(() => {
        apiRequestWithToken('GET', 'admin/users/' + currentUser, authState.token, initialUserDetailsState, (data) => {
            setUserDetails(data);
            setSelectedRoles(data.roles.map(r => r.name))
        } )
    }, [authState.token, currentUser])

    const putRole = (role) => {
        apiRequestWithToken('PUT', `admin/roles/${role}/${currentUser}`, authState.token, userDetails, (data) => {
            setUserDetails(data);
            setSelectedRoles(data.roles.map(r => r.name))
        })
    }

    const deleteRole = (role) => {
        apiRequestWithToken('DELETE', `admin/roles/${role}/${currentUser}`, authState.token, {})
    }

    const updateRoles = (e) => {
        e.preventDefault();

        const activeRoles = userDetails.roles.map(r => r.name);
        roleListState.forEach((definedRole) => {
            if(selectedRoles.includes(definedRole) && activeRoles.includes(definedRole)) {
                // NOOP - Role already associated
            } else if(selectedRoles.includes(definedRole) && !activeRoles.includes(definedRole)) {
                // ADD ROLE
                putRole(definedRole);
            } else if(!selectedRoles.includes(definedRole) && activeRoles.includes(definedRole)) {
                // REMOVE ROLE
                deleteRole(definedRole);
            } else {
                // NOOP - Role not selected
            }
        });
    }

    useEffect(() => {
        if(currentUser) {
            getUser()
        }
    }, [currentUser, getUser])

    return (
        <div className="EditUserRole">
        <h1>Edit User Role</h1>
        <select name="currentEditUserRole" id="currentEditUserRole" onChange={selectUser}>
            <option value="">--Please choose an option--</option>
            {userListState.map((user, index) => {
                return <option key={index} value={user}>{user}</option>
            })}
        </select>

        <h2>{currentUser}</h2>

        { currentUser ? 
                <form onSubmit={updateRoles}>
                    <select
                        name="currentEditUserRoleRoles"
                        id="currentEditUserRoleRoles"
                        multiple={true}
                        value={selectedRoles}
                        onChange={selectOption}
                        >
                        {roleListState.map((role, index) => {
                            return (
                                <option
                                    key={index}
                                    value={role}
                                >{role}</option>
                            )
                        })}
                    </select>
                    <button type="submit">Update Roles</button>
                </form>
            : ''
        }
        </div>
    )
}

export default EditUserRole;