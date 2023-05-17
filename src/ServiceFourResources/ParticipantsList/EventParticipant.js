import React from "react";
import EventParticipantData from "./EventParticipantData";

function EventParticipant() {
    return (
        <div className="EventParticipant">
            <table>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Vehicle</th>
                    <th>Seats Available?</th>
                    <th>Room Booked?</th>
                </tr>
                <EventParticipantData></EventParticipantData>
            </table>
        </div>
    )
}

export default EventParticipant;