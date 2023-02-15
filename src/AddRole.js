import React, { useContext, useState } from "react";
import AuthContext from "./contexts/AuthContext";
import RoleListContext from "./contexts/RoleListContext";
import { apiRequestWithTokenWithData } from "./IdentityLib";

const AddRole = () => {
    const [authState,] = useContext(AuthContext);
    const [, roleListDispatch] = useContext(RoleListContext);
    const [role, setRole] = useState({
        "name": "",
        "description": ""
      })

    const saveRole = (e) => {
        e.preventDefault();
        const resource = "admin/roles";
        apiRequestWithTokenWithData("POST", resource, authState.token, JSON.stringify(role), {}, (data) => {
            const action = {
                type: 'addRoleToList',
                payload: data,
            }
            roleListDispatch(action)
        })
    }

    const inputChange = (e) => {
        const value = e.target.value;
        const roleKey = e.target.name;
        const copyOfRole = {...role};
        copyOfRole[roleKey] = value;
        setRole(copyOfRole);
    }

    return (
        <div className="AddRole">
            <h1>Add Role</h1>
            <form onSubmit={saveRole}>
                Name:
                <input name="name" value={role.name} onChange={inputChange} />
                Description:
                <input name="description" value={role.description} onChange={inputChange} />
                <button type="submit">Save Role</button>
            </form>
        </div>
    )
}

export default AddRole;