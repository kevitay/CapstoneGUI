import React from "react";

function UserData({ selectedUsers, invitee }) {

    function captureSelection(e) {
        let isChecked = e.target.checked;
        if (isChecked) {
            selectedUsers.push(e.target.id);
        } else {
            let index = selectedUsers.indexOf(e.target.id);
            if (index !== -1) {
                selectedUsers.splice(index, 1);
            }
        }
    }

    return (
        <tr className="UserData">
            <td className="profile-picture">
                <img alt="Profile Pic" src="https://placehold.co/100x100"></img>
            </td>
            <td className="user-name">
                <p> {
                    invitee.firstName + " " + invitee.lastName
                }</p>
            </td>
            <td className="city-state">
                <p> {
                    invitee.city + ", " + invitee.state
                }</p>
            </td>
            <td>
                <input onChange={(e) => captureSelection(e)} type="checkbox" id={invitee.username}></input>
            </td>
        </tr>)
}

export default UserData; 
