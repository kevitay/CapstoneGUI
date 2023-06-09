import React from "react";
import BeforeEvent from "./beforeEvent";
import AuthContext from '../IdentityResources/Contexts/AuthContext';
import { useContext } from "react";

function OrganizerViewApp({ eventId }) {
    const [authState,] = useContext(AuthContext);
    const username = authState.username;

    return (
        <div className="OrganizerView">
            <h1>Organizer View</h1>
            <p>Event ID: {eventId}</p>
            {/* need to check if user is organizer/creator */}
            <BeforeEvent eventId={eventId} />
        </div>
    )
}

export default OrganizerViewApp;