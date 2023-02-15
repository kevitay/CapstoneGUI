import React from "react";
import { Link } from "react-router-dom"
const RoleDetails = ({role}) => {
    return (
        <div className="RoleDetails">
            <ul>
                <li>
                    Name - <Link to={`/displayRoles/${role.name}`}>{role.name}</Link>
                </li>
                <li>
                    Description - {role.description}
                </li>
            </ul>
        </div>
    )
}

export default RoleDetails;