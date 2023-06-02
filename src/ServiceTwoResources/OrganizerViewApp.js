import React from "react";
import BeforeEvent from "./beforeEvent";
import userEvent from "@testing-library/user-event";

function OrganizerViewApp({ eventId, user }) {

    return (
        <div className="OrganizerView">
            <h1>Organizer View</h1>
            <p>Event ID: {eventId}</p>
            <BeforeEvent eventId={eventId} />
        </div>
    )
}

export default OrganizerViewApp;