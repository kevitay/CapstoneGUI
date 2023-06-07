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

  useEffect(getNotificationsByUserName, [user]);

  return (
    <div>
        <h2>Notifications</h2>
        <p> User ID: {user}</p>
        
    </div>
  )

};



export default Notifications;