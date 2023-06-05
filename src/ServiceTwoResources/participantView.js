import React, { useState, useEffect } from 'react';
import Signup from './signup';


const ParticipantView = ({ eventId, user }) => {
  user = "Russhi";
  const checklistUrl = "http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/checklist";
  const [packingList, setPackingList] = useState([]);
  const [assigneeList, setAssigneeList] = useState([]);

  const getPackingListByEventId = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(checklistUrl + "/" + eventId, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log("Result", result);
        setPackingList((result.checklist.length > 1) ? result.checklist.sort((a, b) => parseInt(a.id) - parseInt(b.id)) : result.checklist);
      })
      .catch(error => console.log('error', error));
  };

  const getAssigneeListByUserIdAndEventId = () => {
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
        // console.log('result', result);
        const updatedAssigneeList = [...assigneeList];
        // console.log('checklistItemId', checklistItemId.toString());
        let index = updatedAssigneeList.findIndex((element) => element === checklistItemId.toString());
        let length = assigneeList.filter((item) => item === checklistItemId.toString()).length;
        updatedAssigneeList.splice(index, length);
        // console.log("assignee list", assigneeList);
        // console.log("updated assignee list", updatedAssigneeList);
        setAssigneeList(updatedAssigneeList);
      })
      .catch(error => console.log('error', error));
  };

  const deleteAssigneeById = (assigneeId) => {
    let requestOptions = { method: 'DELETE', redirect: 'follow' };

    fetch(checklistUrl + "/assignees/" + assigneeId, requestOptions)
      .then(response => {
        if (response.status === 202) {
          console.log('removed assignee', assigneeId);
        } else {
          console.log('assignee', assigneeId, 'remove failed');
        }
      })
      .catch(error => console.log('error', error));
  };

  useEffect(getPackingListByEventId, [eventId, setPackingList]);
  useEffect(getAssigneeListByUserIdAndEventId, [eventId, user, setAssigneeList]);

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
          {packingList.filter(item => item.type === "signup list" && assigneeList.includes(item.id.toString())).map(result => (
            <tr key={result.id}>
              <td>{result.description}</td>
              <td>{assigneeList.filter(item => item === result.id.toString()).length}</td>
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
              getAssigneeListByUserIdAndEventId={getAssigneeListByUserIdAndEventId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ParticipantView;