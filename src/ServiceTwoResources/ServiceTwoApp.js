import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import OrganizerViewApp from "./OrganizerViewApp";
import ParticipantView from "./participantView";



function ServiceTwoApp(eventId) {
    eventId = 2;

    return (
        <div className="ServiceTwoApp">
            <h1>Service Two</h1>
            <nav>
                <ul>
                    <li>
                        <NavLink to={'/serviceTwo/organizerView'}>Organizer View</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/serviceTwo/participantView'}>Participant View</NavLink>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path={'/organizerView/*'} element={<OrganizerViewApp eventId={eventId} />}></Route>
                <Route path={'/participantView/*'} element={<ParticipantView eventId={eventId} />}></Route>
            </Routes>
        </div>
    )
}


export default ServiceTwoApp;