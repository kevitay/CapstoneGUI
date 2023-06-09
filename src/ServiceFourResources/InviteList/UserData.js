import React from "react";
import {TableRow, TableCell, Checkbox } from '@mui/material'

function UserData({ selectedUsers, invitee }) {

    function captureSelection(e) {
        let isChecked = e.target.checked;
        if (isChecked) {
            console.log(e.target.id)
            selectedUsers.push(e.target.id);
        } else {
            let index = selectedUsers.indexOf(e.target.id);
            if (index !== -1) {
                selectedUsers.splice(index, 1);
            }
        }
    }

    return (
        <TableRow className="UserData">
            <TableCell className="profile-picture">
                {invitee.profilePicture ? (
                    <img
                        src={"data:image/jpg;base64," + invitee.profilePicture}
                        height="100px"
                        width="100px"
                        alt="profile pic"
                    />
                ) : (
                    <img
                        alt="Profile Pic"
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                        height="100px"
                        width="100px"
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
