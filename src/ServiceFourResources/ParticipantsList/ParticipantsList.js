import React from "react";
import EventParticipant from "./EventParticipant";
import EventFilter from "./EventFilter";

function PartipantsList() {
    return (
        <div className="ParticipantsList">
            <h1>Participants List</h1>
            <EventFilter></EventFilter>
            <EventParticipant></EventParticipant>
        </div>
    )
}

export default PartipantsList;