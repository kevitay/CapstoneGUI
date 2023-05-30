import React, { useState, useEffect } from 'react';
// import axiosimport axios from 'axios';

const ParticipantView = ({ eventId, itemId, user }) => {
  const [results, setResults] = useState([]);

//   useEffect(() => {
//     // Fetch initial results data for the given event and item IDaxios.get(`/events/${eventId}/items/${itemId}/results`)
//       .then(res => setResults(res.data))
//       .catch(err => console.log(err));
//   }, [eventId, itemId]);

//   const handleAddResult = (newResult) => {
//     //axios.post('/results', { eventId, itemId, user, ...newResult })
//       .then(res => setResults([...results, res.data]))
//       .catch(err => console.log(err));
//   }

 // const handleUpdateResult = (resultId, updatedResult) => {
    //axios.put(`/results/${resultId}`, updatedResult)
    //   .then(res => setResults(results.map(result => {
    //     return result.id === res.data.id ? res.data : result
    //   })))
    //   .catch(err => console.log(err));
//   }

//   const handleDeleteResult = (resultId) => {
//     axios.delete(`/results/${resultId}`)
//       .then(res => setResults(results.filter(result => result.id !== res.data.id)))
//       .catch(err => console.log(err));
//   }

  return (
    <div>
      <h2>Participant View</h2>
      <p>Event ID: {eventId}</p>
      <p>Item ID: {itemId}</p>
      <p>User ID: {user}</p>
      <table>
        <thead>
          <tr>
            <th>Result ID</th>
            <th>Result Value</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {results.map(result => (
            <tr key={result.id}>
              <td>{result.id}</td>
              <td>{result.value}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form>
        <label>
          New Result Value:
          <input type="number" name="value" required />
        </label>
        <button type="submit">Add Result</button>
      </form>
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