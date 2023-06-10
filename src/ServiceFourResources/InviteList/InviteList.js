import React from "react";
import Users from "./Users";

function InviteList({event}) {
    
    return (
        <div className="InviteList">
            <h1>Invite Users</h1>
           <Users event={event}></Users>
        </div>
    )
}

export default InviteList; 