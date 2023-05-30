import React from 'react';
import { useState } from 'react';
import CreateEvent from './CreateEvent';

function CreateEventFlow() {
  // Steps are: 1-New, 2-Invite, 3-Itinerary, 4-Items, 5-Tasks
  const [creationStep, setCreationStep] = useState(1);
  const [event, setEvent] = useState(null);

  return (
    <div>
      {creationStep === 1 ? <CreateEvent setCreationStep={setCreationStep} setEvent={setEvent} /> : <></>}
      {creationStep === 2 ? <></> : <></>}
      {creationStep === 3 ? <></> : <></>}
      {creationStep === 4 ? <></> : <></>}
      {creationStep === 5 ? <></> : <></>}
    </div>
  );
}

export default CreateEventFlow