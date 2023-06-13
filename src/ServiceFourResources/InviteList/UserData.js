import React from "react";
import {TableRow, TableCell, Checkbox } from '@mui/material'

function UserData({ selectedUsers, invitee, setInvite}) {

    function captureSelection(e) {
        let isChecked = e.target.checked;
        if (isChecked) {
            // selectedUsers.push(e.target.id);
            setInvite([...selectedUsers, e.target.id])
        } else {
            let list = selectedUsers
            let index = list.indexOf(e.target.id);
            if (index !== -1) {
                list.splice(index, 1);
                setInvite(list)
            }

        }
    }

    return (
        <TableRow className="UserData">
            <TableCell className="profile-picture">
                {invitee.profilePicture ? (
                    <img
                        src={"data:image/jpg;base64," + invitee.profilePicture}
                        height="50px"
                        width="50px"
                        alt="profile pic"
                    />
                ) : (
                    <img
                        alt="Profile Pic"
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                        height="50px"
                        width="50px"
                    />
                )}

            </TableCell>
            <TableCell>
                <Checkbox onChange={(e) => captureSelection(e)} type="checkbox" id={invitee.username}></Checkbox>
            </TableCell>
            <TableCell className="user-name">
                <p> {
                    invitee.firstName + " " + invitee.lastName
                }</p>
            </TableCell>
            <TableCell className="city-state">
                <p> {
                    invitee.city + ", " + invitee.state
                }</p>
            </TableCell>

        </TableRow>)
}

export default UserData; 
