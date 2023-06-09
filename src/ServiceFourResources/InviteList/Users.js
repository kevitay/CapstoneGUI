import React, { useEffect, useState } from "react";
import UserData from "./UserData";

function Users({event}) {

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
        selectedUsers.forEach(userName => {
            var raw = JSON.stringify({             
                    "eventId": event.id,
                    "messageFrom": event.creatorID,
                    "messageTo": userName,
                    "subject": event.name + ", " + event.organization,
                    "messageText": "Please respond"      
            });
    
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
    
            fetch("http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/notifications", requestOptions)
            .then(response => {
                console.log(response)
                if (response.status === 201) {
                    setSuccess("\u2705 User(s) invited successfully");
                    return response.text();
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
