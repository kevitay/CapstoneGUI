import React, { useState, useEffect } from 'react';
import Signup from './signup';


const ParticipantView = ({ eventId, user }) => {
  user = "Russhi";
  const checklistUrl = "http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/checklist";
  const [packingList, setPackingList] = useState([]);
  const [signupList, setSignupList] = useState([]);

  const getPackingListByEventId = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(checklistUrl + "/" + eventId, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("getPackingListByEventId result", result);
        setPackingList((result.checklist.length > 1) ? result.checklist.sort((a, b) => parseInt(a.id) - parseInt(b.id)) : result.checklist);
      })
      .catch(error => console.log('error', error));
  };

  const getSignupListByUserIdAndEventId = () => {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(checklistUrl + "/assignees", requestOptions)
      .then(response => response.json())
      .then(result => result.assigneeList.filter(assignee => assignee.userName === user && assignee.checklistItem.eventId === eventId))
      .then(result => result.map(item => item.checklistItem.id).join().split(","))
      .then(result => setSignupList(result))
      .catch(error => console.log("error", error));
  }

  const removeSignup = (checklistItemId) => {
    // remove assignees where checklistItemId = itemId
    // get assigneesByChecklistItemId
    let requestOptions = { method: 'GET', redirect: 'follow' };

    fetch(checklistUrl + "/assignees/" + checklistItemId + "?userName=" + user, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("Assignee List to be removed: ", result);
        return result;
      })
      .then(result => {
        for (let i = 0; i < result.assigneeList.length; i++) {
          console.log("assignee to be removed", result.assigneeList[i]);
          deleteAssigneeById(result.assigneeList[i].id);
        }
        return result;
      })
      .then(result => {
        console.log('removeSignup result', result);
        const updatedSignupList = [...signupList];
        console.log('removeSignup checklistItemId', checklistItemId.toString());
        let index = updatedSignupList.findIndex((element) => element === checklistItemId.toString());
        let length = signupList.filter((item) => item === checklistItemId.toString()).length;
        updatedSignupList.splice(index, length);
        console.log("removeSignup signup list", signupList);
        console.log("removeSignup updated signup list", updatedSignupList);
        setSignupList(updatedSignupList);
      })
      .catch(error => console.log('error', error));
  };

  const deleteAssigneeById = (assigneeId) => {
    let requestOptions = { method: 'DELETE', redirect: 'follow' };

    fetch(checklistUrl + "/assignees/" + assigneeId, requestOptions)
      .then(response => {
        if (response.status === 202) {
          console.log('deleteAssigneeById removed assignee', assigneeId);
        } else {
          console.log('deleteAssigneeById assignee', assigneeId, 'remove failed');
        }
      })
      .catch(error => console.log('error', error));
  };

  useEffect(getPackingListByEventId, [eventId, setPackingList]);
  useEffect(getSignupListByUserIdAndEventId, [eventId, user, setSignupList]);

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
            <th>Quantity</th>
            <th>Required</th>
          </tr>
        </thead>
        <tbody>
          {packingList.filter(item => item.type === "packing list").map(result => (
            <tr key={result.id}>
              <td>{result.description}</td>
              <td>{result.quantity}</td>
              <td>
                {(result.required) ? "yes" : ""}
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
            <th>Quantity</th>
            <th>Required</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {packingList.filter(item => item.type === "signup list" && signupList.includes(item.id.toString())).map(result => (
            <tr key={result.id}>
              <td>{result.description}</td>
              <td>{signupList.filter(item => item === result.id.toString()).length}</td>
              <td>
                {(result.required) ? "yes" : ""}
              </td>
              <td><button onClick={() => removeSignup(result.id)}> Remove Signup </button></td>
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
              getSignupListByUserIdAndEventId={getSignupListByUserIdAndEventId}
              signupList={signupList}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ParticipantView;