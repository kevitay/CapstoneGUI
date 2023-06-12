import React from "react";

function EventParticipantData({ participant }) {
    return (
        <tr className="EventParticipantData">
            <td className="profile-picture">
                {participant.user.profilePicture ? (
                    <img
                        src={"data:image/jpg;base64," + participant.user.profilePicture}
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
            </td>
            <td className="participant-name">
                <p>{participant.user.firstName + " " + participant.user.lastName}</p>
            </td>
            <td className="city-state">
                <p>{participant.user.city + ", " + participant.user.state}</p>
            </td>
            <td>{participant.status}</td>
            <td>{participant.carpool ? "Yes" : "No"}</td>
            <td>{participant.seatsAvail}</td>
        </tr>
    );
}

export default EventParticipantData;
