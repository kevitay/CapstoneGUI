import React, { useEffect, useState } from "react";
import Users from "./Users";

function InviteList({eventId}) {
    const [userState, setUser] = useState([]);
    const [loading, setLoadState] = useState(false);

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        setLoadState(true);
        fetch("http://a53e50bf576c64141b52293976658417-1117441751.us-west-2.elb.amazonaws.com/api/users", requestOptions)
            .then(response => response.json())
            .then(result => {
                setUser(result.users)
            })
            .then(setLoadState(false))
            .catch(error => console.log('error', error));
    }, []);
    return (
        <div className="InviteList">
            <h1>Invite Users</h1>
            {loading ? "" :<Users eventId={eventId} userState={userState} setUser={setUser}></Users>}
        </div>
    )
}

export default InviteList; 