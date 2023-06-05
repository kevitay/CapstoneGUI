import React, { useState, useEffect } from 'react';

const Signup = ({ user, signupListItem, getAssigneeListByUserIdAndEventId }) => {
  const checklistUrl = "http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/checklist";
  // lookup checklistItemId from assignees
  const [assigneeList, setAssigneeList] = useState([]);

  const getAssigneeListByChecklistItemId = () => {
    console.log("signupListItem.id = ", signupListItem.id);
    fetch(checklistUrl + "/assignees/" + signupListItem.id, { method: 'GET' })
      .then(response => response.json())
      .then(result => {
        console.log("GET result: ", result);
        setAssigneeList(result.assigneeList);
      })
      .catch(error => console.log('error', error))
  };

  useEffect(getAssigneeListByChecklistItemId, [signupListItem]);

  // wire up the button to sign up for an item

  const signupForItem = () => {
    let newAssigneeJson = {
      checklistItem: { id: signupListItem.id },
      userName: user
    };
    // console.log("newAssigneeJson: ", newAssigneeJson);
    handleAddAssignee(newAssigneeJson);
  };

  const handleAddAssignee = (assigneeJson) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(assigneeJson),
      redirect: "follow"
    };

    fetch(checklistUrl + "/assignees", requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(result => console.log("POST result: ", result))
      .then(getAssigneeListByUserIdAndEventId)
      .catch(error => console.log('error', error));
  };

  let qtyNeeded = signupListItem.quantity - assigneeList.length;

  return (
    <tr key={signupListItem.id}>
      <td>{signupListItem.description}</td>
      <td>{qtyNeeded}</td>
      <td>
        {(qtyNeeded === 0)
          ? <button onClick={signupForItem} disabled> Sign Up! </button>
          : <button onClick={signupForItem}> Sign Up! </button>
        }
      </td>
    </tr>
  );
}

export default Signup;