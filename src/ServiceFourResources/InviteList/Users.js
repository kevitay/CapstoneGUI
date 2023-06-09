import React, { useState, useEffect } from "react";
import UserData from "./UserData";
import InviteNameSearch from "./inviteNameSearch";

import { Table, TableBody, TableContainer, TableRow, FormControl, TableHead, TableCell, Button, TablePagination } from '@mui/material';

function Users({eventId}) {



    const [inviteSuccess, setSuccess] = useState("")
    const [originalState, setLoadedState] = useState([]);
    const [resetStatus, setResetStatus] = useState(false);
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
                setLoadedState(result.users)
            })
            .then(setLoadState(false))
            
            .catch(error => console.log('error', error));
    }, []);


    function stateReset(e) {
        setResetStatus(!resetStatus);
        console.log(originalState);
        e.preventDefault();
        setUser(originalState);
    }

    let selectedUsers = [];



    function sendInvite(e) {
        console.log("sent")
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

                    console.log('here is the ERROR', error)
                });


            // setUsersToInvite(selectedUsers);
        });


    }


    //useEffect(() => { console.log(usersToInvite) }, [usersToInvite]);

    return (
        <div>
            <InviteNameSearch resetStatus={resetStatus} userState={userState} setUserState={setUser}></InviteNameSearch>
            <form className="invite-form" onSubmit={(e) => sendInvite(e)}>
                <FormControl >
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="Participant Invite"
                            size={"Large"}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell ><button onClick={(e) => stateReset(e)}>Clear Filters</button></TableCell>
                                    <TableCell>Invite</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Location</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    {
                                    
                                        loading ? "" : userState.map((user) => (<UserData key={user.username} selectedUsers={selectedUsers} invitee={user}></UserData>))
                                    }
                            </TableBody>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={userState.length}
                                rowsPerPage={5}
                                page={1}
                            />
                        </Table>
                    </TableContainer>
                    <Button type="submit" label="Invite">Invite</Button>
                    {inviteSuccess && <p>{inviteSuccess}</p>}
                </FormControl>
            </form>

        </div>)
}

export default Users;
