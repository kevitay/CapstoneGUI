import React, { useState, useEffect } from 'react';

const Notifications = ({ user }) => {
  user = "Mickey456";
  const notificationsUrl = "http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/notifications";
  const [notifications, setNotifications] = useState([]);

  const getNotificationsByUserName = () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(notificationsUrl + "?userName=" + user, requestOptions)
      .then(response => {
        console.log("Response", response)
        if (response.status === 200) {
            return response.json();
        } else {
              return {};
        }
      })
      .then(result => {
        console.log("Result", result);
        setNotifications(result.notifications);
      })
      .catch(error => console.log('error', error));
  };

  const sendReply = (e) => {

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
                            <form onSubmit={(e) => sendReply(e)}>
                                <input type="radio" id="going" name="response" value="Going" />
                                <label for="going">Going</label>
                                <input type="radio" id="notGoing" name="response" value="Not Going" />
                                <label for="notGoing">Not Going</label>
                                <input type="radio" id="tentative" name="response" value="Tentative" />
                                <label for="tentative">Tentative</label>
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