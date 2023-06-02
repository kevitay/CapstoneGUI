import React from 'react';
import { useState } from 'react';

//will need to change to account for cascading delete to other components
export default function DeleteEvent({ id }) {
  let [deleteStatus, setDeleteStatus] = useState('preDelete');

  //deleteTasks(), deleteParticipants(), deleteItinerary(), handleDeleteEvent()

  function handleDeleteEvent() {
    setDeleteStatus('pending');

    // TODO: Work with BeforeEvent Team for deleting checklists by eventID
    //   fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/checklist/{eventId}', {
    //   method: 'DELETE',
    // })
    //   .then((response) => console.log('Success- Checklist ' + id + ' Deleted'))
    //   .catch((error) => console.log(error))

    // TODO: Work with Users Team for deleting participant list by eventID
    //   .then(fetch('http://a53e50bf576c64141b52293976658417-1117441751.us-west-2.elb.amazonaws.com/api/participants?eventId={eventId}' + id, {
    //   method: 'DELETE',
    // })
    //   .then((response) => console.log('Success- Participant List ' + id + ' Deleted'))
    //   .catch((error) => console.log(error)));

    // TODO: Work with Itinerary Team for deleting all activities by eventID
    //   .then(fetch('http://a53e50bf576c64141b52293976658417-1117441751.us-west-2.elb.amazonaws.com/api/activities/{eventId}' + id, {
    //   method: 'DELETE',
    // })
    //   .then((response) => console.log('Success- Activity ' + id + ' Deleted'))
    //   .catch((error) => console.log(error)));

    fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/' + id, {
      method: 'DELETE',
    })
      .then((response) => console.log('Success- Event ' + id + ' Deleted'))
      .then((response) => setDeleteStatus('deleted'))
      .catch((error) => console.log(error));
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
