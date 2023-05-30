import React from 'react';
import { useState } from 'react';
import CreateEvent from './CreateEvent';

function CreateEventFlow() {
  // Steps are: 1-New, 2-Invite, 3-Itinerary, 4-Items, 5-Tasks
  const [creationStep, setCreationStep] = useState(1);
  const [event, setEvent] = useState(null);

  return (
    <div>
      {event ? (<h1>{event.name}</h1>) : <h1>Create Your Event</h1>}
      <p>Step {creationStep} of 5</p>
      {creationStep === 1 ? <CreateEvent setCreationStep={setCreationStep} setEvent={setEvent} /> : <></>}
      {creationStep === 2 ? <><p>Add participants</p></> : <></>}
      {creationStep === 3 ? <><p>Add itinerary</p></> : <></>}
      {creationStep === 4 ? <><p>Add items</p></> : <></>}
      {creationStep === 5 ? <><p>Add tasks</p></> : <></>}
    </div>
  );
}

export default CreateEventFlow