import React from "react";
import './EventParticipant.css';
import EventParticipantData from "./EventParticipantData";




function EventParticipant({ userData }) {
    return (
        <div className="EventParticipant">
            <table className="participant-data-table">
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Driving?</th>
                    <th>Seats Available?</th>
                    <th>Room Booked?</th>
                </tr>
                {userData.map((user) => (<EventParticipantData participant={user}/>))}
            </table>
        </div>
    )
}

export default EventParticipant;