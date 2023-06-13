import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import AuthContext from '../IdentityResources/Contexts/AuthContext';
import { Button } from '@mui/material';

//will need to change to account for cascading delete to other components
export default function DeleteEvent({ id, setDeleted }) {
  const navigate = useNavigate();
  // Deletion steps: 1-Checklist, 2-Participants, 3-Activities, 4-Notifications, 5-Event
  const [deletionStep, setDeletionStep] = useState(0);
  let [deleteStatus, setDeleteStatus] = useState('preDelete');
  const [authState] = useContext(AuthContext);
  //deleteTasks(), deleteParticipants(), deleteItinerary(), handleDeleteEvent()

  useEffect(() => {
    function handleDeleteEvent() {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', authState.token);

      var requestOptions = {
        method: 'DELETE',
        mode: 'cors',
        headers: myHeaders
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
          fetch('http://aa2d2637139cf431aa862ecc08beb8fa-796957187.us-west-2.elb.amazonaws.com/api/notifications?eventId=' + id, requestOptions)
            .then((response) => console.log('Success- Notifications ' + id + ' Deleted'))
            .then(setDeletionStep(5))
            .catch((error) => console.log(error));
          break;
        case 5:
          fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/' + id, requestOptions)
            .then((response) => console.log('Success- Event ' + id + ' Deleted'))
            .then((response) => setDeleteStatus('deleted'))
            .then(setDeletionStep(0))
            .then(setDeleted(true))
            .catch((error) => console.log(error));
          break;
        default:
          return;
      }
    }

    handleDeleteEvent();
  }, [deletionStep, id, setDeleteStatus, authState, setDeleted]);

    function handleReturnToEvents() {
      //navigates to event list
      navigate("/myEvents/");
    }

  return (
    <>
      {deleteStatus === 'preDelete' ? (
        <Button size="small" variant='outlined'
          onClick={() => {
            // handleDeleteEvent();
            setDeletionStep(1);
          }}
        >
          Delete Event
        </Button>
      ) : (
        <></>
      )}
      {deleteStatus === 'pending' ? <p>Deleting...</p> : <></>}
      {deleteStatus === 'deleted' ? (
          <Button variant='outlined' onClick={handleReturnToEvents}>Return to Events</Button>
      ) : (
        <></>
      )}
    </>
  );
}
