import React from "react";
import ParticipantsList from "./ParticipantsList/ParticipantsList";
import InviteList from "./InviteList/InviteList";

function ServiceFourApp() {
    return (
        <div className="ServiceFourApp">
            <h1>Service Four</h1>
            <ParticipantsList></ParticipantsList>
            <InviteList></InviteList>
        </div>
    )
}

export default ServiceFourApp;