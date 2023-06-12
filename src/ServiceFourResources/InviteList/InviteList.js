import React from "react";
import Users from "./Users";

function InviteList({setCreationStep, event}) {
    
    return (
        <div className="InviteList">
            <h1>Invite Users</h1>
           <Users setCreationStep={setCreationStep}  event={event}></Users>
        </div>
    )
}

export default InviteList; 