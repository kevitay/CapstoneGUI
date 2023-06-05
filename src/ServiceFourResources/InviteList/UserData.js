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
