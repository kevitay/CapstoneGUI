import React from "react";
import ParticipantsList from "./ParticipantsList/ParticipantsList";
import InviteList from "./InviteList/InviteList";
import ProfilePage from "./Profile/ProfilePage"; 

function ServiceFourApp() {
    return (
        <div className="ServiceFourApp">
            <h1>Service Four</h1>
            <ParticipantsList></ParticipantsList>
            <InviteList></InviteList>
            <ProfilePage></ProfilePage>
        </div>
    )
}

export default ServiceFourApp;