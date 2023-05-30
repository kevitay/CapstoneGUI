import React, { useState, useEffect } from 'react';


const ParticipantView = ({ user }) => {
  const [packingList, setPackingList] = useState([]);
  const eventId = 2;
  
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
  }, []);

  return (
    <div>
      <h2>Participant View</h2>
      <p>User ID: {user}</p>
      <p>Event ID: {eventId}</p>
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
          {packingList.map(result => (
            <tr key={result.id}>
              <td>{result.id}</td>
              <td>{result.description}</td>
              <td>{result.type}</td>
              <td>{result.quantity}</td>
              <td>{result.required}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ParticipantView;








// import React, {useEffect, useState} from "react";

// function ParticipantView (){

//     const [requiredList, setRequiredList] = useState([]);

//     useEffect(()=> {
//         fetchData();
//     }, []);

//     const fetchData= () => {
//         fetch()
//         .then(response = response.json())
//         .then(data => {
//             setRequiredList(data);
//         })
//         .catch(error => {
//             console.error('Error fetching required list: ', error);
//         });
//     };

//     return (
//         <div>
            
//         </div>
//     )

// }
// export default ParticipantView