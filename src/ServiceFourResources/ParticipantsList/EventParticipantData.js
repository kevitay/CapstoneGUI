import React from "react";

function EventParticipantData({participant}) {
    return (
        <tr className="EventParticipantData">
            <td className="profile-picture">
                <img alt="Profile Picture" src="https://placehold.co/100x100"></img>
            </td>
            <td className="participant-name">
                <p>{participant.FirstName + " " + participant.LastName}</p>
            </td>
            <td className="city-state">
                <p>{participant.City + ", " + participant.State}</p>
            </td>
            <td>{participant.Status}</td>
            <td>{participant.Driving}</td>
            <td>{participant.SeatsAvailable}</td>
            <td>{participant.RoomBooked}</td>
        </tr>
    )
}

export default EventParticipantData;