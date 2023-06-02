import React from "react"; 
import Users from "./Users";

function InviteList() {
    var Event_ID = 1
    return (
        <div className="InviteList">
            <h1>Invite Users</h1>
            <Users eventID={Event_ID}></Users>
        </div>
    )
}

export default InviteList; 