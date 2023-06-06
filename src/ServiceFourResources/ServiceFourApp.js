import React from "react";
import { useState } from "react";
import ParticipantsList from "./ParticipantsList/ParticipantsList";
import InviteList from "./InviteList/InviteList";
import ProfilePage from "./Profile/ProfilePage"; 
import EventImageNav from "./EventImages/EventImageNav";
import UserEvents from "./UserEvents/UserEvents";

function ServiceFourApp() {

    //Manually setting eventId for testing purposes...will need to be fed in through the event component
    const [eventId,] = useState(3);

    return (
        <div className="ServiceFourApp">
            <h1>Service Four</h1>
            <EventImageNav eventId={eventId}></EventImageNav>
            <UserEvents></UserEvents>
            <ParticipantsList></ParticipantsList>
            <InviteList></InviteList>
            <ProfilePage></ProfilePage>
        </div>
    )
}

export default ServiceFourApp;