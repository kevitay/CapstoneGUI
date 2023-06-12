import React from "react";
import Users from "./Users";

function InviteList({setCreationStep, event, editMode}) {
    
    return (
        <div className="InviteList">
            <h1>Invite Users</h1>
           <Users editMode={editMode} setCreationStep={setCreationStep}  event={event}></Users>
        </div>
    )
}

export default InviteList; 