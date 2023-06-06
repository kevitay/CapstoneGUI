import React from "react";
import ParticipantsList from "./ParticipantsList/ParticipantsList";
import InviteList from "./InviteList/InviteList";
import ProfilePage from "./Profile/ProfilePage"; 
import EventImageNav from "./EventImages/EventImageNav";

function ServiceFourApp() {
    return (
        <div className="ServiceFourApp">
            <h1>Service Four</h1>
            <EventImageNav></EventImageNav>
            <ParticipantsList></ParticipantsList>
            <InviteList></InviteList>
            <ProfilePage></ProfilePage>
        </div>
    )
}

export default ServiceFourApp;