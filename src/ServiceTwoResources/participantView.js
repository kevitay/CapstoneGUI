import React, { useState, useEffect } from 'react';
import Signup from './signup';


const ParticipantView = ({ eventId, user }) => {
  user = "Russhi";

  const [packingList, setPackingList] = useState([]);
  
  const getPackingListByEventId = (eventId) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/checklist/" + eventId, requestOptions)
      .then(response => response.json())
      .then(result => {
        setPackingList(result.checklist);
      })
      .catch(error => console.log('error', error));
  };
  useEffect(() => {
    getPackingListByEventId(eventId);
  }, [eventId]);

  return (
    <div>
      <h2>Participant View</h2>
      <p>User ID: {user}</p>
      <p>Event ID: {eventId}</p>
      <h3>Packing List Items for event {eventId}</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Required</th>
          </tr>
        </thead>
        <tbody>
          {packingList.filter(item => item.type === "packing list").map(result => (
            <tr key={result.id}>
              <td>{result.id}</td>
              <td>{result.description}</td>
              <td>{result.type}</td>
              <td>{result.quantity}</td>
              <td>
               {(result.required) ? "true" : "false" }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Signup List Items I've Signed Up For</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Required</th>
          </tr>
        </thead>
        <tbody> {/* need to make this show what I've already signed up for */}
          {packingList.filter(item => item.type === "signup list").map(result => (
            <tr key={result.id}>
              <td>{result.id}</td>
              <td>{result.description}</td>
              <td>{result.type}</td>
              <td>{result.quantity}</td>
              <td>
                {(result.required) ? "true" : "false" }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Signup List Items Available</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
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