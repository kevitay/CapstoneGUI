import React, { useEffect, useState } from "react";
import './InviteList.css';
import UserData from "./UserData";

function Users({ eventId }) {

    const [userState, setUser] = useState([]);
    const [loading, setLoadState] = useState(false);
    const [inviteSuccess, setSuccess] = useState("")
    // const [usersToInvite, setUsersToInvite] = useState([]);

    let selectedUsers = [];

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

    function sendInvite(e) {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        selectedUsers.forEach(element => {
            var raw = JSON.stringify({
                "eventId": eventId,
                "user": {
                    "username": element,
                }
            });
    
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
    
            fetch("http://a53e50bf576c64141b52293976658417-1117441751.us-west-2.elb.amazonaws.com/api/participants", requestOptions)
            .then(response => {
                if (response.ok) {
                    setSuccess("\u2705 User(s) invited successfully");
                    return response.text();
                } else if (response.status === 409) {
                    setSuccess("\u274C User(s) has already been invited to this event")
                    throw new Error("Conflict: User already invited");
                } else {
                    setSuccess("\u274C User(s) invite failed")
                    throw new Error("Failed to invite users");
                }
            })
                .then(result => console.log(result))
                .catch(error => {
                    
                    console.log('here is the ERROR', error)});
        

            // setUsersToInvite(selectedUsers);
        });
        

    }

    //useEffect(() => { console.log(usersToInvite) }, [usersToInvite]);

    return (
        <div className="Users">
            <form className="invite-form" onSubmit={(e) => sendInvite(e)}>
                <table className="user-data-table">
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Invite?</th>
                    </tr>
                    {
                        loading ? "" : userState.map((user) => (<UserData selectedUsers={selectedUsers} invitee={user}></UserData>))
                    } </table>
                <input type="submit" value="Invite"></input>
                {inviteSuccess && <p>{inviteSuccess}</p>}
            </form>
        </div>)
}

export default Users;
