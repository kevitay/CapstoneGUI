import React from "react";

function UserData({invitee}) {
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
            <input type="checkbox" id={invitee.userName}></input>
        </td>
    </tr>)
}

export default UserData; 
