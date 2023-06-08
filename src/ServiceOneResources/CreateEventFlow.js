import React from 'react';
import { useState, useEffect, useContext } from 'react';
import CreateEvent from './CreateEvent';
import AuthContext from '../IdentityResources/Contexts/AuthContext';
import Itinerary from '../ServiceThreeResources/Itinerary';

function CreateEventFlow() {
  // Steps are: 1-New, 2-Invite, 3-Itinerary, 4-Items, 5-Tasks
  const [creationStep, setCreationStep] = useState(1);
  const [event, setEvent] = useState(null);
  const [authState] = useContext(AuthContext);

  useEffect(() => {
    if (creationStep === 4) {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', authState.token);

      var raw = JSON.stringify({
        status: 'Planned',
      });

      // PATCH call to change event status to "planned" once creationStep 4 is reached
      var requestOptions = {
        method: 'PATCH',
        mode: 'cors',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch('http://ad0bcd07c990f4a9d9879e71472608fa-1526526031.us-west-2.elb.amazonaws.com/api/event/' + event.id, requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
      // console.log(eventDate)
    }
  }, [creationStep, event, authState.token]);

  return (
    <div>
      {event ? <h1>{event.name}</h1> : <h1>Create Your Event</h1>}
      <p>Step {creationStep} of 5</p>
      {creationStep === 1 ? <CreateEvent setCreationStep={setCreationStep} setEvent={setEvent} /> : <></>}
      {creationStep === 2 ? <><p>Add participants</p></> : <></>}
      {creationStep === 3 ? <Itinerary creationStep={creationStep} setCreationStep={setCreationStep} eventId={event.id} /> : <></>}
      {creationStep === 4 ? <><p>Add items</p></> : <></>}
      {creationStep === 5 ? <><p>Add tasks</p></> : <></>}
      <br/>
      <br/>
    </div>
  );
}

export default CreateEventFlow;
