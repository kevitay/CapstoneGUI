import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../IdentityResources/Contexts/AuthContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

const Notifications = () => {
    const notificationsUrl = "http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/notifications";
    const participantUrl = "http://a53e50bf576c64141b52293976658417-1117441751.us-west-2.elb.amazonaws.com/api/participants";
    const [notifications, setNotifications] = useState([]);
    const [authState,] = useContext(AuthContext);
    const username = authState.username;
    const navigate = useNavigate();

    const getNotificationsByUserName = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(notificationsUrl + "?userName=" + username, requestOptions)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return {};
                }
            })
            .then(result => {
                setNotifications(result.notifications);
            })
            .catch(error => console.log('error', error));
    };

    const sendResponse = (e) => {
        e.preventDefault();
        if (e.target.elements.response.value === "Not Going") {
            deleteNotification(e.target.elements.msgId.value);
            alert("You responded you are Not Going. \n\nNotification has been removed.");
        } else {
            addParticipant(e.target.elements.msgId.value, e.target.elements.eventId.value, e.target.elements.response.value, username);
        }
    };

    const deleteNotification = (msgId) => {
        console.log("Deleting message", msgId);
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        fetch(notificationsUrl + "/" + msgId, requestOptions)
            .then(response => {
                if (response.ok) {
                    console.log('Notification has been removed', msgId);
                } else {
                    alert("Notification remove failed.");
                    throw new Error('Removed failed', msgId);
                }
                getNotificationsByUserName();
            })
            .catch(error => console.log('error', error));
    };

    const addParticipant = (msgId, eventId, status, user) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "eventId": eventId,
            "status": status,
            "user": { "username": user }
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(participantUrl, requestOptions)
            .then(response => {
                if (response.status === 409) {
                    deleteNotification(msgId);
                    //user already invited
                    alert("You have already responded to this event invite. \n\nNotification has been removed.");
                    throw new Error("User already invited.");
                } else if (response.ok) {
                    deleteNotification(msgId);
                    alert("You responded that you are " + status + ".\n\nNotification has been removed.");
                    return response.text();
                } else {
                    throw new Error("Invite failed.");
                }
            })
            .then(result => console.log("Result", result))
            .catch(error => console.log('error', error));
    };

    useEffect(getNotificationsByUserName, [username]);

    function handleEventClick(eventId) {
        navigate(`/serviceOne/event/${eventId}`);
    }

    return (
        <>
            <Typography variant="h4">Notifications</Typography>
            <p> User Name: {username}</p>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: 200, fontWeight: 'bold' }}>FROM</TableCell>
                            <TableCell sx={{ width: 200, fontWeight: 'bold' }}>SUBJECT (click to open event details)</TableCell>
                            <TableCell sx={{ width: 250, fontWeight: 'bold' }}>MESSAGE</TableCell>
                            <TableCell sx={{ width: 175, fontWeight: 'bold' }} align="center">RESPONSE</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notifications ? notifications.sort((a,b) => parseInt(b.msgId) - parseInt(a.msgId)).map(result => (
                            <TableRow key={result.msgId}>
                                <TableCell>{result.messageFrom}</TableCell>
                                <TableCell sx={{ cursor: 'pointer' }} onClick={(e) => { handleEventClick(result.eventId) }}>{result.subject}</TableCell>
                                <TableCell>{result.messageText}</TableCell>
                                <TableCell align="center">
                                    {result.subject.substring(0,10).toLowerCase() === "invite to:"
                                    ? <form onSubmit={(e) => { sendResponse(e) }}>
                                        <FormControl component="fieldset">
                                            <RadioGroup row>
                                                <FormControlLabel name="response" size="small" value="Going" control={<Radio />} label="Going" />
                                                <FormControlLabel name="response" size="small" value="Not Going" control={<Radio />} label="Not Going" />
                                                <FormControlLabel name="response" size="small" value="Tentative" control={<Radio />} label="Tentative" />
                                                <FormControlLabel name="eventId" size="small" sx={{ width: 0, opacity: 0 }} value={result.eventId} disabled control={<Radio />} label="" />
                                                <FormControlLabel name="msgId" size="small" sx={{ width: 0, opacity: 0 }} value={result.msgId} disabled control={<Radio />} label="" />
                                            </RadioGroup>
                                        </FormControl>
                                        <Button sx={{ width: 175 }} type="submit" variant="contained" > Send Response </Button>
                                    </form>
                                    : <Button sx={{ width: 175 }} variant="contained" onClick={() => { deleteNotification(result.msgId) }}> Delete Message </Button>
                                    }                                    
                                </TableCell>
                            </TableRow>
                        )) : <TableRow><TableCell colSpan="4">No Notifications</TableCell></TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )

};

export default Notifications;