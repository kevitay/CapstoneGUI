import React, { useState, useEffect } from 'react';

const Notifications = ({ user }) => {
    user = "TJWELLS1";
    const notificationsUrl = "http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/notifications";
    const participantUrl = "http://a53e50bf576c64141b52293976658417-1117441751.us-west-2.elb.amazonaws.com/api/participants";
    const [notifications, setNotifications] = useState([]);

    const getNotificationsByUserName = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(notificationsUrl + "?userName=" + user, requestOptions)
            .then(response => {
                // console.log("Response", response)
                if (response.status === 200) {
                    return response.json();
                } else {
                    return {};
                }
            })
            .then(result => {
                // console.log("Result", result);
                setNotifications(result.notifications);
            })
            .catch(error => console.log('error', error));
    };

    const sendResponse = (e) => {
        e.preventDefault();
        if (e.target.response.value === "Not Going") {
            deleteNotification(e.target.msgId.value);
        } else {
            addParticipant(e.target.msgId.value, e.target.eventId.value, e.target.response.value, user);
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
                console.log('Notification was deleted', msgId);
            } else {
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
                    throw new Error("User already invited.");
                } else if (response.ok) {
                    deleteNotification(msgId);
                    return response.text();
                } else {
                    throw new Error("Invite failed.");
                }
            })
            .then(result => console.log("Result", result))
            .catch(error => console.log('error', error));
    };

    useEffect(getNotificationsByUserName, [user]);

    return (
        <div>
            <h2>Notifications</h2>
            <p> User ID: {user}</p>
            <table>
                <thead>
                    <tr>
                        <th>From</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Response</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications.map(result => (
                        <tr key={result.msgId}>
                            <td>{result.messageFrom}</td>
                            <td>{result.subject}</td>
                            <td>{result.messageText}</td>
                            <td>
                                <form onSubmit={(e) => sendResponse(e)}>
                                    <input type="hidden" id="eventId" name="eventId" value={result.eventId} />
                                    <input type="hidden" id="msgId" name="msgId" value={result.msgId} />
                                    <input type="radio" id="going" name="response" value="Going" />
                                    <label htmlFor="going">Going</label>
                                    <input type="radio" id="notGoing" name="response" value="Not Going" />
                                    <label htmlFor="notGoing">Not Going</label>
                                    <input type="radio" id="tentative" name="response" value="Tentative" />
                                    <label htmlFor="tentative">Tentative</label>
                                    &nbsp; &nbsp; &nbsp;
                                    <input type="submit" value="Send Response" />
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

};



export default Notifications;