import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import  BeforeEventOrganizer from "./beforeEventOrganizer";
import ParticipantView from "./participantView";
import Notifications from "./notifications";



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
                    <li>
                        <NavLink to={'/serviceTwo/notifications'}>Notifications</NavLink>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path={'/organizerView/*'} element={<BeforeEventOrganizer eventId={eventId} />}></Route>
                <Route path={'/participantView/*'} element={<ParticipantView eventId={eventId} />}></Route>
                <Route path={'/notifications/*'} element={<Notifications />}></Route>
            </Routes>
        </div>
    )
}


export default ServiceTwoApp;