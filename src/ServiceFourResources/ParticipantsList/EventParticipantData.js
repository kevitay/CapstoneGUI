import React from "react";

function EventParticipantData({participant}) {
    return (
        <tr className="EventParticipantData">
            <td className="profile-picture">
                <img alt="Profile Pic" src="https://placehold.co/100x100"></img>
            </td>
            <td className="participant-name">
                <p>{participant.user.firstName + " " + participant.user.lastName}</p>
            </td>
            <td className="city-state">
                <p>{participant.user.city + ", " + participant.user.state}</p>
            </td>
            <td>{participant.status}</td>
            <td>{participant.carpool ? "Yes": "No"}</td>
            <td>{participant.seatsAvail}</td>
        </tr>
    )
}

export default EventParticipantData;