import React from "react";
import Users from "./Users";

function InviteList({eventId}) {
    
    return (
        <div className="InviteList">
            <h1>Invite Users</h1>
           <Users eventId={eventId}></Users>
        </div>
    )
}

export default InviteList; 