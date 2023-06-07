import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import AuthContext from '../IdentityResources/Contexts/AuthContext';

//will need to change to account for cascading delete to other components
export default function DeleteEvent({ id }) {
  // Deletion steps: 1-Checklist, 2-Participants, 3-Activities, 4-Event
  const [deletionStep, setDeletionStep] = useState(0);
  let [deleteStatus, setDeleteStatus] = useState('preDelete');
  const [authState] = useContext(AuthContext);
  //deleteTasks(), deleteParticipants(), deleteItinerary(), handleDeleteEvent()

  useEffect(() => {
    function handleDeleteEvent() {

      var requestOptions = {
        method: 'DELETE',
        mode: 'cors',
        authorization: authState.token,
      };

      switch (deletionStep) {
        case 1:
          setDeleteStatus('pending');
          fetch('http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/checklist?eventId=' + id, requestOptions)
            .then((response) => console.log('Success- Checklist ' + id + ' Deleted'))
            .then(setDeletionStep(2))
            .catch((error) => console.log(error));
          break;
        case 2:
          fetch('http://a53e50bf576c64141b52293976658417-1117441751.us-west-2.elb.amazonaws.com/api/eventParticipants/' + id, requestOptions)
            .then((response) => console.log('Success- Participant List ' + id + ' Deleted'))
            .then(setDeletionStep(3))
            .catch((error) => console.log(error));
          break;
        case 3:
          fetch('http://a08cb134e19c8438285f05f4a630b6bd-117037464.us-west-2.elb.amazonaws.com/api/activities/event/' + id, requestOptions)
            .then((response) => console.log('Success- Activity ' + id + ' Deleted'))
            .then(setDeletionStep(4))
            .catch((error) => console.log(error));
          break;
        case 4:
          fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/' + id, requestOptions)
            .then((response) => console.log('Success- Event ' + id + ' Deleted'))
            .then((response) => setDeleteStatus('deleted'))
            .then(setDeletionStep(0))
            .catch((error) => console.log(error));
          break;
        default: return;
      }

      
      // fetch('http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/checklist?eventId=' + id, requestOptions)
      //   .then((response) => console.log('Success- Checklist ' + id + ' Deleted'))
      //   .catch((error) => console.log(error))

      //   .then(
      //     fetch('http://a53e50bf576c64141b52293976658417-1117441751.us-west-2.elb.amazonaws.com/api/eventParticipants/' + id, requestOptions)
      //       .then((response) => console.log('Success- Participant List ' + id + ' Deleted'))
      //       .catch((error) => console.log(error))

      //       .then(
      //         fetch('http://a08cb134e19c8438285f05f4a630b6bd-117037464.us-west-2.elb.amazonaws.com/api/activities/event/' + id, requestOptions)
      //           .then((response) => console.log('Success- Activity ' + id + ' Deleted'))
      //           .catch((error) => console.log(error))

      //           .then(
      //             fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/' + id, requestOptions)
      //               .then((response) => console.log('Success- Event ' + id + ' Deleted'))
      //               .then((response) => setDeleteStatus('deleted'))
      //               .catch((error) => console.log(error))
      //           )
      //       )
      //   );
    }

    handleDeleteEvent();

  }, [deletionStep, id, setDeleteStatus, authState]);

  return (
    <>
      {deleteStatus === 'preDelete' ? (
        <button
          onClick={() => {
            // handleDeleteEvent();
            setDeletionStep(1);
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
