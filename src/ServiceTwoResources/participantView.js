import React, { useState, useEffect } from 'react';
import Signup from './signup';
import { getListData, signupForItem } from './listGetters';


const ParticipantView = ({ eventId, user }) => {
  user = "Russhi";
  const checklistUrl = "http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/checklist";
  const [packingList, setPackingList] = useState([]);
  const [signupList, setSignupList] = useState([]);
  const [assignedList, setAssignedList] = useState([]);

  const refreshData = () => {
    getListData(eventId, user)
      .then((listData) => {
        console.log(listData);
        setAssignedList(listData.currentUserSignups);
        setPackingList(listData.packingList);
        setSignupList(listData.availableSignups);
      });
  };

  const addSignup = (checklistItemId) => {
    signupForItem(checklistItemId, user)
      .then(refreshData);
  };

  const removeSignup = (checklistItemId) => {
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
        refreshData();
      })
      .catch(error => console.log('error', error));
  };

  useEffect(refreshData, [eventId, user]);

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
          {packingList.map(result => (
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
          {assignedList.map(result => (
            <tr key={result.id}>
              <td>{result.description}</td>
              <td>{result.quantity}</td>
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
          {signupList.map(result => (
            <Signup
              key={result.id}
              user={user}
              signupListItem={result}
              handleAddAssignee={addSignup}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ParticipantView;