import React from 'react';
import { useState } from 'react';

//will need to change to account for cascading delete to other components
export default function DeleteEvent({ id }) {
  let [deleteStatus, setDeleteStatus] = useState('preDelete');

  //deleteTasks(), deleteParticipants(), deleteItinerary(), handleDeleteEvent()

  function handleDeleteEvent() {
    setDeleteStatus('pending');

      var requestOptions = {
            method: 'DELETE',
            mode: 'cors',
          };

    fetch('http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/checklist?eventId=' + id, requestOptions)
      .then((response) => console.log('Success- Checklist ' + id + ' Deleted'))
      .catch((error) => console.log(error))

      .then(
        fetch('http://a53e50bf576c64141b52293976658417-1117441751.us-west-2.elb.amazonaws.com/api/eventParticipants/' + id, requestOptions)
          .then((response) => console.log('Success- Participant List ' + id + ' Deleted'))
          .catch((error) => console.log(error))
      )

      .then(
        fetch('http://a08cb134e19c8438285f05f4a630b6bd-117037464.us-west-2.elb.amazonaws.com/api/activities/event/' + id, requestOptions)
          .then((response) => console.log('Success- Activity ' + id + ' Deleted'))
          .catch((error) => console.log(error))
      )

      .then(
        fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/' + id, requestOptions)
          .then((response) => console.log('Success- Event ' + id + ' Deleted'))
          .then((response) => setDeleteStatus('deleted'))
          .catch((error) => console.log(error))
      );
  }

  return (
    <>
      {deleteStatus === 'preDelete' ? (
        <button
          onClick={() => {
            handleDeleteEvent();
          }}
        >
          Delete Event
        </button>
      ) : (
        <></>
      )}
      {deleteStatus === 'pending' ? <p>Deleting...</p> : <></>}
      {deleteStatus === 'deleted' ? (
        <a href={`/serviceOne/`} rel="noopener noreferrer">
          <button>Return to Events </button>
        </a>
      ) : (
        <></>
      )}
    </>
  );
}
