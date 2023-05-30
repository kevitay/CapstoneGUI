import React from 'react';
import { useState } from 'react';
import CreateEvent from './CreateEvent';

function CreateEventFlow() {
  // Steps are: 1-New, 2-Invite, 3-Itinerary, 4-Items, 5-Tasks
  const [creationStep, setCreationStep] = useState(1);

  return (
    <div>

    </div>
  )
}

export default CreateEventFlow