import React from "react";

function EventParticipantData() {
    return (
        <tr className="EventParticipantData">
            <td className="profile-picture">
                <img alt="Profile Picture" src="https://placehold.co/100x100"></img>
            </td>
            <td className="partipant-name">
                <p>John Doe</p>
            </td>
            <td className="city-state">
                <p>Nowhere, Illinois</p>
            </td>
            <td>Going</td>
            <td>Driving</td>
            <td>2</td>
            <td>Yes</td>
        </tr>
    )
}

export default EventParticipantData;