import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import RoleListContext from "./RoleListContext";
import UserListContext from "./UserListContext";

const url = 'http://auth.galvanizelaboratory.com/api/admin'

const initialUserDetailsState = { roles: [] };

const EditUserRole = () => {
    const [authState,] = useContext(AuthContext);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
        const headers = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authState.token,
            },
        }
        setError('');
        setSuccess('');
        fetch(`${url}/users/${currentUser}`, headers).then((response) => {
            if(response.ok) {
                setSuccess(`Success: Response code ${response.status}`);
                return response.json();
            } else {
                setError(`Failure: Response Code ${response.status}`);
                return initialUserDetailsState;
            }
        }).then((data) => {
            setUserDetails(data);
            setSelectedRoles(data.roles.map(r => r.name))
        })
    }, [authState.token, currentUser])

    const putRole = (role) => {
        const headers = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authState.token,
            },
        }
        setError('');
        setSuccess('');
        fetch(`${url}/roles/${role}/${currentUser}`, headers).then((response) => {
            if(response.ok) {
                setSuccess(`Success: Response code ${response.status}`);
                return response.json();
            } else {
                setError(`Failure: Response Code ${response.status}`);
                return userDetails;
            }
        }).then((data) => {
            setUserDetails(data);
            setSelectedRoles(data.roles.map(r => r.name))
        })
    }

    const deleteRole = (role) => {
        const headers = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authState.token,
            },
        }
        setError('');
        setSuccess('');
        fetch(`${url}/roles/${role}/${currentUser}`, headers).then((response) => {
            if(response.ok) {
                setSuccess(`Success: Response code ${response.status}`);
                getUser();
            } else {
                setError(`Failure: Response Code ${response.status}`);
            }
        })
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
        <h2 className="error">{error}</h2>
        <h2 className="success">{success}</h2>
        </div>
    )
}

export default EditUserRole;