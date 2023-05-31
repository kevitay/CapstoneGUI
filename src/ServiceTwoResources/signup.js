import React, { useState, useEffect } from 'react';

const Signup = ({ eventId, user, signupListItem }) => {
  const checklistUrl = "http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/checklist";
  // lookup checklistItemId from assignees
  const [assigneeList, setAssigneeList] = useState([]);

  const getAssigneeListByChecklistItemId = (signupListItem) => {
    console.log("signupListItem.id = ", signupListItem.id);
    fetch(checklistUrl + "/assignees/" + signupListItem.id, { method: 'GET' })
      .then(response => response.json())
      .then(result => {
        console.log("GET result: ", result);
        setAssigneeList(result.assigneeList);
      })
      .catch(error => console.log('error', error))
  };
  useEffect(() => {
    getAssigneeListByChecklistItemId(signupListItem);
  }, []);

  // wire up the button to sign up for an item

  const signupForItem = () => {
    let newAssigneeJson = {
      checklistItem: { id: signupListItem.id },
      userName: user
    };
    console.log("newAssigneeJson: ", newAssigneeJson);
    handleAddAssignee(newAssigneeJson);
  };

  const handleAddAssignee = (assigneeJson) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify(assigneeJson);
    console.log("raw: ", raw);
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(checklistUrl + "/assignees", requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
          // getAssigneeListByChecklistItemId(signupListItem.id);
        }
      })
      .then(result => console.log("POST result: ", result))
      .catch(error => console.log('error', error));
  };

  let qtyNeeded = signupListItem.quantity - assigneeList.length;

  return (
    <tr key={signupListItem.id}>
      <td>{signupListItem.id}</td>
      <td>{signupListItem.description}</td>
      <td>{qtyNeeded}</td>
      <td><button onClick={signupForItem}> Sign Up! </button></td>
    </tr>
  );
}

export default Signup;