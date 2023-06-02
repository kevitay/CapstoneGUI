import React, { useState, useEffect } from 'react';
import Signup from './signup';


const ParticipantView = ({ eventId, user }) => {
  user = "Russhi";
  const checklistUrl = "http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/checklist";
  const [packingList, setPackingList] = useState([]);
  const [assigneeList, setAssigneeList] = useState([]);
  
  const getPackingListByEventId = (eventId) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(checklistUrl + "/" + eventId, requestOptions)
      .then(response => response.json())
      .then(result => {
        setPackingList(result.checklist);
      })
      .catch(error => console.log('error', error));
  };

  const getAssigneeListByUserIdAndEventId = (eventId, user) => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(checklistUrl + "/assignees", requestOptions)
        .then(response => response.json())
        .then(result => result.assigneeList.filter(assignee => assignee.userName === user && assignee.checklistItem.eventId === eventId))  
        .then(result => result.map(item => item.checklistItem.id).join().split(","))
        .then(result => setAssigneeList(result))
        .catch(error => console.log("error", error));
  }

  useEffect(() => {
    getPackingListByEventId(eventId);
    getAssigneeListByUserIdAndEventId(eventId, user);
  }, [eventId, user]);

  return (
    <div>
      <h2>Participant View</h2>
      <p>User ID: {user}</p>
      <p>Event ID: {eventId}</p>
      <h3>Packing List Items for event {eventId}</h3>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Required</th>
          </tr>
        </thead>
        <tbody>
          {packingList.filter(item => item.type === "packing list").map(result => (
            <tr key={result.id}>
              <td>{result.description}</td>
              <td>{result.type}</td>
              <td>{result.quantity}</td>
              <td>
               {(result.required) ? "yes" : "" }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Signup List Items I've Signed Up For</h3>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Required</th>
          </tr>
        </thead>
        <tbody> 
          {packingList.filter(item => item.type === "signup list" && assigneeList.includes(item.id.toString())).map(result => (
            <tr key={result.id}>
              <td>{result.description}</td>
              <td>{result.type}</td>
              <td>{result.quantity}</td>
              <td>
                {(result.required) ? "yes" : "" }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Signup List Items Available</h3>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th># Remaining</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {packingList.filter(item => item.type === "signup list").map(result => (
            <Signup
              key={result.id}
              eventId={eventId}
              user={user} 
              signupListItem={result} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ParticipantView;