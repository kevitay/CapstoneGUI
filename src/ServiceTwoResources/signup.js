import React, { useState, useEffect } from 'react';

const Signup = ({ eventId, user, signupListItem }) => {
  // lookup checklistItemId from assignees
  const [assigneeList, setAssigneeList] = useState([]);

  const getAssigneeListByChecklistItemId = (signupListItem) => {
    console.log("signupListItem.id = ", signupListItem.id);
    fetch("http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/checklist/assignees/" + signupListItem.id, {method: 'GET'})
      .then(response => response.json())
      .then(result => {
        console.log("result: ", result);
        setAssigneeList(result.assigneeList);
      })
      .catch(error => console.log('error', error))
  };
  useEffect(() => {
    getAssigneeListByChecklistItemId(signupListItem);
  }, []);

  let qtyNeeded = signupListItem.quantity - assigneeList.length;
  
  return (
    <tr key={signupListItem.id}>
      <td>{signupListItem.id}</td>
      <td>{signupListItem.description}</td>
      <td>{qtyNeeded}</td>
      <td><button> Sign Up! </button></td>
    </tr>
  );
}

export default Signup;